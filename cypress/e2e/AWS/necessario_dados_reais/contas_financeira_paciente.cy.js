/// <reference types="cypress"/>

describe('Módulo - Contas Financeira Paciente', () => {
    beforeEach(() => {
        cy.login();
        cy.refreshToken();
    })

    describe('Módulo - Contas Financeira Paciente - Retorna uma lista por filtro contas financeira do paciente', () => {

        it('Validar retorno 200 - /api/v1/patient-financial-accounts/list-filter', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/patient-financial-accounts/list-filter?page=1&limit=1&data_inicio=20251204&data_fim=20251204&paciente_id=1162697',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(200);
                expect(response.body).to.have.property('items').to.be.an('array');
                expect(response.body).to.have.property('meta').to.include.all.keys(
                    'itemCount',
                    'totalItems',
                    'itemsPerPage',
                    'currentPage',
                    'totalPages'
                )
            })
        })

        it('Validar retorno 401 - /api/v1/patient-financial-accounts/list-filter', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/patient-financial-accounts/list-filter',
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

    // Precisa de dados reais do Amei
    describe('Módulo - Contas Financeira Paciente - Retorna uma lista do historico de pagamento', () => {

        it.only('Validar retorno 200 - /api/v1/patient-financial-accounts/payment-history', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/patient-financial-accounts/payment-history?pacienteId=1162697',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(200);
            })
        })

        it('Validar retorno 400 - /api/v1/patient-financial-accounts/payment-history', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/patient-financial-accounts/payment-history',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(400);
            })
        })

        it('Validar retorno 401 - /api/v1/patient-financial-accounts/payment-history', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/patient-financial-accounts/payment-history',
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
})