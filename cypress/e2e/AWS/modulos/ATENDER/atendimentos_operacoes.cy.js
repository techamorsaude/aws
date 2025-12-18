/// <reference types="cypress"/>

describe('Módulo - Atendimentos', () => {
    beforeEach(() => {
        cy.login();
        cy.refreshToken();
    })

    describe('Módulo - Atendimentos - Iniciar atendimento', () => {

        it('Validar retorno 201 - /api/v1/attendance/start', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/attendance/start',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: {
                    "appointmentId": 1,
                    "time": "00:10:00"
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(201);
                expect(response.body).to.have.property('codigo');
                expect(response.body).to.have.property('flagDeError');
                expect(response.body).to.have.property('mensagem');
            })
        })

        it('Validar retorno 400 - /api/v1/attendance/start', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/attendance/start',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: {
                    "appointmentId": 1,
                    "time": "00:10:00"
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(400);
            })
        })

        it('Validar retorno 401 - /api/v1/attendance/start', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/attendance/start',
                headers: {
                    //'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: {
                    "appointmentId": 1,
                    "time": "00:10:00"
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(401);
            })
        })
    })

    describe('Módulo - Atendimentos - Pausar atendimento', () => {

        it('Validar retorno 201 - /api/v1/attendance/pause', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/attendance/pause',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: {
                    "appointmentId": 1,
                    "time": "00:10:00"
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(201);
                expect(response.body).to.have.property('codigo');
                expect(response.body).to.have.property('flagDeError');
                expect(response.body).to.have.property('mensagem');
            })
        })

        it('Validar retorno 401 - /api/v1/attendance/pause', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/attendance/pause',
                headers: {
                    //'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: {
                    "appointmentId": 1,
                    "time": "00:10:00"
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(401);
            })
        })
    })

    describe('Módulo - Atendimentos - Finalizar atendimento', () => {

        it('Validar retorno 201 - /api/v1/attendance/finish', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/attendance/finish',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: {

                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(201);
                expect(response.body).to.have.property('message').to.be.an('array');
                expect(response.body).to.have.property('error')
                expect(response.body).to.have.property('statusCode')
            })
        })

        it('Validar retorno 400 - /api/v1/attendance/finish', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/attendance/finish',
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

        it('Validar retorno 401 - /api/v1/attendance/finish', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/attendance/finish',
                headers: {
                    //'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: {
                    "appointmentId": 1,
                    "time": "00:10:00"
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(401);
            })
        })
    })

    describe('Módulo - Atendimentos - Atendimento assinado', () => {

        it('Validar retorno 201 - /api/v1/attendance/signed', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/attendance/signed',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: {
                    "appointmentId": 323232332,
                    "fileUrl": "string",
                    "providerId": 0,
                    "bulk": [
                        null
                    ],
                    "isBry": true,
                    "userAuth": {
                        "cpf": "71591522803",
                        "password": "RDED@e333333",
                        "token": "VuaWRhZGUiOjEsImZlYXR1cmVzIjpbInNjaGVkdWxlLWFzc2lzd"
                    }
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(201);
                expect(response.body).to.have.property('message');
                expect(response.body).to.have.property('error');
                expect(response.body).to.have.property('statusCode');

            })
        })

        it('Validar retorno 401 - /api/v1/attendance/signed', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/attendance/signed',
                headers: {
                    //'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: {
                    "appointmentId": 0,
                    "fileUrl": "string",
                    "providerId": 0,
                    "bulk": [
                        null
                    ],
                    "isBry": true,
                    "userAuth": {
                        "cpf": "string",
                        "password": "string",
                        "token": "string"
                    }
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(401);
            })
        })
    })

    describe('Módulo - Atendimentos - Listar os atendimentos', () => {

        it('Validar retorno 200 - /api/v1/attendance', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: 'api/v1/attendance?appointmentId=2905662',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(200);
                cy.log('Retorna vazio', JSON.stringify(response.body))
            })
        })

        it('Validar retorno 401 - /api/v1/attendance', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/attendance',
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

    describe('Módulo - Atendimentos - Editar atendimento', () => {

        it('Validar retorno 200 - /api/v1/attendance', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'PUT',
                url: 'api/v1/attendance?appointmentId=2905662',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(200);
                expect(response.body).to.have.property('statusCode');
                expect(response.body).to.have.property('message');
            })
        })

        it('Validar retorno 401 - /api/v1/attendance', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'PUT',
                url: '/api/v1/attendance',
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

    describe.only('Módulo - Atendimentos - Pausar atendimento', () => {

        it('Validar retorno 201 - /api/v1/attendance/pause-attendance', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/attendance/pause-attendance',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: {
                    "appointmentId": 2124,
                    "time": "00:10:00",
                    "anamnesis": "string",
                    "conduct": "string",
                    "hypothesisDiagnoses": "string"
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(201);
                cy.log(JSON.stringify(response.body))
                expect(response.body).to.have.property('statusCode');
                expect(response.body).to.have.property('message');
            })
        })

        it('Validar retorno 401 - /api/v1/attendance/pause-attendance', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/attendance/pause-attendance',
                headers: {
                    //'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: {
                    "appointmentId": 1,
                    "time": "00:10:00",
                    "anamnesis": "string",
                    "conduct": "string",
                    "hypothesisDiagnoses": "string"
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(401);
            })
        })
    })

    describe.only('Módulo - Atendimentos - Voltar para o atendimento', () => {

        it('Validar retorno 201 - /api/v1/attendance/return-attendance', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/attendance/return-attendance',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: {
                    "appointmentId": 1,
                    "time": "00:10:00"
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(201);
                cy.log(JSON.stringify(response.body))
                expect(response.body).to.have.property('statusCode');
                expect(response.body).to.have.property('message');
            })
        })

        it('Validar retorno 401 - /api/v1/attendance/return-attendance', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/attendance/return-attendance',
                headers: {
                    //'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: {
                    "appointmentId": 1,
                    "time": "00:10:00"
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(401);
            })
        })
    })

    describe.only('Módulo - Atendimentos - Listar os atendimentos do profissional informado', () => {

        it('Validar retorno 200 - /api/v1/attendance/professional/{id}', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/attendance/professional/{id}}',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(200);
                const body = response.body;

                // valida itens
                expect(response.body.items).to.be.an('array')
                body.items.forEach((item) => {
                    expect(item).to.have.property('id')
                    expect(item).to.have.property('date')
                    expect(item).to.have.property('status')
                    expect(item).to.have.property('patient')
                    expect(item).to.have.property('professional')
                    expect(item).to.have.property('specialty')
                    expect(item).to.have.property('appointmentId')
                    expect(item).to.have.property('return')
                })

                // valida meta
                expect(response.body.meta).to.have.property('itemCount')
                expect(response.body.meta).to.have.property('totalItems')
                expect(response.body.meta).to.have.property('itemsPerPage')
                expect(response.body.meta).to.have.property('currentPage')
                expect(response.body.meta).to.have.property('totalPages')
            })
        })

        it('Validar retorno 400 - /api/v1/attendance/professional/{id}', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/attendance/professional/{id}',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(400);
            })
        })

        it('Validar retorno 401 - /api/v1/attendance/professional/{id}', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/attendance/professional/{id}',
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

    describe.only('Módulo - Atendimentos - Listar links dos documentos', () => {

        it('Validar retorno 201 - /api/v1/attendance/bulk-documents', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/attendance/bulk-documents',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(201);
                cy.log(JSON.stringify(response.body))
                expect(response.body).to.have.property('statusCode');
                expect(response.body).to.have.property('message');
            })
        })

        it('Validar retorno 401 - /api/v1/attendance/bulk-documents', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/attendance/bulk-documents',
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