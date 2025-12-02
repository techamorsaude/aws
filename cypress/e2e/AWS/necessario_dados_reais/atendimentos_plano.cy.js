/// <reference types="cypress"/>

describe('Módulo - Atendimentos Plano', () => {
    beforeEach(() => {
        cy.login();
        cy.refreshToken();
    })

    describe('Módulo - Atendimentos Plano - Criar Encaminhamento', () => {

        it('Validar retorno 200 - /api/v1/attendance/plan/forwarding', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/attendance/plan/forwarding',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(200)
            })
        })

        it('Validar retorno 400 - /api/v1/attendance/plan/forwarding', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/attendance/plan/forwarding',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(400)
            })
        })

        it('Validar retorno 401 - /api/v1/attendance/plan/forwarding', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/attendance/plan/forwarding',
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

    describe.only('Módulo - Atendimentos Plano - Remover Encaminhamento', () => {

        it('Validar retorno 200 - /api/v1/attendance/plan/forwarding', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'DELETE',
                url: '/api/v1/attendance/plan/forwarding',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: {
                    "id": 1,
                    "ipClient": "1.11"
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(200)
                expect(response.body).to.have.property('flagDeError');
                expect(response.body).to.have.property('codigo');
                expect(response.body).to.have.property('mensagem');
            })
        })

        it('Validar retorno 401 - /api/v1/attendance/plan/forwarding', () => {

            cy.request({
                method: 'DELETE',
                url: '/api/v1/attendance/plan/forwarding',
                headers: {
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(401)
            })
        })
    })

    describe('Módulo - Atendimentos Plano - download do pdf', () => {

        it('Validar retorno 200 - /api/v1/attendance/plan/forwarding/pdf', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/attendance/plan/forwarding/pdf',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(200)
            })
        })

        it('Validar retorno 400 - /api/v1/attendance/plan/forwarding/pdf', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/attendance/plan/forwarding/pdf',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(400)
            })
        })

        it('Validar retorno 401 - /api/v1/attendance/plan/forwarding/pdf', () => {

            cy.request({
                method: 'GET',
                url: '/api/v1/attendance/plan/forwarding/pdf',
                headers: {
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(401)
            })
        })
    })

    describe('Módulo - Atendimentos Plano - Enviar email', () => {

        it('Validar retorno 200 - /api/v1/attendance/plan/forwarding/send-email', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/attendance/plan/forwarding/send-email',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(200)
            })
        })

        it('Validar retorno 400 - /api/v1/attendance/plan/forwarding/send-email', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/attendance/plan/forwarding/send-email',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(400)
            })
        })

        it('Validar retorno 401 - /api/v1/attendance/plan/forwarding/send-email', () => {

            cy.request({
                method: 'GET',
                url: '/api/v1/attendance/plan/forwarding/send-email',
                headers: {
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(401)
            })
        })
    })

    describe('Módulo - Atendimentos Plano - Lista de encaminhamentos', () => {

        it('Validar retorno 200 - /api/v1/attendance/plan/forwardings', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/attendance/plan/forwardings',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(200)
            })
        })

        it('Validar retorno 400 - /api/v1/attendance/plan/forwardings', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/attendance/plan/forwardings',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(400)
            })
        })

        it('Validar retorno 401 - /api/v1/attendance/plan/forwardings', () => {

            cy.request({
                method: 'GET',
                url: '/api/v1/attendance/plan/forwardings',
                headers: {
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(401)
            })
        })
    })

    describe('Módulo - Atendimentos Plano - Remover Encaminhamentos', () => {

        it('Validar retorno 200 - /api/v1/attendance/plan/forwarding/problem', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'DELETE',
                url: '/api/v1/attendance/plan/forwarding/problem',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(200)
            })
        })

        it('Validar retorno 400 - /api/v1/attendance/plan/forwarding/problem', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'DELETE',
                url: '/api/v1/attendance/plan/forwarding/problem',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(400)
            })
        })

        it('Validar retorno 401 - /api/v1/attendance/plan/forwarding/problem', () => {

            cy.request({
                method: 'DELETE',
                url: '/api/v1/attendance/plan/forwarding/problem',
                headers: {
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(401)
            })
        })
    })

    describe('Módulo - Atendimentos Plano - Criar Orientação', () => {

        it('Validar retorno 200 - /api/v1/attendance/plan/orientation', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/attendance/plan/orientation',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(200)
            })
        })

        it('Validar retorno 400 - /api/v1/attendance/plan/orientation', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/attendance/plan/orientation',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(400)
            })
        })

        it('Validar retorno 401 - /api/v1/attendance/plan/orientation', () => {

            cy.request({
                method: 'POST',
                url: '/api/v1/attendance/plan/orientation',
                headers: {
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(401)
            })
        })
    })

    describe('Módulo - Atendimentos Plano - Remover Orientação', () => {

        it('Validar retorno 200 - /api/v1/attendance/plan/orientation', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'DELETE',
                url: '/api/v1/attendance/plan/orientation',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(200)
            })
        })

        it('Validar retorno 400 - /api/v1/attendance/plan/orientation', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'DELETE',
                url: '/api/v1/attendance/plan/orientation',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(400)
            })
        })

        it('Validar retorno 401 - /api/v1/attendance/plan/orientation', () => {

            cy.request({
                method: 'DELETE',
                url: '/api/v1/attendance/plan/orientation',
                headers: {
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(401)
            })
        })
    })

    describe('Módulo - Atendimentos Plano - Lista de Orientações', () => {

        it('Validar retorno 200 - /api/v1/attendance/plan/orientations', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/attendance/plan/orientations',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(200)
            })
        })

        it('Validar retorno 400 - /api/v1/attendance/plan/orientations', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/attendance/plan/orientations',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(400)
            })
        })

        it('Validar retorno 401 - /api/v1/attendance/plan/orientations', () => {

            cy.request({
                method: 'GET',
                url: '/api/v1/attendance/plan/orientations',
                headers: {
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(401)
            })
        })
    })

    describe('Módulo - Atendimentos Plano - download do pdf', () => {

        it('Validar retorno 200 - /api/v1/attendance/plan/orientation/pdf', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/attendance/plan/orientation/pdf',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(200)
            })
        })

        it('Validar retorno 400 - /api/v1/attendance/plan/orientation/pdf', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/attendance/plan/orientation/pdf',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(400)
            })
        })

        it('Validar retorno 401 - /api/v1/attendance/plan/orientation/pdf', () => {

            cy.request({
                method: 'GET',
                url: '/api/v1/attendance/plan/orientation/pdf',
                headers: {
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(401)
            })
        })
    })

    describe('Módulo - Atendimentos Plano - download do arquivo', () => {

        it('Validar retorno 200 - /api/v1/attendance/plan/orientation/file', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/attendance/plan/orientation/file',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(200)
            })
        })

        it('Validar retorno 400 - /api/v1/attendance/plan/orientation/file', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/attendance/plan/orientation/file',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(400)
            })
        })

        it('Validar retorno 401 - /api/v1/attendance/plan/orientation/file', () => {

            cy.request({
                method: 'GET',
                url: '/api/v1/attendance/plan/orientation/file',
                headers: {
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(401)
            })
        })
    })

    describe('Módulo - Atendimentos Plano - Enviar email', () => {

        it('Validar retorno 200 - /api/v1/attendance/plan/orientation/send-email', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/attendance/plan/orientation/send-email',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(200)
            })
        })

        it('Validar retorno 400 - /api/v1/attendance/plan/orientation/send-email', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/attendance/plan/orientation/send-email',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(400)
            })
        })

        it('Validar retorno 401 - /api/v1/attendance/plan/orientation/send-email', () => {

            cy.request({
                method: 'GET',
                url: '/api/v1/attendance/plan/orientation/send-email',
                headers: {
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(401)
            })
        })
    })

    describe('Módulo - Atendimentos Plano - Criar Atestado', () => {

        it('Validar retorno 200 - /api/v1/attendance/plan/medical-certificates', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/attendance/plan/medical-certificates',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(200)
            })
        })

        it('Validar retorno 400 - /api/v1/attendance/plan/medical-certificates', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/attendance/plan/medical-certificates',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(400)
            })
        })

        it('Validar retorno 401 - /api/v1/attendance/plan/medical-certificates', () => {

            cy.request({
                method: 'POST',
                url: '/api/v1/attendance/plan/medical-certificates',
                headers: {
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(401)
            })
        })
    })

    describe('Módulo - Atendimentos Plano - Lista de Atestados', () => {

        it('Validar retorno 200 - /api/v1/attendance/plan/medical-certificates', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/attendance/plan/medical-certificates',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(200)
            })
        })

        it('Validar retorno 400 - /api/v1/attendance/plan/medical-certificates', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/attendance/plan/medical-certificates',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(400)
            })
        })

        it('Validar retorno 401 - /api/v1/attendance/plan/medical-certificates', () => {

            cy.request({
                method: 'GET',
                url: '/api/v1/attendance/plan/medical-certificates',
                headers: {
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(401)
            })
        })
    })

    describe('Módulo - Atendimentos Plano - Remover Atestado', () => {

        it('Validar retorno 200 - /api/v1/attendance/plan/medical-certificates', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'DELETE',
                url: '/api/v1/attendance/plan/medical-certificates',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(200)
            })
        })

        it('Validar retorno 400 - /api/v1/attendance/plan/medical-certificates', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'DELETE',
                url: '/api/v1/attendance/plan/medical-certificates',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(400)
            })
        })

        it('Validar retorno 401 - /api/v1/attendance/plan/medical-certificates', () => {

            cy.request({
                method: 'DELETE',
                url: '/api/v1/attendance/plan/medical-certificates',
                headers: {
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(401)
            })
        })
    })

    describe('Módulo - Atendimentos Plano - download do pdf', () => {

        it('Validar retorno 200 - /api/v1/attendance/plan/medical-certificates/pdf', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/attendance/plan/medical-certificates/pdf',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(200)
            })
        })

        it('Validar retorno 400 - /api/v1/attendance/plan/medical-certificates/pdf', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/attendance/plan/medical-certificates/pdf',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(400)
            })
        })

        it('Validar retorno 401 - /api/v1/attendance/plan/medical-certificates/pdf', () => {

            cy.request({
                method: 'GET',
                url: '/api/v1/attendance/plan/medical-certificates/pdf',
                headers: {
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(401)
            })
        })
    })

    describe('Módulo - Atendimentos Plano - Enviar email', () => {

        it('Validar retorno 200 - /api/v1/attendance/plan/medical-certificates/send-email', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/attendance/plan/medical-certificates/send-email',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(200)
            })
        })

        it('Validar retorno 400 - /api/v1/attendance/plan/medical-certificates/send-email', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/attendance/plan/medical-certificates/send-email',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(400)
            })
        })

        it('Validar retorno 401 - /api/v1/attendance/plan/medical-certificates/send-email', () => {

            cy.request({
                method: 'GET',
                url: '/api/v1/attendance/plan/medical-certificates/send-email',
                headers: {
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(401)
            })
        })
    })

    describe('Módulo - Atendimentos Plano - Criar prescrição', () => {

        it('Validar retorno 200 - /api/v1/attendance/plan/medical-prescription', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/attendance/plan/medical-prescription',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(200)
            })
        })

        it('Validar retorno 400 - /api/v1/attendance/plan/medical-prescription', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/attendance/plan/medical-prescription',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(400)
            })
        })

        it('Validar retorno 401 - /api/v1/attendance/plan/medical-prescription', () => {

            cy.request({
                method: 'POST',
                url: '/api/v1/attendance/plan/medical-prescription',
                headers: {
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(401)
            })
        })
    })

    describe('Módulo - Atendimentos Plano - Lista de prescrições do paciente', () => {

        it('Validar retorno 200 - /api/v1/attendance/plan/medical-prescription', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/attendance/plan/medical-prescription',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(200)
            })
        })

        it('Validar retorno 400 - /api/v1/attendance/plan/medical-prescription', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/attendance/plan/medical-prescription',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(400)
            })
        })

        it('Validar retorno 401 - /api/v1/attendance/plan/medical-prescription', () => {

            cy.request({
                method: 'GET',
                url: '/api/v1/attendance/plan/medical-prescription',
                headers: {
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(401)
            })
        })
    })

    describe('Módulo - Atendimentos Plano - Remover prescrição', () => {

        it('Validar retorno 200 - /api/v1/attendance/plan/medical-prescription', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'DELETE',
                url: '/api/v1/attendance/plan/medical-prescription',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(200)
            })
        })

        it('Validar retorno 400 - /api/v1/attendance/plan/medical-prescription', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'DELETE',
                url: '/api/v1/attendance/plan/medical-prescription',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(400)
            })
        })

        it('Validar retorno 401 - /api/v1/attendance/plan/medical-prescription', () => {

            cy.request({
                method: 'DELETE',
                url: '/api/v1/attendance/plan/medical-prescription',
                headers: {
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(401)
            })
        })
    })

    describe('Módulo - Atendimentos Plano - Editar prescrição', () => {

        it('Validar retorno 200 - /api/v1/attendance/plan/medical-prescription/{id}', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'PATCH',
                url: '/api/v1/attendance/plan/medical-prescription/1', // Exemplo: id=1
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(200)
            })
        })

        it('Validar retorno 400 - /api/v1/attendance/plan/medical-prescription/{id}', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'PATCH',
                url: '/api/v1/attendance/plan/medical-prescription/1',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(400)
            })
        })

        it('Validar retorno 401 - /api/v1/attendance/plan/medical-prescription/{id}', () => {

            cy.request({
                method: 'PATCH',
                url: '/api/v1/attendance/plan/medical-prescription/1',
                headers: {
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(401)
            })
        })
    })

    describe('Módulo - Atendimentos Plano - Lista de prescrições paginada do paciente', () => {

        it('Validar retorno 200 - /api/v1/attendance/plan/medical-prescription-paginate', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/attendance/plan/medical-prescription-paginate',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(200)
            })
        })

        it('Validar retorno 400 - /api/v1/attendance/plan/medical-prescription-paginate', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/attendance/plan/medical-prescription-paginate',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(400)
            })
        })

        it('Validar retorno 401 - /api/v1/attendance/plan/medical-prescription-paginate', () => {

            cy.request({
                method: 'GET',
                url: '/api/v1/attendance/plan/medical-prescription-paginate',
                headers: {
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(401)
            })
        })
    })

    describe('Módulo - Atendimentos Plano - Remover Remédio da Prescrição', () => {

        it('Validar retorno 200 - /api/v1/attendance/plan/medical-prescription-medicine', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'DELETE',
                url: '/api/v1/attendance/plan/medical-prescription-medicine',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(200)
            })
        })

        it('Validar retorno 400 - /api/v1/attendance/plan/medical-prescription-medicine', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'DELETE',
                url: '/api/v1/attendance/plan/medical-prescription-medicine',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(400)
            })
        })

        it('Validar retorno 401 - /api/v1/attendance/plan/medical-prescription-medicine', () => {

            cy.request({
                method: 'DELETE',
                url: '/api/v1/attendance/plan/medical-prescription-medicine',
                headers: {
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(401)
            })
        })
    })

    describe('Módulo - Atendimentos Plano - download do pdf', () => {

        it('Validar retorno 200 - /api/v1/attendance/plan/medical-prescription/pdf', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/attendance/plan/medical-prescription/pdf',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(200)
            })
        })

        it('Validar retorno 400 - /api/v1/attendance/plan/medical-prescription/pdf', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/attendance/plan/medical-prescription/pdf',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(400)
            })
        })

        it('Validar retorno 401 - /api/v1/attendance/plan/medical-prescription/pdf', () => {

            cy.request({
                method: 'GET',
                url: '/api/v1/attendance/plan/medical-prescription/pdf',
                headers: {
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(401)
            })
        })
    })

    describe('Módulo - Atendimentos Plano - Enviar email', () => {

        it('Validar retorno 200 - /api/v1/attendance/plan/medical-prescription/send-email', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/attendance/plan/medical-prescription/send-email',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(200)
            })
        })

        it('Validar retorno 400 - /api/v1/attendance/plan/medical-prescription/send-email', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/attendance/plan/medical-prescription/send-email',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(400)
            })
        })

        it('Validar retorno 401 - /api/v1/attendance/plan/medical-prescription/send-email', () => {

            cy.request({
                method: 'GET',
                url: '/api/v1/attendance/plan/medical-prescription/send-email',
                headers: {
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(401)
            })
        })
    })

    describe('Módulo - Atendimentos Plano - Concluir etapa Plano', () => {

        it('Validar retorno 200 - /api/v1/attendance/plan/complete', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/attendance/plan/complete',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(200)
            })
        })

        it('Validar retorno 400 - /api/v1/attendance/plan/complete', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/attendance/plan/complete',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(400)
            })
        })

        it('Validar retorno 401 - /api/v1/attendance/plan/complete', () => {

            cy.request({
                method: 'POST',
                url: '/api/v1/attendance/plan/complete',
                headers: {
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(401)
            })
        })
    })

    describe('Módulo - Atendimentos Plano - Criar exame', () => {

        it('Validar retorno 200 - /api/v1/attendance/plan/exam', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/attendance/plan/exam',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(200)
            })
        })

        it('Validar retorno 400 - /api/v1/attendance/plan/exam', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/attendance/plan/exam',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(400)
            })
        })

        it('Validar retorno 401 - /api/v1/attendance/plan/exam', () => {

            cy.request({
                method: 'POST',
                url: '/api/v1/attendance/plan/exam',
                headers: {
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(401)
            })
        })
    })

    describe('Módulo - Atendimentos Plano - Remover exame', () => {

        it('Validar retorno 200 - /api/v1/attendance/plan/exam', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'DELETE',
                url: '/api/v1/attendance/plan/exam',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(200)
            })
        })

        it('Validar retorno 400 - /api/v1/attendance/plan/exam', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'DELETE',
                url: '/api/v1/attendance/plan/exam',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(400)
            })
        })

        it('Validar retorno 401 - /api/v1/attendance/plan/exam', () => {

            cy.request({
                method: 'DELETE',
                url: '/api/v1/attendance/plan/exam',
                headers: {
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(401)
            })
        })
    })

    describe('Módulo - Atendimentos Plano - Lista de exames', () => {

        it('Validar retorno 200 - /api/v1/attendance/plan/exams', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/attendance/plan/exams',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(200)
            })
        })

        it('Validar retorno 400 - /api/v1/attendance/plan/exams', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/attendance/plan/exams',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(400)
            })
        })

        it('Validar retorno 401 - /api/v1/attendance/plan/exams', () => {

            cy.request({
                method: 'GET',
                url: '/api/v1/attendance/plan/exams',
                headers: {
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(401)
            })
        })
    })

    describe('Módulo - Atendimentos Plano - Editar exame', () => {

        it('Validar retorno 200 - /api/v1/attendance/plan/exam/{id}', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'PATCH',
                url: '/api/v1/attendance/plan/exam/1', // Exemplo id=1
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(200)
            })
        })

        it('Validar retorno 400 - /api/v1/attendance/plan/exam/{id}', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'PATCH',
                url: '/api/v1/attendance/plan/exam/1',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(400)
            })
        })

        it('Validar retorno 401 - /api/v1/attendance/plan/exam/{id}', () => {

            cy.request({
                method: 'PATCH',
                url: '/api/v1/attendance/plan/exam/1',
                headers: {
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(401)
            })
        })
    })

    describe('Módulo - Atendimentos Plano - download do pdf', () => {

        it('Validar retorno 200 - /api/v1/attendance/plan/exam/pdf', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/attendance/plan/exam/pdf',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(200)
            })
        })

        it('Validar retorno 400 - /api/v1/attendance/plan/exam/pdf', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/attendance/plan/exam/pdf',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(400)
            })
        })

        it('Validar retorno 401 - /api/v1/attendance/plan/exam/pdf', () => {

            cy.request({
                method: 'GET',
                url: '/api/v1/attendance/plan/exam/pdf',
                headers: {
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(401)
            })
        })
    })

    describe('Módulo - Atendimentos Plano - Enviar email', () => {

        it('Validar retorno 200 - /api/v1/attendance/plan/exam/send-email', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/attendance/plan/exam/send-email',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(200)
            })
        })

        it('Validar retorno 400 - /api/v1/attendance/plan/exam/send-email', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/attendance/plan/exam/send-email',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(400)
            })
        })

        it('Validar retorno 401 - /api/v1/attendance/plan/exam/send-email', () => {

            cy.request({
                method: 'GET',
                url: '/api/v1/attendance/plan/exam/send-email',
                headers: {
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(401)
            })
        })
    })

    describe('Módulo - Atendimentos Plano - Remover problema do exame', () => {

        it('Validar retorno 200 - /api/v1/attendance/plan/exam-problem', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'DELETE',
                url: '/api/v1/attendance/plan/exam-problem',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(200)
            })
        })

        it('Validar retorno 400 - /api/v1/attendance/plan/exam-problem', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'DELETE',
                url: '/api/v1/attendance/plan/exam-problem',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(400)
            })
        })

        it('Validar retorno 401 - /api/v1/attendance/plan/exam-problem', () => {

            cy.request({
                method: 'DELETE',
                url: '/api/v1/attendance/plan/exam-problem',
                headers: {
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(401)
            })
        })
    })

    describe('Módulo - Atendimentos Plano - Remover procedimento do exame', () => {

        it('Validar retorno 200 - /api/v1/attendance/plan/exam-procedure', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'DELETE',
                url: '/api/v1/attendance/plan/exam-procedure',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(200)
            })
        })

        it('Validar retorno 400 - /api/v1/attendance/plan/exam-procedure', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'DELETE',
                url: '/api/v1/attendance/plan/exam-procedure',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(400)
            })
        })

        it('Validar retorno 401 - /api/v1/attendance/plan/exam-procedure', () => {

            cy.request({
                method: 'DELETE',
                url: '/api/v1/attendance/plan/exam-procedure',
                headers: {
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(401)
            })
        })
    })

    describe('Módulo - Atendimentos Plano - Adicionar procedimento aos favoritos', () => {

        it('Validar retorno 200 - /api/v1/attendance/plan/exam-procedure-favorite', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/attendance/plan/exam-procedure-favorite',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(200)
            })
        })

        it('Validar retorno 400 - /api/v1/attendance/plan/exam-procedure-favorite', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/attendance/plan/exam-procedure-favorite',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(400)
            })
        })

        it('Validar retorno 401 - /api/v1/attendance/plan/exam-procedure-favorite', () => {

            cy.request({
                method: 'POST',
                url: '/api/v1/attendance/plan/exam-procedure-favorite',
                headers: {
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(401)
            })
        })
    })

    describe('Módulo - Atendimentos Plano - Remover exame dos favoritos', () => {

        it('Validar retorno 200 - /api/v1/attendance/plan/exam-procedure-favorite', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'DELETE',
                url: '/api/v1/attendance/plan/exam-procedure-favorite',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(200)
            })
        })

        it('Validar retorno 400 - /api/v1/attendance/plan/exam-procedure-favorite', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'DELETE',
                url: '/api/v1/attendance/plan/exam-procedure-favorite',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(400)
            })
        })

        it('Validar retorno 401 - /api/v1/attendance/plan/exam-procedure-favorite', () => {

            cy.request({
                method: 'DELETE',
                url: '/api/v1/attendance/plan/exam-procedure-favorite',
                headers: {
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(401)
            })
        })
    })
})