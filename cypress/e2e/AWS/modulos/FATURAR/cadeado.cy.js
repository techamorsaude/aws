/// <reference types= "cypress" /> 

describe('Módulo - Cadeado', () => {
    beforeEach(() => {
        cy.login()
        cy.refreshToken()
    })
    
    describe('Módulo - Cadeado - Retorna lista de cadeados das unidades', () => {

        it('Validar retorno 200 - /api/v1/padlock', () => {

            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/padlock?page=1&limit=1',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(200)

                const body = response.body;
                expect(body).to.include.keys({
                    items: [
                        {
                            caixaId: null,
                            data: null,
                            entradas: null,
                            saidas: null,
                            saldo: null,
                            saldoInicial: null,
                            status: null,
                            unidade: null,
                            unidadeId: null,
                            cadeadoId: null,
                            parametros: null
                        }
                    ],
                    meta: {
                        totalItems: null,
                        currentPage: null,
                        itemCount: null,
                        itemsPerPage: null,
                        totalPages: null
                    }
                })
            })
        })

        it('Validar retorno 400 - /api/v1/padlock', () => {

            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/padlock', // Sem parâmetro na url
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(400)
            })
        })

        it('Validar retorno 401 - /api/v1/padlock', () => {

            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/padlock?page=1&limit=1',
                headers: {
                    //'Authorization': `Bearer ${token}`, // Token inválido
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(401)
            })
        })
    })

    describe('Módulo - Cadeado - Fecha um ou uma lista de cadeados de unidades para tal data', () => {

        it('Validar retorno 201 - /api/v1/padlock/close', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/padlock/close',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: {
                    padlocks: [
                        {
                            unityId: 483,
                            date: "20230314"
                        },
                    ]
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(201);
            })
        })

        it('Validar retorno 400 - /api/v1/padlock/close', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/padlock/close',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: { // Sem parâmetro no body
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(400);
            })
        })

        it('Validar retorno 401 - /api/v1/padlock/close', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/padlock/close',
                headers: {
                    //'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: {
                    padlocks: [
                        {
                            unityId: 483,
                            date: "20230314"
                        },
                    ]
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(401);
            })
        })
    })

    describe('Módulo - Cadeado - Reabrir modulos de um cadeado. (Enviar o id de cada modulo e reabrir)', () => {

        it('Validar retorno 201 - /api/v1/padlock/modules/reopen', () => {
            const token = Cypress.env('access_token');

            cy.api({
                method: 'POST',
                url: '/api/v1/padlock/modules/reopen',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: {
                    "padlocks": [
                        {
                            "id": 1,
                            "date": "20260801",
                            "unitId": 483
                        }
                    ],
                    "modules": [
                        {
                            "id": 1,
                            "module": "AGENDAMENTO"
                        }
                    ]
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(201)

                const items = response.body
                expect(items).to.have.property('flagDeError');
                expect(items).to.have.property('codigo');
                expect(items).to.have.property('mensagem');
            })
        })

        it('Validar retorno 400 - /api/v1/padlock/modules/reopen', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/padlock/modules/reopen',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: { // Sem parâmetro no body
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(400)
            })
        })

        it('Validar retorno 401 - /api/v1/padlock/modules/reopen', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/padlock/modules/reopen',
                headers: {
                    //'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: {
                    "padlockModuleIdsToOpen": [
                        16,
                        2
                    ],
                    "padlockModuleIdsToClose": [
                        16,
                        2
                    ]
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(401)
            })
        })
    })

    describe('Módulo - Cadeado - Retorna todos os modulos', () => {

        it('Validar retorno 200 - /api/v1/padlock/list/modules', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/padlock/list/modules',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(200)

                const items = response.body;
                items.forEach((item) => {
                    expect(item).to.have.property('id');
                    expect(item).to.have.property('module');
                })
            })
        })

        it('Validar retorno 401 - /api/v1/padlock/list/modules', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/padlock/list/modules',
                headers: {
                    //'Authorization': `Bearer ${token}`, Token inválido
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(401)
            })
        })
    })
})
