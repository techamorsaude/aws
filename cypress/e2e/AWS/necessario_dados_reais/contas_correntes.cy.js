/// <reference types="cypress"/>

describe('Módulo - Contas Correntes', () => {
    beforeEach(() => {
        cy.login();
        cy.refreshToken();
    })

    describe('Módulo - Contas Correntes - Retorna uma lista de contas correntes', () => {

        it('Validar retorno 200 - /api/v1/current-accounts', () => {
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
                expect(response.status).to.eq(200);
            })
        })

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
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/current-accounts',
                headers: {
                    //'Authorization': `Bearer ${token}`,
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
                    "nome": "Nome da conta",
                    "tipoContaId": 1,
                    "modalidadeId": 1,
                    "bandeiraId": 1,
                    "unidadeId": 1,
                    "contaRecebimentoId": 0,
                    "agencia": "Nome da agencia",
                    "numero": "0001",
                    "titulo": "Nome do titular",
                    "documento": "12312312300",
                    "diaVencimento": 1,
                    "melhorDiaCompra": 1,
                    "flagTef": "1",
                    "flagSplit": "1",
                    "diasCreditoConta": 2,
                    "descontoPercentual": 5,
                    "contaLiquidacao": [
                        1,
                        2,
                        3
                    ],
                    "bancoId": 0,
                    "funcionario": [
                        1,
                        2,
                        3
                    ],
                    "taxasAdministrativas": [
                        {
                            "qtdParcelaMax": 0,
                            "valor": 0
                        }
                    ],
                    "taxasExcecoes": [
                        {
                            "cartaoBandeiraId": 0,
                            "qtdParcelaMax": 0,
                            "valor": 0
                        }
                    ]
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(201);
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
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(401);
            })
        })
    })

    describe('Módulo - Contas Correntes - Retorna uma conta por id', () => {

        it('Validar retorno 200 - /api/v1/current-accounts/{id}', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/current-accounts/{id}',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(200);
            })
        })

        it('Validar retorno 400 - /api/v1/current-accounts/{id}', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/current-accounts/{id}',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(400);
            })
        })

        it('Validar retorno 401 - /api/v1/current-accounts/{id}', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/current-accounts/{id}',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(401);
            })
        })
    })

    describe('Módulo - Contas Correntes - Atualiza uma conta corrente', () => {

        it('Validar retorno 200 - /api/v1/current-accounts/{id}', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'PUT',
                url: '/api/v1/current-accounts/{id}',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: {
                    "nome": "Nome da conta",
                    "tipoContaId": 1,
                    "modalidadeId": 1,
                    "bandeiraId": 1,
                    "unidadeId": 1,
                    "contaRecebimentoId": 0,
                    "agencia": "Nome da agencia",
                    "numero": "0001",
                    "titulo": "Nome do titular",
                    "documento": "12312312300",
                    "diaVencimento": 1,
                    "melhorDiaCompra": 1,
                    "flagTef": "1",
                    "flagSplit": "1",
                    "diasCreditoConta": 2,
                    "descontoPercentual": 5,
                    "contaLiquidacao": [
                        1,
                        2,
                        3
                    ],
                    "bancoId": 0,
                    "funcionario": [
                        1,
                        2,
                        3
                    ],
                    "taxasAdministrativas": [
                        {
                            "qtdParcelaMax": 0,
                            "valor": 0
                        }
                    ],
                    "taxasExcecoes": [
                        {
                            "cartaoBandeiraId": 0,
                            "qtdParcelaMax": 0,
                            "valor": 0
                        }
                    ]
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(200);
            })
        })

        it('Validar retorno 400 - /api/v1/current-accounts/{id}', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'PUT',
                url: '/api/v1/current-accounts/{id}',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(400);
            })
        })

        it('Validar retorno 401 - /api/v1/current-accounts/{id}', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'PUT',
                url: '/api/v1/current-accounts/{id}',
                headers: {
                   //'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(401);
            })
        })
    })

    describe('Módulo - Contas Correntes - Exclui uma conta corrente', () => {
        
        it('Validar retorno 200 - /api/v1/current-accounts/{id}', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'DELETE',
                url: '/api/v1/current-accounts/{id}',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(200);
            })
        })

        it('Validar retorno 400 - /api/v1/current-accounts/{id}', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'DELETE',
                url: '/api/v1/current-accounts/{id}',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(400);
            })
        })

        it('Validar retorno 401 - /api/v1/current-accounts/{id}', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'DELETE',
                url: '/api/v1/current-accounts/{id}',
                headers: {
                    //'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(401);
            })
        })
    });
})