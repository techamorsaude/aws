/// <reference types="cypress"/>

describe('Módulo - Modelo PDF de atendimento', () => {
    beforeEach(() => {
        cy.login();
        cy.refreshToken();
    })

    describe('Módulo - Modelo PDF de atendimento - Modelo do atendimento médico em PDF', () => {
      
        it('Validar retorno 200 - /api/v1/attendance/modelo', () => {
          const token = Cypress.env('access_token');
          
          cy.request({
            method: 'GET',
            url: '/api/v1/attendance/modelo',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            failOnStatusCode: false,
          }).then((response) => {
            expect(response.status).to.eq(200);
          })
        })

        it('Validar retorno 400 - /api/v1/attendance/modelo', () => {
          const token = Cypress.env('access_token');
          
          cy.request({
            method: 'GET',
            url: '/api/v1/attendance/modelo',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            failOnStatusCode: false,
          }).then((response) => {
            expect(response.status).to.eq(400);
          })
        })

        it('Validar retorno 401 - /api/v1/attendance/modelo', () => {
          const token = Cypress.env('access_token');
          
          cy.request({
            method: 'GET',
            url: '/api/v1/attendance/modelo',
            headers: {
                //'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            failOnStatusCode: false,
          }).then((response) => {
            expect(response.status).to.eq(401);
          })
        })
    })
})