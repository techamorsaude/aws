/// <reference types="cypress" />

describe('Módulo - Especialidades', () => {
    beforeEach(() => {
        cy.login();
        cy.refreshToken();
    })

    describe('Módulo - Especialidades - Cria uma especialidade', () => {

        it('Validar retorno 201 - /api/v1/especialidades', () => {
            const token = Cypress.env('access_token');
            const nomeDescricao = `Teste QA Hml ${Date.now()}`;

            cy.request({
                method: 'POST',
                url: '/api/v1/especialidades',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: {
                    descricao: nomeDescricao,
                    rqe: "null",
                    flgTelemedicina: false,
                    flgAmorCirurgias: 0,
                    procedimentos: [
                        {
                            id: 21112
                        }
                    ],
                    ativo: false
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(201);
                cy.log(JSON.stringify(response.body));

                const item = response.body;
                const idEspecialidade = item.id
                const descricao = item.descricao

                expect(item).to.have.property('descricao');
                expect(item).to.have.property('rqe');
                expect(item).to.have.property('flgTelemedicina');
                expect(item).to.have.property('flgAmorCirurgias');
                expect(item).to.have.property('ativo');
                expect(item).to.have.property('memedId');
                expect(item).to.have.property('id');

                //Salva o ID da especialidade
                Cypress.env('idEspecialidade', idEspecialidade)
                cy.log('Id salvo:', idEspecialidade)
                Cypress.env('descricao', descricao)
                cy.log('Descrição:', descricao)
            })
        })

        it('Validar retorno 400 - /api/v1/especialidades', () => {
            const token = Cypress.env('access_token');
            const nomeDescricao = `Teste QA Hml ${Date.now()}`;

            cy.request({
                method: 'POST',
                url: '/api/v1/especialidades',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: { // Sem parâmetro no body
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(400);
                cy.log(JSON.stringify(response.body));
            })
        })

        it('Validar retorno 401 - /api/v1/especialidades', () => {
            const token = Cypress.env('access_token');
            const nomeDescricao = `Teste QA Hml ${Date.now()}`;

            cy.request({
                method: 'POST',
                url: '/api/v1/especialidades',
                headers: {
                    //'Authorization': `Bearer ${token}`, Token inválido
                    'Content-Type': 'application/json'
                },
                body: { // Sem parâmetro no body
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(401);
                cy.log(JSON.stringify(response.body));
            })
        })
    })

    describe('Módulo - Especialidades - Retorna uma lista as especialidades', () => {

        it('Validar retorno 200 - /api/v1/especialidades', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/especialidades',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(200);
                cy.log(JSON.stringify(response.body));

                const items = response.body;
                items.forEach((item) => {
                    expect(item).to.have.property('id');
                    expect(item).to.have.property('descricao');
                    expect(item).to.have.property('rqe');
                    expect(item).to.have.property('ativo');
                    expect(item).to.have.property('flgTelemedicina');
                    expect(item).to.have.property('memedId');
                    expect(item).to.have.property('flgAmorCirurgias');
                })
            })
        })

        it('Validar retorno 401 - /api/v1/especialidades', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/especialidades',
                headers: {
                    //'Authorization': `Bearer ${token}`, Token inválido
                    'Content-Type': 'application'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(401);
                cy.log(JSON.stringify(response.body));
            })
        })
    })

    describe('Módulo - Especialidades - Retorna uma lista as especialidades filtradas por id e(ou) status', () => {

        it('Validar retorno 200 - /api/v1/especialidades/filter', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/especialidades/filter',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(200);
                cy.log(JSON.stringify(response.body));

                const item = response.body;
                expect(item).to.have.property('items').to.be.an('array')
                item.items.forEach((dados) => {
                    expect(dados).to.have.property('id');
                    expect(dados).to.have.property('descricao');
                    expect(dados).to.have.property('ativo');
                    expect(dados).to.have.property('flgTelemedicina');
                })

                expect(item).to.have.property('meta').to.include.all.keys(
                    'totalItems',
                    'itemCount',
                    'itemsPerPage',
                    'totalPages',
                    'currentPage'
                )
            })
        })

        it('Validar retorno 401 - /api/v1/especialidades/filter', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/especialidades/filter',
                headers: {
                    //'Authorization': `Bearer ${token}`, Token inválido
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(401);
                cy.log(JSON.stringify(response.body));
            })
        })
    })

    describe('Módulo - Especialidades - Retorna uma lista apenas das especialidades', () => {

        it('Validar retorno 200 - /api/v1/especialidades/list', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/especialidades/list',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(200);
                cy.log(JSON.stringify(response.body));

                const items = response.body;
                items.forEach((item) => {
                    expect(item).to.have.property('id');
                    expect(item).to.have.property('descricao');
                    expect(item).to.have.property('rqe');
                    expect(item).to.have.property('ativo');
                    expect(item).to.have.property('flgTelemedicina');
                    expect(item).to.have.property('memedId');
                    expect(item).to.have.property('flgAmorCirurgias');
                })
            })
        })

        it('Validar retorno 401 - /api/v1/especialidades/list', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/especialidades/list',
                headers: {
                    //'Authorization': `Bearer ${token}`, Token inválido
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(401);
                cy.log(JSON.stringify(response.body));
            })
        })
    })

    describe('Módulo - Especialidades - Retorna uma lista com as informações básicas das especialidades', () => {

        it('Validar retorno 200 - /api/v1/especialidades/all-especialidades-basicinfo', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/especialidades/all-especialidades-basicinfo',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(200);
                cy.log(JSON.stringify(response.body));

                const item = response.body;
                expect(item).to.have.property('items').to.be.an('array')
                item.items.forEach((dados) => {
                    expect(dados).to.have.property('id');
                    expect(dados).to.have.property('descricao');
                    expect(dados).to.have.property('rqe');
                    expect(dados).to.have.property('procedimentosIds').to.be.an('array');
                })
            })
        })

        it('Validar retorno 400 - /api/v1/especialidades/all-especialidades-basicinfo', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'DELETE',
                url: '/api/v1/especialidades/all-especialidades-basicinfo',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(400);
                cy.log(JSON.stringify(response.body));
            })
        })

        it('Validar retorno 401 - /api/v1/especialidades/all-especialidades-basicinfo', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/especialidades/all-especialidades-basicinfo',
                headers: {
                    //'Authorization': `Bearer ${token}`, Token inválido
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(401);
                cy.log(JSON.stringify(response.body));
            })
        })
    })

    describe('Módulo - Especialidades - Retorna por id', () => {

        it('Validar retorno 200 - /api/v1/especialidades/{id}', () => {
            const token = Cypress.env('access_token');
            const idEspecialidade = Cypress.env('idEspecialidade');

            cy.request({
                method: 'GET',
                url: `/api/v1/especialidades/${idEspecialidade}`,
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(200);
                cy.log(JSON.stringify(response.body));

                const items = response.body;
                expect(items).to.have.property('id');
                expect(items).to.have.property('descricao');
                expect(items).to.have.property('rqe');
                expect(items).to.have.property('ativo');
                expect(items).to.have.property('flgTelemedicina');
                expect(items).to.have.property('memedId');
                expect(items).to.have.property('flgAmorCirurgias');
                expect(items).to.have.property('procedimentos').to.be.an('array');

                items.procedimentos.forEach((proc) => {
                    expect(proc).to.include.all.keys(
                        'id',
                        'nome',
                        'nomeTecnico',
                        'sinonimos',
                        'sigla',
                        'codCbhpm',
                        'atendimentoGrupo',
                        'maxPacientes',
                        'duracao',
                        'encaixe',
                        'obrigarPreenchProfissional',
                        'integracao_laboratorial',
                        'duplicidade_proposta',
                        'telemedicina',
                        'pagamentoOnline',
                        'avisosAgenda',
                        'preparo',
                        'flagAtivo',
                        'codigoTuss',
                        'procedimentoSeriado',
                        'obrigarRespeitarTempo',
                        'naoPermitirDuplicidadeProposta',
                        'exibirAgendamentoOnline',
                        'precificacaoSegmentada',
                        'naoNecessitaAgendamento',
                        'precificacaoVendaPadronizada',
                        'valorCustoPadronizado',
                        'flgNecessitaAcolhimento',
                        'tipoId'
                    );
                })
            })
        })

        it('Validar retorno 400 - /api/v1/especialidades/{id}', () => {
            const token = Cypress.env('access_token');
            const idEspecialidade = Cypress.env('idEspecialidade');

            cy.request({
                method: 'GET',
                url: '/api/v1/especialidades/{id}',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(400);
                cy.log(JSON.stringify(response.body));
            })
        })

        it('Validar retorno 401 - /api/v1/especialidades/{id}', () => {
            const token = Cypress.env('access_token');
            const idEspecialidade = Cypress.env('idEspecialidade');

            cy.request({
                method: 'GET',
                url: `/api/v1/especialidades/${idEspecialidade}`,
                headers: {
                    //'Authorization': `Bearer ${token}`, Token inválido
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(401);
                cy.log(JSON.stringify(response.body));
            })
        })
    })

    describe('Módulo - Especialidades - Atualizar por id', () => {

        it('Validar retorno 200 - /api/v1/especialidades/{id}', () => {
            const token = Cypress.env('access_token');
            const idEspecialidade = Cypress.env('idEspecialidade');
            const descricao = Cypress.env('descricao');

            cy.request({
                method: 'PUT',
                url: `/api/v1/especialidades/${idEspecialidade}`,
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: {
                    descricao: descricao,
                    rqe: "null"
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(200);
                cy.log(JSON.stringify(response.body));

                expect(response.body).to.have.property('codigo');
                expect(response.body).to.have.property('flagDeError');
                expect(response.body).to.have.property('mensagem');
            })
        })

        it('Validar retorno 400 - /api/v1/especialidades/{id}', () => {
            const token = Cypress.env('access_token');
            const idEspecialidade = Cypress.env('idEspecialidade');
            const descricao = Cypress.env('descricao');

            cy.request({
                method: 'PUT',
                url: '/api/v1/especialidades/{id}',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: {// Sem parâmetro no body
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(400);
                cy.log(JSON.stringify(response.body));
            })
        })

        it('Validar retorno 401 - /api/v1/especialidades/{id}', () => {
            const token = Cypress.env('access_token');
            const idEspecialidade = Cypress.env('idEspecialidade');
            const descricao = Cypress.env('descricao');

            cy.request({
                method: 'PUT',
                url: `/api/v1/especialidades/${idEspecialidade}`,
                headers: {
                    //'Authorization': `Bearer ${token}`, Token inválido
                    'Content-Type': 'application/json'
                },
                body: {
                    descricao: descricao,
                    rqe: "null"
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(401);
                cy.log(JSON.stringify(response.body));
            })
        })
    })

    describe('Módulo - Especialidades - Deletar', () => {

        it('Validar retorno 200 - /api/v1/especialidades/{id}', () => {
            const token = Cypress.env('access_token');
            const idEspecialidade = Cypress.env('idEspecialidade');

            cy.request({
                method: 'DELETE',
                url: `/api/v1/especialidades/${idEspecialidade}`,
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(200);
                cy.log(JSON.stringify(response.body));

                const item = response.body;
                expect(item).to.have.property('codigo');
                expect(item).to.have.property('flagDeError');
                expect(item).to.have.property('mensagem');

                expect(item).to.have.property('permissions').to.include.all.keys(
                    'id',
                    'descricao',
                    'rqe',
                    'ativo',
                    'flgTelemedicina',
                    'memedId',
                    'flgAmorCirurgias',
                )

                expect(item.permissions).to.have.property('procedimentos').to.be.an('array')
                item.permissions.procedimentos.forEach((dados) => {
                    expect(dados).to.have.property('id');
                    expect(dados).to.have.property('nome');
                    expect(dados).to.have.property('nomeTecnico');
                    expect(dados).to.have.property('sinonimos');
                    expect(dados).to.have.property('sigla');
                    expect(dados).to.have.property('codCbhpm');
                    expect(dados).to.have.property('atendimentoGrupo');
                    expect(dados).to.have.property('maxPacientes');
                    expect(dados).to.have.property('duracao');
                    expect(dados).to.have.property('encaixe');
                    expect(dados).to.have.property('obrigarPreenchProfissional');
                    expect(dados).to.have.property('integracao_laboratorial');
                    expect(dados).to.have.property('duplicidade_proposta');
                    expect(dados).to.have.property('telemedicina');
                    expect(dados).to.have.property('pagamentoOnline');
                    expect(dados).to.have.property('avisosAgenda');
                    expect(dados).to.have.property('preparo');
                    expect(dados).to.have.property('flagAtivo');
                    expect(dados).to.have.property('codigoTuss');
                    expect(dados).to.have.property('procedimentoSeriado');
                    expect(dados).to.have.property('obrigarRespeitarTempo');
                    expect(dados).to.have.property('naoPermitirDuplicidadeProposta');
                    expect(dados).to.have.property('exibirAgendamentoOnline');
                    expect(dados).to.have.property('precificacaoSegmentada');
                    expect(dados).to.have.property('naoNecessitaAgendamento');
                    expect(dados).to.have.property('precificacaoVendaPadronizada');
                    expect(dados).to.have.property('valorCustoPadronizado');
                    expect(dados).to.have.property('flgNecessitaAcolhimento');
                    expect(dados).to.have.property('tipoId');
                })
            })
        })

        it('Validar retorno 400 - /api/v1/especialidades/{id}', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'DELETE',
                url: '/api/v1/especialidades/{id}', // Sem parâmetro
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(400);
                cy.log(JSON.stringify(response.body));
            })
        })

        it('Validar retorno 401 - /api/v1/especialidades/{id}', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'DELETE',
                url: '/api/v1/especialidades/{id}',
                headers: {
                    //'Authorization': `Bearer ${token}`, Token inválido
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(401);
                cy.log(JSON.stringify(response.body));
            })
        })
    })
    
    describe('Módulo - Especialidades - Retorna por profissional', () => {
        
        it('Validar retorno 200 - /api/v1/especialidades/profissional/{profissionalId}', () => {
            const token = Cypress.env('access_token');
            const idEspecialidade = Cypress.env('idEspecialidade');

            cy.request({
                method: 'GET',
                url: `/api/v1/especialidades/profissional/${idEspecialidade}`,
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(200);
                cy.log(JSON.stringify(response.body));

                const items = response.body;
                items.forEach((item) => {
                    expect(item).to.have.property('ativo');
                    expect(item).to.have.property('descricao');
                    expect(item).to.have.property('flgTelemedicina');
                    expect(item).to.have.property('id');
                    expect(item).to.have.property('registroProfissional');
                    expect(item).to.have.property('state');
                    expect(item).to.have.property('degree');
                    expect(item).to.have.property('degreeId');
                    expect(item).to.have.property('rqe');
                    expect(item).to.have.property('profissaoId');
                    expect(item).to.have.property('especialidade_id');
                })
            })
        })

        it('Validar retorno 400 - /api/v1/especialidades/profissional/{profissionalId}', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/especialidades/profissional/{profissionalId}', // Sem parâmetro
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(400);
                cy.log(JSON.stringify(response.body));
            })
        })

        it('Validar retorno 401 - /api/v1/especialidades/profissional/{profissionalId}', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/especialidades/profissional/4181',
                headers: {
                    //'Authorization': `Bearer ${token}`, Token inválido
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(401);
                cy.log(JSON.stringify(response.body));
            })
        })
    })
})