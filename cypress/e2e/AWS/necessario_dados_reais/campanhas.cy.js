/// <reference types="cypress"/>

describe('Módulo - Campanhas', () => {
    beforeEach(() => {
        cy.login();
        cy.refreshToken();
    })

    describe('Módulo - Campanhas', () => {

        it('Validar retorno 201 - /api/v1/campaigns', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/campaigns',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: {
                    codePrefix: "TESTEQ",
                    nameCampaign: "TESTEQA",
                    privateValue: 0,
                    valueCDT: 0,
                    dateStartSale: "27/11/2025",
                    dateValiditySale: "27/11/2025",
                    amountLimitCPF: 1,
                    flagUnlimited: false,
                    flgOnline: false,
                    validityType: 2,
                    specialtyId: 611,
                    amountDays: 30,
                    description: "",
                    flagStatus: "A",
                    flagHighlights: false,
                    procedures: [
                        {
                            id: 20357,
                            usageLimit: 1,
                            procedure: "Consulta Áreas de Atuação"
                        }
                    ],
                    unitsIds: [483],
                    ipClient: "127.0.0.1"
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(400)

                expect(response.body).to.have.property('codigo');
                expect(response.body).to.have.property('flagDeError');
                expect(response.body).to.have.property('mensagem');
            })
        })

        it('Validar retorno 400 - /api/v1/campaigns', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/campaigns',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: {
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(400)
            })
        })

        it('Validar retorno 401 - /api/v1/campaigns', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/campaigns',
                headers: {
                    //'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: {
                    codePrefix: 'TESTEA',
                    nameCampaign: 'TESTE API',
                    privateValue: 0,
                    valueCDT: 0,
                    dateStartSale: '18/11/2025',
                    dateValiditySale: '18/11/2025',
                    amountLimitCPF: 1,
                    flagUnlimited: false,
                    flgOnline: false,
                    validityType: 2,
                    specialtyIds: [
                        611
                    ],
                    amountDays: 30,
                    description: 'teste',
                    flagStatus: 'A',
                    flagHighlights: false,
                    procedures: {
                        "id": 20715,
                        "usageLimit": 1,
                        "procedure": "Sessão Acupuntura"
                    },
                    coverageType: 'NATIONAL',
                    ipClient: '127.0.0.1'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(401)
            })
        })
    })

    describe('Módulo - Campanhas - Lista de campanhas', () => {

        it('Validar retorno 200 - /api/v1/campaigns', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/campaigns?page=1&limit=2',
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

        it('Validar retorno 401 - /api/v1/campaigns', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/campaigns',
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

    describe('Módulo - Campanhas', () => {

        it('Validar retorno 200 - /api/v1/campaign/{id}', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'PATCH',
                url: '/api/v1/campaign/102',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: {
                    codePrefix: 'TESTEA',
                    nameCampaign: 'TESTE API2',
                    privateValue: 0,
                    valueCDT: 0,
                    dateStartSale: '18/11/2025',
                    dateValiditySale: '18/11/2025',
                    amountLimitCPF: 1,
                    flagUnlimited: false,
                    flgOnline: false,
                    validityType: 2,
                    specialtyIds: [
                        611
                    ],
                    amountDays: 30,
                    description: 'teste',
                    flagStatus: 'A',
                    flagHighlights: false,
                    procedures: {
                        "id": 20715,
                        "usageLimit": 1,
                        "procedure": "Sessão Acupuntura"
                    },
                    coverageType: 'NATIONAL',
                    ipClient: '127.0.0.1'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(200);
            })
        })

        it('Validar retorno 400 - /api/v1/campaign/{id}', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'PATCH',
                url: '/api/v1/campaign/{id}',
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

        it('Validar retorno 401 - /api/v1/campaign/{id}', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'PATCH',
                url: '/api/v1/campaign/{id}',
                headers: {
                    //'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: {
                    codePrefix: 'TESTEA',
                    nameCampaign: 'TESTE API2',
                    privateValue: 0,
                    valueCDT: 0,
                    dateStartSale: '18/11/2025',
                    dateValiditySale: '18/11/2025',
                    amountLimitCPF: 1,
                    flagUnlimited: false,
                    flgOnline: false,
                    validityType: 2,
                    specialtyIds: [
                        611
                    ],
                    amountDays: 30,
                    description: 'teste',
                    flagStatus: 'A',
                    flagHighlights: false,
                    procedures: {
                        "id": 20715,
                        "usageLimit": 1,
                        "procedure": "Sessão Acupuntura"
                    },
                    coverageType: 'NATIONAL',
                    ipClient: '127.0.0.1'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(401);
            })
        })
    })

    describe('Módulo - Campanhas - Listar campanha por id', () => {

        it.only('Validar retorno 200 - /api/v1/campaign/{id}', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/campaign/102',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(200);
            })
        })

        it('Validar retorno 400 - /api/v1/campaign/{id}', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/campaign/{id}',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(400);
            })
        })

        it('Validar retorno 401 - /api/v1/campaign/{id}', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/campaign/{id}',
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

    describe('Módulo - Campanhas - Remover Campanha', () => {

        it('Validar retorno 200 - /api/v1/campaign/{id}', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'DELETE',
                url: '/api/v1/campaign/{id}',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: {
                    "id": 1,
                    "ipClient": "1.11"
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(200);
            })
        })

        it('Validar retorno 400 - /api/v1/campaign/{id}', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'DELETE',
                url: '/api/v1/campaign/{id}',
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

        it('Validar retorno 401 - /api/v1/campaign/{id}', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'DELETE',
                url: '/api/v1/campaign/{id}',
                headers: {
                    //'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: {
                    "id": 1,
                    "ipClient": "1.11"
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(401);
            })
        })
    })

    describe('Módulo - Campanhas - Lista apenas o id e nome da campanha', () => {

        it('Validar retorno 200 - /api/v1/campaigns/basic', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/campaigns/basic',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(200);
            })
        })

        it('Validar retorno 401 - /api/v1/campaigns/basic', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/campaigns/basic',
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

    describe('Módulo - Campanhas - Lista todos procedimentos de uma campanha cadastrada', () => {

        it('Validar retorno 200 - /api/v1/campaigns/{id}/proposal-data', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/campaigns/{id}/proposal-data',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(200);
            })
        })

        it('Validar retorno 400 - /api/v1/campaigns/{id}/proposal-data', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/campaigns/{id}/proposal-data',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(400);
            })
        })

        it('Validar retorno 401 - /api/v1/campaigns/{id}/proposal-data', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/campaigns/{id}/proposal-data',
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

    describe('Módulo - Campanhas - Download do banner', () => {

        it('Validar retorno 200 - /api/v1/campaign/{id}/banner', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/campaign/{id}/banner',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(200);
            })
        })

        it('Validar retorno 400 - /api/v1/campaign/{id}/banner', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/campaign/{id}/banner',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(400);
            })
        })
    })

    describe('Módulo - Campanhas - get banner name and link download', () => {

        it('Validar retorno 200 - /api/v1/campaign/{id}/banner-link', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/campaign/{id}/banner-link',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(200);
            })
        })

        it('Validar retorno 400 - /api/v1/campaign/{id}/banner-link', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/campaign/{id}/banner-link',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(400);
            })
        })
    })

    describe('Módulo - Campanhas - Remover procedimento da campanha', () => {

        it('Validar retorno 200 - /api/v1/campaign-procedure/{id}', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'DELETE',
                url: '/api/v1/campaign-procedure/{id}',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: {
                    "id": 1,
                    "ipClient": "1.11"
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(200);
            })
        })

        it('Validar retorno 400 - /api/v1/campaign-procedure/{id}', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'DELETE',
                url: '/api/v1/campaign-procedure/{id}',
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

        it('Validar retorno 401 - /api/v1/campaign-procedure/{id}', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'DELETE',
                url: '/api/v1/campaign-procedure/{id}',
                headers: {
                    //'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: {
                    "id": 1,
                    "ipClient": "1.11"
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(401);
            })
        })
    })

    describe('Módulo - Campanhas - Lista campanha em destaque caso houver campanha em destaque vigente', () => {

        it('Validar retorno 200 - /api/v1/campaigns/emphasis-campaign', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/campaigns/emphasis-campaign',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(200);
            })
        })

        it('Validar retorno 400 - /api/v1/campaigns/emphasis-campaign', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/campaigns/emphasis-campaign',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(400);
            })
        })

        it('Validar retorno 401 - /api/v1/campaigns/emphasis-campaign', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/campaigns/emphasis-campaign',
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