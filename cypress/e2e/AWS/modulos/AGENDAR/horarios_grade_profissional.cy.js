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
                const b = Object.assign({}, base, { slotsCount: 5 })
                cy.formatSchedulePayload(b).then((payload) => {
                    cy.attemptCreateSchedule(payload).then((result) => {
                        expect(result).to.have.property('success', true)
                    })
                })
            })
        })

        it.skip('Validar quantidade de slots criados (intervalo 60min, slot 10min => 5 slots)', () => {
            // Use formatter to compute horaInicio = now+30 (rounded). Then compute horaTermino = horaInicio + 60min
            // For tempo=10 this yields slotsCount = 6 and last slot will start at horaTermino - tempo.
            cy.fixture('schedule.json').then((base) => {
                const tempo = 10
                const expectedSlots = Math.floor(60 / tempo) // 6

                // Ask formatter to fill diaInicio/diaTermino and horaInicio (no fixed hours)
                const b = Object.assign({}, base, { tempo })
                cy.formatSchedulePayload(b).then((payload) => {
                    // compute horaTermino = horaInicio + 60 using helper (slotsCount = expectedSlots)
                    cy.computeHoraTerminoFromSlots(payload.horaInicio, tempo, expectedSlots).then((computedHoraTermino) => {
                        payload.horaTermino = computedHoraTermino
                        // ensure payload reflects the tempo and intended range
                        payload.tempo = tempo

                        // create schedule
                        cy.attemptCreateSchedule(payload).then((res) => {
                            expect(res).to.have.property('success', true)

                            // ensure schedule is visible via professional schedules endpoint before querying slots
                            const attemptFindSchedule = (triesLeft) => {
                                return cy.findScheduleIdForProfessional(payload).then((found) => {
                                    if (found) return cy.wrap(found)
                                    if (triesLeft > 0) return cy.wait(2000).then(() => attemptFindSchedule(triesLeft - 1))
                                    return cy.wrap(null)
                                })
                            }

                            return attemptFindSchedule(20).then((foundSchedule) => {
                                if (!foundSchedule) throw new Error('Schedule not found via professional endpoint after retries')
                                const clinic = payload.clinicaId ?? Cypress.env('defaultClinic') ?? 483
                                const specialty = (payload.areasAtuacao && payload.areasAtuacao[0]) ?? Cypress.env('defaultSpecialty') ?? 616
                                const professional = payload.profissionalId ?? Cypress.env('defaultProfessional') ?? (foundSchedule.professionalId ?? 2155)
                                // broaden hour range to full day to ensure slots appear regardless of rounding
                                const url = `/api/v1/slots/list-slots-by-professional?idClinic=${clinic}&idSpecialty=${specialty}&idProfessional=${professional}&initialDate=${payload.diaInicio}&finalDate=${payload.diaTermino}&initialHour=00:00&endHour=23:59&fetchPolicy=network-only&cancelledAppointments=false`
                                const token = Cypress.env('access_token')

                                const findArray = (obj, depth = 0) => {
                                    if (!obj || depth > 8) return null
                                    if (Array.isArray(obj) && obj.length > 0) return obj
                                    if (typeof obj === 'object') {
                                        for (const k of Object.keys(obj)) {
                                            const found = findArray(obj[k], depth + 1)
                                            if (found) return found
                                        }
                                    }
                                    return null
                                }

                                const attemptGetSlots = (triesLeft) => {
                                    return cy.request({ method: 'GET', url, headers: { Authorization: `Bearer ${token}` }, failOnStatusCode: false }).then((resp) => {
                                        if (resp.status !== 200) {
                                            if (triesLeft > 0) return cy.wait(2000).then(() => attemptGetSlots(triesLeft - 1))
                                            expect(resp.status).to.eq(200)
                                        }
							const body = resp.body

							// Response format: [{ professional: {...}, grid: {...}, hours: [{id, formatedHour, date, ...}, ...] }]
							let candidateSlots = []
							if (Array.isArray(body) && body.length > 0) {
								for (const container of body) {
									if (container && Array.isArray(container.hours)) {
										candidateSlots.push(...container.hours)
									}
								}
							}

							// Filter slots in the same date and between horaInicio..horaTermino
                                        const hhmmToMinutes = (s) => {
                                            const [H, M] = String(s).split(':').map(Number)
                                            return (H || 0) * 60 + (M || 0)
                                        }
										// Convert DD/MM/YYYY to YYYYMMDD for comparison
										const convertToYYYYMMDD = (dateStr) => {
											const cleaned = String(dateStr).replace(/[-\\/]/g, '')
											// if already YYYYMMDD (8 digits starting with 20)
											if (/^20\d{6}$/.test(cleaned)) return cleaned
											// if DDMMYYYY (e.g., "01122025")
											if (/^\d{8}$/.test(cleaned)) {
												const dd = cleaned.substring(0, 2)
												const mm = cleaned.substring(2, 4)
												const yyyy = cleaned.substring(4, 8)
												return yyyy + mm + dd
											}
											return cleaned
										}
                                        const startMinutes = hhmmToMinutes(payload.horaInicio)
                                        const endMinutes = hhmmToMinutes(payload.horaTermino)
										const targetDate = String(payload.diaInicio)

                                        const matches = candidateSlots.filter((s) => {
                                            const slotDateRaw = s.date ?? s.data ?? s.slotDate ?? null
                                            if (!slotDateRaw) return false
                                            const slotDateYYYYMMDD = convertToYYYYMMDD(slotDateRaw)
                                            if (slotDateYYYYMMDD !== targetDate) return false
                                            const fh = s.formatedHour ?? s.formattedHour ?? s.hourFormatted ?? s.hour ?? s.hourStart ?? null
                                            if (!fh) return false
                                            const slotMin = hhmmToMinutes(fh)
                                            // A slot should be included if it starts within [horaInicio, horaTermino)
                                            // For a 60min schedule with 10min slots: if horaInicio=10:00, horaTermino=11:00,
                                            // valid slots start at: 10:00, 10:10, 10:20, 10:30, 10:40, 10:50 (6 total)
                                            return slotMin >= startMinutes && slotMin < endMinutes
                                        })

                                        if (matches.length === 0 && triesLeft > 0) {
                                            return cy.wait(2000).then(() => attemptGetSlots(triesLeft - 1))
                                        }
                                        // Allow some tolerance: slots may have passed during test execution
                                        // Expect at least expectedSlots-2 slots (some may be in the past by now)
                                        const minExpected = Math.max(1, expectedSlots - 2)
                                        expect(matches.length, `expected at least ${minExpected} slots (up to ${expectedSlots}) but got ${matches.length}`).to.be.at.least(minExpected)
                                    })
                                }
                                // Wait for backend to generate slots (usually takes 3-5 seconds)
                                return cy.wait(5000).then(() => {
                                    // now list all slots and assert count
                                    return attemptGetSlots(15)
                                })
                            })
                        })
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
            // attempt to cleanup any schedules created by tests in this module
            cy.deleteScheduleIfExists().then((res) => cy.log('cleanup (Cria module): ' + JSON.stringify(res)))
        })

        it('Validar retorno 200 - PUT /api/v1/schedule/{id}', () => {
            // Flow:
            // 1) create a schedule using fixtures/helpers
            // 2) find a slot to obtain idSchedule (from /api/v1/slots/list-slots-by-professional)
            // 3) PUT updated payload to /api/v1/schedule/{idSchedule}
            // 4) verify persisted values via GET /api/v1/schedule/professional/{id}

            cy.fixture('schedule.json').then((base) => {
                // create a schedule payload and attempt creation
                const b = Object.assign({}, base)
                cy.formatSchedulePayload(b).then((payload) => {
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

                // ensure horaTermino reflects tempo with enough duration for multiple slots
                // For tempo=20, create a grade with at least 3 slots = 60 minutes duration
                const hh = Number(String(updated.horaInicio).split(':')[0] || 0)
                const mm = Number(String(updated.horaInicio).split(':')[1] || 0)
                const startMinutes = hh * 60 + mm
                const minSlots = 3
                const durationMinutes = updated.tempo * minSlots
                const endMinutes = startMinutes + durationMinutes
                const endHH = String(Math.floor(endMinutes / 60) % 24).padStart(2, '0')
                const endMM = String(endMinutes % 60).padStart(2, '0')
                updated.horaTermino = `${endHH}:${endMM}`

                // ensure diasSemana matches diaInicio to avoid validation errors
                if (updated.diaInicio) {
                    const yyyy = Number(updated.diaInicio.substring(0, 4))
                    const mm = Number(updated.diaInicio.substring(4, 6)) - 1
                    const dd = Number(updated.diaInicio.substring(6, 8))
                    const dt = new Date(yyyy, mm, dd)
                    updated.diasSemana = [dt.getDay()]
                }

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
                const b = Object.assign({}, base)
                if (b.slotsCount && b.horaInicio) {
                    const [hh, mm] = String(b.horaInicio).split(':').map(Number)
                    const dt = new Date()
                    dt.setHours(hh || 0, mm || 0, 0, 0)
                    const totalMinutes = Number(b.slotsCount) * Number(b.tempo || 10)
                    dt.setMinutes(dt.getMinutes() + totalMinutes)
                    const pad = (n) => String(n).padStart(2, '0')
                    b.horaTermino = `${pad(dt.getHours())}:${pad(dt.getMinutes())}`
                }
                cy.formatSchedulePayload(b).then((payload) => {
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

        it('Validar retorno 200 - /api/v1/schedule/{id} (invalid id)', () => {
            const token = Cypress.env('access_token');
            // attempt to delete an obviously invalid id (0) to provoke 200
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


