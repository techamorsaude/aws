/// <reference types="cypress"/>

describe('Módulo - Caixa Saldo Resumo', () => {
    beforeEach(() => {
        cy.login();
        cy.refreshToken();
    })

    describe('Módulo - Caixa Saldo Resumo - Informações do caixa', () => {

        it('Validar retorno 200 - /api/v1/saldo-resumo/old', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/saldo-resumo/old?data=20251204&dataFinal=20251204&tipoData=0',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(200);
                cy.log(JSON.stringify(response.body));

                expect(response.body).to.be.an('array');
                // valida os campos de cada item do array
                response.body.forEach((item) => {
                    expect(item).to.have.all.keys(
                        "idContaCorrente",
                        "contaCorrente",
                        "tipoContaCorrente",
                        "tipoContaCorrenteId",
                        "valor",
                        "resumo",
                        "lancamentos"
                    );
                    expect(item.resumo).to.have.all.keys(
                        "dinheiro",
                        "debito",
                        "credito",
                        "pix"
                    );
                    // validar subcampos (entradas / saídas)
                    const tipos = ["dinheiro", "debito", "credito", "pix"];
                    tipos.forEach((tipo) => {
                        expect(item.resumo[tipo]).to.have.all.keys(
                            "entradas",
                            "saidas"
                        );
                    });

                    expect(item.lancamentos).to.be.an('array');
                });
            })
        })

        it('Validar retorno 401 - /api/v1/saldo-resumo/old', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/saldo-resumo/old?data=20251204&dataFinal=20251204&tipoData=0',
                headers: {
                    //'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(401);
                 cy.log(JSON.stringify(response.body));
            })
        })
    })

    describe('Módulo - Caixa Saldo Resumo - Pegando dados de uma conta corrente', () => {

        it('Validar retorno 200 - /api/v1/saldo-resumo/account', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/saldo-resumo/account?checkingAccountId=19092&date=20230721&finalDate=20230721&page=1&perPage=1&typeDate=0',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(200);
                cy.log(JSON.stringify(response.body));
                const body = response.body;
                expect(body).to.have.property('data');
                expect(body.data).to.have.property('lancamentos').to.be.an('array');
            })
        })

        it('Validar retorno 400 - /api/v1/saldo-resumo/account', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/saldo-resumo/account',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(400);
                cy.log(JSON.stringify(response.body));
            })
        })

        it('Validar retorno 401 - /api/v1/saldo-resumo/account', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/saldo-resumo/account?checkingAccountId=19092&date=20230721&finalDate=20230721&page=1&perPage=1&typeDate=0',
                headers: {
                    //'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(401);
                cy.log(JSON.stringify(response.body));
            })
        })
    })

    describe('Módulo - Caixa Saldo Resumo - Buscar resumo financeiro para tela de extrato', () => {

        it('Validar retorno 200 - /api/v1/saldo-resumo/extrato', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/saldo-resumo/extrato?data=20230223&dataFinal=20230223&tipoData=0',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(200);
                cy.log(JSON.stringify(response.body));
                expect(response.body).to.have.property('codigo');
                expect(response.body).to.have.property('flagDeError');
                expect(response.body).to.have.property('mensagem');
            })
        })

        it('Validar retorno 400 - /api/v1/saldo-resumo/extrato', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/saldo-resumo/extrato',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(400);
                cy.log(JSON.stringify(response.body));
            })
        })

        it('Validar retorno 401 - /api/v1/saldo-resumo/extrato', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/saldo-resumo/extrato?data=20230223&dataFinal=20230223&tipoData=0',
                headers: {
                    //'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(401);
                cy.log(JSON.stringify(response.body));
            })
        })
    })

    describe('Módulo - Caixa Saldo Resumo - Buscar resumo financeiro', () => {

        it('Validar retorno 200 - /api/v1/saldo-resumo', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/saldo-resumo?data=20250101&dataFinal=20251223&tipoData=0',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(200);
                cy.log(JSON.stringify(response.body));
            })
        })

        it('Validar retorno 400 - /api/v1/saldo-resumo', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/saldo-resumo',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(400);
                cy.log(JSON.stringify(response.body));
            })
        })

        it('Validar retorno 401 - /api/v1/saldo-resumo', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/saldo-resumo?data=20250101&dataFinal=20251223&tipoData=0',
                headers: {
                    //'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(401);
                cy.log(JSON.stringify(response.body));
            })
        })
    })

    describe('Módulo - Caixa Saldo Resumo - Retorna duas listas, uma com as contas financeiras e outra com o tipo de transferência', () => {

        it('Validar retorno 200 - /api/v1/saldo-resumo/transfer', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/saldo-resumo/transfer',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(200);
                cy.log(JSON.stringify(response.body));
                expect(response.body).to.have.property('accounts').to.be.an('array')
                response.body.accounts.forEach((item) => {
                    expect(item).to.have.property('value');
                    expect(item).to.have.property('label');
                })
            })
        })

        it('Validar retorno 401 - /api/v1/saldo-resumo/transfer', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/saldo-resumo/transfer',
                headers: {
                    //'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(401);
                cy.log(JSON.stringify(response.body));
            })
        })
    })

    describe.only('Módulo - Caixa Saldo Resumo - Cria uma nova transferência financeira', () => {

        it('Validar retorno 201 - /api/v1/saldo-resumo/transfer', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/saldo-resumo/transfer',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(200);
            })
        })
    })
})
