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
                    Authorization: `Bearer ${token}`,
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

        it('Validar retorno 401 - /api/v1/current-accounts', () => {
            cy.request({
                method: 'GET',
                url: '/api/v1/current-accounts',
                headers: {
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(401);
            });
        });

        it('Validar retorno 400 - /api/v1/current-accounts', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/current-accounts',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(400);
            })
        })

        it('Validar retorno 401 - /api/v1/current-accounts', () => {
            cy.request({
                method: 'GET',
                url: '/api/v1/current-accounts',
                headers: {
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(401);
            })
        })
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
                    "tipoContaId": 3,
                    "nome": "Teste Brenno 7",
                    "modalidadeId": 2,
                    "contaRecebimentoId": 150,
                    "bancoId": null,
                    "agencia": null,
                    "numero": null,
                    "titulo": null,
                    "documento": null,
                    "diaVencimento": "30",
                    "melhorDiaCompra": "30",
                    "diasCreditoConta": "30",
                    "flagSplit": "0",
                    "flagTef": "0",
                    "contaLiquidacao": [],
                    "funcionario": null,
                    "taxasAdministrativas": [],
                    "taxasExcecoes": []
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(201);
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
    })

    describe('Módulo - Contas Correntes - Atualiza uma conta corrente', () => {

        it('Validar retorno 200 - /api/v1/current-accounts/{id}', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'PUT',
                url: '/api/v1/current-accounts/190',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: {
                    "unidadeId": 483,
                    "tipoContaId": 3,
                    "nome": "Teste edição",
                    "modalidadeId": 2,
                    "contaRecebimentoId": 150,
                    "bancoId": null,
                    "agencia": null,
                    "numero": null,
                    "titulo": null,
                    "documento": null,
                    "diaVencimento": 4,
                    "melhorDiaCompra": 6,
                    "diasCreditoConta": 5,
                    "flagSplit": "1",
                    "flagTef": "1",
                    "contaLiquidacao": [],
                    "funcionario": [],
                    "taxasAdministrativas": [],
                    "taxasExcecoes": []
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(200);
                cy.log(JSON.stringify(response.body))
            })
        })
    })

    describe('Módulo - Contas Correntes - Exclui uma conta corrente', () => {

        it('Validar retorno 200 - /api/v1/current-accounts/{id}', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'DELETE',
                url: '/api/v1/current-accounts/430',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(200);
                cy.log(JSON.stringify(response.body))

                expect(response.body).to.have.property('codigo')
                expect(response.body).to.have.property('flagDeError')
                expect(response.body).to.have.property('mensagem')
            })
        })
    });
})

describe('Módulo - Contas Correntes | Taxas Exceções', () => {
    beforeEach(() => {
        cy.login();
        cy.refreshToken();
    });

    describe('GET- /api/v1/current-account-fees-exception', () => {

        it('Validar retorno 200 - /api/v1/current-account-fees-exception', () => {
            const token = Cypress.env('access_token');

            const payload = {
                contaCorrenteId: 156,
                cartaoBandeiraId: "1",
                qtdParcelaMax: 1,
                valor: 2.5
            };

            cy.request({
                method: 'GET',
                url: '/api/v1/current-account-fees-exception',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: payload,
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(200);
                cy.log(JSON.stringify(response.body))
            });
        });
    });
    /*
    describe('PUT - /api/v1/current-account-fees-exception', () => {

        it('Validar retorno 200 - Atualizar taxa de exceção', () => {
            const token = Cypress.env('access_token');

            const payload = {
                contaCorrenteId: 426,
                cartaoBandeiraId: "3",
                qtdParcelaMax: 1,
                valor: 2.5
            };

            cy.request({
                method: 'PUT',
                url: '/api/v1/current-account-fees-exception',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: payload,
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(200);

                // LOG COMPLETO DO BODY
                cy.log(JSON.stringify(response.body));
            });
        });

        it('Validar retorno 400 - Atualizar taxa de exceção', () => {
            const token = Cypress.env('access_token');

            // Payload inválido para forçar erro
            const payload = {
                contaCorrenteId: 'abc',
                cartaoBandeiraId: null,
                qtdParcelaMax: 'x',
                valor: 'erro'
            };

            cy.request({
                method: 'PUT',
                url: '/api/v1/current-account-fees-exception',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: payload,
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(400);

                // LOG COMPLETO DO BODY
                cy.log(JSON.stringify(response.body));
            });
        });

        it('Validar retorno 401 - Atualizar taxa de exceção', () => {
            const payload = {
                contaCorrenteId: 156,
                cartaoBandeiraId: "1",
                qtdParcelaMax: 1,
                valor: 2.5
            };

            cy.request({
                method: 'PUT',
                url: '/api/v1/current-account-fees-exception',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: payload,
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(401);

                // LOG COMPLETO DO BODY
                cy.log(JSON.stringify(response.body));
            });
        });

    });
*/
});

describe('Módulo - Contas Correntes | Taxas Administrativas', () => {
    beforeEach(() => {
        cy.login();
        cy.refreshToken();
    });

describe('GET - /api/v1/current-account-fees-adm', () => {

        it('Validar retorno 200 - /api/v1/current-account-fees-adm', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/current-account-fees-adm',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                qs: {
                    page: 1,
                    limit: 10
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(200);

                // LOG COMPLETO DO BODY
                cy.log(JSON.stringify(response.body));
            });
        });
    }),
        it('Validar retorno 400 - /api/v1/current-account-fees-adm', () => {
            const token = Cypress.env('access_token');

            // Parâmetros inválidos para forçar erro
            cy.request({
                method: 'GET',
                url: '/api/v1/current-account-fees-adm',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                qs: {
                    page: 'abc',
                    limit: 'erro',
                    qtdParcelaMax: 'x'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(400);

                // LOG COMPLETO DO BODY
                cy.log(JSON.stringify(response.body));
            });
        });

        it('Validar retorno 401 - /api/v1/current-account-fees-adm', () => {
            cy.request({
                method: 'GET',
                url: '/api/v1/current-account-fees-adm',
                headers: {
                    'Content-Type': 'application/json'
                },
                qs: {
                    page: 1,
                    limit: 10
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(401);

                // LOG COMPLETO DO BODY
                cy.log(JSON.stringify(response.body));
            });
        });

    });
/*
    describe('PUT - /api/v1/current-account-fees-adm', () => {        

        it('Validar retorno 200 - Atualizar taxa administrativa', () => {
            const token = Cypress.env('access_token');

            const payload = {
                contaCorrenteId: 168,
                qtdParcelaMax: 6,
                valor: 3.1
            };

            cy.request({
                method: 'PUT',
                url: '/api/v1/current-account-fees-adm',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: payload,
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(200);
                cy.log(JSON.stringify(response.body))
            });
        });
    });
    */

describe('Módulo - Contas Correntes / Relacionados', () => {

    beforeEach(() => {
        cy.login();
        cy.refreshToken();
    });

    describe('Módulo - Contas Correntes / Relacionados - Retorna contas para recebimento', () => {

        it('Validar retorno 200 - /api/v1/current-accounts-related/accounts-for-receipt', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/current-accounts-related/accounts-for-receipt',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {

                cy.log(JSON.stringify(response.body));

                expect(response.status).to.eq(200);

                // Validação simples do body
                expect(response.body).to.be.an('array');

                if (response.body.length > 0) {
                    expect(response.body[0]).to.have.property('id');
                    expect(response.body[0]).to.have.property('nome');
                    expect(response.body[0]).to.have.property('unidadeId');
                    expect(response.body[0]).to.have.property('tipoContaId');
                }
            });
        });

        it('Validar retorno 400 - /api/v1/current-accounts-related/accounts-for-receipt', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/current-accounts-related/accounts-for-receipt',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                // Exemplo de parâmetros inválidos para forçar erro
                qs: {
                    id: 'abc'
                },
                failOnStatusCode: false
            }).then((response) => {

                cy.log(JSON.stringify(response.body));

                expect(response.status).to.eq(400);
            });
        });

        it('Validar retorno 401 - /api/v1/current-accounts-related/accounts-for-receipt', () => {
            cy.request({
                method: 'GET',
                url: '/api/v1/current-accounts-related/accounts-for-receipt',
                headers: {
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {

                cy.log(JSON.stringify(response.body));

                expect(response.status).to.eq(401);
            });
        });

        it('Validar retorno 200 com filtros - /api/v1/current-accounts-related/accounts-for-receipt', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/current-accounts-related/accounts-for-receipt',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                qs: {
                    nome: 'Conta',
                    tipoContaId: 2
                },
                failOnStatusCode: false
            }).then((response) => {

                cy.log(JSON.stringify(response.body));

                expect(response.status).to.eq(200);
                expect(response.body).to.be.an('array');
            });
        });

    });

});

describe('Módulo - Contas Correntes / Relacionados - Retorna uma lista de tipos de contas correntes', () => {

    beforeEach(() => {
        cy.login();
        cy.refreshToken();
    });

    describe('GET - /api/v1/current-accounts-related/types', () => {

        it('Validar retorno 200 - /api/v1/current-accounts-related/types', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/current-accounts-related/types',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {

                cy.log(JSON.stringify(response.body));

                expect(response.status).to.eq(200);

                expect(response.body).to.be.an('array');

                if (response.body.length > 0) {
                    expect(response.body[0]).to.have.property('id');
                    expect(response.body[0]).to.have.property('tipoContaCorrente');
                    expect(response.body[0]).to.have.property('flagAtivo');
                }
            });
        });

        it('Validar retorno 401 - /api/v1/current-accounts-related/types', () => {
            cy.request({
                method: 'GET',
                url: '/api/v1/current-accounts-related/types',
                headers: {
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {

                cy.log(JSON.stringify(response.body));

                expect(response.status).to.eq(401);
            });
        });

    });

});

describe('Módulo - Contas Correntes / Relacionados - Retorna uma lista de modalidades de contas correntes', () => {

    beforeEach(() => {
        cy.login();
        cy.refreshToken();
    });

    describe('GET - /api/v1/current-accounts-related/modalities', () => {

        it('Validar retorno 200 - /api/v1/current-accounts-related/modalities', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/current-accounts-related/modalities',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {

                // LOG COMPLETO DO BODY
                cy.log(JSON.stringify(response.body));

                expect(response.status).to.eq(200);
                expect(response.body).to.be.an('array');

                if (response.body.length > 0) {
                    expect(response.body[0]).to.have.property('id');
                    expect(response.body[0]).to.have.property('modalidade');
                    expect(response.body[0]).to.have.property('flagAtivo');
                }
            });
        });

        it('Validar retorno 401 - /api/v1/current-accounts-related/modalities', () => {
            cy.request({
                method: 'GET',
                url: '/api/v1/current-accounts-related/modalities',
                headers: {
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {

                // LOG COMPLETO DO BODY
                cy.log(JSON.stringify(response.body));

                expect(response.status).to.eq(401);
            });
        });

    });

});

describe('Módulo - Contas Correntes / Relacionados - Retorna uma lista de bandeiras de cartão', () => {

    beforeEach(() => {
        cy.login();
        cy.refreshToken();
    });

    describe('GET - /api/v1/current-accounts-related/card-flags', () => {

        it('Validar retorno 200 - /api/v1/current-accounts-related/card-flags', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/current-accounts-related/card-flags',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {

                // LOG COMPLETO DO BODY
                cy.log(JSON.stringify(response.body));

                expect(response.status).to.eq(200);
                expect(response.body).to.be.an('array');

                if (response.body.length > 0) {
                    expect(response.body[0]).to.have.property('id');
                    expect(response.body[0]).to.have.property('bandeira');
                    expect(response.body[0]).to.have.property('flagAtivo');
                }
            });
        });

        it('Validar retorno 401 - /api/v1/current-accounts-related/card-flags', () => {
            cy.request({
                method: 'GET',
                url: '/api/v1/current-accounts-related/card-flags',
                headers: {
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {

                // LOG COMPLETO DO BODY
                cy.log(JSON.stringify(response.body));

                expect(response.status).to.eq(401);
            });
        });

    });

});

describe('Módulo - Contas Correntes / Relacionados - Lista formas de liquidação', () => {

    beforeEach(() => {
        cy.login();
        cy.refreshToken();
    });

    describe('GET - /api/v1/current-accounts-related/forms-of-settlement', () => {

        it('Validar retorno 200 - /api/v1/current-accounts-related/forms-of-settlement', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/current-accounts-related/forms-of-settlement',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {

                // LOG COMPLETO DO BODY
                cy.log(JSON.stringify(response.body));

                expect(response.status).to.eq(200);
                expect(response.body).to.be.an('array');

                if (response.body.length > 0) {
                    expect(response.body[0]).to.have.property('id');
                    expect(response.body[0]).to.have.property('formaLiquidacao');
                    expect(response.body[0]).to.have.property('tipoOperacaoId');
                    expect(response.body[0]).to.have.property('tipoOperacao');
                }
            });
        });

        it('Validar retorno 200 com filtro tipoOperacaoId - /api/v1/current-accounts-related/forms-of-settlement', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/current-accounts-related/forms-of-settlement',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                qs: {
                    tipoOperacaoId: 1
                },
                failOnStatusCode: false
            }).then((response) => {

                // LOG COMPLETO DO BODY
                cy.log(JSON.stringify(response.body));

                expect(response.status).to.eq(200);
                expect(response.body).to.be.an('array');
            });
        });

        it('Validar retorno 401 - /api/v1/current-accounts-related/forms-of-settlement', () => {
            cy.request({
                method: 'GET',
                url: '/api/v1/current-accounts-related/forms-of-settlement',
                headers: {
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {

                // LOG COMPLETO DO BODY
                cy.log(JSON.stringify(response.body));

                expect(response.status).to.eq(401);
            });
        });

    });

});

describe('Módulo - Contas Correntes / Relacionados - Listar contas de liquidação', () => {

    beforeEach(() => {
        cy.login();
        cy.refreshToken();
    });

    describe('GET - /api/v1/current-accounts-related/accounts-of-settlement', () => {

        it('Validar retorno 200 - /api/v1/current-accounts-related/accounts-of-settlement', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/current-accounts-related/accounts-of-settlement',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {

                // LOG COMPLETO DO BODY
                cy.log(JSON.stringify(response.body));

                expect(response.status).to.eq(200);
                expect(response.body).to.be.an('array');

                if (response.body.length > 0) {
                    expect(response.body[0]).to.have.property('id');
                    expect(response.body[0]).to.have.property('contaCorrente');
                    expect(response.body[0]).to.have.property('contaCorrenteId');
                    expect(response.body[0]).to.have.property('formaLiquidacaoId');
                    expect(response.body[0]).to.have.property('formaLiquidacao');
                    expect(response.body[0]).to.have.property('tipoOperacaoId');
                    expect(response.body[0]).to.have.property('tipoOperacao');
                    expect(response.body[0]).to.have.property('idUnidade');
                    expect(response.body[0]).to.have.property('flgTef');
                    expect(response.body[0]).to.have.property('tipoContaCorrente');
                    expect(response.body[0]).to.have.property('diasCreditoConta');
                }
            });
        });

        it('Validar retorno 200 com filtros - /api/v1/current-accounts-related/accounts-of-settlement', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/current-accounts-related/accounts-of-settlement',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                qs: {
                    contaCorrenteNome: 'Conta',
                    contaCorrenteId: 101,
                    formaLiquidacaoId: '5',
                    formaLiquidacao: 'Transferência',
                    tipoOperacaoId: 2,
                    tipoOperacao: 'Pagamento',
                    flgTef: '1'
                },
                failOnStatusCode: false
            }).then((response) => {

                // LOG COMPLETO DO BODY
                cy.log(JSON.stringify(response.body));

                expect(response.status).to.eq(200);
                expect(response.body).to.be.an('array');
            });
        });

        it('Validar retorno 401 - /api/v1/current-accounts-related/accounts-of-settlement', () => {
            cy.request({
                method: 'GET',
                url: '/api/v1/current-accounts-related/accounts-of-settlement',
                headers: {
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {

                // LOG COMPLETO DO BODY
                cy.log(JSON.stringify(response.body));

                expect(response.status).to.eq(401);
            });
        });

    });

});

describe('Módulo - Contas Correntes / Relacionados - Listar contas de liquidação com filtro de unidade e id forma liquidação', () => {

    beforeEach(() => {
        cy.login();
        cy.refreshToken();
    });

    describe('GET - /api/v1/current-accounts-related/accounts-of-settlement-new-checkin', () => {

        it('Validar retorno 200 - /api/v1/current-accounts-related/accounts-of-settlement-new-checkin', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/current-accounts-related/accounts-of-settlement-new-checkin',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {

                // LOG COMPLETO DO BODY
                cy.log(JSON.stringify(response.body));

                expect(response.status).to.eq(200);
                expect(response.body).to.be.an('array');

                if (response.body.length > 0) {
                    expect(response.body[0]).to.have.property('id');
                    expect(response.body[0]).to.have.property('contaCorrente');
                    expect(response.body[0]).to.have.property('contaCorrenteId');
                    expect(response.body[0]).to.have.property('formaLiquidacaoId');
                    expect(response.body[0]).to.have.property('formaLiquidacao');
                    expect(response.body[0]).to.have.property('tipoOperacaoId');
                    expect(response.body[0]).to.have.property('tipoOperacao');
                    expect(response.body[0]).to.have.property('idUnidade');
                    expect(response.body[0]).to.have.property('flgTef');
                    expect(response.body[0]).to.have.property('tipoContaCorrente');
                    expect(response.body[0]).to.have.property('diasCreditoConta');
                }
            });
        });

        it('Validar retorno 200 com filtros - /api/v1/current-accounts-related/accounts-of-settlement-new-checkin', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/current-accounts-related/accounts-of-settlement-new-checkin',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                qs: {
                    tipoOperacaoId: 2,
                    contaCorrenteId: 101,
                    unidadeId: '10',
                    formaLiquidacaoId: '5',
                    flgTef: '1',
                    tipoContaCorrente: 3
                },
                failOnStatusCode: false
            }).then((response) => {

                // LOG COMPLETO DO BODY
                cy.log(JSON.stringify(response.body));

                expect(response.status).to.eq(200);
                expect(response.body).to.be.an('array');
            });
        });

        it('Validar retorno 401 - /api/v1/current-accounts-related/accounts-of-settlement-new-checkin', () => {
            cy.request({
                method: 'GET',
                url: '/api/v1/current-accounts-related/accounts-of-settlement-new-checkin',
                headers: {
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {

                // LOG COMPLETO DO BODY
                cy.log(JSON.stringify(response.body));

                expect(response.status).to.eq(401);
            });
        });

    });

});


describe('Módulo - Contas Correntes / Relacionados - Formas de Liquidação Novo Check-in', () => {

    beforeEach(() => {
        cy.login();
        cy.refreshToken();
    });

    describe('GET - /api/v1/current-accounts-related/forms-of-settlement-new-checkin', () => {

        it('Validar retorno 200 - /api/v1/current-accounts-related/forms-of-settlement-new-checkin', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/current-accounts-related/forms-of-settlement-new-checkin',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {

                // LOG COMPLETO DO BODY
                cy.log(JSON.stringify(response.body));

                expect(response.status).to.eq(200);
                expect(response.body).to.be.an('array');

                if (response.body.length > 0) {
                    expect(response.body[0]).to.have.property('id');
                    expect(response.body[0]).to.have.property('formaLiquidacao');
                    expect(response.body[0]).to.have.property('tipoOperacaoId');
                    expect(response.body[0]).to.have.property('tipoOperacao');
                    expect(response.body[0]).to.have.property('fkUnidade');
                    expect(response.body[0]).to.have.property('idContaCorrente');
                    expect(response.body[0]).to.have.property('contaCorrente');
                }
            });
        });

        it('Validar retorno 200 com filtro - /api/v1/current-accounts-related/forms-of-settlement-new-checkin', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/current-accounts-related/forms-of-settlement-new-checkin',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                qs: {
                    tipoOperacaoId: 2
                },
                failOnStatusCode: false
            }).then((response) => {

                // LOG COMPLETO DO BODY
                cy.log(JSON.stringify(response.body));

                expect(response.status).to.eq(200);
                expect(response.body).to.be.an('array');
            });
        });

        it('Validar retorno 401 - /api/v1/current-accounts-related/forms-of-settlement-new-checkin', () => {
            cy.request({
                method: 'GET',
                url: '/api/v1/current-accounts-related/forms-of-settlement-new-checkin',
                headers: {
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {

                // LOG COMPLETO DO BODY
                cy.log(JSON.stringify(response.body));

                expect(response.status).to.eq(401);
            });
        });

    });

});

/*
describe('Módulo - Contas Correntes / Relacionados - Vincular uma forma de recebimento a uma conta corrente', () => {

    beforeEach(() => {
        cy.login();
        cy.refreshToken();
    });

    describe('POST - /api/v1/current-accounts-related/link-account-forms-of-settlement', () => {

        it('Validar retorno 201 - Vincular conta corrente à forma de liquidação', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/current-accounts-related/link-account-forms-of-settlement',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: {
                    contaCorrenteId: 429,
                    formaLiquidacaoId: 3
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(201);

                // LOG COMPLETO DO BODY (mesmo quando vazio)
                cy.log(JSON.stringify(response.body));
            });
        });

        it('Validar retorno 400 - Vincular conta corrente à forma de liquidação', () => {
            const token = Cypress.env('access_token');

            // Payload inválido para forçar erro
            cy.request({
                method: 'POST',
                url: '/api/v1/current-accounts-related/link-account-forms-of-settlement',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: {
                    contaCorrenteId: null,
                    formaLiquidacaoId: null
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(400);

                // LOG COMPLETO DO BODY
                cy.log(JSON.stringify(response.body));
            });
        });

        it('Validar retorno 401 - Vincular conta corrente à forma de liquidação', () => {
            cy.request({
                method: 'POST',
                url: '/api/v1/current-accounts-related/link-account-forms-of-settlement',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: {
                    contaCorrenteId: 101,
                    formaLiquidacaoId: 5
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(401);

                // LOG COMPLETO DO BODY
                cy.log(JSON.stringify(response.body));
            });
        });

    });

});
*/

/*
describe('Módulo - Contas Correntes / Relacionados - Excluir / desvincular formas de recebimento de uma conta corrente ', () => {

    beforeEach(() => {
        cy.login();
        cy.refreshToken();
    });

    describe('DELETE - /api/v1/current-accounts-related/link-account-forms-of-settlement', () => {

        it('Validar retorno 200 - Desvincular conta corrente da forma de liquidação', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'DELETE',
                url: '/api/v1/current-accounts-related/link-account-forms-of-settlement',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                qs: {
                    accountId: 428
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(200);

                // LOG COMPLETO DO BODY (mesmo quando vazio)
                cy.log(JSON.stringify(response.body));
            });
        });

        it('Validar retorno 400 - Desvincular conta corrente da forma de liquidação', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'DELETE',
                url: '/api/v1/current-accounts-related/link-account-forms-of-settlement',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                qs: {
                    accountId: 'abc'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(400);

                // LOG COMPLETO DO BODY
                cy.log(JSON.stringify(response.body));
            });
        });

        it('Validar retorno 401 - Desvincular conta corrente da forma de liquidação', () => {
            cy.request({
                method: 'DELETE',
                url: '/api/v1/current-accounts-related/link-account-forms-of-settlement',
                headers: {
                    'Content-Type': 'application/json'
                },
                qs: {
                    accountId: 101
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(401);

                // LOG COMPLETO DO BODY
                cy.log(JSON.stringify(response.body));
            });
        });

    });

});
*/

describe('Módulo - Contas Correntes | Funcionários Confirmadores', () => {

    beforeEach(() => {
        cy.login();
        cy.refreshToken();
    });

    describe('GET - /api/v1/current-account-employees', () => {

        it('Validar retorno 200 - Listar funcionários da conta corrente', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/current-account-employees',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                qs: {
                    contaCorrenteId: 1
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(200);

                // LOG COMPLETO DO BODY
                cy.log(JSON.stringify(response.body));
            });
        });

        it('Validar retorno 400 - GET funcionários com parâmetro inválido', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/current-account-employees',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                qs: {
                    contaCorrenteId: 'abc'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(400);

                // LOG COMPLETO DO BODY
                cy.log(JSON.stringify(response.body));
            });
        });

        it('Validar retorno 401 - GET funcionários sem token', () => {
            cy.request({
                method: 'GET',
                url: '/api/v1/current-account-employees',
                headers: {
                    'Content-Type': 'application/json'
                },
                qs: {
                    contaCorrenteId: 1
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(401);

                // LOG COMPLETO DO BODY
                cy.log(JSON.stringify(response.body));
            });
        });

    });

});
describe('PUT - /api/v1/current-account-employees', () => {

    it('Validar retorno 200 - /api/v1/current-account-employees', () => {
        const token = Cypress.env('access_token');

        cy.request({
            method: 'PUT',
            url: '/api/v1/current-account-employees',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: {
                contaCorrenteId: 429,
                funcionarioIds: [955]
            },
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(200);

            // LOG COMPLETO DO BODY
            cy.log(JSON.stringify(response.body));
        });
    });

    it('Validar retorno 400 - /api/v1/current-account-employees', () => {
        const token = Cypress.env('access_token');

        cy.request({
            method: 'PUT',
            url: '/api/v1/current-account-employees',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: {},
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(400);

            // LOG COMPLETO DO BODY
            cy.log(JSON.stringify(response.body));
        });
    });

    it('Validar retorno 401 - /api/v1/current-account-employees', () => {
        cy.request({
            method: 'PUT',
            url: '/api/v1/current-account-employees',
            headers: {
                'Content-Type': 'application/json'
            },
            body: {
                contaCorrenteId: 1,
                funcionarioIds: [305]
            },
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(401);

            // LOG COMPLETO DO BODY
            cy.log(JSON.stringify(response.body));
        });
    });

});
