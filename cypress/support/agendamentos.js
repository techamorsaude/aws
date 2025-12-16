// Custom commands for appointment actions (agendamentos)

// Altera o status de um agendamento através da API /api/v1/change-appointment-status/{id}
// Status disponíveis: 8 (Confirmado), 9 (Cancelado), 16 (Reagendado)
// Usage: cy.changeAppointmentStatus(appointmentId, statusId, observacao, canalConfirmacaoId)
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
// Usage: cy.cancelAppointment(appointmentId, observacao, canalConfirmacaoId)
Cypress.Commands.add('cancelAppointment', (appointmentId = null, observacao = '', canalConfirmacaoId = '') => {
  return cy.changeAppointmentStatus(appointmentId, 9, observacao, canalConfirmacaoId)
})

// Consulta agendamentos por ID ou nome do paciente com paginação
// Usage: cy.queryAppointments({ patientId, patientName, offSet = 1, limit = 10 })
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
// Usage: cy.findFutureSlotForSchedule(payload)
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
// Usage: cy.buildAppointmentPayloadFromSlot(base, slot)
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

module.exports = {}
