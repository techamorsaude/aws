/// <reference types="cypress"/>

describe('Módulo - Informações Adicionais', () => {
    beforeEach(() => {
        cy.login();
        cy.refreshToken();
    })

    // Precisa de dados reais do Amei
    describe('Módulo - Informações Adicionais - Cria uma informação adicional', () => {

        it('Validar retorno 200 - /api/v1/attendance/additional-information', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/attendance/additional-information',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: {
                    "attendanceId": 1,
                    "observation": "teste",
                    "medicalPrescription": {
                        "attendanceId": 1,
                        "typePrescriptionId": 1,
                        "prescriptionsMedical": [
                            {
                                "name": "Nome 1",
                                "amount": 2,
                                "typeStripe": "tipo tarja",
                                "typeMedicine": "tipo medicamento.",
                                "flagUseContinuous": "1",
                                "dosage": "posologia",
                                "UseControlled": 1
                            }
                        ],
                        "memedPrescritionUuid": "e123",
                        "ipClient": "1.11",
                        "cpf": "312.123.223.11",
                        "password": "senha123"
                    }
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(201);
            })
        })

        it('Validar retorno 400 - /api/v1/attendance/additional-information', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/attendance/additional-information',
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

        it('Validar retorno 401 - /api/v1/attendance/additional-information', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/attendance/additional-information',
                headers: {
                    //'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: {
                    "attendanceId": 1,
                    "observation": "teste",
                    "medicalPrescription": {
                        "attendanceId": 1,
                        "typePrescriptionId": 1,
                        "prescriptionsMedical": [
                            {
                                "name": "Nome 1",
                                "amount": 2,
                                "typeStripe": "tipo tarja",
                                "typeMedicine": "tipo medicamento.",
                                "flagUseContinuous": "1",
                                "dosage": "posologia",
                                "UseControlled": 1
                            }
                        ],
                        "memedPrescritionUuid": "e123",
                        "ipClient": "1.11",
                        "cpf": "312.123.223.11",
                        "password": "senha123"
                    }
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(401);
            })
        })
    })

    // Precisa de dados reais do Amei
    describe('Módulo - Informações Adicionais - Busca informações adicionais de um agendamento', () => {
        
        it('Validar retorno 200 - /api/v1/attendance/additional-information/agendamento/{atendimentoId}', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/attendance/additional-information/agendamento/{atendimentoId}',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(200);
            })
        })

        it('Validar retorno 400 - /api/v1/attendance/additional-information/agendamento/{atendimentoId}', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/attendance/additional-information/agendamento/{atendimentoId}',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(400);
            })
        })

        it('Validar retorno 401 - /api/v1/attendance/additional-information/agendamento/{atendimentoId}', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/attendance/additional-information/agendamento/{atendimentoId}',
                headers: {
                    //'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(401);
            })
        })
    });
})