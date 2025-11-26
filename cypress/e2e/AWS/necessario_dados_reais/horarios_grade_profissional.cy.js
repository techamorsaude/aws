/// <reference types="cypress"/>

describe('Módulo - Horários/Grade Profissional', () => {
    beforeEach(() => {
        cy.login();
        cy.refreshToken()
    })

    describe('Módulo - Horários/Grade Profissional - Cria um horário disponível para o profissional', () => {

        it.only('Validar retorno 201 - /api/v1/schedule', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/schedule',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: {
                    "diasSemana": [
                        2
                    ],
                    "tempo": 10,
                    "compartilharGrade": false,
                    "necessitaAcolhimento": false,
                    "overbooking": false,
                    "diaInicio": "20251125",
                    "diaTermino": "20251126",
                    "horaInicio": "10:00",
                    "horaTermino": "23:00",
                    "maximoRetornos": null,
                    "deletado": false,
                    "profissionalId": 4033,
                    "localId": 10610,
                    "clinicaId": 483,
                    "procedimentos": [
                        20357
                    ],
                    "areasAtuacao": [
                        611
                    ],
                    "restrictions": []
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(201);
            })
        })

        it('Validar retorno 400 - /api/v1/schedule', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/schedule',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: {
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(400);
            })
        })

        it('Validar retorno 401 - /api/v1/schedule', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/schedule',
                headers: {
                    //'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: {
                    "diasSemana": [
                        3
                    ],
                    "tempo": 10,
                    "compartilharGrade": true,
                    "necessitaAcolhimento": false,
                    "overbooking": false,
                    "diaInicio": 20250402,
                    "diaTermino": 20250403,
                    "horaInicio": "18:00",
                    "horaTermino": "20:30",
                    "maximoRetornos": null,
                    "deletado": false,
                    "profissionalId": 3821,
                    "localId": 59,
                    "clinicaId": 483,
                    "procedimentos": [
                        25799,
                        25800
                    ],
                    "areasAtuacao": [
                        611,
                        635
                    ],
                    "restrictions": []
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(401);
            })
        })
    })

    describe('Módulo - Horários/Grade Profissional - Altera um horário em que o profissional está disponível', () => {

        it('Validar retorno 200 - /api/v1/schedule/{id}', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'PUT',
                url: '/api/v1/schedule/{id}',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: {
                    "diasSemana": [
                        3
                    ],
                    "tempo": 10,
                    "compartilharGrade": true,
                    "necessitaAcolhimento": false,
                    "overbooking": false,
                    "diaInicio": 20250402,
                    "diaTermino": 20250403,
                    "horaInicio": "18:00",
                    "horaTermino": "20:30",
                    "maximoRetornos": null,
                    "deletado": false,
                    "profissionalId": 3821,
                    "localId": 59,
                    "clinicaId": 483,
                    "procedimentos": [
                        25799,
                        25800
                    ],
                    "areasAtuacao": [
                        611,
                        635
                    ],
                    "restrictions": []
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(200);
            })
        })

        it('Validar retorno 400 - /api/v1/schedule/{id}', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'PUT',
                url: '/api/v1/schedule/{id}',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: {
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(400);
            })
        })

        it('Validar retorno 401 - /api/v1/schedule/{id}', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'PUT',
                url: '/api/v1/schedule/{id}',
                headers: {
                    //'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: {
                    "diasSemana": [
                        3
                    ],
                    "tempo": 10,
                    "compartilharGrade": true,
                    "necessitaAcolhimento": false,
                    "overbooking": false,
                    "diaInicio": 20250402,
                    "diaTermino": 20250403,
                    "horaInicio": "18:00",
                    "horaTermino": "20:30",
                    "maximoRetornos": null,
                    "deletado": false,
                    "profissionalId": 3821,
                    "localId": 59,
                    "clinicaId": 483,
                    "procedimentos": [
                        25799,
                        25800
                    ],
                    "areasAtuacao": [
                        611,
                        635
                    ],
                    "restrictions": []
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(401);
            })
        })
    })

    describe('Módulo - Horários/Grade Profissional - Exclui um determinado horário por Id', () => {

        it('Validar retorno 200 - /api/v1/schedule/{id}', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'DELETE',
                url: '/api/v1/schedule/{id}',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(200);
            })
        })

        it('Validar retorno 400 - /api/v1/schedule/{id}', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'DELETE',
                url: '/api/v1/schedule/{id}',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(400);
            })
        })

        it('Validar retorno 401 - /api/v1/schedule/{id}', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'DELETE',
                url: '/api/v1/schedule/{id}',
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

    describe('Módulo - Horários/Grade Profissional - Busca os horários disponíveis por Id do profissional', () => {

        it('Validar retorno 200 - /api/v1/schedule/professional/{id}', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/schedule/professional/{id}',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(200);
            })
        })

        it('Validar retorno 400 - /api/v1/schedule/professional/{id}', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/schedule/professional/{id}',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(400);
            })
        })

        it('Validar retorno 401 - /api/v1/schedule/professional/{id}', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/schedule/professional/{id}',
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