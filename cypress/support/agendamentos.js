// Comandos personalizados para ações de agendamento

// Altera o status de um agendamento através da API /api/v1/change-appointment-status/{id}
// Status disponíveis: 8 (Confirmado), 9 (Cancelado), 16 (Reagendado)
// Uso: cy.changeAppointmentStatus(appointmentId, statusId, observacao, canalConfirmacaoId)
Cypress.Commands.add('changeAppointmentStatus', (appointmentId = null, statusId = 9, observacao = '', canalConfirmacaoId = '') => {
  const token = Cypress.env('access_token')

  // Tenta determinar o ID se não foi fornecido
  let id = appointmentId || null
  if (!id) {
    try {
      const last = Cypress.env('lastCreatedAppointment')
      if (last && (last.id || last.appointmentId)) id = last.id || last.appointmentId
    } catch (e) {}
  }
  if (!id) {
    try {
      const arr = Cypress.env('createdAppointmentIds') || []
      if (Array.isArray(arr) && arr.length > 0) id = arr[arr.length - 1]
    } catch (e) {}
  }

  if (!id) return cy.wrap({ success: false, reason: 'no-id' })

  const body = {
    statusId: statusId,
    observacao: observacao,
    canalConfirmacaoId: canalConfirmacaoId
  }

  const url = `/api/v1/change-appointment-status/${id}`

  return cy.request({
    method: 'PUT',
    url,
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body,
    timeout: 60000, // 60 segundos de timeout
    failOnStatusCode: false
  }).then((resp) => {
    cy.log(`Status do agendamento ${id} alterado para ${statusId}. Resposta: ${resp.status}`)

    // Se cancelou (statusId 9), remove dos arrays de rastreamento
    if (statusId === 9) {
      try {
        const arr = Cypress.env('createdAppointmentIds') || []
        const filtered = Array.isArray(arr) ? arr.filter(i => i !== id) : []
        Cypress.env('createdAppointmentIds', filtered)
      } catch (e) {}

      try {
        const last = Cypress.env('lastCreatedAppointment')
        if (last && (last.id === id || last.appointmentId === id)) {
          Cypress.env('lastCreatedAppointment', null)
        }
      } catch (e) {}
    }

    const ok = resp.status === 200 || resp.status === 204
    return cy.wrap({
      success: ok,
      status: resp.status,
      body: resp.body,
      id,
      statusId
    })
  })
})

// Cancela um agendamento (atalho para changeAppointmentStatus com statusId = 9)
// Uso: cy.cancelAppointment(appointmentId, observacao, canalConfirmacaoId)
Cypress.Commands.add('cancelAppointment', (appointmentId = null, observacao = '', canalConfirmacaoId = '') => {
  return cy.changeAppointmentStatus(appointmentId, 9, observacao, canalConfirmacaoId)
})

// Consulta agendamentos por ID ou nome do paciente com paginação
// Uso: cy.queryAppointments({ patientId, patientName, offSet = 1, limit = 10 })
Cypress.Commands.add('queryAppointments', (params = {}) => {
  const token = Cypress.env('access_token')
  const patientId = params.patientId ?? ''
  const patientName = params.patientName ?? ''
  const offSet = params.offSet ?? 1
  const limit = params.limit ?? 10

  // Constrói a URL com query parameters
  let url = '/api/v1/appointments?'
  const queryParams = []
  
  if (patientId) queryParams.push(`patientId=${encodeURIComponent(patientId)}`)
  if (patientName) queryParams.push(`patientName=${encodeURIComponent(patientName)}`)
  queryParams.push(`offSet=${offSet}`)
  queryParams.push(`limit=${limit}`)
  
  url += queryParams.join('&')

  const headers = {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json'
  }

  return cy.request({ 
    method: 'GET', 
    url, 
    headers, 
    failOnStatusCode: false 
  }).then((resp) => {
    cy.log(`Consulta de agendamentos: ${resp.status}`)
    if (resp.body) {
      cy.log(`Total de itens encontrados: ${resp.body.items ? resp.body.items.length : 0}`)
    }
    return cy.wrap(resp)
  })
})

// Busca um slot disponível (status = "Livre") para uma grade de horários específica
// Utiliza a API /api/v1/slots/list-slots-by-professional para localizar slots
// Uso: cy.findFutureSlotForSchedule(payload)
Cypress.Commands.add('findFutureSlotForSchedule', (payload) => {
  const clinic = payload.clinicaId ?? Cypress.env('defaultClinic') ?? 483
  const specialty = (payload.areasAtuacao && payload.areasAtuacao[0]) ?? Cypress.env('defaultSpecialty') ?? 616
  const professional = payload.profissionalId ?? Cypress.env('defaultProfessional') ?? 2155

  // Usa o intervalo de datas da grade se disponível, caso contrário usa semana atual
  let initialDate, finalDate
  if (payload.diaInicio && payload.diaTermino) {
    initialDate = payload.diaInicio
    finalDate = payload.diaTermino
  } else {
    const now = new Date()
    const startOfWeek = new Date(now.setDate(now.getDate() - now.getDay()))
    const endOfWeek = new Date(now.setDate(now.getDate() - now.getDay() + 6))
    initialDate = formatDateToYYYYMMDD(startOfWeek)
    finalDate = formatDateToYYYYMMDD(endOfWeek)
  }

  const url = `/api/v1/slots/list-slots-by-professional?idClinic=${clinic}&idSpecialty=${specialty}&idProfessional=${professional}&initialDate=${initialDate}&finalDate=${finalDate}&initialHour=00:00&endHour=23:59&fetchPolicy=network-only&cancelledAppointments=false`
  const token = Cypress.env('access_token')

  return cy.request({ method: 'GET', url, headers: { 'Authorization': `Bearer ${token}` }, failOnStatusCode: false }).then((resp) => {
    if (resp.status !== 200) {
      cy.log(`API de slots retornou status ${resp.status}`)
      return cy.wrap(null)
    }

    const body = resp.body

    // Formato da resposta: [{ professional: {...}, grid: {...}, hours: [{id, formatedHour, date, status, idSchedule, ...}, ...] }]
    let candidateSlots = []
    if (Array.isArray(body) && body.length > 0) {
      // Extrai todos os slots do array hours de cada container
      for (const container of body) {
        if (container && Array.isArray(container.hours)) {
          candidateSlots.push(...container.hours)
        }
      }
    }

    if (candidateSlots.length === 0) {
      cy.log('Nenhum slot encontrado na resposta da API')
      return cy.wrap(null)
    }

    cy.log(`Total de slots encontrados: ${candidateSlots.length}`)

    // Filtra apenas slots com status "Livre"
    const slotsLivres = candidateSlots.filter(s => {
      const status = s.status ?? s.statusText ?? ''
      return String(status).toLowerCase() === 'livre' || String(status).toLowerCase() === 'free'
    })

    cy.log(`Slots livres encontrados: ${slotsLivres.length}`)

    if (slotsLivres.length === 0) {
      cy.log('Nenhum slot livre disponível')
      return cy.wrap(null)
    }

    const nowDate = new Date()
    let slotSelecionado = null

    for (const slot of slotsLivres) {
      const horaFormatada = slot.formatedHour ?? slot.formattedHour ?? slot.hourFormatted ?? null
      const dataSlot = slot.date ?? slot.data ?? slot.slotDate ?? null
      
      if (!horaFormatada || !dataSlot) continue

      const dataSlotObj = parseDateString(dataSlot)
      if (!dataSlotObj) continue

      // Quando buscar dentro de um intervalo específico (payload tem diaInicio/diaTermino),
      // aceita qualquer slot disponível independente de estar no passado
      // (útil para grades de teste criadas em datas passadas)
      if (payload.diaInicio) {
        slotSelecionado = slot
        break
      }

      // Para buscas dinâmicas/futuras, aceita apenas slots futuros
      if (dataSlotObj > nowDate) {
        slotSelecionado = slot
        break
      }

      // Se for hoje, compara horários
      if (dataSlotObj.toDateString() === nowDate.toDateString()) {
        const [hh, mm] = String(horaFormatada).split(':').map(Number)
        const slotMinutos = hh * 60 + (mm || 0)
        const agoraMinutos = nowDate.getHours() * 60 + nowDate.getMinutes()
        
        if (slotMinutos > agoraMinutos) {
          slotSelecionado = slot
          break
        }
      }
    }

    if (slotSelecionado) {
      cy.log(`Slot livre selecionado: ID=${slotSelecionado.id}, Status=${slotSelecionado.status}, Hora=${slotSelecionado.formatedHour}, Data=${slotSelecionado.date}`)
    } else {
      cy.log('Nenhum slot futuro livre encontrado')
    }

    return cy.wrap(slotSelecionado)
  })

  // Helper: converte Date para YYYYMMDD
  function formatDateToYYYYMMDD(date) {
    const yyyy = date.getFullYear()
    const mm = String(date.getMonth() + 1).padStart(2, '0')
    const dd = String(date.getDate()).padStart(2, '0')
    return `${yyyy}${mm}${dd}`
  }

  // Helper: parse date string (DD/MM/YYYY ou YYYYMMDD)
  function parseDateString(dateStr) {
    const s = String(dateStr).trim()
    
    // Formato YYYYMMDD
    if (/^\d{8}$/.test(s)) {
      const yyyy = parseInt(s.substring(0, 4))
      const mm = parseInt(s.substring(4, 6)) - 1
      const dd = parseInt(s.substring(6, 8))
      return new Date(yyyy, mm, dd)
    }
    
    // Formato DD/MM/YYYY
    if (/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(s)) {
      const parts = s.split('/')
      const dd = parseInt(parts[0])
      const mm = parseInt(parts[1]) - 1
      const yyyy = parseInt(parts[2])
      return new Date(yyyy, mm, dd)
    }
    
    // Fallback: tenta parse nativo
    const parsed = new Date(s)
    return isNaN(parsed.getTime()) ? null : parsed
  }
})

// Constrói payload de agendamento a partir de um slot encontrado + base do fixture
// Uso: cy.buildAppointmentPayloadFromSlot(base, slot)
Cypress.Commands.add('buildAppointmentPayloadFromSlot', (base = {}, slot = {}) => {
  // Helper para normalizar data para YYYYMMDD
  const normalizeDate = (d) => {
    if (!d) return null
    const s = String(d).trim()
    
    // Já está em YYYYMMDD
    if (/^\d{8}$/.test(s)) return s
    
    // DD/MM/YYYY -> converte para YYYYMMDD
    if (/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(s)) {
      const parts = s.split('/')
      const dd = parts[0].padStart(2, '0')
      const mm = parts[1].padStart(2, '0')
      const yyyy = parts[2]
      return `${yyyy}${mm}${dd}`
    }
    
    // Fallback: tenta parse via Date
    const parsed = new Date(s)
    if (!isNaN(parsed.getTime())) {
      const yyyy = parsed.getFullYear()
      const mm = String(parsed.getMonth() + 1).padStart(2, '0')
      const dd = String(parsed.getDate()).padStart(2, '0')
      return `${yyyy}${mm}${dd}`
    }
    
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
    listaEsperaId: 0    
  }

  if (slotId) appointment.slotId = slotId

  cy.log(`Payload de agendamento construído: scheduleId=${scheduleId}, slotId=${slotId}, data=${data}, hora=${horaInicio}`)

  return cy.wrap(appointment)
})

// Busca as informações de parcelas/pagamentos de um agendamento
// Uso: cy.getAppointmentInfosParcelas(schedulingId)
Cypress.Commands.add('getAppointmentInfosParcelas', (schedulingId, options = {}) => {
  const token = Cypress.env('access_token')
  const id = schedulingId ?? Cypress.env('lastCreatedAppointmentId')

  if (!id) return cy.wrap({ status: 0, body: null, error: 'no-scheduling-id' })

  return cy.request({
    method: 'GET',
    url: `/api/v1/appointments/infos-parcelas/${id}`,
    headers: {
      accept: '*/*',
      Authorization: `Bearer ${token}`
    },
    failOnStatusCode: false,
    timeout: options.timeout ?? 60000
  })
})

// Asserções auxiliares para manter os specs mais limpos
// Uso: cy.assertInfosParcelasBodyVazio(response.body)
Cypress.Commands.add('assertInfosParcelasBodyVazio', (body) => {
  if (body === null || body === undefined) return cy.wrap(body)

  if (Array.isArray(body)) {
    expect(body.length, 'Body deve ser um array vazio').to.eq(0)
    return cy.wrap(body)
  }

  if (typeof body === 'string') {
    expect(body.trim(), 'Body deve ser string vazia').to.eq('')
    return cy.wrap(body)
  }

  if (typeof body === 'object') {
    expect(Object.keys(body), 'Body deve ser objeto vazio').to.have.length(0)
    return cy.wrap(body)
  }

  throw new Error('Formato de body inesperado para retorno vazio: ' + typeof body)
})

// Uso: cy.assertInfosParcelasBodyComPagamento(response.body)
Cypress.Commands.add('assertInfosParcelasBodyComPagamento', (body) => {
  expect(body, 'Body esperado como array de parcelas').to.be.an('array')
  expect(body.length, 'Deve haver ao menos uma parcela').to.be.greaterThan(0)

  body.forEach((item) => {
    expect(item).to.have.property('parcelNumber')
    expect(item).to.have.property('dueDate')
    expect(item).to.have.property('totalValue')
    expect(item).to.have.property('amountsPaid')
    expect(item).to.have.property('parcels').to.be.an('array')

    item.parcels.forEach((p) => {
      expect(p).to.have.property('financialReleaseId')
      expect(p).to.have.property('origemId')
      expect(p).to.have.property('amountPaid')
      expect(p).to.have.property('downloadedValue')
      expect(p).to.have.property('paymentMethod')
      expect(p).to.have.property('paymentDate')
      expect(p).to.have.property('downloadedDate')
    })
  })

  return cy.wrap(body)
})

// Realiza um pagamento para um agendamento
// Endpoint: POST /api/v1/payments/
// Uso: cy.createPaymentForAppointment(appointmentId, { valor, formaLiquidacaoId, unidadeId, dataPagamento })
Cypress.Commands.add('createPaymentForAppointment', (appointmentId, options = {}) => {
  const token = Cypress.env('access_token')
  const unidadeId = options.unidadeId ?? Cypress.env('defaultClinic') ?? 483
  const formaLiquidacaoId = options.formaLiquidacaoId ?? 1
  const valor = options.valor ?? Cypress.env('valorPagamento') ?? 20
  const hashPOS = options.hashPOS ?? 'XXXXXXXXXXX'
  const quantidadeParcelas = options.quantidadeParcelas ?? 1
  const ipClient = options.ipClient ?? ''

  if (!appointmentId) {
    throw new Error('createPaymentForAppointment: appointmentId é obrigatório')
  }

  const toYYYYMMDD = (d) => {
    const yyyy = d.getFullYear()
    const mm = String(d.getMonth() + 1).padStart(2, '0')
    const dd = String(d.getDate()).padStart(2, '0')
    return `${yyyy}${mm}${dd}`
  }

  const dataPagamento = options.dataPagamento ?? toYYYYMMDD(new Date())
  const headersExtras = options.headersExtras ?? {}

  return cy.request({
    method: 'POST',
    url: '/api/v1/payments',
    headers: {
      accept: '*/*',
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      ...headersExtras,
    },
    body: {
      unidadeId: Number(unidadeId),
      agendamentoId: Number(appointmentId),
      formaLiquidacaoId: Number(formaLiquidacaoId),      
      valor: Number(valor),
      dataPagamento,
      hashPOS,
      quantidadeParcelas: Number(quantidadeParcelas),
    },
    failOnStatusCode: false,
    timeout: options.timeout ?? 90000,
  }).then((resp) => {
    if (resp.status >= 400) {
      const msg = resp.body?.mensagem ?? resp.body?.message ?? resp.body?.error ?? ''
      const details = resp.body ? ` Body: ${JSON.stringify(resp.body)}` : ''
      throw new Error(`createPaymentForAppointment: falha HTTP ${resp.status}.${msg ? ` Mensagem: ${msg}.` : ''}${details}`)
    }
    return cy.wrap(resp)
  })
})

// Aguarda o endpoint infos-parcelas retornar body não vazio (após pagamento)
// Uso: cy.waitForInfosParcelasComPagamento(appointmentId)
Cypress.Commands.add('waitForInfosParcelasComPagamento', (appointmentId, options = {}) => {
  const retries = options.retries ?? 10
  const delayMs = options.delayMs ?? 2000

  const hasNonEmptyBody = (body) => {
    if (body === null || body === undefined) return false
    if (Array.isArray(body)) return body.length > 0
    if (typeof body === 'string') return body.trim().length > 0
    if (typeof body === 'object') return Object.keys(body).length > 0
    return false
  }

  const attempt = (n) => {
    return cy.getAppointmentInfosParcelas(appointmentId, { timeout: options.timeout ?? 60000 }).then((resp) => {
      if (resp.status === 200 && hasNonEmptyBody(resp.body)) return cy.wrap(resp)
      if (n >= retries) return cy.wrap(resp)
      return cy.wait(delayMs).then(() => attempt(n + 1))
    })
  }

  return attempt(0)
})

// Cria um agendamento usando os fixtures (schedule.json + appointment.json)
// e retorna { appointmentId, scheduleId, slot }
// Uso: cy.createAppointmentFromFixtures()
Cypress.Commands.add('createAppointmentFromFixtures', (options = {}) => {
  const headersExtras = options.headersExtras ?? {}
  const valorTotalOverride = options.valorTotal

  return cy.fixture('schedule.json').then((baseGrade) => {
    return cy.formatSchedulePayload(baseGrade).then((payloadGrade) => {
      return cy.attemptCreateSchedule(payloadGrade).then(() => {
        return cy.findFutureSlotForSchedule(payloadGrade).then((slot) => {
          expect(slot, 'Slot disponível encontrado').to.exist

          return cy.findScheduleIdForProfessional(payloadGrade).then((gradeEncontrada) => {
            const scheduleId = gradeEncontrada ? (gradeEncontrada.id ?? gradeEncontrada.scheduleId ?? gradeEncontrada.idSchedule) : null
            expect(scheduleId, 'scheduleId encontrado').to.exist
            Cypress.env('foundScheduleId', scheduleId)

            return cy.fixture('appointment.json').then((templateAgendamento) => {
              return cy.buildAppointmentPayloadFromSlot(baseGrade, slot).then((agendamentoDoSlot) => {
                const agendamento = { ...templateAgendamento, ...agendamentoDoSlot }
                if (slot.id) agendamento.slotId = slot.id
                agendamento.scheduleId = scheduleId

                if (valorTotalOverride !== undefined && valorTotalOverride !== null) {
                  const v = Number(valorTotalOverride)
                  agendamento.valorTotal = String(v)
                  if (Array.isArray(agendamento.agendamentosProcedimentos) && agendamento.agendamentosProcedimentos[0]) {
                    agendamento.agendamentosProcedimentos[0].valor = v
                  }
                }

                const token = Cypress.env('access_token')

                return cy.request({
                  method: 'POST',
                  url: '/api/v1/appointments',
                  headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                    origin: 'http://localhost:4200',
                    referer: 'http://localhost:4200/',
                    devicetype: 'desktop',
                    ostype: 'windows',
                    browser: 'chrome',
                    unitidfromoperator: String(baseGrade.clinicaId ?? 483),
                    unitnamefromoperator: 'Unidade Teste',
                    useridfromoperator: String(Cypress.env('useridfromoperator') ?? 1988),
                    ...headersExtras
                  },
                  body: agendamento,
                  failOnStatusCode: false,
                  timeout: options.timeout ?? 60000
                }).then((respCreate) => {
                  expect([200, 201], 'Status esperado ao criar agendamento').to.include(respCreate.status)

                  const appointmentId = respCreate.body?.id ?? respCreate.body?.agendamentoId
                  expect(appointmentId, 'appointmentId criado').to.exist
                  Cypress.env('lastCreatedAppointmentId', appointmentId)

                  return cy.wrap({ appointmentId, scheduleId, slot })
                })
              })
            })
          })
        })
      })
    })
  })
})

// Procura um agendamento que já possua pagamentos/parcelas registradas no endpoint infos-parcelas
// Útil para ambientes com dados reais quando não há um endpoint de pagamento disponível para o teste
// Uso: cy.findAppointmentIdComPagamento({ patientId, offSet, limit })
Cypress.Commands.add('findAppointmentIdComPagamento', (options = {}) => {
  const schedulingIdFromEnv = options.schedulingId ?? Cypress.env('schedulingIdComPagamento')
  if (schedulingIdFromEnv) return cy.wrap(schedulingIdFromEnv)

  const patientId = options.patientId ?? Cypress.env('pacienteId') ?? 73749
  const offSet = options.offSet ?? 1
  const limit = options.limit ?? 25
  const allowNotFound = options.allowNotFound ?? false

  const extractId = (item) => {
    if (!item) return null
    return item.id ?? item.appointmentId ?? item.agendamentoId ?? item.schedulingId ?? item.idAgendamento ?? null
  }

  const hasNonEmptyBody = (body) => {
    if (body === null || body === undefined) return false
    if (Array.isArray(body)) return body.length > 0
    if (typeof body === 'string') return body.trim().length > 0
    if (typeof body === 'object') return Object.keys(body).length > 0
    return false
  }

  return cy.queryAppointments({ patientId, offSet, limit }).then((resp) => {
    if (resp.status !== 200) {
      throw new Error(`findAppointmentIdComPagamento: falha ao consultar agendamentos. status=${resp.status}`)
    }

    const items = resp.body?.items ?? []
    if (!Array.isArray(items) || items.length === 0) {
      if (allowNotFound) return cy.wrap(null)
      throw new Error('findAppointmentIdComPagamento: nenhum agendamento encontrado para o paciente informado')
    }

    const ids = items.map(extractId).filter(Boolean)
    if (ids.length === 0) {
      if (allowNotFound) return cy.wrap(null)
      throw new Error('findAppointmentIdComPagamento: não foi possível extrair IDs dos agendamentos retornados')
    }

    const tryAt = (idx) => {
      if (idx >= ids.length) return cy.wrap(null)
      const id = ids[idx]

      return cy.getAppointmentInfosParcelas(id).then((r) => {
        if (r.status === 200 && hasNonEmptyBody(r.body)) return cy.wrap(id)
        return tryAt(idx + 1)
      })
    }

    return tryAt(0).then((foundId) => {
      if (!foundId) {
        if (allowNotFound) return cy.wrap(null)
        throw new Error('findAppointmentIdComPagamento: não encontrou nenhum agendamento com pagamento. Se preferir, defina Cypress.env("schedulingIdComPagamento") com um ID válido.')
      }
      return cy.wrap(foundId)
    })
  })
})

module.exports = {}
// Consulta pacientes por profissional
// Endpoint: GET /api/v1/appointments/patients/professional/{professionalId}
// Uso: cy.getPatientsByProfessional({ professionalId, patient, limit })
Cypress.Commands.add('getPatientsByProfessional', (params = {}) => {
  const token = Cypress.env('access_token')
  const professionalId = params.professionalId ?? Cypress.env('defaultProfessional') ?? 2155
  const patient = params.patient ?? ''
  const limit = params.limit ?? 10

  // Monta path + query mantendo o professionalId nos dois, como no curl
  const basePath = `/api/v1/appointments/patients/professional/${encodeURIComponent(professionalId)}`
  const query = `professionalId=${encodeURIComponent(professionalId)}${patient ? `&patient=${encodeURIComponent(patient)}` : ''}&limit=${encodeURIComponent(limit)}`
  const url = `${basePath}?${query}`

  return cy.request({
    method: 'GET',
    url,
    headers: {
      accept: '*/*',
      Authorization: `Bearer ${token}`,
    },
    failOnStatusCode: false,
    timeout: params.timeout ?? 60000,
  })
})

// Asserção flexível para resposta de pacientes por profissional
// Aceita array direto ou objeto com items[]
Cypress.Commands.add('assertPatientsByProfessionalBody', (body) => {
  if (Array.isArray(body)) return cy.wrap(body)
  if (body && typeof body === 'object') {
    if (Array.isArray(body.items)) return cy.wrap(body.items)
    // Permite objetos vazios
    return cy.wrap(body)
  }
  throw new Error('Formato de body inesperado para pacientes por profissional')
})
