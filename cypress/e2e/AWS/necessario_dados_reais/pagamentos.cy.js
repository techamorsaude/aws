/// <reference types="cypress"/>

describe('Módulo - Pagamentos', () => {
    beforeEach(() => {
        cy.login();
        cy.refreshToken();
    })

    describe('Módulo - Pagamentos - Pagamento de um agendamento', () => {

        it('Validar retorno 200 - /api/v1/payments', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/payments',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: {
                    "unidadeId": 483,
                    "agendamentoId": 23658228,
                    "formaLiquidacaoId": 1,
                    "ipClient": "10.244.5.128",
                    "valor": 120,
                    "dataPagamento": "20260107"
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(201);
                cy.log(JSON.stringify(response.body));
            })
        })

        it('Validar retorno 200 - /api/v1/payments', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/payments',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: {
                    "unidadeId": 483,
                    "agendamentoId": 23658228,
                    "formaLiquidacaoId": 1,
                    "ipClient": "10.244.5.128",
                    "valor": 120,
                    "dataPagamento": "20260107"
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(201);
                cy.log(JSON.stringify(response.body));
            })
        })

        it('Validar retorno 200 - /api/v1/payments', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/payments',
                headers: {
                    //'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: {
                    "unidadeId": 483,
                    "agendamentoId": 23658228,
                    "formaLiquidacaoId": 1,
                    "ipClient": "10.244.5.128",
                    "valor": 120,
                    "dataPagamento": "20260107"
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(401);
                cy.log(JSON.stringify(response.body));
            })
        })
    })

    describe('Módulo - Pagamentos - ', () => {

        it('Validar retorno 200 - ', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: '',
                url: '',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            })
        }).then((response) => {
            expect(response.status).to.eq(200);
            cy.log(JSON.stringify(response.body));
        })
    })

    describe('Módulo - Pagamentos - ', () => {

        it('Validar retorno 200 - ', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: '',
                url: '',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            })
        }).then((response) => {
            expect(response.status).to.eq(200);
            cy.log(JSON.stringify(response.body));
        })
    })

    describe('Módulo - Pagamentos - ', () => {

        it('Validar retorno 200 - ', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: '',
                url: '',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            })
        }).then((response) => {
            expect(response.status).to.eq(200);
            cy.log(JSON.stringify(response.body));
        })
    })

    describe('Módulo - Pagamentos - ', () => {

        it('Validar retorno 200 - ', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: '',
                url: '',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            })
        }).then((response) => {
            expect(response.status).to.eq(200);
            cy.log(JSON.stringify(response.body));
        })
    })

    describe('Módulo - Pagamentos - ', () => {

        it('Validar retorno 200 - ', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: '',
                url: '',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            })
        }).then((response) => {
            expect(response.status).to.eq(200);
            cy.log(JSON.stringify(response.body));
        })
    })

    describe('Módulo - Pagamentos - ', () => {

        it('Validar retorno 200 - ', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: '',
                url: '',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            })
        }).then((response) => {
            expect(response.status).to.eq(200);
            cy.log(JSON.stringify(response.body));
        })
    })

    describe('Módulo - Pagamentos - ', () => {

        it('Validar retorno 200 - ', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: '',
                url: '',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            })
        }).then((response) => {
            expect(response.status).to.eq(200);
            cy.log(JSON.stringify(response.body));
        })
    })

    describe('Módulo - Pagamentos - ', () => {

        it('Validar retorno 200 - ', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: '',
                url: '',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            })
        }).then((response) => {
            expect(response.status).to.eq(200);
            cy.log(JSON.stringify(response.body));
        })
    })

    describe('Módulo - Pagamentos - ', () => {

        it('Validar retorno 200 - ', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: '',
                url: '',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            })
        }).then((response) => {
            expect(response.status).to.eq(200);
            cy.log(JSON.stringify(response.body));
        })
    })

    describe('Módulo - Pagamentos - ', () => {

        it('Validar retorno 200 - ', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: '',
                url: '',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            })
        }).then((response) => {
            expect(response.status).to.eq(200);
            cy.log(JSON.stringify(response.body));
        })
    })

    describe('Módulo - Pagamentos - ', () => {

        it('Validar retorno 200 - ', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: '',
                url: '',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            })
        }).then((response) => {
            expect(response.status).to.eq(200);
            cy.log(JSON.stringify(response.body));
        })
    })

    describe('Módulo - Pagamentos - ', () => {

        it('Validar retorno 200 - ', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: '',
                url: '',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            })
        }).then((response) => {
            expect(response.status).to.eq(200);
            cy.log(JSON.stringify(response.body));
        })
    })

    describe('Módulo - Pagamentos - ', () => {

        it('Validar retorno 200 - ', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: '',
                url: '',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            })
        }).then((response) => {
            expect(response.status).to.eq(200);
            cy.log(JSON.stringify(response.body));
        })
    })

    describe('Módulo - Pagamentos - ', () => {

        it('Validar retorno 200 - ', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: '',
                url: '',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            })
        }).then((response) => {
            expect(response.status).to.eq(200);
            cy.log(JSON.stringify(response.body));
        })
    })
})