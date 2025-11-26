/// <reference types="cypress"/>

describe('Módulo - Fiserv', () => {
    beforeEach(() => {
        cy.login();
        cy.refreshToken();
    })

    // Precisa de dados reais do Amei
    describe('Módulo - Fiserv - Endpoint para atualização do token da fiserv', () => {

        it('Validar retorno 201 - /api/v1/fiserv/token', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/fiserv/token',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: {
                    "token": "1547-1595-7305-7963"
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(201);
            })
        })

        it('Validar retorno 401 - /api/v1/fiserv/token', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/fiserv/token',
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