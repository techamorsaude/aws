/// <reference types="cypress"/>

describe('Módulo - Atendimentos Modelos Formulários', () => {
    beforeEach(() => {
        cy.login();
        cy.refreshToken();
    })

    describe('Módulo - Atendimentos Modelos Formulários - Lista modelo de formulário', () => {

        it('Validar retorno 200 - /api/v1/attendance/model-form', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/attendance/model-form',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(200);

                const body = response.body;
                expect(body).to.be.an('array')
                body.forEach((item) => {
                    expect(item).to.have.property('id');
                    expect(item).to.have.property('nome');
                    expect(item).to.have.property('body');
                    expect(item).to.have.property('tipoModelo');
                })
            })
        })

        it('Validar retorno 401 - /api/v1/attendance/model-form', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/attendance/model-form',
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