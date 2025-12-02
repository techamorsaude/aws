/// <reference types="cypress"/>

describe('Módulo - Agendamentos', () => {
    beforeEach(() => {
        cy.login();
        cy.refreshToken()
    })

    describe('Módulo - Agendamentos - Cria um agendamento', () => {

        // before all tests: create schedule and fetch available slots to find a usable schedule/slot id
        before(() => {
            cy.login()
            cy.refreshToken()    
            cy.fixture('schedule.json').then((base) => {
                // format payload and create schedule
                cy.formatSchedulePayload(base).then((payload) => {
                    cy.attemptCreateSchedule(payload).then((res) => {
                        // store schedule creation result (may not include id)
                        Cypress.env('lastScheduleCreate', res)
                        // if API returned an id, store it for fallback
                        if (res && res.id) {
                            Cypress.env('foundScheduleId', res.id)
                            cy.log('Schedule created with id: ' + res.id)
                        } else {
                            cy.log('Schedule created without id; will try to locate it')
                        }

                        // use professional schedules endpoint to find created schedule id (retry a few times)
                        const maxAttempts = 12
                        const delayMs = 1000

                        const attemptFindSchedule = (triesLeft) => {
                            cy.log('Trying to find schedule via professional endpoint, attempts left: ' + triesLeft)
                            return cy.findScheduleIdForProfessional(payload).then((found) => {
                                if (found) {
                                    cy.log('Found schedule via professional endpoint: ' + JSON.stringify(found))
                                    Cypress.env('foundSchedule', found)
                                    Cypress.env('foundScheduleId', found.id ?? found.scheduleId ?? found.idSchedule)
                                    // attempt to find a slot once to gather time info (non-blocking)
                                    return cy.findFutureSlotForSchedule(payload).then((slot) => {
                                        if (slot) {
                                            cy.log('Also found a slot: ' + JSON.stringify(slot))
                                            Cypress.env('foundSlot', slot)
                                            Cypress.env('foundSlotId', slot.id ?? null)
                                            const fsched = slot.idSchedule ?? slot.scheduleId ?? null
                                            if (fsched) Cypress.env('foundScheduleId', fsched)
                                        }
                                        return cy.wrap(found)
                                    })
                                }
                                if (triesLeft > 0) {
                                    return cy.wait(delayMs).then(() => attemptFindSchedule(triesLeft - 1))
                                }
                                // exhausted attempts
                                cy.log('No schedule found for professional after retries')
                                Cypress.env('foundSchedule', null)
                                Cypress.env('foundScheduleId', null)
                                Cypress.env('foundSlot', null)
                                Cypress.env('foundSlotId', null)
                                return cy.wrap(null)
                            })
                        }

                        return attemptFindSchedule(maxAttempts)
                    })
                })
            })
        })
        
        it('Validar retorno 201 - POST /api/v1/appointments', () => {
            // load fixtures: appointment template + schedule base
            cy.fixture('appointment.json').then((apptTemplate) => {
                cy.fixture('schedule.json').then((base) => {
                    const token = Cypress.env('access_token')
                    const found = Cypress.env('foundSlot')
                    const slotId = Cypress.env('foundSlotId')
                    const foundScheduleId = Cypress.env('foundScheduleId')
                    const lastCreate = Cypress.env('lastScheduleCreate') ?? {}

                    const scheduleId = foundScheduleId ?? lastCreate.id ?? apptTemplate.scheduleId ?? null

                    if (!scheduleId && !slotId) {
                        throw new Error('No scheduleId or slotId available to create appointment')
                    }

                    if (found) {
                        // build the appointment using slot details (date/hora/schedule/slot id)
                        cy.buildAppointmentPayloadFromSlot(base, found).then((appointmentFromSlot) => {
                            // merge with appointment fixture for defaults (fixture values are overridden by slot-derived values)
                            const appointment = Object.assign({}, apptTemplate, appointmentFromSlot)
                            if (found.id) appointment.slotId = found.id
                            // ensure scheduleId is set
                            appointment.scheduleId = appointment.scheduleId ?? scheduleId

                            cy.log('Creating appointment from slot payload: ' + JSON.stringify(appointment))
                            cy.request({
                                method: 'POST',
                                url: '/api/v1/appointments',
                                headers: {
                                    'Authorization': `Bearer ${token}`,
                                    'Content-Type': 'application/json',
                                    'origin': 'https://amei.amorsaude.com.br',
                                    'referer': 'https://amei.amorsaude.com.br/schedule/schedule-appointment/new',
                                    'devicetype': 'desktop',
                                    'ostype': 'windows',
                                    'browser': 'chrome',
                                    'unitidfromoperator': String(base.clinicaId ?? 483),
                                    'unitnamefromoperator': 'Unidade Teste',
                                    'useridfromoperator': String(Cypress.env('useridfromoperator') ?? 1988)
                                },
                                body: appointment,
                                failOnStatusCode: false
                            }).then((response) => {
                                cy.log('Appointment response status: ' + response.status)
                                cy.log('Appointment response body: ' + JSON.stringify(response.body))
                                
                                expect(response.status).to.eq(201)
                            })
                        })
                    } else {
                        // fallback: use appointment fixture and ensure scheduleId
                        const appointment = Object.assign({}, apptTemplate)
                        appointment.scheduleId = appointment.scheduleId ?? scheduleId

                        cy.log('Creating appointment fallback payload: ' + JSON.stringify(appointment))
                        cy.request({
                            method: 'POST',
                            url: '/api/v1/appointments',
                            headers: {
                                'Authorization': `Bearer ${token}`,
                                'Content-Type': 'application/json',
                                'origin': 'https://amei.amorsaude.com.br',
                                'referer': 'https://amei.amorsaude.com.br/schedule/schedule-appointment/new',
                                'devicetype': 'desktop',
                                'ostype': 'windows',
                                'browser': 'chrome',
                                'unitidfromoperator': String(base.clinicaId ?? 483),
                                'unitnamefromoperator': 'Unidade Teste',
                                'useridfromoperator': String(Cypress.env('useridfromoperator') ?? 1988)
                            },
                            body: appointment,
                            failOnStatusCode: false
                        }).then((response) => {
                            cy.log('Appointment response status: ' + response.status)
                            cy.log('Appointment response body: ' + JSON.stringify(response.body))
                            expect(response.status).to.eq(201)
                        })
                    }
                })
            })
        })

        it('Validar retorno 400 - /api/v1/schedule', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/schedule',
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

        it('Validar retorno 401 - /api/v1/schedule', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/schedule',
                headers: {
                    //'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: {
                    "diasSemana": [
                        3
                    ],
                    "tempo": 10,
                    "compartilharGrade": true,
                    "necessitaAcolhimento": false,
                    "overbooking": false,
                    "diaInicio": 20250402,
                    "diaTermino": 20250403,
                    "horaInicio": "18:00",
                    "horaTermino": "20:30",
                    "maximoRetornos": null,
                    "deletado": false,
                    "profissionalId": 3821,
                    "localId": 59,
                    "clinicaId": 483,
                    "procedimentos": [
                        25799,
                        25800
                    ],
                    "areasAtuacao": [
                        611,
                        635
                    ],
                    "restrictions": []
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(401);
            })
        })

    })
})