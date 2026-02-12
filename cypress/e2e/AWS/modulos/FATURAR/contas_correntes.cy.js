/// <reference types="cypress"/>

describe('Módulo - Contas Correntes', () => {
    beforeEach(() => {
        cy.login();
        cy.refreshToken();
    })

    describe('Módulo - Contas Correntes - Retorna uma lista de contas correntes', () => {

        it('Validar retorno 200 - /api/v1/current-accounts? ', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/current-accounts?page=1&limit=1',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(200);
                expect(response.body).to.have.property('items');
                expect(response.body.items).to.be.an('array').and.to.have.length.greaterThan(0);

                const item = response.body.items[0];

                expect(item).to.have.property('id');
                cy.log(item.id)
                cy.log(JSON.stringify(response.body))
                expect(item).to.have.property('nome');
                cy.log(item.nome)
                expect(item).to.have.property('tipoContaId');
                expect(item).to.have.property('tipoConta');
                expect(item).to.have.property('modalidadeId');
                expect(item).to.have.property('modalidade');
                expect(item).to.have.property('bandeiraId');
                expect(item).to.have.property('bandeira');
                expect(item).to.have.property('unidadeId');
                expect(item).to.have.property('unidade');
                expect(item).to.have.property('agencia');
                expect(item).to.have.property('numero');
                expect(item).to.have.property('titulo');
                expect(item).to.have.property('documento');
                expect(item).to.have.property('diaVencimento');
                expect(item).to.have.property('melhorDiaCompra');
                expect(item).to.have.property('flagTef');
                expect(item).to.have.property('flagSplit');
                expect(item).to.have.property('diasCreditoConta');
                expect(item).to.have.property('descontoPercentual');
                expect(item).to.have.property('bancoId');
                expect(item).to.have.property('banco');
                expect(item).to.have.property('contaRecebimentoId');
                expect(item).to.have.property('contaRecebimento');

                expect(item.contaLiquidacao).to.be.an('array');
                if (item.contaLiquidacao.length > 0) {
                    const liquidacao = item.contaLiquidacao[0];

                    expect(liquidacao).to.have.all.keys(
                        'contaCorrenteId',
                        'formaLiquidacaoId',
                        'formaLiquidacao',
                        'tipoOperacaoId',
                        'tipoOperacao'
                    );
                    cy.log(liquidacao.formaLiquidacaoId)
                }

                expect(response.body).to.have.property('meta');
                expect(response.body.meta).to.have.all.keys(
                    'totalItems',
                    'currentPage',
                    'itemCount',
                    'itemsPerPage',
                    'totalPages'
                );
            });
        });

        it('Validar retorno 401 - /api/v1/current-accounts? ', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/current-accounts?page=1&limit=1',
                headers: {
                    //'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(401);
                cy.log(JSON.stringify(response.body))
            });
        });
    })

    describe('Módulo - Contas Correntes - Cria uma nova conta corrente', () => {

        it('Validar retorno 201 - /api/v1/current-accounts', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/current-accounts',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: {
                    "unidadeId": 483,
                    "tipoContaId": 1,
                    "nome": "Caixa Dinheiro1",
                    "modalidadeId": null,
                    "contaRecebimentoId": null,
                    "bancoId": null,
                    "agencia": null,
                    "numero": null,
                    "titulo": null,
                    "documento": null,
                    "diaVencimento": null,
                    "melhorDiaCompra": null,
                    "diasCreditoConta": null,
                    "flagSplit": null,
                    "flagTef": null,
                    "contaLiquidacao": [
                        8,
                        7,
                        1,
                        3,
                        4,
                        9
                    ],
                    "funcionario": [],
                    "taxasAdministrativas": [],
                    "taxasExcecoes": []
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(400);
                cy.log(JSON.stringify(response.body))

                expect(response.body).to.have.property('id')
                expect(response.body).to.have.property('nome')
                expect(response.body).to.have.property('tipoContaId')
                expect(response.body).to.have.property('tipoConta')
                expect(response.body).to.have.property('modalidadeId')
                expect(response.body).to.have.property('modalidade')
                expect(response.body).to.have.property('bandeiraId')
                expect(response.body).to.have.property('bandeira')
                expect(response.body).to.have.property('unidadeId')
                expect(response.body).to.have.property('unidade')
                expect(response.body).to.have.property('agencia')
                expect(response.body).to.have.property('numero')
                expect(response.body).to.have.property('titulo')
                expect(response.body).to.have.property('documento')
                expect(response.body).to.have.property('diaVencimento')
                expect(response.body).to.have.property('melhorDiaCompra')
                expect(response.body).to.have.property('flagTef')
                expect(response.body).to.have.property('flagSplit')
                expect(response.body).to.have.property('diasCreditoConta')
                expect(response.body).to.have.property('descontoPercentual')
                expect(response.body).to.have.property('bancoId')
                expect(response.body).to.have.property('banco')
                expect(response.body).to.have.property('contaRecebimentoId')
                expect(response.body).to.have.property('contaRecebimento')
                expect(response.body).to.have.property('contaLiquidacao')
            })
        })

        it('Validar retorno 400 - /api/v1/current-accounts', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/current-accounts',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(400);
                cy.log(JSON.stringify(response.body))
            })
        })

        it('Validar retorno 401 - /api/v1/current-accounts', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/current-accounts',
                headers: {
                    //'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: {
                    "unidadeId": 483,
                    "tipoContaId": 1,
                    "nome": "Caixa Dinheiro1",
                    "modalidadeId": null,
                    "contaRecebimentoId": null,
                    "bancoId": null,
                    "agencia": null,
                    "numero": null,
                    "titulo": null,
                    "documento": null,
                    "diaVencimento": null,
                    "melhorDiaCompra": null,
                    "diasCreditoConta": null,
                    "flagSplit": null,
                    "flagTef": null,
                    "contaLiquidacao": [
                        8,
                        7,
                        1,
                        3,
                        4,
                        9
                    ],
                    "funcionario": [],
                    "taxasAdministrativas": [],
                    "taxasExcecoes": []
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(401);
                cy.log(JSON.stringify(response.body));
            })
        })
    })

    describe('Módulo - Contas Correntes - Retorna uma conta por id', () => {

        it('Validar retorno 200 - /api/v1/current-accounts/{id}', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/current-accounts/138',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(200);
                cy.log(JSON.stringify(response.body));

                expect(response.body).to.have.property('id');
                expect(response.body).to.have.property('nome');
                expect(response.body).to.have.property('tipoContaId');
                expect(response.body).to.have.property('tipoConta');
                expect(response.body).to.have.property('modalidadeId');
                expect(response.body).to.have.property('modalidade');
                expect(response.body).to.have.property('bandeiraId');
                expect(response.body).to.have.property('bandeira');
                expect(response.body).to.have.property('unidadeId');
                expect(response.body).to.have.property('unidade');
                expect(response.body).to.have.property('agencia');
                expect(response.body).to.have.property('numero');
                expect(response.body).to.have.property('titulo');
                expect(response.body).to.have.property('documento');
                expect(response.body).to.have.property('diaVencimento');
                expect(response.body).to.have.property('melhorDiaCompra');
                expect(response.body).to.have.property('flagTef');
                expect(response.body).to.have.property('flagSplit');
                expect(response.body).to.have.property('diasCreditoConta');
                expect(response.body).to.have.property('descontoPercentual');
                expect(response.body).to.have.property('bancoId');
                expect(response.body).to.have.property('banco');
                expect(response.body).to.have.property('contaRecebimentoId');
                expect(response.body).to.have.property('contaRecebimento');

                expect(response.body).to.have.property('contaLiquidacao').to.be.an('array');
                response.body.contaLiquidacao.forEach((itens) => {
                    expect(itens).to.have.property('contaCorrenteId');
                    expect(itens).to.have.property('formaLiquidacaoId');
                    expect(itens).to.have.property('formaLiquidacao');
                    expect(itens).to.have.property('tipoOperacaoId');
                    expect(itens).to.have.property('tipoOperacao');
                })

                expect(response.body).to.have.property('funcionario').to.be.an('array');
                expect(response.body).to.have.property('taxasAdministrativas').to.be.an('array');
                expect(response.body).to.have.property('taxasExcecoes').to.be.an('array');
            })
        })

        it('Validar retorno 400 - /api/v1/current-accounts/{id}', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/current-accounts/{id}}',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(400);
                cy.log(JSON.stringify(response.body));
            })
        })

        it('Validar retorno 401 - /api/v1/current-accounts/{id}', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/current-accounts/138',
                headers: {
                    //'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(401);
                cy.log(JSON.stringify(response.body));
            })
        })
    })

    describe('Módulo - Contas Correntes - Atualiza uma conta corrente', () => {

        it('Validar retorno 200 - /api/v1/current-accounts/{id}', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'PUT',
                url: '/api/v1/current-accounts/138',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: {
                    "unidadeId": 483,
                    "tipoContaId": 3,
                    "nome": "PagTodos Crédito",
                    "modalidadeId": 1,
                    "contaRecebimentoId": 1020,
                    "bancoId": null,
                    "agencia": null,
                    "numero": null,
                    "titulo": null,
                    "documento": null,
                    "diaVencimento": null,
                    "melhorDiaCompra": null,
                    "diasCreditoConta": 30,
                    "flagSplit": "1",
                    "flagTef": "1",
                    "contaLiquidacao": [
                        8
                    ],
                    "funcionario": [],
                    "taxasAdministrativas": [],
                    "taxasExcecoes": []
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(200);
                cy.log(JSON.stringify(response.body));
        
                expect(response.body).to.have.property('id');
                expect(response.body).to.have.property('nome');
                expect(response.body).to.have.property('tipoContaId');
                expect(response.body).to.have.property('tipoConta');
                expect(response.body).to.have.property('modalidadeId');
                expect(response.body).to.have.property('modalidade');
                expect(response.body).to.have.property('bandeiraId');
                expect(response.body).to.have.property('bandeira');
                expect(response.body).to.have.property('unidadeId');
                expect(response.body).to.have.property('unidade');
                expect(response.body).to.have.property('agencia');
                expect(response.body).to.have.property('numero');
                expect(response.body).to.have.property('titulo');
                expect(response.body).to.have.property('documento');
                expect(response.body).to.have.property('diaVencimento');
                expect(response.body).to.have.property('melhorDiaCompra');
                expect(response.body).to.have.property('flagTef');
                expect(response.body).to.have.property('flagSplit');
                expect(response.body).to.have.property('diasCreditoConta');
                expect(response.body).to.have.property('descontoPercentual');
                expect(response.body).to.have.property('bancoId');
                expect(response.body).to.have.property('banco');
                expect(response.body).to.have.property('contaRecebimentoId');
                expect(response.body).to.have.property('contaRecebimento');

                expect(response.body).to.have.property('contaLiquidacao').to.be.an('array');
                response.body.contaLiquidacao.forEach((itens) => {
                    expect(itens).to.have.property('contaCorrenteId');
                    expect(itens).to.have.property('formaLiquidacaoId');
                    expect(itens).to.have.property('formaLiquidacao');
                    expect(itens).to.have.property('tipoOperacaoId');
                    expect(itens).to.have.property('tipoOperacao');
                })
            })
        })

        it('Validar retorno 400 - /api/v1/current-accounts/{id}', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'PUT',
                url: '/api/v1/current-accounts/138',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(400);
                cy.log(JSON.stringify(response.body));
            })
        })

        it('Validar retorno 401 - /api/v1/current-accounts/{id}', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'PUT',
                url: '/api/v1/current-accounts/138',
                headers: {
                    //'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: {
                    "unidadeId": 483,
                    "tipoContaId": 3,
                    "nome": "PagTodos Crédito",
                    "modalidadeId": 1,
                    "contaRecebimentoId": 1020,
                    "bancoId": null,
                    "agencia": null,
                    "numero": null,
                    "titulo": null,
                    "documento": null,
                    "diaVencimento": null,
                    "melhorDiaCompra": null,
                    "diasCreditoConta": 30,
                    "flagSplit": "1",
                    "flagTef": "1",
                    "contaLiquidacao": [
                        8
                    ],
                    "funcionario": [],
                    "taxasAdministrativas": [],
                    "taxasExcecoes": []
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(401);
                cy.log(JSON.stringify(response.body));
            })
        })
    })

    describe('Módulo - Contas Correntes - Exclui uma conta corrente', () => {

        it('Validar retorno 200 - /api/v1/current-accounts/{id}', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'DELETE',
                url: '/api/v1/current-accounts/6478',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(400);
                cy.log(JSON.stringify(response.body))

                expect(response.body).to.have.property('codigo')
                expect(response.body).to.have.property('flagDeError')
                expect(response.body).to.have.property('mensagem')
            })
        })

        it('Validar retorno 400 - /api/v1/current-accounts/{id}', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'DELETE',
                url: '/api/v1/current-accounts/{id}}',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(400);
                cy.log(JSON.stringify(response.body))
            })
        })

        it('Validar retorno 401 - /api/v1/current-accounts/{id}', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'DELETE',
                url: '/api/v1/current-accounts/6478',
                headers: {
                    //'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(401);
                cy.log(JSON.stringify(response.body))
            })
        })
    })
})
