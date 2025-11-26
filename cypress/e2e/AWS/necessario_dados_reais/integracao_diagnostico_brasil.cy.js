/// <reference types="cypress"/>

describe('Módulo - Integração Diagnostico Brasil', () => {
    beforeEach(() => {
        cy.login();
        cy.refreshToken();
    })

    describe('Módulo - Integração Diagnostico Brasil - Envio do pedido', () => {

        it('Validar retorno 201 - /api/v1/diagnosticos-brasil/recebe-atendimento', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/diagnosticos-brasil/recebe-atendimento',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: {
                    "filaColetaUuid": "1",
                    "altura": 1.83,
                    "peso": 85.4,
                    "dataHoraDum": "YYYYMMDDHHMM",
                    "pacienteId": 1,
                    "observacao": "Medicamentos do paciente",
                    "tipoMaterial": "Tipo do material",
                    "statusIntegracao": "Sem Integração",
                    "nameLab": "D.B",
                    "exames": [
                        {
                            "id": 123,
                            "mneumonicoExame": "17AN",
                            "materialColetado": "",
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

        it('Validar retorno 400 - /api/v1/diagnosticos-brasil/recebe-atendimento', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/diagnosticos-brasil/recebe-atendimento',
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

        it('Validar retorno 401 - /api/v1/diagnosticos-brasil/recebe-atendimento', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/diagnosticos-brasil/recebe-atendimento',
                headers: {
                    //'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: {
                    "filaColetaUuid": "1",
                    "altura": 1.83,
                    "peso": 85.4,
                    "dataHoraDum": "YYYYMMDDHHMM",
                    "pacienteId": 1,
                    "observacao": "Medicamentos do paciente",
                    "tipoMaterial": "Tipo do material",
                    "statusIntegracao": "Sem Integração",
                    "nameLab": "D.B",
                    "exames": [
                        {
                            "id": 123,
                            "mneumonicoExame": "17AN",
                            "materialColetado": "",
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

    describe('Módulo - Integração Diagnostico Brasil - Envio do pedido', () => {

        it('Validar retorno 201 - /api/v1/diagnosticos-brasil/cancela-atendimento', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/diagnosticos-brasil/cancela-atendimento',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: {
                    "filaColetaUuid": "1",
                    "altura": 1.83,
                    "peso": 85.4,
                    "dataHoraDum": "YYYYMMDDHHMM",
                    "pacienteId": 1,
                    "observacao": "Medicamentos do paciente",
                    "tipoMaterial": "Tipo do material",
                    "statusIntegracao": "Sem Integração",
                    "nameLab": "D.B",
                    "exames": [
                        {
                            "id": 123,
                            "mneumonicoExame": "17AN",
                            "materialColetado": "",
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

        it('Validar retorno 400 - /api/v1/diagnosticos-brasil/cancela-atendimento', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/diagnosticos-brasil/cancela-atendimento',
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

        it('Validar retorno 401 - /api/v1/diagnosticos-brasil/cancela-atendimento', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/diagnosticos-brasil/cancela-atendimento',
                headers: {
                    //'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: {
                    "filaColetaUuid": "1",
                    "altura": 1.83,
                    "peso": 85.4,
                    "dataHoraDum": "YYYYMMDDHHMM",
                    "pacienteId": 1,
                    "observacao": "Medicamentos do paciente",
                    "tipoMaterial": "Tipo do material",
                    "statusIntegracao": "Sem Integração",
                    "nameLab": "D.B",
                    "exames": [
                        {
                            "id": 123,
                            "mneumonicoExame": "17AN",
                            "materialColetado": "",
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

    describe('Módulo - Integração Diagnostico Brasil - Limpa a pendencia/mpp e imprimi a nova etiqueta', () => {

        it('Validar retorno 201 - /api/v1/diagnosticos-brasil/envia-amostras-procedimentos-pendentes', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/diagnosticos-brasil/envia-amostras-procedimentos-pendentes',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: {
                    "CodigoApoiado": "123456",
                    "CodigoSenhaIntegracao": "abcde12345",
                    "Amostras": [
                        {
                            "codigo": "001",
                            "tipo": "Sangue"
                        }
                    ],
                    "targetNSAlias": "ns1",
                    "targetNamespace": "http://exemplo.com/ns"
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(201);
            })
        })

        it('Validar retorno 400 - /api/v1/diagnosticos-brasil/envia-amostras-procedimentos-pendentes', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/diagnosticos-brasil/envia-amostras-procedimentos-pendentes',
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

        it('Validar retorno 401 - /api/v1/diagnosticos-brasil/envia-amostras-procedimentos-pendentes', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/diagnosticos-brasil/envia-amostras-procedimentos-pendentes',
                headers: {
                    //'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: {
                    "CodigoApoiado": "123456",
                    "CodigoSenhaIntegracao": "abcde12345",
                    "Amostras": [
                        {
                            "codigo": "001",
                            "tipo": "Sangue"
                        }
                    ],
                    "targetNSAlias": "ns1",
                    "targetNamespace": "http://exemplo.com/ns"
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(401);
            })
        })
    })

    describe('Módulo - Integração Diagnostico Brasil - Reimpressão de etiquetas', () => {

        it('Validar retorno 201 - /api/v1/diagnosticos-brasil/envia-amostras', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/diagnosticos-brasil/envia-amostras',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(201);
            })
        })

        it('Validar retorno 401 - /api/v1/diagnosticos-brasil/envia-amostras', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/diagnosticos-brasil/envia-amostras',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(401);
            })
        })
    })

    describe('Módulo - Integração Diagnostico Brasil - Busca dos resultados por período', () => {

        it('Validar retorno 201 - /api/v1/diagnosticos-brasil/envia-laudo-atendimento-por-periodo', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/diagnosticos-brasil/envia-laudo-atendimento-por-periodo',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: {
                    "CodigoApoiado": "123456",
                    "CodigoSenhaIntegracao": "abcde12345",
                    "dtInicial": "2024-01-01",
                    "dtFinal": "2024-01-31",
                    "targetNSAlias": "ns1",
                    "targetNamespace": "http://exemplo.com/ns"
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(201);
            })
        })

        it('Validar retorno 400 - /api/v1/diagnosticos-brasil/envia-laudo-atendimento-por-periodo', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/diagnosticos-brasil/envia-laudo-atendimento-por-periodo',
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

        it('Validar retorno 401 - /api/v1/diagnosticos-brasil/envia-laudo-atendimento-por-periodo', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/diagnosticos-brasil/envia-laudo-atendimento-por-periodo',
                headers: {
                    //'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: {
                    "CodigoApoiado": "123456",
                    "CodigoSenhaIntegracao": "abcde12345",
                    "dtInicial": "2024-01-01",
                    "dtFinal": "2024-01-31",
                    "targetNSAlias": "ns1",
                    "targetNamespace": "http://exemplo.com/ns"
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(401);
            })
        })
    })

    describe('Módulo - Integração Diagnostico Brasil - Laudo PDF', () => {

        it('Validar retorno 200 - /api/v1/diagnosticos-brasil/exames/{exameId}/resultado', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/diagnosticos-brasil/exames/{exameId}/resultado',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(200);
            })
        })

        it('Validar retorno 400 - /api/v1/diagnosticos-brasil/exames/{exameId}/resultado', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/diagnosticos-brasil/exames/{exameId}/resultado',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(400);
            })
        })

        it('Validar retorno 401 - /api/v1/diagnosticos-brasil/exames/{exameId}/resultado', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/diagnosticos-brasil/exames/{exameId}/resultado',
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

    describe('Módulo - Integração Diagnostico Brasil - Lista os procedimentos com pendencia/mpp', () => {

        it('Validar retorno 201 - /api/v1/diagnosticos-brasil/lista-procedimentos-pendentes', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/diagnosticos-brasil/lista-procedimentos-pendentes',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: {
                    "CodigoApoiado": "123456",
                    "CodigoSenhaIntegracao": "abcde12345",
                    "dtInicial": "2024-01-01",
                    "dtFinal": "2024-01-31",
                    "targetNSAlias": "ns1",
                    "targetNamespace": "http://exemplo.com/ns"
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(201);
            })
        })

        it('Validar retorno 400 - /api/v1/diagnosticos-brasil/lista-procedimentos-pendentes', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/diagnosticos-brasil/lista-procedimentos-pendentes',
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

        it('Validar retorno 401 - /api/v1/diagnosticos-brasil/lista-procedimentos-pendentes', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/diagnosticos-brasil/lista-procedimentos-pendentes',
                headers: {
                    //'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: {
                    "CodigoApoiado": "123456",
                    "CodigoSenhaIntegracao": "abcde12345",
                    "dtInicial": "2024-01-01",
                    "dtFinal": "2024-01-31",
                    "targetNSAlias": "ns1",
                    "targetNamespace": "http://exemplo.com/ns"
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(401);
            })
        })
    })

    describe('Módulo - Integração Diagnostico Brasil - Consulta o status do atendimento', () => {
        
        it('Validar retorno 200 - /api/v1/diagnosticos-brasil/exames/{exameId}/status', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/diagnosticos-brasil/exames/{exameId}/status',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(200);
            })
        })

        it('Validar retorno 400 - /api/v1/diagnosticos-brasil/exames/{exameId}/status', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/diagnosticos-brasil/exames/{exameId}/status',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(400);
            })
        })

        it('Validar retorno 401 - /api/v1/diagnosticos-brasil/exames/{exameId}/status', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/diagnosticos-brasil/exames/{exameId}/status',
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

    describe('Módulo - Integração Diagnostico Brasil - Imprime comprovante da fila de coleta', () => {
        
        it('Validar retorno 200 - /api/v1/diagnosticos-brasil/comprovante/{filaColetaId}', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/diagnosticos-brasil/comprovante/{filaColetaId}',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(200);
            })
        })

        it('Validar retorno 400 - /api/v1/diagnosticos-brasil/comprovante/{filaColetaId}', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/diagnosticos-brasil/comprovante/{filaColetaId}',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(400);
            })
        })

        it('Validar retorno 401 - /api/v1/diagnosticos-brasil/comprovante/{filaColetaId}', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/diagnosticos-brasil/comprovante/{filaColetaId}',
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

    describe('Módulo - Integração Diagnostico Brasil - Imprime etiqueta da fila de coleta', () => {
        
        it('Validar retorno 200 - /api/v1/diagnosticos-brasil/imprime-etiqueta/{filaColetaId}', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/diagnosticos-brasil/imprime-etiqueta/{filaColetaId}',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(200);
            })
        })

        it('Validar retorno 400 - /api/v1/diagnosticos-brasil/imprime-etiqueta/{filaColetaId}', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/diagnosticos-brasil/imprime-etiqueta/{filaColetaId}',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(400);
            })
        })

        it('Validar retorno 401 - /api/v1/diagnosticos-brasil/imprime-etiqueta/{filaColetaId}', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/diagnosticos-brasil/imprime-etiqueta/{filaColetaId}',
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