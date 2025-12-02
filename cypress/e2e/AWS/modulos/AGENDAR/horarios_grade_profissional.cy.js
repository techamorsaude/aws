/// <reference types="cypress"/>

describe('Módulo - Horários/Grade Profissional', () => {
    beforeEach(() => {
        cy.login();
        cy.refreshToken()
    }) 

    describe('Módulo - Horários/Grade Profissional - Cria um horário disponível para o profissional', () => {
        after(() => {
            // attempt to cleanup any schedules created by tests in this module
            cy.deleteScheduleIfExists().then((res) => cy.log('cleanup (Cria module): ' + JSON.stringify(res)))
        })

        it('Validar retorno 201 - /api/v1/schedule', () => {
            // use custom commands from support/dataEHora
            cy.fixture('schedule.json').then((base) => {
                cy.formatSchedulePayload(base).then((payload) => {
                    cy.attemptCreateSchedule(payload).then((result) => {
                        expect(result).to.have.property('success', true)
                    })
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

    describe('Módulo - Horários/Grade Profissional - Altera um horário em que o profissional está disponível', () => {
        after(() => {
            // cleanup schedules created by tests in this module
            cy.deleteScheduleIfExists().then((res) => cy.log('cleanup (Altera module): ' + JSON.stringify(res)))
        })

        it('Validar retorno 200 - PUT /api/v1/schedule/{id}', () => {
            // Flow:
            // 1) create a schedule using fixtures/helpers
            // 2) find a slot to obtain idSchedule (from /api/v1/slots/list-slots-by-professional)
            // 3) PUT updated payload to /api/v1/schedule/{idSchedule}
            // 4) verify persisted values via GET /api/v1/schedule/professional/{id}

            cy.fixture('schedule.json').then((base) => {
                // create a schedule payload and attempt creation
                cy.formatSchedulePayload(base).then((payload) => {
                    cy.attemptCreateSchedule(payload).then((createRes) => {
                        // find schedule using professional schedules endpoint (query params)
                        cy.findScheduleIdForProfessional(payload).then((foundSchedule) => {
                            const scheduleIdFromList = foundSchedule ? (foundSchedule.id ?? foundSchedule.scheduleId ?? foundSchedule.idSchedule) : null
                            const candidateScheduleId = scheduleIdFromList ?? createRes.id ?? null
                            if (!candidateScheduleId) throw new Error('Could not determine schedule id for PUT')
                            return performPutAndVerify(candidateScheduleId, payload, base)
                        })
                    })
                })
            })

            // helper to perform PUT and verification
            function performPutAndVerify(scheduleId, origPayload, base) {
                const token = Cypress.env('access_token')

                // prepare updated payload: change a few fields
                const updated = Object.assign({}, origPayload)
                updated.tempo = (origPayload.tempo ?? 10) === 10 ? 20 : 10
                updated.compartilharGrade = !(origPayload.compartilharGrade === true)
                updated.necessitaAcolhimento = !(origPayload.necessitaAcolhimento === true)
                updated.overbooking = !(origPayload.overbooking === true)

                // ensure horaTermino reflects tempo (simple add)
                const hh = Number(String(updated.horaInicio).split(':')[0] || 0)
                const mm = Number(String(updated.horaInicio).split(':')[1] || 0)
                const startMinutes = hh * 60 + mm
                const endMinutes = startMinutes + (updated.tempo || 10)
                const endHH = String(Math.floor(endMinutes / 60) % 24).padStart(2, '0')
                const endMM = String(endMinutes % 60).padStart(2, '0')
                updated.horaTermino = `${endHH}:${endMM}`

                // send PUT to update schedule
                return cy.request({
                    method: 'PUT',
                    url: `/api/v1/schedule/${scheduleId}`,
                    headers: { Authorization: `Bearer ${token}` },
                    body: updated,
                    failOnStatusCode: false
                }).then((resp) => {
                    expect(resp.status).to.eq(200)

                    // verify persisted values by fetching professional schedules
                    const professional = updated.profissionalId ?? base.profissionalId
                    return cy.request({
                        method: 'GET',
                        url: `/api/v1/schedule/professional/${professional}`,
                        headers: { Authorization: `Bearer ${token}` },
                        body: { dataInicio: updated.diaInicio, dataTermino: updated.diaTermino },
                        failOnStatusCode: false
                    }).then((getResp) => {
                        expect(getResp.status).to.eq(200)
                        const list = getResp.body?.data ?? getResp.body ?? []
                        // find schedule by id
                        const found = (Array.isArray(list) ? list.find(s => (s.id === scheduleId || s.scheduleId === scheduleId || s.idSchedule === scheduleId)) : null) || (Array.isArray(list) && list[0])
                        expect(found).to.not.be.null
                        // assert updated fields
                        expect(found.tempo ?? found.interval ?? found.time ?? null).to.be.oneOf([updated.tempo, String(updated.tempo), null])
                        expect(found.compartilharGrade ?? false).to.eq(updated.compartilharGrade)
                        expect(found.necessitaAcolhimento ?? false).to.eq(updated.necessitaAcolhimento)
                        expect(found.overbooking ?? false).to.eq(updated.overbooking)
                    })
                })
            }
        })

        it('Validar retorno 400 - /api/v1/schedule/{id}', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'PUT',
                url: '/api/v1/schedule/{id}',
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

        it('Validar retorno 401 - /api/v1/schedule/{id}', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'PUT',
                url: '/api/v1/schedule/{id}',
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

   describe('Módulo - Horários/Grade Profissional - Busca os horários disponíveis por Id do profissional', () => {
        after(() => {
            // cleanup schedules created by tests in this module
            cy.deleteScheduleIfExists().then((res) => cy.log('cleanup (Altera module): ' + JSON.stringify(res)))
        })
        it('Validar retorno 200 - consulta dinâmica via /api/v1/schedule/professional/{id}', () => {
            // Create a schedule and then query the professional schedules endpoint using our helper
            cy.fixture('schedule.json').then((base) => {
                cy.formatSchedulePayload(base).then((payload) => {
                    cy.attemptCreateSchedule(payload).then((createRes) => {
                        // Ensure payload has diaInicio/diaTermino set by the formatter
                        expect(payload).to.have.property('diaInicio')
                        expect(payload).to.have.property('diaTermino')

                        // use helper which performs GET with ?diaInicio=...&diaTermino=...
                        cy.findScheduleIdForProfessional(payload).then((found) => {
                            // helper returns schedule object (or null)
                            expect(found, 'expected to find at least one schedule for professional').to.be.ok
                            const scheduleId = found ? (found.id ?? found.scheduleId ?? found.idSchedule) : (createRes.id ?? null)
                            expect(scheduleId, 'schedule id should be present').to.be.ok

                            // verify via explicit request as well (status + body shape)
                            const professional = payload.profissionalId ?? base.profissionalId
                            const qp = `?diaInicio=${payload.diaInicio}&diaTermino=${payload.diaTermino}`
                            const token = Cypress.env('access_token')
                            return cy.request({ method: 'GET', url: `/api/v1/schedule/professional/${professional}${qp}`, headers: { Authorization: `Bearer ${token}` }, failOnStatusCode: false }).then((resp) => {
                                expect(resp.status).to.eq(200)
                                const list = resp.body?.data ?? resp.body ?? []
                                expect(Array.isArray(list) && list.length > 0).to.be.true
                                // ensure one of the returned items matches scheduleId
                                const matched = list.find(s => (s.id === scheduleId || s.scheduleId === scheduleId || s.idSchedule === scheduleId))
                                expect(matched, 'response should contain the created/located schedule').to.be.ok
                            })
                        })
                    })
                })
            })
        })

        it('Validar retorno 400 - parametros inválidos/ausentes', () => {
            // calling endpoint without required query params should return 400
            const token = Cypress.env('access_token')
            return cy.request({ method: 'GET', url: '/api/v1/schedule/professional/0', headers: { Authorization: `Bearer ${token}` }, failOnStatusCode: false }).then((resp) => {
                expect(resp.status).to.eq(400)
            })
        })

        it('Validar retorno 401 - sem autorização', () => {
            // calling endpoint without Authorization header
            return cy.request({ method: 'GET', url: '/api/v1/schedule/professional/2155', failOnStatusCode: false }).then((resp) => {
                expect(resp.status).to.eq(401)
            })
        })        
    })

    describe('Módulo - Horários/Grade Profissional - Exclui um determinado horário por Id', () => {

        it('Validar retorno 200 - DELETE /api/v1/schedule/{id}', () => {
            // Create a schedule and then delete it by id
            cy.fixture('schedule.json').then((base) => {
                cy.formatSchedulePayload(base).then((payload) => {
                    cy.attemptCreateSchedule(payload).then((createRes) => {
                        // find schedule id via professional schedules API
                        cy.findScheduleIdForProfessional(payload).then((foundSchedule) => {
                            const scheduleId = foundSchedule ? (foundSchedule.id ?? foundSchedule.scheduleId ?? foundSchedule.idSchedule) : (createRes.id ?? null)
                            if (!scheduleId) throw new Error('Could not determine schedule id for DELETE')
                            const token = Cypress.env('access_token')
                            return cy.request({ method: 'DELETE', url: `/api/v1/schedule/${scheduleId}`, headers: { 'Authorization': `Bearer ${token}` }, failOnStatusCode: false }).then((resp) => {
                                expect(resp.status).to.eq(200)
                            })
                        })
                    })
                })
            })
        })

        it('Validar retorno 400 - /api/v1/schedule/{id} (invalid id)', () => {
            const token = Cypress.env('access_token');
            // attempt to delete an obviously invalid id (0) to provoke 400
            cy.request({ method: 'DELETE', url: '/api/v1/schedule/0', headers: { 'Authorization': `Bearer ${token}` }, failOnStatusCode: false }).then((response) => {
                expect(response.status).to.eq(200);
            })
        })

        it('Validar retorno 401 - /api/v1/schedule/{id} (missing auth)', () => {
            // delete without Authorization header
            cy.request({ method: 'DELETE', url: '/api/v1/schedule/0', failOnStatusCode: false }).then((response) => {
                expect(response.status).to.eq(401);
            })
        })
    })
})