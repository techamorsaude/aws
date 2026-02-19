/// <reference types="cypress"/>

describe('Módulo - Agendamentos', () => {
    beforeEach(() => {
        cy.login()
        cy.refreshToken()
    })

    describe('Módulo - Agendamentos - Busca as informações das parcelas de 1 agendamento', () => {

        it('Validar retorno 200 - /api/v1/appointments/infos-parcelas/{schedulingId}', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/appointments/infos-parcelas/{schedulingId}',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq('200');
            })
        })
    })

    describe('Módulo - Agendamentos - Cria um agendamento.', () => {

        it('Validar retorno 200 - /api/v1/appointments', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/appointments',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq('200');
            })
        })
    })

    describe('Módulo - Agendamentos - Consultar agendamentos pelo nome ou Id do paciente.', () => {

        it('Validar retorno 200 - /api/v1/appointments', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/appointments',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq('200');
            })
        })
    })

    describe('Módulo - Agendamentos - Retorna os status do agendamento', () => {

        it('Validar retorno 200 - /api/v1/appointments/status', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/appointments/status',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq('200');
            })
        })
    })

    describe('Módulo - Agendamentos - Retorna os status do agendamento', () => {

        it('Validar retorno 200 - /api/v1/appointments/patients/professional/{professionalId}', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/appointments/patients/professional/{professionalId}',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq('200');
            })
        })
    })

    describe('Módulo - Agendamentos - Consultar especialidades disponíveis na clínica do usuário logado', () => {

        it('Validar retorno 200 - /api/v1/appointments/clinic', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/appointments/clinic',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq('200');
            })
        })
    })

    describe('Módulo - Agendamentos - Consultar horários disponíveis por especialidade.', () => {

        it('Validar retorno 200 - /api/v1/appointments/specialty', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/appointments/specialty',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq('200');
            })
        })
    })

    describe('Módulo - Agendamentos - Retorna informações estáticas de vários agendamentos.', () => {

        it('Validar retorno 200 - /api/v1/appointments/static-infos/{unitId}/{baseDate}/{slotId}', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/appointments/static-infos/{unitId}/{baseDate}/{slotId}',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq('200');
            })
        })
    })

    describe('Módulo - Agendamentos - Retorna informações dinâmicas de vários agendamentos.', () => {

        it('Validar retorno 200 - /api/v1/appointments/dynamic-infos', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/appointments/dynamic-infos',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq('200');
            })
        })
    })

    describe('Módulo - Agendamentos - Lista de checkin', () => {

        it('Validar retorno 200 - /api/v1/appointments/checkin', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/appointments/checkin',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq('200');
            })
        })
    })

    describe('Módulo - Agendamentos - Retorna o recibo do checkin em pdf', () => {

        it('Validar retorno 200 - /api/v1/appointments/checkin/{agendamentoId}/recibo', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/appointments/checkin/{agendamentoId}/recibo',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq('200');
            })
        })
    })

    describe('Módulo - Agendamentos - Retorna por id', () => {

        it('Validar retorno 200 - /api/v1/appointments/{id}', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/appointments/{id}',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq('200');
            })
        })
    })

    describe('Módulo - Agendamentos - Atualizar por id', () => {

        it('Validar retorno 200 - /api/v1/appointments/{id}', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'PUT',
                url: '/api/v1/appointments/{id}',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq('200');
            })
        })
    })

    describe('Módulo - Agendamentos - Retorna a lista de especialidades de um profissional por id', () => {

        it('Validar retorno 200 - /api/v1/appointments/professional-specialties/{professionalId}', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/appointments/professional-specialties/{professionalId}',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq('200');
            })
        })
    })

    describe('Módulo - Agendamentos - Retorna uma lista de todos os pacientes filtrado por status. - List Checkin', () => {

        it('Validar retorno 200 - /api/v1/appointments/status/patients', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/appointments/status/patients',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq('200');
            })
        })
    })

    describe('Módulo - Agendamentos - Retorna uma lista de todos as especialidades filtrado por status e pacientes. - List Checkin', () => {

        it('Validar retorno 200 - /api/v1/appointments/status/patients/specialties', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/appointments/status/patients/specialties',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq('200');
            })
        })
    })

    describe('Módulo - Agendamentos - Retorna uma lista de todos as especialidades filtrado por status e pacientes.', () => {

        it('Validar retorno 200 - /api/v1/appointments/specialties/patients/date', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/appointments/specialties/patients/date',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq('200');
            })
        })
    })

    describe('Módulo - Agendamentos - Remarcar agendamento', () => {

        it('Validar retorno 200 - /api/v1/appointments/{id}/reschedule', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'PUT',
                url: '/api/v1/appointments/{id}/reschedule',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq('200');
            })
        })
    })

    describe('Módulo - Agendamentos - Retorna lista de motivos de remarcação.', () => {

        it('Validar retorno 200 - /api/v1/appointments/reschedule/motives', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/appointments/reschedule/motives',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq('200');
            })
        })
    })

    describe('Módulo - Agendamentos - Atualizar status para confirmar agendamentos.', () => {

        it('Validar retorno 200 - /api/v1/appointments/confirm/{id}', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'PUT',
                url: '/api/v1/appointments/confirm/{id}',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq('200');
            })
        })
    })

    describe('Módulo - Agendamentos - Atualizar status quando no checkin de agendamentos.', () => {

        it('Validar retorno 200 - /api/v1/appointments/checkin/{id}', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'PUT',
                url: '/api/v1/appointments/checkin/{id}',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq('200');
            })
        })
    })

    describe('Módulo - Agendamentos - Checkin de retorno de agendamento.', () => {

        it('Validar retorno 200 - /api/v1/appointments/checkin/return/{id}', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/appointments/checkin/return/{id}',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq('200');
            })
        })
    })

    describe('Módulo - Agendamentos - Retorna uma lista com paginação de todos os agendamentos - Confirmar Agendamento', () => {

        it('Validar retorno 200 - /api/v1/appointments/confirm/status', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/appointments/confirm/status',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq('200');
            })
        })
    })

    describe('Módulo - Agendamentos - Retorna uma lista com paginação de todos os agendamentos - Confirmar Agendamento', () => {

        it('Validar retorno 200 - /api/v1/appointments/confirm/status/all', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/appointments/confirm/status/all',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq('200');
            })
        })
    })

    describe('Módulo - Agendamentos - Retorna historico do agendamento', () => {

        it('Validar retorno 200 - /api/v1/appointments/{id}/historic', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/appointments/{id}/historic',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq('200');
            })
        })
    })

    describe('Módulo - Agendamentos - Atualizar por id', () => {

        it('Validar retorno 200 - /api/v1/appointments/{id}/withdraw', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'PUT',
                url: '/api/v1/appointments/{id}/withdraw',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq('200');
            })
        })
    })

    describe('Módulo - Agendamentos - Usar o procedimento de uma proposta paga.', () => {

        it('Validar retorno 200 - /api/v1/appointments/procedure-proposal', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/appointments/procedure-proposal',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq('200');
            })
        })
    })

    describe('Módulo - Agendamentos - Retorna se o agendamento pode ser acessado pela clínica atual.', () => {

        it('Validar retorno 200 - /api/v1/appointments/can-access/{appointmentId}', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/appointments/can-access/{appointmentId}',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq('200');
            })
        })
    })

    describe('Módulo - Agendamentos - Retorna os detalhes de um agendamento.', () => {

        it('Validar retorno 200 - /api/v1/appointments/appointment-details/{id}', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/appointments/appointment-details/{id}',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq('200');
            })
        })
    })

    describe('Módulo - Agendamentos - Retorna por id', () => {

        it('Validar retorno 200 - /api/v1/appointments/copy-version/{id}', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/appointments/copy-version/{id}',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq('200');
            })
        })
    })

    describe('Módulo - Agendamentos - Altera o status de um agendamento.', () => {

        it('Validar retorno 200 - /api/v1/change-appointment-status/{id}', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'PUT',
                url: '/api/v1/change-appointment-status/{id}',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq('200');
            })
        })
    })
})













