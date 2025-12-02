/// <reference types="cypress"/>

describe('Módulo - Atendimento Avaliação', () => {
    beforeEach(() => {
        cy.login();
        cy.refreshToken();
    })

    describe('Módulo - Atendimento Avaliação - Criar ou atualizar Hipóteses diagnósticas', () => {

        it('Validar retorno 201 - /api/v1/attendance/evaluation/hypothesis-diagnoses', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/attendance/evaluation/hypothesis-diagnoses',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: {
                    "attendanceId": 2460,
                    "hypothesisText": "Dados",
                    "modelFormId": null,
                    "ipClient": "127.0.0.1"
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(201);
                expect(response.body).to.have.property('codigo');
                expect(response.body).to.have.property('flagDeError');
                expect(response.body).to.have.property('mensagem');
            })
        })

        it('Validar retorno 400 - /api/v1/attendance/evaluation/hypothesis-diagnoses', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/attendance/evaluation/hypothesis-diagnoses',
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

        it('Validar retorno 401 - /api/v1/attendance/evaluation/hypothesis-diagnoses', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/attendance/evaluation/hypothesis-diagnoses',
                headers: {
                    //'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: {
                    "attendanceId": 1,
                    "hypothesisText": "Dados",
                    "modelFormId": 1,
                    "ipClient": "1.11"
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(401);
            })
        })
    })

    describe('Módulo - Atendimento Avaliação - Lista de Hipóteses diagnósticas', () => {

        it('Validar retorno 200 - /api/v1/attendance/evaluation/hypothesis-diagnoses', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/attendance/evaluation/hypothesis-diagnoses?patientId=1162697&attendanceId=31285673',
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

        it('Validar retorno 401 - /api/v1/attendance/evaluation/hypothesis-diagnoses', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/attendance/evaluation/hypothesis-diagnoses',
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

    describe.only('Módulo - Atendimento Avaliação - Criar Problemas', () => {

        it('Validar retorno 201 - /api/v1/attendance/evaluation/problems', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/attendance/evaluation/problems',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: {
                    "attendanceId": 611,
                    "medicalClassificationId": 2,
                    "ipClient": "127.0.0.1"
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(201);
                expect(response.body).to.have.property('flagDeError');
                expect(response.body).to.have.property('codigo');
                expect(response.body).to.have.property('mensagem');
            })
        })

        it('Validar retorno 400 - /api/v1/attendance/evaluation/problems', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/attendance/evaluation/problems',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: {
                    "attendanceId": 1,
                    "medicalClassificationId": 2,
                    "ipClient": "1.11"
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(400);
            })
        })

        it('Validar retorno 401 - /api/v1/attendance/evaluation/problems', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/attendance/evaluation/problems',
                headers: {
                    //'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: {
                    "attendanceId": 1,
                    "medicalClassificationId": 2,
                    "ipClient": "1.11"
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(401);
            })
        })
    })

    describe('Módulo - Atendimento Avaliação - Lista de Problemas', () => {

        it('Validar retorno 200 - /api/v1/attendance/evaluation/problems', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/attendance/evaluation/problems?patientId=1162697&attendanceId=31285673',
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

        it('Validar retorno 400 - /api/v1/attendance/evaluation/problems', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/attendance/evaluation/problems',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(400);
            })
        })

        it('Validar retorno 401 - /api/v1/attendance/evaluation/problems', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/attendance/evaluation/problems',
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

    describe('Módulo - Atendimento Avaliação - Remover Problema', () => {

        it('Validar retorno 200 - /api/v1/attendance/evaluation/problem', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'DELETE',
                url: '/api/v1/attendance/evaluation/problem',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: {
                    "classificacaoMedicaId": 100667,
                    "ipClient": "127.0.0.1"
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(200);
                expect(response.body).to.have.property('flagDeError');
                expect(response.body).to.have.property('codigo');
                expect(response.body).to.have.property('mensagem');
            })
        })

        it('Validar retorno 400 - /api/v1/attendance/evaluation/problem', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'DELETE',
                url: '/api/v1/attendance/evaluation/problem',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: {
                    "classificacaoMedicaId": 1,
                    "ipClient": "1.11"
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(400);
            })
        })

        it('Validar retorno 401 - /api/v1/attendance/evaluation/problem', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'DELETE',
                url: '/api/v1/attendance/evaluation/problem',
                headers: {
                    //'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: {
                    "classificacaoMedicaId": 1,
                    "ipClient": "1.11"
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(401);
            })
        })
    })

    describe('Módulo - Atendimento Avaliação - Incluir Problemas nos favoritos', () => {

        it('Validar retorno 201 - /api/v1/attendance/evaluation/favorite-problem', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/attendance/evaluation/favorite-problem',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: {
                    "pacienteProblemaId": 202098
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(201);
                expect(response.body).to.have.property('flagDeError');
                expect(response.body).to.have.property('codigo');
                expect(response.body).to.have.property('mensagem');
            })
        })

        it('Validar retorno 400 - /api/v1/attendance/evaluation/favorite-problem', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/attendance/evaluation/favorite-problem',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: {
                    "pacienteProblemaId": 1
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(400);
            })
        })

        it('Validar retorno 401 - /api/v1/attendance/evaluation/favorite-problem', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/attendance/evaluation/favorite-problem',
                headers: {
                    //'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: {
                    "pacienteProblemaId": 1
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(401);
            })
        })
    })

    describe('Módulo - Atendimento Avaliação - Lista de Problemas favoritos', () => {

        it('Validar retorno 200 - /api/v1/attendance/evaluation/favorite-problems', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/attendance/evaluation/favorite-problems?patientId=1162697',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(200);
                cy.log('Retorna vazio', JSON.stringify(response.body));
            })
        })

        it('Validar retorno 400 - /api/v1/attendance/evaluation/favorite-problems', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/attendance/evaluation/favorite-problems',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(400);
            })
        })

        it('Validar retorno 401 - /api/v1/attendance/evaluation/favorite-problems', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/attendance/evaluation/favorite-problems',
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

    describe('Módulo - Atendimento Avaliação - Lista de Problemas favoritos do médico', () => {

        it('Validar retorno 200 - /api/v1/attendance/evaluation/favorite-problems-professional', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/attendance/evaluation/favorite-problems-professional',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(200);
            })
        })

        it('Validar retorno 401 - /api/v1/attendance/evaluation/favorite-problems-professional', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/attendance/evaluation/favorite-problems-professional',
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

    describe('Módulo - Atendimento Avaliação - Remover problemas dos favoritos', () => {

        it('Validar retorno 200 - /api/v1/attendance/evaluation/favorite-problem-remove', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'DELETE',
                url: '/api/v1/attendance/evaluation/favorite-problem-remove',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: {
                    "id": 1
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(200);
                expect(response.body).to.have.property('flagDeError');
                expect(response.body).to.have.property('codigo');
                expect(response.body).to.have.property('mensagem');
            })
        })

        it('Validar retorno 401 - /api/v1/attendance/evaluation/favorite-problem-remove', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'DELETE',
                url: '/api/v1/attendance/evaluation/favorite-problem-remove',
                headers: {
                    //'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: {
                    "id": 1
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(401);
            })
        })
    })

    describe('Módulo - Atendimento Avaliação - Concluir etapa Avaliação', () => {

        it('Validar retorno 201 - /api/v1/attendance/evaluation/complete', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/attendance/evaluation/complete',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: {
                    "attendanceId": 1,
                    "ipClient": "1.11"
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(201);
                expect(response.body).to.have.property('flagDeError');
                expect(response.body).to.have.property('codigo');
                expect(response.body).to.have.property('mensagem');
            })
        })

        it('Validar retorno 401 - /api/v1/attendance/evaluation/complete', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/attendance/evaluation/complete',
                headers: {
                    //'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: {
                    "attendanceId": 1,
                    "ipClient": "1.11"
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(401);
            })
        })
    })

    describe('Módulo - Atendimento Avaliação - Ativar Problemas', () => {

        it('Validar retorno 201 - /api/v1/attendance/evaluation/active-problems', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/attendance/evaluation/active-problems',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: {
                    "patientId": 1162697,
                    "medicalClassificationId": 53086,
                    "pacienteProblemasId": 1084223,
                    "ipClient": "127.0.0.1"
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(201);
                expect(response.body).to.have.property('flagDeError');
                expect(response.body).to.have.property('codigo');
                expect(response.body).to.have.property('mensagem');
            })
        })

        it('Validar retorno 401 - /api/v1/attendance/evaluation/active-problems', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/attendance/evaluation/active-problems',
                headers: {
                    //'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: {
                    "patientId": 1,
                    "medicalClassificationId": 2,
                    "pacienteProblemasId": 2,
                    "ipClient": "1.11"
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(401);
            })
        })
    })

    describe('Módulo - Atendimento Avaliação - Inativar Problemas', () => {

        it('Validar retorno 201 - /api/v1/attendance/evaluation/disable-problems', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/attendance/evaluation/disable-problems',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: {
                    "patientId": 1,
                    "medicalClassificationId": 2,
                    "pacienteProblemasId": 2,
                    "ipClient": "1.11"
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(201);
                expect(response.body).to.have.property('flagDeError');
                expect(response.body).to.have.property('codigo');
                expect(response.body).to.have.property('mensagem');
            })
        })

        it('Validar retorno 401 - /api/v1/attendance/evaluation/disable-problems', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/attendance/evaluation/disable-problems',
                headers: {
                    //'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: {
                    "patientId": 1,
                    "medicalClassificationId": 2,
                    "pacienteProblemasId": 2,
                    "ipClient": "1.11"
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(401);
            })
        })
    })

    describe('Módulo - Atendimento Avaliação - Lista Ativos ou Inativos de Problemas', () => {

        it('Validar retorno 200 - /api/v1/attendance/evaluation/active-disable-problems', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/attendance/evaluation/active-disable-problems?patientId=1162697',
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

        it('Validar retorno 401 - /api/v1/attendance/evaluation/active-disable-problems', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/attendance/evaluation/active-disable-problems',
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
