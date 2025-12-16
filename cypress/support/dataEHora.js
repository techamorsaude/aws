// Custom commands and helpers for schedule/date-time management

const hhmmToMinutes = (hhmm) => {
	const [hh, mm] = String(hhmm).split(':').map(Number)
	return hh * 60 + mm
}

const minutesToHHMM = (minutes) => {
	const hh = Math.floor(minutes / 60) % 24
	const mm = minutes % 60
	return String(hh).padStart(2, '0') + ':' + String(mm).padStart(2, '0')
}

const toYYYYMMDD = (date) => {
	const y = date.getFullYear()
	const m = String(date.getMonth() + 1).padStart(2, '0')
	const d = String(date.getDate()).padStart(2, '0')
	return `${y}${m}${d}`
}

const parseYYYYMMDD = (s) => {
	if (!s) return null
	const str = String(s)
	const y = Number(str.slice(0, 4))
	const m = Number(str.slice(4, 6)) - 1
	const d = Number(str.slice(6, 8))
	const dt = new Date(y, m, d)
	dt.setHours(0, 0, 0, 0)
	return dt
}

const parseDateString = (s) => {
	if (!s) return null
	const str = String(s).trim()
	// YYYYMMDD
	if (/^\d{8}$/.test(str)) return parseYYYYMMDD(str)
	// DD/MM/YYYY or D/M/YYYY
	if (/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(str)) {
		const parts = str.split('/')
		const d = Number(parts[0])
		const m = Number(parts[1]) - 1
		const y = Number(parts[2])
		const dt = new Date(y, m, d)
		dt.setHours(0, 0, 0, 0)
		return dt
	}
	// try Date parse as fallback
	const dt = new Date(str)
	if (isNaN(dt.getTime())) return null
	dt.setHours(0, 0, 0, 0)
	return dt
}

const getWeekRangeContaining = (date) => {
	const d = new Date(date)
	d.setHours(0, 0, 0, 0)
	// get Sunday (0) as start
	const day = d.getDay()
	const sunday = new Date(d)
	sunday.setDate(d.getDate() - day)
	const saturday = new Date(sunday)
	saturday.setDate(sunday.getDate() + 6)
	return { start: toYYYYMMDD(sunday), end: toYYYYMMDD(saturday) }
}

const computeDaysOfWeek = (fromDate, toDate) => {
	const daysSet = new Set()
	const cur = new Date(fromDate)
	cur.setHours(0, 0, 0, 0)
	const last = new Date(toDate)
	last.setHours(0, 0, 0, 0)

	while (cur <= last) {
		daysSet.add(cur.getDay())
		cur.setDate(cur.getDate() + 1)
	}

	return Array.from(daysSet).sort((a, b) => a - b)
}

const addMinutesToDate = (date, minutes) => new Date(date.getTime() + minutes * 60000)

const roundToNextMultiple10 = (date) => {
	const d = new Date(date)
	d.setSeconds(0, 0)
	const minutes = d.getMinutes()
	let rounded = Math.ceil(minutes / 10) * 10
	if (rounded > 50) {
		d.setHours(d.getHours() + 1)
		d.setMinutes(0)
	} else {
		d.setMinutes(rounded)
	}
	return d
}

const formatHHMM = (d) => {
	if (typeof d === 'string') return d
	const hh = String(d.getHours()).padStart(2, '0')
	const mm = String(d.getMinutes()).padStart(2, '0')
	return `${hh}:${mm}`
}

// Helper to compute horaTermino from horaInicio, tempo and slotsCount
const computeHoraTerminoFromSlots = (horaInicio, tempo, slotsCount) => {
	const [hh, mm] = String(horaInicio).split(':').map(Number)
	const d = new Date()
	d.setHours(hh || 0, mm || 0, 0, 0)
	d.setMinutes(d.getMinutes() + Number(tempo) * Number(slotsCount))
	const pad = (n) => String(n).padStart(2, '0')
	return `${pad(d.getHours())}:${pad(d.getMinutes())}`
}

// Expose a Cypress command for convenience in specs
Cypress.Commands.add('computeHoraTerminoFromSlots', (horaInicio, tempo, slotsCount) => {
	return cy.wrap(computeHoraTerminoFromSlots(horaInicio, tempo, slotsCount))
})

// Format and validate a schedule payload
Cypress.Commands.add('formatSchedulePayload', (base = {}, opts = {}) => {
	const envStart = opts.start ?? Cypress.env('scheduleStart')
	const envEnd = opts.end ?? Cypress.env('scheduleEnd')

	// Default start: NOW + 30 minutes (not start of day), to ensure schedule is always in the future
	const now = new Date()
	const futureStart = addMinutesToDate(now, 30)
	const defaultStart = roundToNextMultiple10(futureStart)

	// If base.diaInicio is provided, use it; otherwise use defaultStart (now+30 rounded)
	// If envStart is provided, use it as override
	const start = parseYYYYMMDD(base.diaInicio) ?? parseYYYYMMDD(envStart) ?? defaultStart
	const end = parseYYYYMMDD(base.diaTermino) ?? parseYYYYMMDD(envEnd) ?? start

	// If the test provided explicit diaInicio/diaTermino in the fixture/base, prefer those
	const startForDias = parseYYYYMMDD(base.diaInicio) ?? start
	const endForDias = parseYYYYMMDD(base.diaTermino) ?? end

	// allow tests to override diasSemana via base.diasSemana
	// Default behaviour: use only the weekday of `diaInicio` (single-day schedule)
	// If a caller explicitly wants the full range of weekdays covered by diaInicio..diaTermino,
	// set `base.forceDiasSemanaRange = true` or pass `opts.useRange = true`.
	let diasSemana
	// If the test explicitly provided diasSemana and marked it as intentional (diasSemanaExplicit=true), respect it.
	// Otherwise, ignore any provided array in `base.diasSemana` and compute a coherent default based on the date range.
	if (Array.isArray(base.diasSemana) && (base.diasSemanaExplicit === true || base.forceDiasSemanaProvided === true || opts.useProvidedDiasSemana === true)) {
		diasSemana = base.diasSemana
	} else if (base.forceDiasSemanaRange === true || opts.useRange === true) {
		// compute full weekday range from diaInicio..diaTermino (prefer base values if provided)
		diasSemana = computeDaysOfWeek(startForDias, endForDias)
	} else {
		// default: single weekday corresponding to diaInicio (prefer base.diaInicio if provided)
		// startForDias is already a Date object, no need to wrap in new Date()
		const wk = startForDias.getDay()
		diasSemana = [wk]
		if (Array.isArray(base.diasSemana) && base.diasSemana.length > 0) {
			// inform that provided diasSemana was ignored in favor of coherent default
			cy.log('formatSchedulePayload: provided base.diasSemana ignored; using diaInicio weekday by default. To keep provided diasSemana set base.diasSemanaExplicit=true')
		}
	}

	// horaInicio: respect base.horaInicio when provided, otherwise use NOW+30min rounded
	let horaInicioDate
	if (base.horaInicio) {
		// if base.horaInicio provided as string "HH:MM", parse into Date on 'start' day
		const parts = String(base.horaInicio).split(':').map(Number)
		const hiDate = new Date(start)
		hiDate.setHours(parts[0] || 0, parts[1] || 0, 0, 0)
		horaInicioDate = roundToNextMultiple10(hiDate)
	} else {
		// Always use defaultStart (now+30 rounded) when horaInicio not explicitly provided
		horaInicioDate = new Date(defaultStart)
	}

	// tempo: allow override in test via base.tempo (minutes). default 10
	const tempo = Number(base.tempo ?? opts.tempo ?? 10)

	// slotsCount: allow override in test via base.slotsCount. default 1
	const slotsCount = Number(base.slotsCount ?? opts.slotsCount ?? 1)

	// horaTermino: respect base.horaTermino when provided (string "HH:MM" or Date), otherwise calculate from slotsCount
	let horaTerminoDate
	if (base.horaTermino) {
		if (typeof base.horaTermino === 'string') {
			const parts = String(base.horaTermino).split(':').map(Number)
			const htDate = new Date(start)
			htDate.setHours(parts[0] || 0, parts[1] || 0, 0, 0)
			horaTerminoDate = roundToNextMultiple10(htDate)
		} else if (base.horaTermino instanceof Date) {
			horaTerminoDate = roundToNextMultiple10(new Date(base.horaTermino))
		} else {
			// unknown format — fallback to horaInicio + (tempo * slotsCount)
			horaTerminoDate = roundToNextMultiple10(addMinutesToDate(horaInicioDate, tempo * slotsCount))
		}
	} else {
		// default: use slotsCount to calculate horaTermino (horaInicio + tempo * slotsCount)
		horaTerminoDate = roundToNextMultiple10(addMinutesToDate(horaInicioDate, tempo * slotsCount))
	}

	const payload = Object.assign({}, base, {
		diaInicio: base.diaInicio ?? toYYYYMMDD(start),
		diaTermino: base.diaTermino ?? toYYYYMMDD(end),
		diasSemana,
		horaInicio: formatHHMM(horaInicioDate),
		horaTermino: formatHHMM(horaTerminoDate),
		tempo, // ensure tempo present
		slotsCount // ensure slotsCount present
	})

	return cy.wrap(payload)
})

// Attempt to create a schedule with retry logic on duplicate/conflict errors
Cypress.Commands.add('attemptCreateSchedule', (payload, options = {}) => {
	const token = Cypress.env('access_token')
	const url = '/api/v1/schedule'
	const maxAttempts = options.maxAttempts ?? 24

	let attempt = 0

	const tryOnce = (p) => {
		attempt++
		return cy.request({ method: 'POST', url, headers: { Authorization: `Bearer ${token}` }, body: p, failOnStatusCode: false }).then((resp) => {
			// log request attempt
			cy.log(`attemptCreateSchedule: attempt=${attempt} status=${resp.status}`)
			cy.log('request body: ' + JSON.stringify(p))
			cy.log('response body: ' + JSON.stringify(resp.body))

			// success with id
			if (resp.status === 201 || resp.status === 200) {
						const id = resp.body?.id ?? resp.body?.data?.id ?? resp.body?.result?.id
						if (id) {
							// record created schedule id for cleanup later
							try {
								const prev = Cypress.env('createdScheduleIds') || []
								prev.push(id)
								Cypress.env('createdScheduleIds', prev)
								// set helpful env markers so deleteScheduleIfExists can find this id
								Cypress.env('foundScheduleId', id)
								Cypress.env('lastScheduleCreate', resp.body ?? { id })
							} catch (e) {}
							return cy.wrap({ success: true, id, resp })
						}

				// API sometimes returns 201 without id (message only).
				// Try to find the schedule by querying professional schedules.
				return cy.findScheduleForProfessional(p).then((found) => {
						if (found) {
							const foundId = found.id ?? found.scheduleId ?? found.idSchedule
							if (foundId) {
								// record found id as created by this run (best-effort)
								try {
									const prev = Cypress.env('createdScheduleIds') || []
									prev.push(foundId)
									Cypress.env('createdScheduleIds', prev)
									// set env markers for convenience
									Cypress.env('foundScheduleId', foundId)
									Cypress.env('lastScheduleCreate', found)
								} catch (e) {}
								return cy.wrap({ success: true, id: foundId, schedule: found, resp })
							}
							}

							if (attempt < maxAttempts) return cy.wait(1000).then(() => tryOnce(p))
							cy.log('attemptCreateSchedule: exhausted attempts after fallback search')
							cy.log('final response body: ' + JSON.stringify(resp.body))
							return cy.wrap({ success: false, resp })
				})
			}

			// client errors often indicate conflicts/duplicates or validation issues (e.g., diasSemana mismatch)
			if (resp.status >= 400 && resp.status < 500) {
				if (attempt >= maxAttempts) {
					cy.log('attemptCreateSchedule: client error and exhausted attempts; status=' + resp.status)
					cy.log('response body: ' + JSON.stringify(resp.body))
					// optional debug write when enabled via env
					try {
						if (Cypress.env('enableScheduleDebug')) {
							const fname = `cypress/results/schedule-debug-${Date.now()}.json`
							cy.writeFile(fname, { attempt, request: p, response: resp.body })
						}
					} catch (e) {
						// ignore write errors
					}
					return cy.wrap({ success: false, resp })
				}

				// Strategy: try later times on the same day by advancing horaInicio by 10min steps.
				// If we cross midnight, advance diaInicio/diaTermino by one day and recompute diasSemana to match.
				const p2 = JSON.parse(JSON.stringify(p))
				const hi = p2.horaInicio ?? '00:00'
				let minutes = hhmmToMinutes(hi)
				const tempo = Number(p2.tempo ?? 10)

				// advance by 10 minutes (configurable via options.stepMinutes)
				const step = Number(options.stepMinutes ?? 10)
				minutes += step

				// if we crossed to next day, roll hour and increment diaInicio/diaTermino
				let incrementedDay = false
				if (minutes >= 24 * 60) {
					minutes = minutes % (24 * 60)
					// bump diaInicio and diaTermino by 1 day (if they exist)
					const curStart = parseYYYYMMDD(p2.diaInicio) ?? new Date()
					const curEnd = parseYYYYMMDD(p2.diaTermino) ?? curStart
					const newStart = addMinutesToDate(curStart, 24 * 60)
					const newEnd = addMinutesToDate(curEnd, 24 * 60)
					p2.diaInicio = toYYYYMMDD(newStart)
					p2.diaTermino = toYYYYMMDD(newEnd)
					// recompute diasSemana to keep coherence with the new date
					try {
						p2.diasSemana = computeDaysOfWeek(newStart, newEnd)
					} catch (e) {
						p2.diasSemana = [newStart.getDay()]
					}
					incrementedDay = true
				}

				p2.horaInicio = minutesToHHMM(minutes)
				// compute horaTermino as horaInicio + tempo, but keep within day boundaries
				let termMinutes = minutes + tempo
				if (termMinutes >= 24 * 60) termMinutes = (termMinutes % (24 * 60))
				p2.horaTermino = minutesToHHMM(termMinutes)

				cy.log('attemptCreateSchedule: client error, retrying with adjusted payload', { attempt, horaInicio: p2.horaInicio, diaInicio: p2.diaInicio, diasSemana: p2.diasSemana })
				// small backoff when we increment day to allow backend to process prior changes
				const waitMs = incrementedDay ? 1500 : 600
				return cy.wait(waitMs).then(() => tryOnce(p2))
			}

			// server errors: retry a few times
			if (resp.status >= 500) {
				if (attempt < maxAttempts) {
					cy.log('attemptCreateSchedule: server error, will retry, status=' + resp.status)
					return cy.wait(1000).then(() => tryOnce(p))
				}
					cy.log('attemptCreateSchedule: server error and no more retries; status=' + resp.status)
					cy.log('response body: ' + JSON.stringify(resp.body))
					return cy.wrap({ success: false, resp })
			}

				cy.log('attemptCreateSchedule: returning failure; status=' + resp.status)
				cy.log('response body: ' + JSON.stringify(resp.body))
				return cy.wrap({ success: false, resp })
		})
	}

	return tryOnce(payload)
})

// convenience: wrap formatting + create in one command
Cypress.Commands.add('createScheduleWithFormatting', (base, options = {}) => {
	return cy.formatSchedulePayload(base, options).then((payload) => cy.attemptCreateSchedule(payload, options))
})

// Find a future slot for a given schedule payload by calling the slots API
// NOTA: Comando findFutureSlotForSchedule foi movido para cypress/support/agendamentos.js
// pois está relacionado à lógica de agendamentos, não de manipulação de datas/horários

// Find a schedule for a professional within the date range that matches horaInicio/horaTermino
Cypress.Commands.add('findScheduleForProfessional', (payload) => {
	const professional = payload.profissionalId ?? Cypress.env('defaultProfessional') ?? 2155
	const token = Cypress.env('access_token')
	const url = `/api/v1/schedule/professional/${professional}`

	// Prefer query params: ?diaInicio=YYYYMMDD&diaTermino=YYYYMMDD
	const qp = `?diaInicio=${payload.diaInicio}&diaTermino=${payload.diaTermino}`
	const urlWithQs = url + qp

	return cy.request({ method: 'GET', url: urlWithQs, headers: { 'Authorization': `Bearer ${token}` }, failOnStatusCode: false }).then((resp) => {
		cy.log('findScheduleForProfessional response body: ' + JSON.stringify(resp.body))
		if (resp.status !== 200) return cy.wrap(null)
		const list = resp.body?.data ?? resp.body ?? []

		// try to find schedule matching horaInicio/horaTermino
		for (const s of list) {
			const hi = String(s.horaInicio ?? s.start ?? '')
			const ht = String(s.horaTermino ?? s.end ?? '')
			if (!payload.horaInicio || !payload.horaTermino) continue
			if (hi.includes(payload.horaInicio) && ht.includes(payload.horaTermino)) {
				return cy.wrap(s)
			}
		}

		// fallback: return first element if any
		if (Array.isArray(list) && list.length > 0) return cy.wrap(list[0])
		return cy.wrap(null)
	})
})

// New helper: find schedule id via professional schedules endpoint (returns schedule object or null)
Cypress.Commands.add('findScheduleIdForProfessional', (payload) => {
	const professional = payload.profissionalId ?? Cypress.env('defaultProfessional') ?? 2155
	const token = Cypress.env('access_token')
	const qp = `?diaInicio=${payload.diaInicio}&diaTermino=${payload.diaTermino}`
	const url = `/api/v1/schedule/professional/${professional}${qp}`

	return cy.request({ method: 'GET', url, headers: { 'Authorization': `Bearer ${token}` }, failOnStatusCode: false }).then((resp) => {
		if (resp.status !== 200) return cy.wrap(null)
		const list = resp.body?.data ?? resp.body ?? []
		if (!Array.isArray(list) || list.length === 0) return cy.wrap(null)
		// prefer first element that looks like a schedule
		const found = list.find(s => s && (s.id || s.scheduleId || s.idSchedule)) || list[0]
		return cy.wrap(found)
	})
})

// NOTA: Comando buildAppointmentPayloadFromSlot foi movido para cypress/support/agendamentos.js
// pois está relacionado à construção de payload de agendamentos

// export helpers for direct require usage if needed
module.exports = {
	toYYYYMMDD,
	parseYYYYMMDD,
	computeDaysOfWeek,
	roundToNextMultiple10,
	formatHHMM,
	addMinutesToDate,
	computeHoraTerminoFromSlots
}

// Simple: delete a single schedule by id (idArg) or by env markers (foundScheduleId or lastScheduleCreate.id)
Cypress.Commands.add('deleteScheduleIfExists', (idArg = null) => {
	const token = Cypress.env('access_token')
	let envId = idArg ?? Cypress.env('foundScheduleId') ?? (Cypress.env('lastScheduleCreate') && Cypress.env('lastScheduleCreate').id) ?? null
	// fallback: if no explicit env id, try the last recorded createdScheduleIds entry
	if (!envId) {
		try {
			const arr = Cypress.env('createdScheduleIds') || []
			if (Array.isArray(arr) && arr.length > 0) {
				envId = arr[arr.length - 1]
			}
		} catch (e) {
			// ignore
		}
	}
	if (!envId) return cy.wrap({ deleted: false, reason: 'no-id' })

	return cy.request({ method: 'DELETE', url: `/api/v1/schedule/${envId}`, headers: { Authorization: `Bearer ${token}` }, failOnStatusCode: false }).then((resp) => {
		// clear convenience markers
		try { Cypress.env('foundScheduleId', null) } catch (e) {}
		try { Cypress.env('lastScheduleCreate', null) } catch (e) {}
		// remove from createdScheduleIds if present
		try {
			const arr = Cypress.env('createdScheduleIds') || []
			const filtered = Array.isArray(arr) ? arr.filter(i => i !== envId) : []
			Cypress.env('createdScheduleIds', filtered)
		} catch (e) {}
		return cy.wrap({ deleted: (resp.status === 200), status: resp.status, body: resp.body, id: envId })
	})
})

// Enhanced: delete all schedules that were created during the test run
Cypress.Commands.add('deleteAllCreatedSchedules', (opts = {}) => {
	const token = Cypress.env('access_token')
	const ids = Cypress.env('createdScheduleIds') || []
	if (!Array.isArray(ids) || ids.length === 0) return cy.wrap({ attempted: 0, deleted: 0, results: [] })

	const results = []
	const deleteOne = (idx) => {
		if (idx >= ids.length) {
			// clear the list after attempting all deletes
			try { Cypress.env('createdScheduleIds', []) } catch (e) {}
			return cy.wrap({ attempted: results.length, deleted: results.filter(r => r.status === 200).length, results })
		}
		const id = ids[idx]
		if (!id) {
			results.push({ id: null, status: 'skipped', reason: 'no-id' })
			return deleteOne(idx + 1)
		}
		return cy.request({ method: 'DELETE', url: `/api/v1/schedule/${id}`, headers: { Authorization: `Bearer ${token}` }, failOnStatusCode: false }).then((dresp) => {
			// if delete fails (e.g., schedule has appointments), record and continue
			results.push({ id, status: dresp.status, body: dresp.body })
			return cy.wait(200).then(() => deleteOne(idx + 1))
		}).catch((err) => {
			results.push({ id, status: 'error', error: String(err) })
			return deleteOne(idx + 1)
		})
	}

	return deleteOne(0)
})


