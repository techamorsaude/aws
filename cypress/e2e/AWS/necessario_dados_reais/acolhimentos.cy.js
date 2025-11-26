/// <reference types="cypress" />

describe('Módulo - Acolhimentos', () => {
    beforeEach(() => {
        cy.login();
        cy.refreshToken();
    })

    // Precisa de dados reais do Amei
    describe('Módulo - Acolhimentos - Cadastrar dados do acolhimento', () => {

        it('Validar retorno 201 - /api/v1/acolhimentos', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/acolhimentos',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: {
                    "atendimentoId": 132236,
                    "agendamentoId": 178893,
                    "peso": 0,
                    "altura": 0,
                    "imc": 0,
                    "perimetroCefalico": 0,
                    "circunferenciaAbdominal": 0,
                    "posicaoPa": "",
                    "paSistolica": 0,
                    "paDiastolica": 0,
                    "freqCardiaca": 0,
                    "freqRespiratoria": 0,
                    "temperaturaAux": 0,
                    "glicemiaCapilar": 0,
                    "oximetria": 0,
                    "time": "00:00:22",
                    "anamnese": ""
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(201)
                expect(response.body).to.have.property('codigo');
                expect(response.body).to.have.property('flagDeError');
                expect(response.body).to.have.property('mensagem');
            })
        })

        it('Validar retorno 400 - /api/v1/acolhimentos', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/acolhimentos',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: {
                    // sem parâmetro
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(400)
            })
        })

        it('Validar retorno 401 - /api/v1/acolhimentos', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/acolhimentos',
                headers: {
                    //'Authorization': `Bearer ${token}`, token inválido
                    'Content-Type': 'application/json'
                },
                body: {
                    atendimentoId: 129003,
                    agendamentoId: 151586,
                    peso: 70,
                    altura: 171,
                    imc: 23.94,
                    perimetroCefalico: 100,
                    circunferenciaAbdominal: 90,
                    posicaoPa: "Deitado",
                    paSistolica: 118,
                    paDiastolica: 120,
                    freqCardiaca: 123,
                    freqRespiratoria: 123,
                    temperaturaAux: 36,
                    glicemiaCapilar: 13,
                    oximetria: 29,
                    time: "00:01:40",
                    anamnese: "testeAPI"
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(401)
            })
        })
    })

    describe('Módulo - Acolhimentos - Retorna dados antropmétricos de um agendamento', () => {

        it('Validar retorno 200 - /api/v1/acolhimentos/{id}/dados-antropometricos', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/acolhimentos/2302/dados-antropometricos',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(200);
            })
        })

        it('Validar retorno 400 - /api/v1/acolhimentos/{id}/dados-antropometricos', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/acolhimentos/{id}/dados-antropometricos', // sem parâmetro
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(400);
            })
        })

        it('Validar retorno 401 - /api/v1/acolhimentos/{id}/dados-antropometricos', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/acolhimentos/0/dados-antropometricos',
                headers: {
                    //'Authorization': `Bearer ${token}`, token inválido
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(401);
            })
        })
    })

    describe('Módulo - Acolhimentos - Retorna dados de um acolhimento pelo id do agendamento', () => {

        it('Validar retorno 200 - /api/v1/acolhimentos/{id}/sinais-vitais', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/acolhimentos/0/sinais-vitais',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(200)
            })
        })

        it('Validar retorno 400 - /api/v1/acolhimentos/{id}/sinais-vitais', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/acolhimentos/{id}}/sinais-vitais', //sem parâmetro
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(400)
            })
        })

        it('Validar retorno 401 - /api/v1/acolhimentos/{id}/sinais-vitais', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/acolhimentos/0/sinais-vitais',
                headers: {
                    //'Authorization': `Bearer ${token}`, token inválido
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(401)
            })
        })
    })

    describe('Módulo - Acolhimentos - Retorno dados de um acolhimento pelo id do agendamento', () => {

        it('Validar retorno 200 - /api/v1/acolhimentos/{id}/dados-acolhimento', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/acolhimentos/0/dados-acolhimento',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(200)
                expect(response.body).to.have.property('agendamentoId');
            })
        })

        it('Validar retorno 400 - /api/v1/acolhimentos/{id}/dados-acolhimento', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/acolhimentos/{id}/dados-acolhimento', // sem parâmetro
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(400)
            })
        })

        it('Validar retorno 401 - /api/v1/acolhimentos/{id}/dados-acolhimento', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/acolhimentos/0/dados-acolhimento',
                headers: {
                    //'Authorization': `Bearer ${token}`, token inválido
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(401)
            })
        })
    })

    // Precisa de dados reais do Amei
    describe('Módulo - Acolhimentos - Muda status do agendamento', () => {

        it('Validar retorno 200 - /api/v1/acolhimentos/iniciar/{agendamentoId}', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'PUT',
                url: '/api/v1/acolhimentos/iniciar/178893',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: {
                    statusAgendamentoId: 12
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(200)
                const body = response.body;
                expect(body).to.have.property('codigo');
                expect(body).to.have.property('flagDeError');
                expect(body).to.have.property('mensagem');
            })
        })

        it('Validar retorno 400 - /api/v1/acolhimentos/iniciar/{agendamentoId}', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'PUT',
                url: '/api/v1/acolhimentos/iniciar/173155',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: {
                    //statusAgendamentoId: 12 sem parâmetro no body
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(400)
            })
        })

        it('Validar retorno 401 - /api/v1/acolhimentos/iniciar/{agendamentoId}', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'PUT',
                url: '/api/v1/acolhimentos/iniciar/173155',
                headers: {
                    //'Authorization': `Bearer ${token}`, token inválido
                    'Content-Type': 'application/json'
                },
                body: {
                    statusAgendamentoId: 12
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(401)
            })
        })
    })

    describe('Módulo - Acolhimentos - Appointments by Status', () => {

        it.only('Validar retorno 200 - /api/v1/acolhimentos/list-appointments-by-status', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/acolhimentos/list-appointments-by-status?date=20251117&page=1&perPage=1',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(200)

                const body = response.body;
                expect(body).to.have.property('meta').to.include.all.keys(
                    'page',
                    'perPage',
                    'total'
                )
                expect(body).to.have.property('data').to.be.an('array')
                body.data.forEach((item) => {
                    expect(item).to.have.property('procedimento').to.be.an('array');
                    expect(item).to.have.property('dataAtendimentoISO');
                    expect(item).to.have.property('flgNecessitaAcolhimento').to.be.an('array');
                    expect(item).to.have.property('horaInicio');
                    expect(item).to.have.property('horaChegada');
                    expect(item).to.have.property('horaCheckIn');
                    expect(item).to.have.property('pacienteIdade');
                    expect(item).to.have.property('professional');
                    expect(item).to.have.property('id');
                    expect(item).to.have.property('statusId');
                    expect(item).to.have.property('status');
                })
            })
        })

        it('Validar retorno 400 - /api/v1/acolhimentos/list-appointments-by-status', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/acolhimentos/list-appointments-by-status', // sem parâmetro
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(400)
            })
        })

        it('Validar retorno 401 - /api/v1/acolhimentos/list-appointments-by-status', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/acolhimentos/list-appointments-by-status?date=20250924&page=1&perPage=10',
                headers: {
                    //'Authorization': `Bearer ${token}`, token inválido
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(401)
            })
        })
    })
})