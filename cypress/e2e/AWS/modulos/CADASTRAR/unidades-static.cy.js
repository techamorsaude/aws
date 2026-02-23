/// <reference types="cypress"/>

describe('Módulo - Unidades Static', () => {
    beforeEach(() => {
        cy.login();
        cy.refreshToken();
    })

    describe('Módulo - Unidades Static - Retorna informações estáticas de uma unidade', () => {

        it('Validar retorno 200 - /api/v1/unidades/static-info/{id}', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/unidades/static-info/483',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(200);
                cy.log(JSON.stringify(response.body));

                const body = response.body;
                expect(body).to.have.property('id');
                expect(body).to.have.property('descricao');
                expect(body).to.have.property('endereco');
                expect(body).to.have.property('flgCentral');
                expect(body).to.have.property('flgTelemedicina');
                expect(body).to.have.property('feegowClinicId');
                expect(body).to.have.property('flgAgendaOnline');
                expect(body).to.have.property('flgAtivarSplit');
                expect(body).to.have.property('flgAtivarTef');
                expect(body).to.have.property('flgAtivo');
                expect(body).to.have.property('status');
                expect(body).to.have.property('regiaoId');
                expect(body).to.have.property('profissionais').to.be.an('array');
            })
        })

        it('Validar retorno 400 - /api/v1/unidades/static-info/{id}', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/unidades/static-info/{id}',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(400);
                cy.log(JSON.stringify(response.body));
            })
        })

        it('Validar retorno 401 - /api/v1/unidades/static-info/{id}', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/unidades/static-info/{id}',
                headers: {
                    //'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(401);
                cy.log(JSON.stringify(response.body));
            })
        })
    })

    describe('Módulo - Unidades Static - Atualiza informações estáticas de uma unidade. Deve ser usado apenas para atualizações forçadas.', () => {

        it('Validar retorno 200 - /api/v1/unidades/static-info', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/unidades/static-info',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(201);
                cy.log('Retorna vazio', JSON.stringify(response.body));
            })
        });

        it('Validar retorno 401 - /api/v1/unidades/static-info', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/unidades/static-info',
                headers: {
                    //'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(401);
                cy.log(JSON.stringify(response.body));
            })
        });
    });
})