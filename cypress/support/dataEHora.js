// Comandos personalizados e utilitários para gerenciamento de agenda/data-hora

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
	// Formato YYYYMMDD
	if (/^\d{8}$/.test(str)) return parseYYYYMMDD(str)
	// DD/MM/AAAA ou D/M/AAAA
	if (/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(str)) {
		const parts = str.split('/')
		const d = Number(parts[0])
		const m = Number(parts[1]) - 1
		const y = Number(parts[2])
		const dt = new Date(y, m, d)
		dt.setHours(0, 0, 0, 0)
		return dt
	}
	// Tentar parse de Date como alternativa (fallback)
	const dt = new Date(str)
	if (isNaN(dt.getTime())) return null
	dt.setHours(0, 0, 0, 0)
	return dt
}

const getWeekRangeContaining = (date) => {
	const d = new Date(date)
	d.setHours(0, 0, 0, 0)
	// Obter domingo (0) como início
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

// Auxiliar para calcular horaTermino a partir de horaInicio, tempo e slotsCount
const computeHoraTerminoFromSlots = (horaInicio, tempo, slotsCount) => {
	const [hh, mm] = String(horaInicio).split(':').map(Number)
	const d = new Date()
	d.setHours(hh || 0, mm || 0, 0, 0)
	d.setMinutes(d.getMinutes() + Number(tempo) * Number(slotsCount))
	const pad = (n) => String(n).padStart(2, '0')
	return `${pad(d.getHours())}:${pad(d.getMinutes())}`
}

// Expõe um comando do Cypress para conveniência nos testes
Cypress.Commands.add('computeHoraTerminoFromSlots', (horaInicio, tempo, slotsCount) => {
	return cy.wrap(computeHoraTerminoFromSlots(horaInicio, tempo, slotsCount))
})

// Formatar e validar um payload de agenda
Cypress.Commands.add('formatSchedulePayload', (base = {}, opts = {}) => {
	const envStart = opts.start ?? Cypress.env('scheduleStart')
	const envEnd = opts.end ?? Cypress.env('scheduleEnd')

	// Início padrão: AGORA + 30 minutos (não início do dia), garantindo que a agenda esteja no futuro
	const now = new Date()
	const futureStart = addMinutesToDate(now, 30)
	const defaultStart = roundToNextMultiple10(futureStart)

	// Se base.diaInicio for fornecido, usar; caso contrário, usar defaultStart (agora+30 arredondado)
	// Se envStart for fornecido, usá-lo como sobrescrita
	const start = parseYYYYMMDD(base.diaInicio) ?? parseYYYYMMDD(envStart) ?? defaultStart
	const end = parseYYYYMMDD(base.diaTermino) ?? parseYYYYMMDD(envEnd) ?? start

	// Se o teste fornecer diaInicio/diaTermino explícitos no fixture/base, priorizar esses valores
	const startForDias = parseYYYYMMDD(base.diaInicio) ?? start
	const endForDias = parseYYYYMMDD(base.diaTermino) ?? end

	// Permitir que os testes sobrescrevam diasSemana via base.diasSemana
	// Comportamento padrão: usar apenas o dia da semana de diaInicio (agenda de um dia)
	// Se o chamador quiser explicitamente todo o intervalo de dias coberto por diaInicio..diaTermino,
	// defina base.forceDiasSemanaRange = true ou passe opts.useRange = true.
	let diasSemana
	// Se o teste forneceu diasSemana intencionalmente (diasSemanaExplicit=true), respeitar.
	// Caso contrário, ignorar qualquer array em base.diasSemana e calcular um padrão coerente com base no intervalo de datas.
	if (Array.isArray(base.diasSemana) && (base.diasSemanaExplicit === true || base.forceDiasSemanaProvided === true || opts.useProvidedDiasSemana === true)) {
		diasSemana = base.diasSemana
	} else if (base.forceDiasSemanaRange === true || opts.useRange === true) {
		// Calcular todo o intervalo de dias úteis de diaInicio..diaTermino (preferir valores de base se fornecidos)
		diasSemana = computeDaysOfWeek(startForDias, endForDias)
	} else {
		// Padrão: único dia da semana correspondente a diaInicio (preferir base.diaInicio se fornecido)
		// startForDias já é um objeto Date; não é necessário encapsular em new Date()
		const wk = startForDias.getDay()
		diasSemana = [wk]
		if (Array.isArray(base.diasSemana) && base.diasSemana.length > 0) {
			// Informar que o diasSemana fornecido foi ignorado em favor de um padrão coerente
			cy.log('formatSchedulePayload: provided base.diasSemana ignored; using diaInicio weekday by default. To keep provided diasSemana set base.diasSemanaExplicit=true')
		}
	}

	// horaInicio: respeitar base.horaInicio quando fornecido; caso contrário, usar AGORA+30min arredondado
	let horaInicioDate
	if (base.horaInicio) {
		// Se base.horaInicio for uma string "HH:MM", converter para Date no dia 'start'
		const parts = String(base.horaInicio).split(':').map(Number)
		const hiDate = new Date(start)
		hiDate.setHours(parts[0] || 0, parts[1] || 0, 0, 0)
		horaInicioDate = roundToNextMultiple10(hiDate)
	} else {
		// Sempre usar defaultStart (agora+30 arredondado) quando horaInicio não for explicitamente fornecido
		horaInicioDate = new Date(defaultStart)
	}

	// tempo: permitir sobrescrita no teste via base.tempo (minutos). padrão 10
	const tempo = Number(base.tempo ?? opts.tempo ?? 10)

	// slotsCount: permitir sobrescrita no teste via base.slotsCount. padrão 1
	const slotsCount = Number(base.slotsCount ?? opts.slotsCount ?? 1)

	// horaTermino: respeitar base.horaTermino quando fornecido (string "HH:MM" ou Date); caso contrário, calcular a partir de slotsCount
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
			// Formato desconhecido — usar horaInicio + (tempo * slotsCount) como fallback
			horaTerminoDate = roundToNextMultiple10(addMinutesToDate(horaInicioDate, tempo * slotsCount))
		}
	} else {
		// Padrão: usar slotsCount para calcular horaTermino (horaInicio + tempo * slotsCount)
		horaTerminoDate = roundToNextMultiple10(addMinutesToDate(horaInicioDate, tempo * slotsCount))
	}

	const payload = Object.assign({}, base, {
		diaInicio: base.diaInicio ?? toYYYYMMDD(start),
		diaTermino: base.diaTermino ?? toYYYYMMDD(end),
		diasSemana,
		horaInicio: formatHHMM(horaInicioDate),
		horaTermino: formatHHMM(horaTerminoDate),
		tempo, // garantir que tempo esteja presente
		slotsCount // garantir que slotsCount esteja presente
	})

	return cy.wrap(payload)
})

// Tentar criar uma agenda com lógica de repetição para erros de duplicidade/conflito
Cypress.Commands.add('attemptCreateSchedule', (payload, options = {}) => {
	const token = Cypress.env('access_token')
	const url = '/api/v1/schedule'
	const maxAttempts = options.maxAttempts ?? 24

	let attempt = 0

	const tryOnce = (p) => {
		attempt++
		return cy.request({ method: 'POST', url, headers: { Authorization: `Bearer ${token}` }, body: p, failOnStatusCode: false }).then((resp) => {
			// Registrar tentativa de requisição
			cy.log(`attemptCreateSchedule: attempt=${attempt} status=${resp.status}`)
			cy.log('request body: ' + JSON.stringify(p))
			cy.log('response body: ' + JSON.stringify(resp.body))

			// Sucesso com id
			if (resp.status === 201 || resp.status === 200) {
						const id = resp.body?.id ?? resp.body?.data?.id ?? resp.body?.result?.id
						if (id) {
							// Registrar id de agenda criada para limpeza posterior
							try {
								const prev = Cypress.env('createdScheduleIds') || []
								prev.push(id)
								Cypress.env('createdScheduleIds', prev)
								// Definir marcadores de ambiente úteis para que deleteScheduleIfExists encontre este id
								Cypress.env('foundScheduleId', id)
								Cypress.env('lastScheduleCreate', resp.body ?? { id })
							} catch (e) {}
							return cy.wrap({ success: true, id, resp })
						}

				// A API às vezes retorna 201 sem id (apenas mensagem).
				// Tentar localizar a agenda consultando agendas do profissional.
				return cy.findScheduleForProfessional(p).then((found) => {
						if (found) {
							const foundId = found.id ?? found.scheduleId ?? found.idSchedule
							if (foundId) {
								// Registrar id encontrado como criado nesta execução (best-effort)
								try {
									const prev = Cypress.env('createdScheduleIds') || []
									prev.push(foundId)
									Cypress.env('createdScheduleIds', prev)
									// Definir marcadores de ambiente por conveniência
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

			// Erros de cliente geralmente indicam conflitos/duplicidades ou problemas de validação (ex.: diasSemana divergente)
			if (resp.status >= 400 && resp.status < 500) {
				if (attempt >= maxAttempts) {
					cy.log('attemptCreateSchedule: client error and exhausted attempts; status=' + resp.status)
					cy.log('response body: ' + JSON.stringify(resp.body))
					// Escrita de depuração opcional quando habilitada via env
					try {
						if (Cypress.env('enableScheduleDebug')) {
							const fname = `cypress/results/schedule-debug-${Date.now()}.json`
							cy.writeFile(fname, { attempt, request: p, response: resp.body })
						}
					} catch (e) {
						// Ignorar erros de escrita
					}
					return cy.wrap({ success: false, resp })
				}

				// Estratégia: tentar horários posteriores no mesmo dia, avançando horaInicio em passos de 10min.
				// Se cruzar a meia-noite, avançar diaInicio/diaTermino em um dia e recomputar diasSemana.
				const p2 = JSON.parse(JSON.stringify(p))
				const hi = p2.horaInicio ?? '00:00'
				let minutes = hhmmToMinutes(hi)
				const tempo = Number(p2.tempo ?? 10)

				// Avançar 10 minutos (configurável via options.stepMinutes)
				const step = Number(options.stepMinutes ?? 10)
				minutes += step

				// Se cruzar para o dia seguinte, ajustar hora e incrementar diaInicio/diaTermino
				let incrementedDay = false
				if (minutes >= 24 * 60) {
					minutes = minutes % (24 * 60)
					// Incrementar diaInicio e diaTermino em 1 dia (se existirem)
					const curStart = parseYYYYMMDD(p2.diaInicio) ?? new Date()
					const curEnd = parseYYYYMMDD(p2.diaTermino) ?? curStart
					const newStart = addMinutesToDate(curStart, 24 * 60)
					const newEnd = addMinutesToDate(curEnd, 24 * 60)
					p2.diaInicio = toYYYYMMDD(newStart)
					p2.diaTermino = toYYYYMMDD(newEnd)
					// Recalcular diasSemana para manter coerência com a nova data
					try {
						p2.diasSemana = computeDaysOfWeek(newStart, newEnd)
					} catch (e) {
						p2.diasSemana = [newStart.getDay()]
					}
					incrementedDay = true
				}

				p2.horaInicio = minutesToHHMM(minutes)
				// Calcular horaTermino como horaInicio + tempo, mantendo dentro dos limites do dia
				let termMinutes = minutes + tempo
				if (termMinutes >= 24 * 60) termMinutes = (termMinutes % (24 * 60))
				p2.horaTermino = minutesToHHMM(termMinutes)

				cy.log('attemptCreateSchedule: client error, retrying with adjusted payload', { attempt, horaInicio: p2.horaInicio, diaInicio: p2.diaInicio, diasSemana: p2.diasSemana })
				// Pequeno atraso quando incrementamos o dia para permitir que o backend processe alterações anteriores
				const waitMs = incrementedDay ? 1500 : 600
				return cy.wait(waitMs).then(() => tryOnce(p2))
			}

			// Erros de servidor: tentar novamente algumas vezes
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

// Conveniência: agrupar formatação + criação em um único comando
Cypress.Commands.add('createScheduleWithFormatting', (base, options = {}) => {
	return cy.formatSchedulePayload(base, options).then((payload) => cy.attemptCreateSchedule(payload, options))
})

// Find a future slot for a given schedule payload by calling the slots API
// NOTA: Comando findFutureSlotForSchedule foi movido para cypress/support/agendamentos.js
// pois está relacionado à lógica de agendamentos, não de manipulação de datas/horários

// Encontrar uma agenda de um profissional no intervalo que corresponda a horaInicio/horaTermino
Cypress.Commands.add('findScheduleForProfessional', (payload) => {
	const professional = payload.profissionalId ?? Cypress.env('defaultProfessional') ?? 2155
	const token = Cypress.env('access_token')
	const url = `/api/v1/schedule/professional/${professional}`

	// Preferir parâmetros de consulta: ?diaInicio=YYYYMMDD&diaTermino=YYYYMMDD
	const qp = `?diaInicio=${payload.diaInicio}&diaTermino=${payload.diaTermino}`
	const urlWithQs = url + qp

	return cy.request({ method: 'GET', url: urlWithQs, headers: { 'Authorization': `Bearer ${token}` }, failOnStatusCode: false }).then((resp) => {
		cy.log('findScheduleForProfessional response body: ' + JSON.stringify(resp.body))
		if (resp.status !== 200) return cy.wrap(null)
		const list = resp.body?.data ?? resp.body ?? []

		// Tentar encontrar agenda que corresponda a horaInicio/horaTermino
		for (const s of list) {
			const hi = String(s.horaInicio ?? s.start ?? '')
			const ht = String(s.horaTermino ?? s.end ?? '')
			if (!payload.horaInicio || !payload.horaTermino) continue
			if (hi.includes(payload.horaInicio) && ht.includes(payload.horaTermino)) {
				return cy.wrap(s)
			}
		}

		// Alternativa: retornar o primeiro elemento, se existir
		if (Array.isArray(list) && list.length > 0) return cy.wrap(list[0])
		return cy.wrap(null)
	})
})

// Novo auxiliar: localizar id de agenda via endpoint de agendas do profissional (retorna objeto de agenda ou null)
Cypress.Commands.add('findScheduleIdForProfessional', (payload) => {
	const professional = payload.profissionalId ?? Cypress.env('defaultProfessional') ?? 2155
	const token = Cypress.env('access_token')
	const qp = `?diaInicio=${payload.diaInicio}&diaTermino=${payload.diaTermino}`
	const url = `/api/v1/schedule/professional/${professional}${qp}`

	return cy.request({ method: 'GET', url, headers: { 'Authorization': `Bearer ${token}` }, failOnStatusCode: false }).then((resp) => {
		if (resp.status !== 200) return cy.wrap(null)
		const list = resp.body?.data ?? resp.body ?? []
		if (!Array.isArray(list) || list.length === 0) return cy.wrap(null)
		// Preferir o primeiro elemento que pareça uma agenda
		const found = list.find(s => s && (s.id || s.scheduleId || s.idSchedule)) || list[0]
		return cy.wrap(found)
	})
})

// NOTA: Comando buildAppointmentPayloadFromSlot foi movido para cypress/support/agendamentos.js
// pois está relacionado à construção de payload de agendamentos

// Exportar auxiliares para uso direto via require, se necessário
module.exports = {
	toYYYYMMDD,
	parseYYYYMMDD,
	computeDaysOfWeek,
	roundToNextMultiple10,
	formatHHMM,
	addMinutesToDate,
	computeHoraTerminoFromSlots
}

// Simples: excluir uma única agenda por id (idArg) ou por marcadores de ambiente (foundScheduleId ou lastScheduleCreate.id)
Cypress.Commands.add('deleteScheduleIfExists', (idArg = null) => {
	const token = Cypress.env('access_token')
	let envId = idArg ?? Cypress.env('foundScheduleId') ?? (Cypress.env('lastScheduleCreate') && Cypress.env('lastScheduleCreate').id) ?? null
	// Alternativa: se não houver id explícito no ambiente, tentar o último registro em createdScheduleIds
	if (!envId) {
		try {
			const arr = Cypress.env('createdScheduleIds') || []
			if (Array.isArray(arr) && arr.length > 0) {
				envId = arr[arr.length - 1]
			}
		} catch (e) {
			// Ignorar
		}
	}
	if (!envId) return cy.wrap({ deleted: false, reason: 'no-id' })

	return cy.request({ method: 'DELETE', url: `/api/v1/schedule/${envId}`, headers: { Authorization: `Bearer ${token}` }, failOnStatusCode: false }).then((resp) => {
		// Limpar marcadores de conveniência
		try { Cypress.env('foundScheduleId', null) } catch (e) {}
		try { Cypress.env('lastScheduleCreate', null) } catch (e) {}
		// Remover de createdScheduleIds se presente
		try {
			const arr = Cypress.env('createdScheduleIds') || []
			const filtered = Array.isArray(arr) ? arr.filter(i => i !== envId) : []
			Cypress.env('createdScheduleIds', filtered)
		} catch (e) {}
		return cy.wrap({ deleted: (resp.status === 200), status: resp.status, body: resp.body, id: envId })
	})
})

// Aprimorado: excluir todas as agendas criadas durante a execução do teste
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
			// Se a exclusão falhar (ex.: agenda possui atendimentos), registrar e continuar
			results.push({ id, status: dresp.status, body: dresp.body })
			return cy.wait(200).then(() => deleteOne(idx + 1))
		}).catch((err) => {
			results.push({ id, status: 'error', error: String(err) })
			return deleteOne(idx + 1)
		})
	}

	return deleteOne(0)
})


