/// <reference types= "cypress" /> 

describe('Módulo - Eventos', () => {

    beforeEach(() => {
        cy.login()
        cy.refreshToken()
    });

    describe('Modulo - Eventos /api/v1/eventos/agendamento', () => {

        it('Validar retorno 200 - /api/v1/eventos/agendamento ', () => {

            const token = Cypress.env('access_token');

            cy.api({
                method: 'GET',
                url: '/api/v1/eventos/agendamento',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                qs: {  // query params
                    id: 1,
                    dataInicial: '2026-01-13',
                    dataFinal: '2026-01-13',
                    statusAgendamentoId: 2,
                    evento: 'booking/create',
                    especialidadeId: 1,
                    unidadeId: 1,
                    canal: 'site'
                }, failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(200)
                // adiciona mais validações conforme o retorno esperado
            })

        });

        it('Validar retorno 400 - /api/v1/eventos/agendamento', () => {

            const token = Cypress.env('access_token');

            cy.api({
                method: 'GET',
                url: '/api/v1/eventos/agendamento',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                qs: {  // query params
                    id: 1,
                    dataInicial: '2026-01-16',
                    dataFinal: '2026-01-16',
                    statusAgendamentoId: 2,
                    evento: 'booking/create',
                    especialidadeId: 1,
                    unidadeId: 1,
                    canal: 'site'
                }, failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(400)
                // adiciona mais validações conforme o retorno esperado
            })

        });
        
    });

    describe('Modulo - Eventos /api/v1/eventos/proposta', () => {

        it('Validar retorno 200 - /api/v1/eventos/proposta', () => {

            const token = Cypress.env('access_token');

            cy.api({
                method: 'GET',
                url: '/api/v1/eventos/proposta',
                failOnStatusCode: false,
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                qs: {
                    // todos opcionais - adiciona conforme precisar
                }
            }).then((response) => {
                expect(response.status).to.eq(200)
                cy.log('Body:', JSON.stringify(response.body))
            })


        });

        it('Validar retorno 400 - /api/v1/eventos/proposta', () => {

            const token = Cypress.env('access_token');

            cy.api({
                method: 'GET',
                url: '/api/v1/eventos/proposta',
                failOnStatusCode: false,
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                qs: {
                    id: 1,
                    evento: 'proposal/create',
                    dataInicial: '2026-01-19',
                    dataFinal: '2026-01-19',
                    propostaStatus: 'Aprovada pelo cliente',
                    especialidadeId: 1,
                    unidadeId: 1,
                    profissionalId: 1,
                    origem: 'origem'
                }
            }).then((response) => {
                expect(response.status).to.eq(400)
            })

        });

    });
});