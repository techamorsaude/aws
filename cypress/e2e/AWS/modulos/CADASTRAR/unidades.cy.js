/// <reference types= "cypress" /> 

describe('Módulo - Unidades', () => {

    beforeEach(() => {
        cy.login()
        cy.refreshToken()
    });

    describe('Módulo - Unidades - Criar uma unidade ', () => {

        it('Validar retorno 201 - /api/v1/unidades', () => {
            const token = Cypress.env('access_token');
            const random = Math.floor(Math.random() * 100000);

            cy.GeradorCnpj().then((cnpjValido) => {
                cy.log('CNPJ usado:', cnpjValido);

                cy.request({
                    method: 'POST',
                    url: '/api/v1/unidades',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    },
                    body: {
                        name: `Teste unidade API ${random}`,
                        razaoSocial: "Empresa Teste Ltda",
                        nomeFantasia: "Teste API Modulo Unidades",
                        bairro: "Centro",
                        country: "BR",
                        cnpj: cnpjValido,
                        cnes: "1234567",
                        consultorResponsavel: "João da Silva",
                        telefonePrincipal: "11987654321",
                        telefoneSecundario: "11912345678",
                        emailPrincipal: "contato@empresa.com",
                        emailSecundario: "suporte@empresa.com",
                        cep: "01001000",
                        endereco: "Avenida Paulista",
                        numero: "1000",
                        complemento: "Conjunto 101",
                        observacao: "Unidade de testes para homologação.",
                        sigla: "TEST",
                        fusoHorarioId: 1,
                        tipoUnidadeId: 2,
                        unidadeMatrizId: null,
                        exibirAgendamentosOnline: true,
                        exibirAgendamentoAssistido: false,
                        regionId: 3,
                        sellerId: "SELL1234",
                        ativarIntegracaoTef: true,
                        ativarSplit: false,
                        regimeTributarioId: 1,
                        unidadeStatusId: 2,
                        responsavelTecnicoId: null,
                        cidadeId: 1001,
                        regiaoZona: "Zona Sul",
                        parceiroInstitucionalId: null,
                        dataInauguracao: "20240101",
                        tipoSegmentoId: 4,
                        ativo: "A",
                        mcc: "8099",
                        flgAmorCirurgias: 0
                    },
                    failOnStatusCode: false,
                }).then((response) => {
                    expect(response.status).to.eq(201);

                    const item = response.body;
                    expect(item).to.have.property('id');
                    expect(item).to.have.property('descricao');
                    expect(item).to.have.property('endereco');
                    expect(item).to.have.property('flgCentral');
                    expect(item).to.have.property('feegowClinicId');
                    expect(item).to.have.property('flgTelemedicina');
                    expect(item).to.have.property('flgAmorCirurgias');
                    expect(item).to.have.property('regiaoId');
                    expect(item).to.have.property('flgAtivo');
                    expect(item).to.have.property('flgAtivarTef');
                    expect(item).to.have.property('razaoSocial');
                    expect(item).to.have.property('cnpj');
                    expect(item).to.have.property('cnes');
                    expect(item).to.have.property('fkRegimeTributario');
                    expect(item).to.have.property('fkUnidadeStatus');
                    expect(item).to.have.property('consultor');
                    expect(item).to.have.property('telefonePrincipal');
                    expect(item).to.have.property('telefoneSecundario');
                    expect(item).to.have.property('emailPrincipal');
                    expect(item).to.have.property('emailSecundario');
                    expect(item).to.have.property('cep');
                    expect(item).to.have.property('numero');
                    expect(item).to.have.property('complemento');
                    expect(item).to.have.property('bairro');
                    expect(item).to.have.property('regiaoZona');
                    expect(item).to.have.property('observacao');
                    expect(item).to.have.property('sigla');
                    expect(item).to.have.property('fkFusoHorario');
                    expect(item).to.have.property('fkTipoUnidade');
                    expect(item).to.have.property('flgAgendaOnline');
                    expect(item).to.have.property('sellerId');
                    expect(item).to.have.property('flgAtivarSplit');
                    expect(item).to.have.property('fkParceiroInstitucional');
                    expect(item).to.have.property('dataInauguracao');
                    expect(item).to.have.property('fkTipoSegmento');
                    expect(item).to.have.property('status');
                    expect(item).to.have.property('mcc');
                    expect(item).to.have.property('latitude');
                    expect(item).to.have.property('longitude');
                })
            })
        })

        it('Validar retorno 400 - /api/v1/unidades', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/unidades',
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

        it('Validar retorno 401 - /api/v1/unidades', () => {
            const token = Cypress.env('access_token');
            const random = Math.floor(Math.random() * 100000); // número aleatório

            cy.GeradorCnpj().then((cnpjValido) => {
                cy.log('CNPJ usado:', cnpjValido);

                cy.request({
                    method: 'POST',
                    url: '/api/v1/unidades',
                    headers: {
                        //'Authorization': `Bearer ${token}`, // Token inválido
                        'Content-Type': 'application/json'
                    },
                    body: {
                        name: `Teste unidade API ${random}`,
                        razaoSocial: "Empresa Teste Ltda",
                        nomeFantasia: "Teste API Modulo Unidades",
                        bairro: "Centro",
                        country: "BR",
                        cnpj: cnpjValido,
                        cnes: "1234567",
                        consultorResponsavel: "João da Silva",
                        telefonePrincipal: "11987654321",
                        telefoneSecundario: "11912345678",
                        emailPrincipal: "contato@empresa.com",
                        emailSecundario: "suporte@empresa.com",
                        cep: "01001000",
                        endereco: "Avenida Paulista",
                        numero: "1000",
                        complemento: "Conjunto 101",
                        observacao: "Unidade de testes para homologação.",
                        sigla: "TEST",
                        fusoHorarioId: 1,
                        tipoUnidadeId: 2,
                        unidadeMatrizId: null,
                        exibirAgendamentosOnline: true,
                        exibirAgendamentoAssistido: false,
                        regionId: 3,
                        sellerId: "SELL1234",
                        ativarIntegracaoTef: true,
                        ativarSplit: false,
                        regimeTributarioId: 1,
                        unidadeStatusId: 2,
                        responsavelTecnicoId: null,
                        cidadeId: 1001,
                        regiaoZona: "Zona Sul",
                        parceiroInstitucionalId: null,
                        dataInauguracao: "20240101",
                        tipoSegmentoId: 4,
                        ativo: "A",
                        mcc: "8099",
                        flgAmorCirurgias: 0
                    },
                    failOnStatusCode: false,
                }).then((response) => {
                    expect(response.status).to.eq(401);
                })
            })
        })
    })

    describe('Módulo - Unidades - Retorna a lista de unidades', () => {

        it('Validar retorno 200 - /api/v1/unidades', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/unidades?page=1&limit=1',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(200);

                const body = response.body;
                expect(body).to.have.property('items').to.be.an('array');
                body.items.forEach((item) => {
                    expect(item).to.have.property('id');
                    expect(item).to.have.property('name');
                    expect(item).to.have.property('cnpj');
                    expect(item).to.have.property('bairro');
                    expect(item).to.have.property('responsavelTecnico');
                    expect(item).to.have.property('consultorResponsavel');
                    expect(item).to.have.property('nomeFantasia');
                    expect(item).to.have.property('telefonePrincipal');
                    expect(item).to.have.property('region');
                    expect(item.region).to.have.property('id');
                    expect(item.region).to.have.property('nome');
                    expect(item).to.have.property('country');
                    expect(item.country).to.have.property('id');
                    expect(item.country).to.have.property('pais');
                    expect(item).to.have.property('unidadeMatrizId');
                    expect(item.unidadeMatrizId).to.have.property('id');
                    expect(item.unidadeMatrizId).to.have.property('descricao');
                    expect(item).to.have.property('city');
                    expect(item).to.have.property('uf');
                })
            })
        })

        it('Validar retorno 400 - /api/v1/unidades', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST', // Método divergente
                url: '/api/v1/unidades',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(400);
            })
        })

        it('Validar retorno 401 - /api/v1/unidades', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/unidades',
                headers: {
                    //'Authorization': `Bearer ${token}`, //Token inválido
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(401);
            })
        })
    })

    describe('Módulo - Unidade - Retorna informações estáticas de uma unidade', () => {

        it('Validar retorno 200 - /api/v1/unidades/static-info/{id}', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/unidades/static-info/663',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(200);
                const body = response.body;

                expect(body).to.have.property('id');
                expect(body).to.have.property('descricao').that.is.a('string');
                expect(body).to.have.property('endereco').that.is.a('string');
                expect(body).to.have.property('flgCentral');
                expect(body).to.have.property('flgTelemedicina');
                expect(body).to.have.property('feegowClinicId');
                expect(body).to.have.property('flgAgendaOnline');
                expect(body).to.have.property('flgAtivarSplit');
                expect(body).to.have.property('flgAtivarTef');
                expect(body).to.have.property('flgAtivo');
                expect(body).to.have.property('status').that.is.a('string');
                expect(body).to.have.property('regiaoId');

                // Valida lista de profissionais
                expect(body).to.have.property('profissionais').to.be.an('array');
                body.profissionais.forEach((prof) => {
                    expect(prof).to.have.property('id');
                    expect(prof).to.have.property('nome');
                    expect(prof).to.have.property('sobrenome');
                    expect(prof).to.have.property('tratamento');
                    expect(prof).to.have.property('ativo');

                    expect(prof).to.have.property('especialidadesIds').to.be.an('array');
                    expect(prof).to.have.property('procedimentosIds').to.be.an('array');
                })

                // Valida lista de procedimentosIds
                expect(body).to.have.property('procedimentosIds').to.be.an('array');
                body.procedimentosIds.forEach((procId) => {
                    expect(procId).to.be.a('number');
                })
            })
        })

        it('Validar retorno 400 - /api/v1/unidades/static-info/{id}', () => {
            const token = Cypress.env('access_token');
            const idClinica = 335;

            cy.request({
                method: 'GET',
                url: '/api/v1/unidades/static-info/{id}', // Sem parâmetro na url
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(400);
            })
        })

        it('Validar retorno 401 - /api/v1/unidades/static-info/{id}', () => {
            const token = Cypress.env('access_token');
            const idClinica = 335;

            cy.request({
                method: 'GET',
                url: `/api/v1/unidades/static-info/${idClinica}`,
                headers: {
                    //'Authorization': `Bearer ${token}`, // Token inválido
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(401);
            })
        })
    })

    describe('Módulo - Unidades - Atualiza informações estáticas de uma unidade. Deve ser usado apenas para atualizações forçadas.', () => {

        it('Validar retorno 201 - /api/v1/unidades/static-info', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/unidades/static-info',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: {
                    "unidadeIds": [
                        971
                    ]
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(201)
            })
        })

        it('Validar retorno 400 - /api/v1/unidades/static-info', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'DELETE',
                url: '/api/v1/unidades/static-info/',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: {
                    unidadeIds: []
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(400)
            })
        })

        it('Validar retorno 401 - /api/v1/unidades/static-info', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/unidades/static-info',
                headers: {
                    //'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: {
                    unidadeIds: []
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(401)
            })
        })
    })

    describe('Módulo - Unidades - Vincula uma unidade a um profissional', () => {

        it('Validar retorno 201 - /api/v1/unidades/link-clinic-professional', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/unidades/link-clinic-professional',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: {
                    "idProfissional": 5364
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(201);

                const item = response.body;
                expect(item).to.have.property('codigo');
                expect(item).to.have.property('flagDeError');
                expect(item).to.have.property('mensagem');
            })
        })

        it('Validar retorno 400 - /api/v1/unidades/link-clinic-professional', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/unidades/link-clinic-professional',
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

        it('Validar retorno 401 - /api/v1/unidades/link-clinic-professional', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/unidades/link-clinic-professional',
                headers: {
                    //'Authorization': `Bearer ${token}`, // Token inválido
                    'Content-Type': 'application/json'
                },
                body: {
                    "idProfissional": 3901
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(401);
            })
        })
    })

    describe('Módulo - Unidades - Desvincular uma unidade de um profissional', () => {

        it('Validar retorno 201 - /api/v1/unidades/unlink-clinic-professional', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/unidades/unlink-clinic-professional',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: {
                    "idProfissional": 5364
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(201);

                const item = response.body;
                expect(item).to.have.property('codigo');
                expect(item).to.have.property('flagDeError');
                expect(item).to.have.property('mensagem');
            })
        })

        it('Validar retorno 400 - /api/v1/unidades/unlink-clinic-professional', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/unidades/unlink-clinic-professional',
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

        it('Validar retorno 401 - /api/v1/unidades/unlink-clinic-professional', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/unidades/unlink-clinic-professional',
                headers: {
                    //'Authorization': `Bearer ${token}`, // Token inválido
                    'Content-Type': 'application/json'
                },
                body: {
                    "idProfissional": 3901
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(401);
            })
        })
    })

    describe('Módulo - Unidades - Consultar agendamento do profissional por id', () => {

        it('Validar retorno 200 - /api/v1/unidades/appointments/professional{id}', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/unidades/appointments/professional/{id}?id=6066',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(200);
                cy.log('Retorna vazio', JSON.stringify(response.body))
            })
        })

        it('Validar retorno 401 - /api/v1/unidades/appointments/professional{id}', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/unidades/appointments/professional/{id}?id=5364',
                headers: {
                    //'Authorization': `Bearer ${token}`, //Token inválido
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(401);
            })
        })
    })

    describe('Módulo - Unidades - Retorna a lista de unidades', () => {

        it('Validar retorno 200 - /api/v1/unidades/formatted', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/unidades/formatted?page=1&limit=1',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(200)

                const data = response.body;

                expect(data).to.have.property('items').and.to.be.an('array')
                data.items.forEach((item) => {
                    expect(item).to.have.property('id');
                    expect(item).to.have.property('name');
                    expect(item).to.have.property('nomeFantasia');
                    expect(item).to.have.property('cnpj');
                    expect(item).to.have.property('bairro');
                    expect(item).to.have.property('responsavelTecnico');
                    expect(item).to.have.property('consultorResponsavel');
                    expect(item).to.have.property('razaoSocial');
                    expect(item).to.have.property('telefonePrincipal');
                    expect(item).to.have.property('telefoneSecundario');

                    expect(item).to.have.property('region');
                    expect(item.region).to.have.property('id');
                    expect(item.region).to.have.property('nome');

                    expect(item).to.have.property('country');
                    expect(item.country).to.have.property('id');
                    expect(item.country).to.have.property('pais');

                    expect(item).to.have.property('unidadeMatrizId');
                    expect(item).to.have.property('city');
                    expect(item).to.have.property('uf');

                    expect(item).to.have.property('regionId');
                    expect(item.regionId).to.have.property('id');
                    expect(item.regionId).to.have.property('nome');
                    expect(item.regionId).to.have.property('flgAtivo');

                    expect(item.regionId).to.have.property('pais');
                    expect(item.regionId.pais).to.have.property('id');
                    expect(item.regionId.pais).to.have.property('pais');

                    expect(item).to.have.property('endereco');
                    expect(item).to.have.property('cnes');
                    expect(item).to.have.property('regimeTributarioId');
                    expect(item).to.have.property('unidadeStatusId');
                    expect(item).to.have.property('responsavelTecnicoId');
                    expect(item).to.have.property('emailPrincipal');
                    expect(item).to.have.property('emailSecundario');
                    expect(item).to.have.property('cep');
                    expect(item).to.have.property('numero');
                    expect(item).to.have.property('complemento');
                    expect(item).to.have.property('regiaoZona');

                    expect(item).to.have.property('cidadeId');
                    expect(item.cidadeId).to.have.property('municipio');
                    expect(item.cidadeId).to.have.property('fkEstado');
                    expect(item.cidadeId.fkEstado).to.have.property('uf');

                    expect(item).to.have.property('sigla');
                    expect(item).to.have.property('fusoHorarioId');
                    expect(item).to.have.property('tipoUnidadeId');
                    expect(item).to.have.property('exibirAgendamentosOnline');
                    expect(item).to.have.property('sellerId');
                    expect(item).to.have.property('ativarIntegracaoTef');
                    expect(item).to.have.property('ativarSplit');
                    expect(item).to.have.property('dataInauguracao');

                    expect(item.localAtendimento).to.be.an('array')
                    item.localAtendimento.forEach((local) => {
                        expect(local).to.have.property('id');
                        expect(local).to.have.property('fkUnidade');
                        expect(local).to.have.property('descricao');
                        expect(local).to.have.property('flagAtivo');
                        expect(local).to.have.property('flagCaixa');
                        expect(local).to.have.property('createdAt');
                        expect(local).to.have.property('updatedAt');
                        expect(local).to.have.property('lastUserId');
                        expect(local).to.have.property('ipClient');
                        expect(local).to.have.property('flgRegistroFiserv');
                        expect(local).to.have.property('tokenTerminalFiserv');
                        expect(local).to.have.property('fkContaCorrente');

                    })

                    expect(item).to.have.property('regiao');
                    expect(item.regiao).to.have.property('id');
                    expect(item.regiao).to.have.property('nome');
                    expect(item.regiao).to.have.property('flgAtivo');
                    expect(item.regiao).to.have.property('pais');

                    expect(item.regiao.pais).to.have.property('id');
                    expect(item.regiao.pais).to.have.property('pais');
                })
            })
        })

        it('Validar retorno 400 - /api/v1/unidades/formatted', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/unidades/formatted/kkmkm', // Url inválida
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(400)
            })
        })

        it('Validar retorno 401 - /api/v1/unidades/formatted', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/unidades/formatted/',
                headers: {
                    //'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(401)
            })
        })
    })

    describe('Módulo - Unidades - Lista uma unidade por id', () => {

        it('Validar retorno 200 - /api/v1/unidades/{id}', () => {
            const token = Cypress.env('access_token');
            const idClinica = 483;

            cy.request({
                method: 'GET',
                url: `/api/v1/unidades/${idClinica}`,
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(200);

                const item = response.body;
                expect(item).to.have.property('id');
                expect(item).to.have.property('descricao');
            })
        })

        it('Validar retorno 400 - /api/v1/unidades/{id}', () => {
            const token = Cypress.env('access_token');
            const idClinica = 483;

            cy.request({
                method: 'GET',
                url: '/api/v1/unidades/{id}', // Sem parâmetro na url
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(400);
            })
        })

        it('Validar retorno 401 - /api/v1/unidades/{id}', () => {
            const token = Cypress.env('access_token');
            const idClinica = 483;

            cy.request({
                method: 'GET',
                url: `/api/v1/unidades/${idClinica}`,
                headers: {
                    //'Authorization': `Bearer ${token}`, // Token inválido
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(401);
            })
        })
    })

    describe('Módulo - Unidades - Atualizar uma unidade por id', () => {

        it('Validar retorno 200 - /api/v1/unidades/{id}', () => {
            const token = Cypress.env('access_token');
            const idClinica = 973;

            cy.request({
                method: 'PUT',
                url: `/api/v1/unidades/${idClinica}`,
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: {
                    "ativo": "A",
                    "razaoSocial": "AMORSAUDE TELEMEDICINA",
                    "nomeFantasia": "x-telemed-teste2",
                    "cnpj": "44905730000107",
                    "country": "BR",
                    "cnes": "",
                    "regionId": 3,
                    "dataInauguracao": "20220118",
                    "regimeTributarioId": 3,
                    "unidadeStatusId": 2,
                    "tipoSegmentoId": 5,
                    "responsavelTecnicoId": 1527,
                    "parceiroInstitucionalId": null,
                    "consultorResponsavel": "",
                    "telefonePrincipal": "1699757396",
                    "telefoneSecundario": null,
                    "emailPrincipal": "financeiro@amorsaude.com",
                    "emailSecundario": null,
                    "cep": "14021644",
                    "numero": "176",
                    "endereco": "Rua Magid Antônio Calil",
                    "complemento": "",
                    "bairro": "Jardim Botânico",
                    "regiaoZona": "",
                    "cidadeId": 4,
                    "observacao": "",
                    "sigla": "",
                    "fusoHorarioId": 3,
                    "tipoUnidadeId": 1,
                    "unidadeMatrizId": null,
                    "exibirAgendamentosOnline": true,
                    "exibirAgendamentoAssistido": false,
                    "flgAmorCirurgias": 0,
                    "sellerId": "",
                    "mcc": "8099",
                    "ativarIntegracaoTef": false,
                    "ativarSplit": false
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(400);

                const item = response.body;
                expect(item).to.have.property('flagDeError');
                expect(item).to.have.property('codigo');
                expect(item).to.have.property('mensagem');
            })
        })

        it('Validar retorno 400 - /api/v1/unidades/{id}', () => {
            const token = Cypress.env('access_token');
            const idClinica = 973;

            cy.request({
                method: 'PUT',
                url: `/api/v1/unidades/${idClinica}`,
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

        it('Validar retorno 401 - /api/v1/unidades/{id}', () => {
            const token = Cypress.env('access_token');
            const idClinica = 973;

            cy.request({
                method: 'PUT',
                url: `/api/v1/unidades/${idClinica}`,
                headers: {
                    //'Authorization': `Bearer ${token}`, // Token inválido
                    'Content-Type': 'application/json'
                },
                body: {
                    "name": "Teste unidade API",
                    "razaoSocial": "Empresa Teste Ltda",
                    "nomeFantasia": "Teste API Modulo Unidades",
                    "bairro": "Centro",
                    "country": "BR",
                    "cnpj": "cnpjValido",
                    "cnes": "1234567",
                    "consultorResponsavel": "João da Silva",
                    "telefonePrincipal": "11987654321",
                    "telefoneSecundario": "11912345678",
                    "emailPrincipal": "contato@empresa.com",
                    "emailSecundario": "suporte@empresa.com",
                    "cep": "01001000",
                    "endereco": "Avenida Paulista",
                    "numero": "1000",
                    "complemento": "Conjunto 101",
                    "observacao": "Unidade de testes para homologação.",
                    "sigla": "TEST",
                    "fusoHorarioId": 1,
                    "tipoUnidadeId": 2,
                    "unidadeMatrizId": null,
                    "exibirAgendamentosOnline": true,
                    "exibirAgendamentoAssistido": false,
                    "regionId": 3,
                    "sellerId": "SELL1234",
                    "ativarIntegracaoTef": true,
                    "ativarSplit": false,
                    "regimeTributarioId": 1,
                    "unidadeStatusId": 2,
                    "responsavelTecnicoId": null,
                    "cidadeId": 1001,
                    "regiaoZona": "Zona Sul",
                    "parceiroInstitucionalId": null,
                    "dataInauguracao": "20240101",
                    "tipoSegmentoId": 4,
                    "ativo": "A",
                    "mcc": "8099",
                    "flgAmorCirurgias": 0
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(401);
            })
        })
    })
    /*
        describe('Módulo - Unidades - Apagar uma unidade', () => {
            // Foi aberto card para essa rota: https://amorsaudesuporte.atlassian.net/browse/FRN-1783
        })
    */
    describe('Módulo - Unidades - Lista uma unidade por id', () => {

        it('Validar retorno 200 - /api/v1/unidades/formatted/{id}', () => {
            const token = Cypress.env('access_token');
            const idClinica = 483;

            cy.request({
                method: 'GET',
                url: `/api/v1/unidades/formatted/${idClinica}`,
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(200)

                const body = response.body;

                expect(body).to.have.all.keys(
                    'id',
                    'name',
                    'regionId',
                    'endereco',
                    'nomeFantasia',
                    'cnpj',
                    'cnes',
                    'regimeTributarioId',
                    'unidadeStatusId',
                    'responsavelTecnicoId',
                    'consultorResponsavel',
                    'telefonePrincipal',
                    'telefoneSecundario',
                    'emailPrincipal',
                    'emailSecundario',
                    'cep',
                    'numero',
                    'complemento',
                    'bairro',
                    'regiaoZona',
                    'cidadeId',
                    'observacao',
                    'sigla',
                    'fusoHorarioId',
                    'tipoUnidadeId',
                    'unidadeMatrizId',
                    'exibirAgendamentosOnline',
                    'exibirAgendamentoAssistido',
                    'sellerId',
                    'mcc',
                    'ativarIntegracaoTef',
                    'ativarSplit',
                    'parceiroInstitucionalId',
                    'dataInauguracao',
                    'regiao',
                    'tipoSegmentoId',
                    'status',
                    'razaoSocial',
                    'flgAmorCirurgias'
                )

                // Validar estrutura interna de região
                expect(body.regiao).to.have.all.keys('id', 'nome', 'flgAtivo')
            })
        })

        it('Validar retorno 400 - /api/v1/unidades/formatted/{id}', () => {
            const token = Cypress.env('access_token');
            const idClinica = 483;

            cy.request({
                method: 'GET',
                url: '/api/v1/unidades/formatted/${id}', // url sem parâmetro
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(400)
            })
        })

        it('Validar retorno 401 - /api/v1/unidades/formatted/{id}', () => {
            const token = Cypress.env('access_token');
            const idClinica = 483;

            cy.request({
                method: 'GET',
                url: `/api/v1/unidades/formatted/${idClinica}`,
                headers: {
                    //'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(401)
            })
        })
    })

    describe('Módulo - Unidades - Download File', () => {

        it('Validar retorno 200 - /api/v1/unidades/csv/download', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/unidades/csv/download',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(200)
            })

        })

        it('Validar retorno 401 - /api/v1/unidades/csv/download', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/unidades/csv/download',
                headers: {
                    //'Authorization': `Bearer ${token}`, //Token inválido
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(401)
            })

        })
    })

    describe('Módulo - Unidades - Lista as unidades cadastradas por filtro', () => {

        it('Validar retorno 200 - /api/v1/unidades/lists/search', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/unidades/lists/search',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(200)

                const body = response.body;
                body.forEach((item) => {
                    expect(item).to.have.property('id');
                    expect(item).to.have.property('descricao');
                })
            })

        })

        it('Validar retorno 401 - /api/v1/unidades/lists/search', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/unidades/lists/search',
                headers: {
                    //'Authorization': `Bearer ${token}`, // Token inválido
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(401)
            })
        })
    })

    /*    describe('Módulo - Unidades - Phones Number Hidden', () => {
        //Essa rota não está exposta publicamente por questões de segurança e controle de acesso.
        })
    */
   
    describe.only('Módulo - Unidades - Phones Hidden', () => {

        it('Validar retorno 200 - /api/v1/unidades/list/phones-hidden', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/unidades/list/phones-hidden',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(200)

                const data = response.body;
                data.forEach((item) => {
                    expect(item).to.have.property('id');
                    expect(item).to.have.property('clinicId');
                    expect(item).to.have.property('reason');
                    expect(item).to.have.property('createdAt');
                    expect(item).to.have.property('updatedAt');
                    expect(item).to.have.property('lastUser');
                    expect(item).to.have.property('flgAtivo');
                })
            })
        })

        it('Validar retorno 401 - /api/v1/unidades/list/phones-hidden', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/unidades/list/phones-hidden',
                headers: {
                    //'Authorization': `Bearer ${token}`, //Token inválido
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(401)
            })
        })
    })
})
