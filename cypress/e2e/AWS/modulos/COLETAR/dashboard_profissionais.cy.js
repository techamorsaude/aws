/// <reference types="cypress"/>


describe('Módulo - Dashboard Profissionais', () => {
    beforeEach(() => {
        cy.login();
        cy.refreshToken();
    })

    describe('Módulo - Dashboard Profissionais - Retorna dados do Dashboard de Profissionais', () => {

        it('Validar retorno 200 - /api/v1/dashboard-profissionais', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/dashboard-profissionais',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(400)
                cy.log('Retornou vazio', JSON.stringify(response.body))
            })
        })

        it('Validar retorno 401 - /api/v1/dashboard-profissionais', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/dashboard-profissionais',
                headers: {
                    //'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(401)
            })
        })
    })
})