/// <reference types="cypress"/>

describe('Módulo - Integração Laboratório', () => {
    beforeEach(() => {
        cy.login();
        cy.refreshToken();
    })

    describe('Módulo - Integração Laboratório - Envia pedido', () => {

        it('Validar retorno 201 - /api/v1/integracao/laboratorio/recebe-atendimento', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/integracao/laboratorio/recebe-atendimento',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: {
                    "provedor": "PARDINI",
                    "filaColetaUuid": "1",
                    "altura": 1.83,
                    "peso": 85.4,
                    "dataHoraDum": "YYYYMMDDHHMM",
                    "pacienteId": 1,
                    "observacao": "Medicamentos do paciente",
                    "tipoMaterial": "Tipo do material",
                    "statusIntegracao": "Sem Integração",
                    "exames": [
                        {
                            "id": 123,
                            "mneumonicoExame": "17AN",
                            "volumeColetadoMl": "256",
                            "regiaoColeta": "Cabelo"
                        }
                    ]
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(201);
            })
        })

        it('Validar retorno 400 - /api/v1/integracao/laboratorio/recebe-atendimento', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/integracao/laboratorio/recebe-atendimento',
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

        it('Validar retorno 401 - /api/v1/integracao/laboratorio/recebe-atendimento', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/integracao/laboratorio/recebe-atendimento',
                headers: {
                    //'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: {
                    "provedor": "PARDINI",
                    "filaColetaUuid": "1",
                    "altura": 1.83,
                    "peso": 85.4,
                    "dataHoraDum": "YYYYMMDDHHMM",
                    "pacienteId": 1,
                    "observacao": "Medicamentos do paciente",
                    "tipoMaterial": "Tipo do material",
                    "statusIntegracao": "Sem Integração",
                    "exames": [
                        {
                            "id": 123,
                            "mneumonicoExame": "17AN",
                            "volumeColetadoMl": "256",
                            "regiaoColeta": "Cabelo"
                        }
                    ]
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(401);
            })
        })
    })

    describe('Módulo - Integração Laboratório - Cancela o pedido', () => {

        it('Validar retorno 201 - /api/v1/integracao/laboratorio/cancela-atendimento', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/integracao/laboratorio/cancela-atendimento',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: {
                    "provedor": "PARDINI",
                    "filaColetaUuid": "1",
                    "altura": 1.83,
                    "peso": 85.4,
                    "dataHoraDum": "YYYYMMDDHHMM",
                    "pacienteId": 1,
                    "observacao": "Medicamentos do paciente",
                    "tipoMaterial": "Tipo do material",
                    "statusIntegracao": "Sem Integração",
                    "exames": [
                        {
                            "id": 123,
                            "mneumonicoExame": "17AN",
                            "volumeColetadoMl": "256",
                            "regiaoColeta": "Cabelo"
                        }
                    ]
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(201);
            })
        })

        it('Validar retorno 400 - /api/v1/integracao/laboratorio/cancela-atendimento', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/integracao/laboratorio/cancela-atendimento',
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

        it('Validar retorno 401 - /api/v1/integracao/laboratorio/cancela-atendimento', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/integracao/laboratorio/cancela-atendimento',
                headers: {
                    //'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: {
                    "provedor": "PARDINI",
                    "filaColetaUuid": "1",
                    "altura": 1.83,
                    "peso": 85.4,
                    "dataHoraDum": "YYYYMMDDHHMM",
                    "pacienteId": 1,
                    "observacao": "Medicamentos do paciente",
                    "tipoMaterial": "Tipo do material",
                    "statusIntegracao": "Sem Integração",
                    "exames": [
                        {
                            "id": 123,
                            "mneumonicoExame": "17AN",
                            "volumeColetadoMl": "256",
                            "regiaoColeta": "Cabelo"
                        }
                    ]
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(401);
            })
        })
    })

    describe('Módulo - Integração Laboratório - Busca dados do mnemonico na base da PARDINI', () => {

        it('Validar retorno 200 - /api/v1/integracao/laboratorio/cd-exame', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/integracao/laboratorio/cd-exame?provedor=PARDINI&procedimento=123',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(200);
            })
        })

        it('Validar retorno 400 - /api/v1/integracao/laboratorio/cd-exame', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/integracao/laboratorio/cd-exame',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(400);
            })
        })

        it('Validar retorno 401 - /api/v1/integracao/laboratorio/cancela-atendimento', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/integracao/laboratorio/cd-exame',
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

    describe('Módulo - Integração Laboratório - Imprime etiqueta da fila de coleta', () => {

        it('Validar retorno 200 - /api/v1/integracao/laboratorio/imprime-etiqueta/{filaColetaId}', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/integracao/laboratorio/imprime-etiqueta/123?provedor=PARDINI',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(200);
                expect(response.body).to.have.property('flagDeError');
                expect(response.body).to.have.property('codigo');
                expect(response.body).to.have.property('mensagem');
            })
        })

        it('Validar retorno 400 - /api/v1/integracao/laboratorio/imprime-etiqueta/{filaColetaId}', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/integracao/laboratorio/imprime-etiqueta/{filaColetaId}',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(400);
            })
        })

        it('Validar retorno 401 - /api/v1/integracao/laboratorio/imprime-etiqueta/{filaColetaId}', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/integracao/laboratorio/imprime-etiqueta/{filaColetaId}',
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

    describe('Módulo - Integração Laboratório - Teste de conectividade Pardini', () => {

        it('Validar retorno 201 - /api/v1/integracao/laboratorio/conectividade', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/integracao/laboratorio/conectividade',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: {
                    "provedor": "PARDINI",
                    "codigoApoiado": "12000",
                    "codigoSenhaIntegracao": "PASSWORD"
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(201);
            })
        })

        it('Validar retorno 400 - /api/v1/integracao/laboratorio/conectividade', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/integracao/laboratorio/conectividade',
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

        it('Validar retorno 401 - /api/v1/integracao/laboratorio/conectividade', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/integracao/laboratorio/conectividade',
                headers: {
                    //'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: {
                    "provedor": "PARDINI",
                    "filaColetaUuid": "1",
                    "altura": 1.83,
                    "peso": 85.4,
                    "dataHoraDum": "YYYYMMDDHHMM",
                    "pacienteId": 1,
                    "observacao": "Medicamentos do paciente",
                    "tipoMaterial": "Tipo do material",
                    "statusIntegracao": "Sem Integração",
                    "exames": [
                        {
                            "id": 123,
                            "mneumonicoExame": "17AN",
                            "volumeColetadoMl": "256",
                            "regiaoColeta": "Cabelo"
                        }
                    ]
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(401);
            })
        })
    })

    describe('Módulo - Integração Laboratório - Imprime comprovante da fila de coleta', () => {

        it('Validar retorno 200 - /api/v1/integracao/laboratorio/comprovante/{filaColetaId}', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/integracao/laboratorio/comprovante/{filaColetaId}',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(200);
            })
        })

        it('Validar retorno 400 - /api/v1/integracao/laboratorio/comprovante/{filaColetaId}', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/integracao/laboratorio/comprovante/{filaColetaId}',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(400);
            })
        })

        it('Validar retorno 401 - /api/v1/integracao/laboratorio/comprovante/{filaColetaId}', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/integracao/laboratorio/comprovante/{filaColetaId}',
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

    describe('Módulo - Integração Laboratório - Consulta o status do item do atendimento', () => {

        it('Validar retorno 200 - /api/v1/integracao/laboratorio/exames/{filaColetaExamId}/status', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/integracao/laboratorio/exames/{filaColetaExamId}/status',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(200);
            })
        })

        it('Validar retorno 400 - /api/v1/integracao/laboratorio/exames/{filaColetaExamId}/status', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/integracao/laboratorio/exames/{filaColetaExamId}/status',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(400);
            })
        })

        it('Validar retorno 401 - /api/v1/integracao/laboratorio/exames/{filaColetaExamId}/status', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/integracao/laboratorio/exames/{filaColetaExamId}/status',
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

    describe('Módulo - Integração Laboratório - URL do laudo salvo na OCI', () => {

        it('Validar retorno 200 - /api/v1/integracao/laboratorio/exames/{filaColetaExamId}/resultado', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/integracao/laboratorio/exames/{filaColetaExamId}/resultado',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(200);
            })
        })

        it('Validar retorno 400 - /api/v1/integracao/laboratorio/exames/{filaColetaExamId}/resultado', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/integracao/laboratorio/exames/{filaColetaExamId}/resultado',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(400);
            })
        })

        it('Validar retorno 401 - /api/v1/integracao/laboratorio/exames/{filaColetaExamId}/resultado', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/integracao/laboratorio/exames/{filaColetaExamId}/resultado',
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