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

// Format and validate a schedule payload
Cypress.Commands.add('formatSchedulePayload', (base = {}, opts = {}) => {
	const envStart = opts.start ?? Cypress.env('scheduleStart')
	const envEnd = opts.end ?? Cypress.env('scheduleEnd')

	const today = new Date()
	const defaultStart = new Date(today)
	defaultStart.setHours(0, 0, 0, 0)

	const start = parseYYYYMMDD(envStart) ?? defaultStart
	const end = parseYYYYMMDD(envEnd) ?? addMinutesToDate(start, 24 * 60)

	let diasSemana = computeDaysOfWeek(start, end)
	// only pass the first weekday value as requested
	if (Array.isArray(diasSemana) && diasSemana.length > 0) diasSemana = [diasSemana[0]]
	// horaInicio = now + 30min rounded up to multiple of 10
	const now = new Date()
	const tentativeStart = addMinutesToDate(now, 30)
	const horaInicioDate = roundToNextMultiple10(tentativeStart)
	// default horaTermino = horaInicio + tempo (or +60 if not provided) -> but we'll use 60 if not provided
	const tempo = base.tempo ?? 10
	const defaultTerm = addMinutesToDate(horaInicioDate, tempo)
	const horaTerminoDate = roundToNextMultiple10(defaultTerm)

	const payload = Object.assign({}, base, {
		diaInicio: toYYYYMMDD(start),
		diaTermino: toYYYYMMDD(end),
		diasSemana,
		horaInicio: formatHHMM(horaInicioDate),
		horaTermino: formatHHMM(horaTerminoDate)
	})

	return cy.wrap(payload)
})

// Attempt to create a schedule with retry logic on duplicate/conflict errors
Cypress.Commands.add('attemptCreateSchedule', (payload, options = {}) => {
	const token = Cypress.env('access_token')
	const url = '/api/v1/schedule'
	const maxAttempts = options.maxAttempts ?? 4

	let attempt = 0

	const tryOnce = (p) => {
		attempt++
		return cy.request({ method: 'POST', url, headers: { Authorization: `Bearer ${token}` }, body: p, failOnStatusCode: false }).then((resp) => {
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
					return cy.wrap({ success: false, resp })
				})
			}

			// client errors often indicate conflicts/duplicates
			if (resp.status >= 400 && resp.status < 500) {
				if (attempt < maxAttempts) {
					// try to adjust horaInicio by +10 minutes and retry
					const p2 = JSON.parse(JSON.stringify(p))
					const hi = p2.horaInicio ?? '00:00'
					const minutes = hhmmToMinutes(hi)
					const newMinutes = minutes + 10
					p2.horaInicio = minutesToHHMM(newMinutes)
					const tempo = p2.tempo ?? 10
					p2.horaTermino = minutesToHHMM(newMinutes + tempo)
					return cy.wait(500).then(() => tryOnce(p2))
				}
				return cy.wrap({ success: false, resp })
			}

			// server errors: retry a few times
			if (resp.status >= 500) {
				if (attempt < maxAttempts) return cy.wait(1000).then(() => tryOnce(p))
				return cy.wrap({ success: false, resp })
			}

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
Cypress.Commands.add('findFutureSlotForSchedule', (payload) => {
	const clinic = payload.clinicaId ?? Cypress.env('defaultClinic') ?? 483
	const specialty = (payload.areasAtuacao && payload.areasAtuacao[0]) ?? Cypress.env('defaultSpecialty') ?? 616
	const professional = payload.profissionalId ?? Cypress.env('defaultProfessional') ?? 2155

	// compute 7-day week range (Sunday to Saturday) that contains today
	const now = new Date()
	const { start: initialDate, end: finalDate } = getWeekRangeContaining(now)

	const url = `/api/v1/slots/list-slots-by-professional?idClinic=${clinic}&idSpecialty=${specialty}&idProfessional=${professional}&initialDate=${initialDate}&finalDate=${finalDate}&initialHour=00:00&endHour=23:59&fetchPolicy=network-only&cancelledAppointments=false`
	const token = Cypress.env('access_token')

	return cy.request({ method: 'GET', url, headers: { 'Authorization': `Bearer ${token}` }, failOnStatusCode: false }).then((resp) => {
		if (resp.status !== 200) throw new Error(`Slots API returned ${resp.status}`)
		const body = resp.body

		const findArray = (obj, depth = 0) => {
			if (!obj || depth > 6) return null
			if (Array.isArray(obj) && obj.length > 0) return obj
			if (typeof obj === 'object') {
				for (const k of Object.keys(obj)) {
					const found = findArray(obj[k], depth + 1)
					if (found) return found
				}
			}
			return null
		}


		const slots = findArray(body)
		if (!slots) return cy.wrap(null)

		// Normalize: some APIs return an array of containers with an `hours` array inside (preview),
		// while others return a flat array of slot objects. Flatten to a common list of slot objects.
		let candidateSlots = []
		if (Array.isArray(slots) && slots.length > 0) {
			// detect if first element contains `hours` array
			if (slots[0] && Array.isArray(slots[0].hours)) {
				for (const container of slots) {
					if (Array.isArray(container.hours)) {
						for (const h of container.hours) candidateSlots.push(h)
					}
				}
			} else {
				// assume slots is already an array of slot objects
				candidateSlots = slots.slice()
			}
		} else {
			return cy.wrap(null)
		}

		const nowDate = new Date()
		let found = null
		for (const s of candidateSlots) {
			// ensure slot is available
			const status = s.status ?? s.statusText ?? null
			if (status && String(status).toLowerCase() !== 'livre' && String(status).toLowerCase() !== 'free') continue

			const fh = s.formatedHour ?? s.formattedHour ?? s.hourFormatted ?? null
			const slotDateRaw = s.date ?? s.data ?? s.slotDate ?? null
			if (!fh || !slotDateRaw) continue

			const slotDateObj = parseDateString(slotDateRaw)
			if (!slotDateObj) continue

			// if slotDate is after today => accept
			if (slotDateObj > nowDate) {
				found = s
				break
			}

			// if same day, compare times
			const todayStr = new Date().toDateString()
			if (slotDateObj.toDateString() === todayStr) {
				const [hh, mm] = String(fh).split(':').map(Number)
				const slotMinutes = hh * 60 + (mm || 0)
				const nowMinutes = nowDate.getHours() * 60 + nowDate.getMinutes()
				if (slotMinutes > nowMinutes) {
					found = s
					break
				}
			}
		}

		if (!found) return cy.wrap(null)
		return cy.wrap(found)
	})
})

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

// Build appointment payload from a found slot + base fixture
Cypress.Commands.add('buildAppointmentPayloadFromSlot', (base = {}, slot = {}) => {
	// helper to normalize date to YYYYMMDD
	const normalizeDate = (d) => {
		if (!d) return null
		const s = String(d).trim()
		// already YYYYMMDD
		if (/^\d{8}$/.test(s)) return s
		// DD/MM/YYYY -> convert to YYYYMMDD
		if (/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(s)) {
			const parts = s.split('/')
			const dd = parts[0].padStart(2, '0')
			const mm = parts[1].padStart(2, '0')
			const yyyy = parts[2]
			return `${yyyy}${mm}${dd}`
		}
		// try Date parse as fallback
		const parsed = new Date(s)
		if (!isNaN(parsed.getTime())) return toYYYYMMDD(parsed)
		return null
	}

	const clinicaId = (base.clinicaId ?? 483)
	const pacienteId = (Cypress.env('pacienteId') ?? 73749)
	const profissionalId = (base.profissionalId ?? 2155)
	const especialidadeId = (base.areasAtuacao && base.areasAtuacao[0]) || 616
	const intervalo = base.tempo ?? 10

	const data = normalizeDate(slot.date ?? slot.data ?? slot.slotDate ?? base.diaInicio)
	const horaInicio = slot.formatedHour ?? slot.formattedHour ?? base.horaInicio
	const localAtendimentoId = slot.attendanceLocalId ?? slot.localAtendimentoId ?? slot.localId ?? base.localId ?? 59

	const scheduleId = slot.idSchedule ?? slot.scheduleId ?? (slot.schedule && (slot.schedule.id || slot.scheduleId)) ?? Cypress.env('foundScheduleId') ?? base.scheduleId ?? null
	const slotId = slot.id ?? null

	const appointment = {
		clinicaId: { id: clinicaId },
		pacienteId: { id: pacienteId },
		profissionalId: { id: profissionalId },
		flgConsultaAssistida: 0,
		especialidadeId: { id: especialidadeId },
		statusAgendamentoId: { id: 2 },
		data: data,
		horaInicio: horaInicio,
		interval: intervalo,
		encaixe: false,
		retorno: false,
		parceiroId: { id: 41 },
		canalId: { id: 3 },
		observacao: '',
		enviarSms: true,
		enviarEmail: true,
		valorTotal: '5',
		repeticaoPeriodicidade: 'Diaria',
		agendamentosProcedimentos: [
			{
				procedimentoId: { id: (base.procedimentos && base.procedimentos[0]) || 20357 },
				valor: 5,
				localAtendimentoId: localAtendimentoId,
				parceiroId: 41
			}
		],
		primeiraConsulta: 1,
		scheduleId: scheduleId,
		listaEsperaId: 0,
		optin: {
			healthData: true,
			appointmentData: true
		}
	}

	if (slotId) appointment.slotId = slotId

	return cy.wrap(appointment)
})

// export helpers for direct require usage if needed
module.exports = {
	toYYYYMMDD,
	parseYYYYMMDD,
	computeDaysOfWeek,
	roundToNextMultiple10,
	formatHHMM,
	addMinutesToDate
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


