/// <reference types="cypress"/>

describe('Módulo - Exceções Horários', () => {
    beforeEach(() => {
        cy.login();
        cy.refreshToken()
    })

    // Precisa de dados reais do Amei
    describe('Módulo - Exceções Horários - Cria uma excecao', () => {

        it('Validar retorno 201 - /api/v1/excecoes-horarios', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/excecoes-horarios',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: {
                    "dataInicio": "20251117",
                    "dataFim": "20251117",
                    "horaInicio": "22:00",
                    "horaFim": "23:00",
                    "diasSemana": [
                        1
                    ],
                    "especialidadeIds": [
                        611
                    ],
                    "descricao": "teste",
                    "profissionalId": "3601"
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(201);
                expect(response.body).to.have.property('codigo');
                expect(response.body).to.have.property('flagDeError');
                expect(response.body).to.have.property('mensagem');
            })
        })

        it('Validar retorno 400 - /api/v1/excecoes-horarios', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/excecoes-horarios',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: { // Sem parâmetro no body
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(400);
            })
        })

        it('Validar retorno 401 - /api/v1/excecoes-horarios', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/excecoes-horarios',
                headers: {
                    //'Authorization': `Bearer ${token}`, Token inválido
                    'Content-Type': 'application/json'
                },
                body: {
                    "dataInicio": "20251028",
                    "dataFim": "20251028",
                    "horaInicio": "13:00",
                    "horaFim": "14:00",
                    "tempo": 10,
                    "procedimentos": [
                        {
                            "id": 20357
                        }
                    ],
                    "especialidades": [
                        {
                            "id": 611
                        }
                    ],
                    "localId": 59,
                    "profissionalId": 3601
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(401);
            })
        })
    })

    describe('Módulo - Exceções Horários - Retorna uma lista de excecoes', () => {

        it('Validar retorno 200 - /api/v1/excecoes-horarios', () => {
            const token = Cypress.env('access_token');



            cy.request({
                method: 'GET',
                url: '/api/v1/excecoes-horarios?profissionalId=3601',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(200)

                const body = response.body;
                expect(body).to.be.an('array')
                body.forEach((item) => {
                    expect(item).to.have.property('id');
                    expect(item).to.have.property('dataInicio');
                    expect(item).to.have.property('dataFim');
                    expect(item).to.have.property('horaInicio');
                    expect(item).to.have.property('horaFim');
                    expect(item).to.have.property('tempo');
                    expect(item).to.have.property('dataAlteracao');
                    expect(item).to.have.property('profissionalId');

                    // PROFISSIONAL
                    expect(item.profissionalId).to.be.an('object')
                    expect(item.profissionalId).to.have.property('id');
                    expect(item.profissionalId).to.have.property('tratamento');
                    expect(item.profissionalId).to.have.property('nome');
                    expect(item.profissionalId).to.have.property('sobrenome');
                    expect(item.profissionalId).to.have.property('cpf');
                    expect(item.profissionalId).to.have.property('rg');
                    expect(item.profissionalId).to.have.property('flagMemedPdf');
                    expect(item.profissionalId).to.have.property('titulo');
                    expect(item.profissionalId).to.have.property('dataNascimento');
                    expect(item.profissionalId).to.have.property('email');
                    expect(item.profissionalId).to.have.property('telefone1');
                    expect(item.profissionalId).to.have.property('telefone2');
                    expect(item.profissionalId).to.have.property('cep');
                    expect(item.profissionalId).to.have.property('endereco');
                    expect(item.profissionalId).to.have.property('numero');
                    expect(item.profissionalId).to.have.property('complemento');
                    expect(item.profissionalId).to.have.property('bairro');
                    expect(item.profissionalId).to.have.property('cidade');
                    expect(item.profissionalId).to.have.property('estadoEndereco');
                    expect(item.profissionalId).to.have.property('observacaoPublica');
                    expect(item.profissionalId).to.have.property('convenios');
                    expect(item.profissionalId).to.have.property('exibirNaAgenda');
                    expect(item.profissionalId).to.have.property('responsavelTecnicoClinica');
                    expect(item.profissionalId).to.have.property('mensagemAgenda');
                    expect(item.profissionalId).to.have.property('ativo');
                    expect(item.profissionalId).to.have.property('fotografia');
                    expect(item.profissionalId).to.have.property('tokenMemed');
                    expect(item.profissionalId).to.have.property('criadoPor');
                    expect(item.profissionalId).to.have.property('birdIdToken');
                    expect(item.profissionalId).to.have.property('birdIdExpiration');
                    expect(item.profissionalId).to.have.property('observacaoPrivada');
                    expect(item.profissionalId).to.have.property('cnpj');
                    expect(item.profissionalId).to.have.property('fkUsuario');
                    expect(item.profissionalId).to.have.property('memedUpdateAt');

                    // ESPECIALIDADES                    
                    expect(item).to.have.property('especialidades')
                    expect(item.especialidades).to.be.an('array')

                    item.especialidades.forEach((especialidades) => {
                        expect(especialidades).to.have.property('id');
                        expect(especialidades).to.have.property('descricao');
                        expect(especialidades).to.have.property('rqe');
                        expect(especialidades).to.have.property('ativo');
                        expect(especialidades).to.have.property('flgTelemedicina');
                        expect(especialidades).to.have.property('memedId');
                        expect(especialidades).to.have.property('flgAmorCirurgias');
                    })

                    //PROCEDIMENTOS
                    expect(item).to.have.property('procedimentos');
                    expect(item.procedimentos).to.be.an('array')

                    item.procedimentos.forEach((procedimentos) => {
                        expect(procedimentos).to.have.property('id');
                        expect(procedimentos).to.have.property('nome');
                        expect(procedimentos).to.have.property('nomeTecnico');
                        expect(procedimentos).to.have.property('sinonimos');
                        expect(procedimentos).to.have.property('sigla');
                        expect(procedimentos).to.have.property('codCbhpm');
                        expect(procedimentos).to.have.property('atendimentoGrupo');
                        expect(procedimentos).to.have.property('maxPacientes');
                        expect(procedimentos).to.have.property('duracao');
                        expect(procedimentos).to.have.property('encaixe');
                        expect(procedimentos).to.have.property('obrigarPreenchProfissional');
                        expect(procedimentos).to.have.property('integracao_laboratorial');
                        expect(procedimentos).to.have.property('duplicidade_proposta');
                        expect(procedimentos).to.have.property('telemedicina');
                        expect(procedimentos).to.have.property('pagamentoOnline');
                        expect(procedimentos).to.have.property('avisosAgenda');
                        expect(procedimentos).to.have.property('preparo');
                        expect(procedimentos).to.have.property('flagAtivo');
                        expect(procedimentos).to.have.property('codigoTuss');
                        expect(procedimentos).to.have.property('procedimentoSeriado');
                        expect(procedimentos).to.have.property('obrigarRespeitarTempo');
                        expect(procedimentos).to.have.property('naoPermitirDuplicidadeProposta');
                        expect(procedimentos).to.have.property('exibirAgendamentoOnline');
                        expect(procedimentos).to.have.property('precificacaoSegmentada');
                        expect(procedimentos).to.have.property('naoNecessitaAgendamento');
                        expect(procedimentos).to.have.property('precificacaoVendaPadronizada');
                        expect(procedimentos).to.have.property('valorCustoPadronizado');
                        expect(procedimentos).to.have.property('flgNecessitaAcolhimento');
                        expect(procedimentos).to.have.property('tipoId');
                    })

                    // LOCAL
                    expect(item).to.have.property('localId');
                    expect(item.localId).to.be.an('object');
                    expect(item.localId).to.have.property('id');
                    expect(item.localId).to.have.property('fkUnidade');
                    expect(item.localId).to.have.property('descricao');
                    expect(item.localId).to.have.property('flagAtivo');
                    expect(item.localId).to.have.property('flagCaixa');
                    expect(item.localId).to.have.property('createdAt');
                    expect(item.localId).to.have.property('updatedAt');
                    expect(item.localId).to.have.property('lastUserId');
                    expect(item.localId).to.have.property('ipClient');
                    expect(item.localId).to.have.property('flgRegistroFiserv');
                    expect(item.localId).to.have.property('tokenTerminalFiserv');
                    expect(item.localId).to.have.property('fkContaCorrente');
                })
            })
        })

        it('Validar retorno 401 - /api/v1/excecoes-horarios', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/excecoes-horarios?profissionalId=3601',
                headers: {
                    //'Authorization': `Bearer ${token}`, Token inválido
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(401)
            })
        })
    })

    describe('Módulo - Exceções Horários - Retorna uma excecao por id', () => {

        it('Validar retorno 200 - /api/v1/excecoes-horarios/{id}', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/excecoes-horarios/726',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(200)

                const item = response.body;

                expect(item).to.have.property('id');
                expect(item).to.have.property('dataInicio');
                expect(item).to.have.property('dataFim');
                expect(item).to.have.property('horaInicio');
                expect(item).to.have.property('horaFim');
                expect(item).to.have.property('tempo');
                expect(item).to.have.property('dataAlteracao');
                expect(item).to.have.property('profissionalId');

                // PROFISSIONAL
                expect(item.profissionalId).to.be.an('object')
                expect(item.profissionalId).to.have.property('id');
                expect(item.profissionalId).to.have.property('tratamento');
                expect(item.profissionalId).to.have.property('nome');
                expect(item.profissionalId).to.have.property('sobrenome');
                expect(item.profissionalId).to.have.property('cpf');
                expect(item.profissionalId).to.have.property('rg');
                expect(item.profissionalId).to.have.property('flagMemedPdf');
                expect(item.profissionalId).to.have.property('titulo');
                expect(item.profissionalId).to.have.property('dataNascimento');
                expect(item.profissionalId).to.have.property('email');
                expect(item.profissionalId).to.have.property('telefone1');
                expect(item.profissionalId).to.have.property('telefone2');
                expect(item.profissionalId).to.have.property('cep');
                expect(item.profissionalId).to.have.property('endereco');
                expect(item.profissionalId).to.have.property('numero');
                expect(item.profissionalId).to.have.property('complemento');
                expect(item.profissionalId).to.have.property('bairro');
                expect(item.profissionalId).to.have.property('cidade');
                expect(item.profissionalId).to.have.property('estadoEndereco');
                expect(item.profissionalId).to.have.property('observacaoPublica');
                expect(item.profissionalId).to.have.property('convenios');
                expect(item.profissionalId).to.have.property('exibirNaAgenda');
                expect(item.profissionalId).to.have.property('responsavelTecnicoClinica');
                expect(item.profissionalId).to.have.property('mensagemAgenda');
                expect(item.profissionalId).to.have.property('ativo');
                expect(item.profissionalId).to.have.property('fotografia');
                expect(item.profissionalId).to.have.property('tokenMemed');
                expect(item.profissionalId).to.have.property('criadoPor');
                expect(item.profissionalId).to.have.property('birdIdToken');
                expect(item.profissionalId).to.have.property('birdIdExpiration');
                expect(item.profissionalId).to.have.property('observacaoPrivada');
                expect(item.profissionalId).to.have.property('cnpj');
                expect(item.profissionalId).to.have.property('fkUsuario');
                expect(item.profissionalId).to.have.property('memedUpdateAt');

                // ESPECIALIDADES                    
                expect(item).to.have.property('especialidades')
                expect(item.especialidades).to.be.an('array')

                item.especialidades.forEach((especialidades) => {
                    expect(especialidades).to.have.property('id');
                    expect(especialidades).to.have.property('descricao');
                    expect(especialidades).to.have.property('rqe');
                    expect(especialidades).to.have.property('ativo');
                    expect(especialidades).to.have.property('flgTelemedicina');
                    expect(especialidades).to.have.property('memedId');
                    expect(especialidades).to.have.property('flgAmorCirurgias');
                })

                //PROCEDIMENTOS
                expect(item).to.have.property('procedimentos');
                expect(item.procedimentos).to.be.an('array')

                item.procedimentos.forEach((procedimentos) => {
                    expect(procedimentos).to.have.property('id');
                    expect(procedimentos).to.have.property('nome');
                    expect(procedimentos).to.have.property('nomeTecnico');
                    expect(procedimentos).to.have.property('sinonimos');
                    expect(procedimentos).to.have.property('sigla');
                    expect(procedimentos).to.have.property('codCbhpm');
                    expect(procedimentos).to.have.property('atendimentoGrupo');
                    expect(procedimentos).to.have.property('maxPacientes');
                    expect(procedimentos).to.have.property('duracao');
                    expect(procedimentos).to.have.property('encaixe');
                    expect(procedimentos).to.have.property('obrigarPreenchProfissional');
                    expect(procedimentos).to.have.property('integracao_laboratorial');
                    expect(procedimentos).to.have.property('duplicidade_proposta');
                    expect(procedimentos).to.have.property('telemedicina');
                    expect(procedimentos).to.have.property('pagamentoOnline');
                    expect(procedimentos).to.have.property('avisosAgenda');
                    expect(procedimentos).to.have.property('preparo');
                    expect(procedimentos).to.have.property('flagAtivo');
                    expect(procedimentos).to.have.property('codigoTuss');
                    expect(procedimentos).to.have.property('procedimentoSeriado');
                    expect(procedimentos).to.have.property('obrigarRespeitarTempo');
                    expect(procedimentos).to.have.property('naoPermitirDuplicidadeProposta');
                    expect(procedimentos).to.have.property('exibirAgendamentoOnline');
                    expect(procedimentos).to.have.property('precificacaoSegmentada');
                    expect(procedimentos).to.have.property('naoNecessitaAgendamento');
                    expect(procedimentos).to.have.property('precificacaoVendaPadronizada');
                    expect(procedimentos).to.have.property('valorCustoPadronizado');
                    expect(procedimentos).to.have.property('flgNecessitaAcolhimento');
                    expect(procedimentos).to.have.property('tipoId');
                })

                // LOCAL
                expect(item).to.have.property('localId');
                expect(item.localId).to.be.an('object');
                expect(item.localId).to.have.property('id');
                expect(item.localId).to.have.property('fkUnidade');
                expect(item.localId).to.have.property('descricao');
                expect(item.localId).to.have.property('flagAtivo');
                expect(item.localId).to.have.property('flagCaixa');
                expect(item.localId).to.have.property('createdAt');
                expect(item.localId).to.have.property('updatedAt');
                expect(item.localId).to.have.property('lastUserId');
                expect(item.localId).to.have.property('ipClient');
                expect(item.localId).to.have.property('flgRegistroFiserv');
                expect(item.localId).to.have.property('tokenTerminalFiserv');
                expect(item.localId).to.have.property('fkContaCorrente');
            })
        })

        it('Validar retorno 401 - /api/v1/excecoes-horarios/{id}', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/excecoes-horarios/704',
                headers: {
                    //'Authorization': `Bearer ${token}`, Token inválido
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(401)
            })
        })
    })

    // Precisa de dados reais do Amei
    describe('Módulo - Exceções Horários - Atualizar excecao por id', () => {

        it('Validar retorno 200 - /api/v1/excecoes-horarios/{id}', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'PATCH',
                url: '/api/v1/excecoes-horarios/726',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: {
                    "dataInicio": "20251028",
                    "dataFim": "20251028",
                    "horaInicio": "13:00",
                    "horaFim": "14:00",
                    "tempo": 10,
                    "procedimentos": [
                        {
                            "id": 20357
                        }
                    ],
                    "especialidades": [
                        {
                            "id": 611
                        }
                    ],
                    "localId": 59,
                    "profissionalId": 3601
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(200);
                expect(response.body).to.have.property('codigo');
                expect(response.body).to.have.property('flagDeError');
                expect(response.body).to.have.property('mensagem');
            })
        })

        it('Validar retorno 400 - /api/v1/excecoes-horarios/{id}', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'PATCH',
                url: '/api/v1/excecoes-horarios/704',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: { // Sem parâmetro no body
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(400);
            })
        })

        it('Validar retorno 401 - /api/v1/excecoes-horarios/{id}', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'PATCH',
                url: '/api/v1/excecoes-horarios/704',
                headers: {
                    //'Authorization': `Bearer ${token}`, Token inválido
                    'Content-Type': 'application/json'
                },
                body: {
                    "dataInicio": "20251028",
                    "dataFim": "20251028",
                    "horaInicio": "13:00",
                    "horaFim": "14:00",
                    "tempo": 10,
                    "procedimentos": [
                        {
                            "id": 20357
                        }
                    ],
                    "especialidades": [
                        {
                            "id": 611
                        }
                    ],
                    "localId": 59,
                    "profissionalId": 3601
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(401);
            })
        })
    })

    // Precisa de dados reais do Amei
    describe('Módulo - Exceções Horários - Deletar excecao', () => {

        it('Validar retorno 200 - /api/v1/excecoes-horarios/{id}', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'DELETE',
                url: '/api/v1/excecoes-horarios/3601',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(200);
                expect(response.body).to.have.property('codigo');
                expect(response.body).to.have.property('flagDeError');
                expect(response.body).to.have.property('mensagem');
            })
        })

        it('Validar retorno 400 - /api/v1/excecoes-horarios/{id}', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'DELETE',
                url: '/api/v1/excecoes-horarios/{id}}',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(400);
            })
        })

        it('Validar retorno 401 - /api/v1/excecoes-horarios/{id}', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'DELETE',
                url: '/api/v1/excecoes-horarios/3601',
                headers: {
                    //'Authorization': `Bearer ${token}`, Token inválido
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(401);
            })
        })
    })
})