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
                    "attendanceId": 31207743,
                    "observation": "Teste API",
                    "medicalPrescription": {
                        "attendanceId": 31207743,
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
                        "memedPrescritionUuid": "1111",
                        "ipClient": "1.11",
                        "cpf": "715.915.228-03",
                        "password": "Profissional@#2025"
                    }
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(201);
                cy.log(JSON.stringify(response.body))
                expect(response.body).to.have.property('message');
                expect(response.body).to.have.property('error');
                expect(response.body).to.have.property('statusCode');
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

    describe('Módulo - Informações Adicionais - Busca informações adicionais de um agendamento', () => {

        it('Validar retorno 200 - /api/v1/attendance/additional-information/agendamento/{atendimentoId}', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/attendance/additional-information/agendamento/998894',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(200);
                expect(response.body).to.have.property('canInsertAdditionalInfo');
                expect(response.body).to.have.property('additionalInfos');
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
    })
})