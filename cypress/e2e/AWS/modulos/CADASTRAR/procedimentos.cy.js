/// <reference types="cypress"/>

describe('Módulo - Procedimentos', () => {
    beforeEach(() => {
        cy.login();
        cy.refreshToken();
    })

    describe('Módulo - Procedimentos - Cria um procedimento', () => {

        it('Validar retorno 201 - /api/v1/procedimentos', () => {
            const token = Cypress.env('access_token');

            cy.api({
                method: 'POST',
                url: '/api/v1/procedimentos',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: {
                    "nome": "Teste API5",
                    "tipo": 1,
                    "tipo_search": "1",
                    "grupo": [
                        {
                            "id": 1
                        }
                    ],
                    "especialidades": [
                        {
                            "id": 611
                        }
                    ],
                    "sinonimos": "API2",
                    "codigoTuss": "172",
                    "codCbhpm": "1323",
                    "sigla": "API",
                    "atendimentoGrupo": false,
                    "maxPacientes": "1",
                    "duracao": "30",
                    "flgNecessitaAcolhimento": 1,
                    "encaixe": true,
                    "obrigarRespeitarTempo": false,
                    "obrigarPreenchProfissional": false,
                    "integracao_laboratorial": false,
                    "naoPermitirDuplicidadeProposta": false,
                    "naoNecessitaAgendamento": false,
                    "telemedicina": false,
                    "exibirAgendamentoOnline": false,
                    "pagamentoOnline": false,
                    "procedimentoSeriado": false,
                    "precificacaoSegmentada": true,
                    "precificacaoVendaPadronizada": false,
                    "valorCustoPadronizado": false,
                    "avisosAgenda": "2",
                    "preparo": "2",
                    "nomeTecnico": "Teste API",
                    "flagAtivo": true,
                    "tipoId": 1,
                    "unidades": [
                        {
                            "id": 483
                        }
                    ]
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(201);
                expect(response.body).to.have.property('codigo');
                expect(response.body).to.have.property('flagDeError');
                expect(response.body).to.have.property('mensagem');
                expect(response.body).to.have.property('id');
            })
        })

        it('Validar retorno 400 - /api/v1/procedimentos', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/procedimentos',
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

        it('Validar retorno 401 - /api/v1/procedimentos', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/procedimentos',
                headers: {
                    //'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: {
                    "nome": "Teste API2",
                    "tipo": 1,
                    "tipo_search": "1",
                    "grupo": [
                        {
                            "id": 1
                        }
                    ],
                    "especialidades": [
                        {
                            "id": 611
                        }
                    ],
                    "sinonimos": "API2",
                    "codigoTuss": "172",
                    "codCbhpm": "1323",
                    "sigla": "API",
                    "atendimentoGrupo": false,
                    "maxPacientes": "1",
                    "duracao": "30",
                    "flgNecessitaAcolhimento": true,
                    "encaixe": true,
                    "obrigarRespeitarTempo": false,
                    "obrigarPreenchProfissional": false,
                    "integracao_laboratorial": false,
                    "naoPermitirDuplicidadeProposta": false,
                    "naoNecessitaAgendamento": false,
                    "telemedicina": false,
                    "exibirAgendamentoOnline": false,
                    "pagamentoOnline": false,
                    "procedimentoSeriado": false,
                    "precificacaoSegmentada": true,
                    "precificacaoVendaPadronizada": false,
                    "valorCustoPadronizado": false,
                    "avisosAgenda": "2",
                    "preparo": "2",
                    "nomeTecnico": "Teste API",
                    "flagAtivo": true,
                    "tipoId": 1,
                    "unidades": [
                        {
                            "id": 483
                        }
                    ]
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(401);
            })
        })
    })

    describe('Módulo - Procedimentos - Retorna uma lista completa de procedimento', () => {

        it('Validar retorno 200 - /api/v1/procedimentos', () => {
            const token = Cypress.env('access_token');

            cy.api({
                method: 'GET',
                url: 'api/v1/procedimentos?specialtyIds=1&specialtyIds=2&limit=1',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {

                expect(response.status).to.eq(200);

                const item = response.body[0];

                // campos principais
                expect(item).to.have.property('id').and.to.be.a('number');
                expect(item).to.have.property('nome').and.to.be.a('string');
                expect(item).to.have.property('nomeTecnico').and.to.be.a('string');
                expect(item).to.have.property('codCbhpm').and.to.be.a('string');
                expect(item).to.have.property('flagAtivo').and.to.be.a('boolean');

                // tipo
                expect(item).to.have.property('tipo');
                expect(item.tipo.id).to.be.a('number');
                expect(item.tipo.descricao).to.be.a('string');

                // profissionais
                expect(item.profissionais).to.be.an('array');
                expect(item.profissionais[0]).to.have.property('id').and.to.be.a('number');

                // tabelaPrecos
                expect(item.tabelaPrecos).to.be.an('array');
                expect(item.tabelaPrecos[0]).to.include.keys('id', 'precoParticular');
                expect(item.tabelaPrecos[0].id).to.be.a('number');
                expect(item.tabelaPrecos[0].precoParticular).to.be.a('number');

                expect(item.tabelaPrecos[0]).to.have.property('tabelaPreco');
                expect(item.tabelaPrecos[0].tabelaPreco.id).to.be.a('number');
                expect(item.tabelaPrecos[0].tabelaPreco.nome).to.be.a('string');

                // unidades
                expect(item.unidades).to.be.an('array');
                expect(item.unidades[0].id).to.be.a('number');
                expect(item.unidades[0].descricao).to.be.a('string');
            })
        })

        it('Validar retorno 401 - /api/v1/procedimentos', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: 'api/v1/procedimentos?specialtyIds=1&specialtyIds=2&limit=1',
                headers: {
                    //'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {

                expect(response.status).to.eq(401);
            })
        })
    })

    describe('Módulo - Procedimentos - Retorna uma lista com as informações básicas de procedimentos', () => {

        it('Validar retorno 200 - /api/v1/procedimentos/all-procedimentos-basicinfo', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/procedimentos/all-procedimentos-basicinfo',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(200);
            })
        })

        it('Validar retorno 401 - /api/v1/procedimentos/all-procedimentos-basicinfo', () => {
            cy.request({
                method: 'GET',
                url: '/api/v1/procedimentos/all-procedimentos-basicinfo',
                headers: {
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(401);
            })
        })
    })

    describe('Módulo - Procedimentos - Cadastra um ou mais procedimentos para um profissional', () => {

        it('Validar retorno 200 - /professional/procedures/{professionalId}', () => {
            const token = Cypress.env('access_token');
            const professionalId = 40766;

            cy.api({
                method: 'POST',
                url: '/api/v1/procedimentos/professional/procedures/40798?professionalId=40798',

                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: {
                    "proceduresIds": [
                        1,
                        2
                    ],
                    "professionalXEspXprocDto": [
                        {
                            "specialtyId": 22,
                            "procedureId": 11066
                        }
                    ]
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(201);
            });
        });

        it('Validar retorno 400 - /professional/procedures/{professionalId}', () => {
            const token = Cypress.env('access_token');
            const professionalId = 1234;

            cy.request({
                method: 'POST',
                url: `/api/v1/procedimentos/professional/procedures/${professionalId}`,
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: {},
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(400);
            });
        });

        it('Validar retorno 401 - /professional/procedures/{professionalId} sem token', () => {
            const professionalId = 1234;

            cy.request({
                method: 'POST',
                url: `/api/v1/procedimentos/professional/procedures/${professionalId}`,
                headers: {
                    'Content-Type': 'application/json'
                },
                body: {
                    procedimentos: [33071]
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(401);
            })
        })
    })

    describe('Módulo - Procedimentos - Atualiza um ou mais procedimentos para um profissional', () => {

        it('Validar retorno 200 - /professional/procedures/{professionalId}', () => {
            const token = Cypress.env('access_token');
            const professionalId = 1234;

            cy.api({
                method: 'PUT',
                url: `/api/v1/procedimentos/professional/procedures/40798?professionalId=40798`,
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: {
                    "proceduresIds": [
                        1,
                        2
                    ],
                    "professionalXEspXprocDto": [
                        {
                            "specialtyId": 22,
                            "procedureId": 11066
                        }
                    ]
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(200);
            });
        });

        it('Validar retorno 400 - /professional/procedures/{professionalId}', () => {
            const token = Cypress.env('access_token');
            const professionalId = 1234;

            cy.request({
                method: 'PUT',
                url: `/api/v1/procedimentos/professional/procedures/${professionalId}`,
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: {},
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(400);
            });
        });

        it('Validar retorno 401 - /professional/procedures/{professionalId}', () => {
            const professionalId = 1234;

            cy.request({
                method: 'PUT',
                url: `/api/v1/procedimentos/professional/procedures/${professionalId}`,
                headers: {
                    'Content-Type': 'application/json'
                },
                body: {
                    procedimentos: [33071]
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(401);
            })
        })
    })

    describe('Módulo - Procedimentos - Vincular procedimento a clínica', () => {

        it('Validar retorno 201 - /link-procedure-clinic', () => {
            const token = Cypress.env('access_token');

            cy.api({
                method: 'POST',
                url: `/api/v1/procedimentos/link-procedure-clinic`,
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: {
                    procedimentoId: 11066,
                    clinicaId: 483
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(201);
            });
        });

        it('Validar retorno 400 - /link-procedure-clinic', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: `/api/v1/procedimentos/link-procedure-clinic`,
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: {},
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(400);
            });
        });

        it('Validar retorno 401 - /link-procedure-clinic sem token', () => {

            cy.request({
                method: 'POST',
                url: `/api/v1/procedimentos/link-procedure-clinic`,
                headers: { 'Content-Type': 'application/json' },
                body: {
                    procedimentoId: 33071,
                    clinicaId: 483
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(401);
            });
        });

    })

    describe('Módulo - Procedimentos - Remover procedimentos do profissional', () => {

        it('Validar retorno 200 - /professional/procedures/remove/{professionalId}', () => {
            const token = Cypress.env('access_token');
            const professionalId = 1234;

            cy.request({
                method: 'DELETE',
                url: '/api/v1/procedimentos/professional/procedures/remove/{professionalId}?professionalId=4033',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: {
                    procedimentos: [33071]
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(400);
                expect(response.body).to.have.property('message');
                expect(response.body).to.have.property('error');
                expect(response.body).to.have.property('statusCode');
            })
        })

        it('Validar retorno 400 - /professional/procedures/remove/{professionalId}', () => {
            const token = Cypress.env('access_token');
            const professionalId = 1234;

            cy.request({
                method: 'DELETE',
                url: `/api/v1/procedimentos/professional/procedures/remove/${professionalId}`,
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: {},
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(400);
            });
        })

        it('Validar retorno 401 - /professional/procedures/remove/{professionalId}', () => {
            const professionalId = 1234;

            cy.request({
                method: 'DELETE',
                url: `/api/v1/procedimentos/professional/procedures/remove/${professionalId}`,
                headers: { 'Content-Type': 'application/json' },
                body: {
                    procedimentos: [33071]
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(401);
            });
        })
    })

    describe('Módulo - Procedimentos - Retorna uma lista de grupos de procedimentos', () => {

        it('Validar retorno 200 - /api/v1/procedimentos/grupos', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/procedimentos/grupos',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {

                expect(response.status).to.eq(200);
                expect(response.body).to.have.property('items').and.to.be.an('array');

                const item = response.body.items[0];

                // Campos do item
                expect(item).to.have.property('id');
                expect(item).to.have.property('descricao');
                expect(item).to.have.property('procedureType');

                // Campos do procedureType
                expect(item.procedureType).to.include.all.keys(
                    'id',
                    'descricao',
                    'status',
                    'flgLaboratorio',
                    'valorPrimeiroAtendimento',
                    'classificacaoFinanceiraId',
                    'planoDeContasId',
                    'flgEdit'
                );

                // META
                expect(response.body).to.have.property('meta');
                expect(response.body.meta).to.include.all.keys(
                    'totalItems',
                    'itemCount',
                    'itemsPerPage',
                    'totalPages',
                    'currentPage'
                );
            })
        })

        it('Validar retorno 401 - /api/v1/procedimentos/grupos', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/procedimentos/grupos',
                headers: {
                    //'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {

                expect(response.status).to.eq(401);
            })
        })
    })

    describe('Módulo - Procedimentos - Retorna uma lista de tipos de procedimentos', () => {

        it('Validar retorno 200 - /api/v1/procedimentos/types', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/procedimentos/types',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(200);
                expect(response.body).to.have.property('items').and.to.be.an('array');
                // META
                expect(response.body).to.have.property('meta');
                expect(response.body.meta).to.include.all.keys(
                    'totalItems',
                    'itemCount',
                    'itemsPerPage',
                    'totalPages',
                    'currentPage'
                );
            })
        })

        it('Validar retorno 401 - /api/v1/procedimentos/types', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/procedimentos/types',
                headers: {
                    //'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(401);
            })
        })
    })

    describe('Módulo - Procedimentos - Retorna uma lista de Conta Classificação financeira', () => {

        it('Validar retorno 200 - /api/v1/procedimentos/financial-rating', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/procedimentos/financial-rating',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(200);
                expect(response.body).to.be.an('array');
                const item = response.body[0];

                // Campos do item
                expect(item).to.have.property('id');
                expect(item).to.have.property('classificacaoFinanceira');
                expect(item).to.have.property('categoriaFinanceira');
                expect(item).to.have.property('tipoOperacao');

            })
        })

        it('Validar retorno 401 - /api/v1/procedimentos/financial-rating', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/procedimentos/financial-rating',
                headers: {
                    //'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {

                expect(response.status).to.eq(401);
            })
        })
    })

    describe('Módulo - Procedimentos - Busca procedimentos por um ou mais ids de grupos de procedimentos, id do tipo ou id do procedimento', () => {

        it('Validar retorno 200 - /api/v1/procedimentos/by-groupings', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/procedimentos/by-groupings',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(200);
            })
        })

        it('Validar retorno 401 - /api/v1/procedimentos/by-groupings', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/procedimentos/by-groupings',
                headers: {
                    //'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(401);
            })
        })
    })

    describe('Módulo - Procedimentos - Retorna arquivo CSV com procedimentos por um id de grupo de procedimentos, id do tipo, ou código ou id do procedimento', () => {

        it('Validar retorno 200 - /api/v1/procedimentos/csv-by-groupings', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/procedimentos/csv-by-groupings?tipoId=1&grupoId=1',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {

                expect(response.status).to.eq(200);
            })
        })

        it('Validar retorno 401 - /api/v1/procedimentos/csv-by-groupings', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/procedimentos/csv-by-groupings',
                headers: {
                    //'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {

                expect(response.status).to.eq(401);
            })
        })
    })

    describe('Módulo - Procedimentos - Retorna uma lista de procedimentos buscando por tipo de procedimento e(ou) id da area de atuação/especialidade', () => {

        it('Validar retorno 200 - /api/v1/procedimentos/search-by-type', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/procedimentos/search-by-type?page=1&limit=1',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(200);
                expect(response.body).to.have.property('items').and.to.be.an('array');

                const item = response.body.items[0];

                // Campos principais do procedimento
                expect(item).to.include.all.keys(
                    'id',
                    'nome',
                    'nomeTecnico',
                    'flagAtivo',
                    'tipo',
                    'unidades',
                    'especialidades',
                    'grupo'
                );

                // Tipo
                expect(item.tipo).to.include.all.keys(
                    'id',
                    'descricao',
                    'status',
                    'flgLaboratorio',
                    'classificacaoFinanceiraId',
                    'flgEdit'
                );

                // Unidades (somente estrutura básica)
                expect(item.unidades).to.be.an('array');
                expect(item.unidades[0]).to.have.property('id');
                expect(item.unidades[0]).to.have.property('descricao');

                // Grupo
                expect(item.grupo).to.be.an('array');
                expect(item.grupo[0]).to.include.all.keys(
                    'id',
                    'descricao',
                    'procedureType'
                );

                // META
                expect(response.body).to.have.property('meta');
                expect(response.body.meta).to.include.all.keys(
                    'totalItems',
                    'itemCount',
                    'itemsPerPage',
                    'totalPages',
                    'currentPage'
                );
            })
        })

        it('Validar retorno 401 - /api/v1/procedimentos/search-by-type', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/procedimentos/search-by-type?page=1&limit=1',
                headers: {
                    //'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {

                expect(response.status).to.eq(401);
            })
        })
    })

    describe('Módulo - Procedimentos - Retorna uma lista completa de procedimentos', () => {

        it('Validar retorno 200 - /api/v1/procedimentos/price', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/procedimentos/price?specialtyIds=1&specialtyIds=2&limit=1',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {

                expect(response.status).to.eq(200);
                // Espera que seja um array com pelo menos 1 item
                expect(response.body).to.be.an('array');
                const item = response.body[0];

                // Campos principais do procedimento
                expect(item).to.include.all.keys(
                    'id',
                    'nome',
                    'nomeTecnico',
                    'flagAtivo',
                    'tipoId',
                    'tabelaPrecos',
                    'unidades'
                );

                // Valida tabela de preços
                expect(item.tabelaPrecos).to.be.an('array');
                expect(item.tabelaPrecos[0]).to.include.all.keys(
                    'id',
                    'tabelaPrecoId',
                    'procedimentoId',
                    'precoParticular',
                    'tabelaPreco'
                );

                // Estrutura básica da tabelaPreco
                expect(item.tabelaPrecos[0].tabelaPreco).to.include.all.keys(
                    'id',
                    'parceiroId',
                    'vigenciaInicio',
                    'vigenciaTermino',
                    'flagAtivo',
                    'nome'
                );

                // Valida unidades
                expect(item.unidades).to.be.an('array');
                expect(item.unidades[0]).to.include.all.keys(
                    'id',
                    'procedimentoId',
                    'descricao'
                );
            })
        })

        it('Validar retorno 401 - /api/v1/procedimentos/price', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/procedimentos/price',
                headers: {
                    //'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {

                expect(response.status).to.eq(401);
            })
        })
    })

    describe('Módulo - Procedimentos - Retorna uma lista completa de procedimentos', () => {

        it('Validar retorno 200 - /api/v1/procedimentos/lists', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/procedimentos/lists?specialtyIds=1&specialtyIds=2&limit=1',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(200);
                cy.log('Retorna vazio', JSON.stringify(response.body))
            })
        })

        it('Validar retorno 401 - /api/v1/procedimentos/lists', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/procedimentos/lists?specialtyIds=1&specialtyIds=2&limit=1',
                headers: {
                    //'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(401);
            })
        })
    })

    describe('Módulo - Procedimentos - Retorna uma lista completa de todos os procedimentos ativos', () => {

        it('Validar retorno 200 - /api/v1/procedimentos/lists-all', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/procedimentos/lists-all',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(200);
            })
        })

        it('Validar retorno 401 - /api/v1/procedimentos/lists-all', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/procedimentos/lists-all',
                headers: {
                    //'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {

                expect(response.status).to.eq(401);
            })
        })
    })

    describe('Módulo - Procedimentos - Retorna uma lista, com paginação, de todos os procedimentos que um profissional atende', () => {

        it('Validar retorno 200 - /api/v1/procedimentos/professional', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/procedimentos/professional?page=1&limit=1&professionalId=4033',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(200);
            })
        })

        it('Validar retorno 401 - /api/v1/procedimentos/professional', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/procedimentos/professional',
                headers: {
                    //'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {

                expect(response.status).to.eq(401);
            })
        })
    })

    describe('Módulo - Procedimentos - Retorna uma lista de procedimentos, com paginação, buscando por nome E/OU grupo E/OU tipo de procedimentos', () => {

        it('Validar retorno 200 - /api/v1/procedimentos/filter', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/procedimentos/filter',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(200);
                const item = response.body.items[0];

                expect(item).to.have.property('id').and.to.be.a('number');
                expect(item).to.have.property('nome').and.to.be.a('string');
                expect(item).to.have.property('nomeTecnico');

                expect(item).to.have.property('codCbhpm');
                expect(item).to.have.property('encaixe');
                expect(item).to.have.property('telemedicina');
                expect(item).to.have.property('pagamentoOnline');

                // tipo
                expect(item).to.have.property('tipo');
                expect(item.tipo).to.have.property('id');
                expect(item.tipo).to.have.property('descricao');

                // unidades (validação simples)
                if (item.unidades?.length) {
                    expect(item.unidades[0]).to.have.property('id');
                    expect(item.unidades[0]).to.have.property('descricao');
                }

                // grupo
                if (item.grupo?.length) {
                    expect(item.grupo[0]).to.have.property('id');
                    expect(item.grupo[0]).to.have.property('descricao');
                }
            })
        })

        it('Validar retorno 401 - /api/v1/procedimentos/filter', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/procedimentos/filter',
                headers: {
                    //'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(401);
            })
        })
    })

    describe('Módulo - Procedimentos - Retorna uma lista de procedimentos, com paginação, buscando por nome E/OU grupo Tipo de procedimentos', () => {

        it('Validar retorno 200 - /api/v1/procedimentos/filter-all', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/procedimentos/filter-all',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(200);
                expect(response.body).to.have.property('items').to.be.an('array');
            })
        })

        it('Validar retorno 401 - /api/v1/procedimentos/filter-all', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/procedimentos/filter-all',
                headers: {
                    //'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {

                expect(response.status).to.eq(401);
            })
        })
    })

    describe('Módulo - Procedimentos - Retorna uma lista de procedimentos, sem paginação, buscando por nome E/OU grupo E/OU Tipo de procedimentos', () => {

        it('Validar retorno 200 - /api/v1/procedimentos/filter-without-pagination', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/procedimentos/filter-without-pagination',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(200)

                expect(response.body).to.be.an('array')

                response.body.forEach(item => {
                    expect(item).to.have.property('id').that.is.a('number')
                    expect(item).to.have.property('nome').that.is.a('string')
                    expect(item).to.have.property('sinonimos')
                    expect(item).to.have.property('sigla')
                    expect(item).to.have.property('codCbhpm').that.is.a('string')
                    expect(item).to.have.property('codigoTuss').that.is.a('string')
                })
            })
        })

        it('Validar retorno 401 - /api/v1/procedimentos/filter-without-pagination', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/procedimentos/filter-without-pagination',
                headers: {
                    //'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {

                expect(response.status).to.eq(401);
            })
        })
    })

    describe('Módulo - Procedimentos - Retorna uma lista de procedimentos, buscando por nome E/OU grupo de procedimentos', () => {

        it('Validar retorno 200 - /api/v1/procedimentos/filter-group', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/procedimentos/filter-group?name=Consulta&groupId=1&specialtyIds=611',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(200)

                expect(response.body).to.be.an('array')

                response.body.forEach(item => {

                    expect(item).to.have.property('id').that.is.a('number')
                    expect(item).to.have.property('nome').that.is.a('string')
                    expect(item).to.have.property('nomeTecnico').that.is.a('string')

                    // pode ser null → não validar tipo
                    expect(item).to.have.property('sinonimos')
                    expect(item).to.have.property('sigla')

                    expect(item).to.have.property('codCbhpm').that.is.a('string')
                    expect(item).to.have.property('codigoTuss').that.is.a('string')

                    expect(item).to.have.property('atendimentoGrupo').that.is.a('boolean')
                    expect(item).to.have.property('maxPacientes') // pode ser NULL
                    expect(item).to.have.property('encaixe').that.is.a('boolean')
                    expect(item).to.have.property('telemedicina').that.is.a('boolean')
                    expect(item).to.have.property('pagamentoOnline').that.is.a('boolean')
                    expect(item).to.have.property('flagAtivo').that.is.a('boolean')

                    expect(item).to.have.property('tipoId').that.is.a('number')

                    // Especialidades (se existir)
                    if (Array.isArray(item.especialidades) && item.especialidades.length) {
                        const esp = item.especialidades[0]

                        expect(esp).to.have.property('id').that.is.a('number')
                        expect(esp).to.have.property('descricao').that.is.a('string')
                        expect(esp).to.have.property('ativo').that.is.a('boolean')
                    }
                })
            })
        })

        it('Validar retorno 401 - /api/v1/procedimentos/filter-group', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/procedimentos/filter-group',
                headers: {
                    //'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {

                expect(response.status).to.eq(401);
            })
        })
    })

    describe('Módulo - Procedimentos - Retorna uma lista de procedimentos, buscando por nome E/OU grupo de procedimentos', () => {

        it('Validar retorno 200 - /api/v1/procedimentos/filter-by-group', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/procedimentos/filter-by-group',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(200);
                expect(response.body).to.be.an('array');
                response.body.forEach((item) => {
                    expect(item).to.have.property('id');
                    expect(item).to.have.property('nome');
                    expect(item).to.have.property('flagAtivo');
                })
            })
        })

        it('Validar retorno 401 - /api/v1/procedimentos/filter-by-group', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/procedimentos/filter-by-group',
                headers: {
                    //'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {

                expect(response.status).to.eq(401);
            })
        })
    })

    describe('Módulo - Procedimentos - Retorna uma lista de procedimentos do tipo laboratório', () => {

        it('Validar retorno 200 - /api/v1/procedimentos/list-lab', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/procedimentos/list-lab?page=1&limit=1&typeProcedure=20357',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(200);
                expect(response.body).to.have.property('items').to.be.an('array');
                expect(response.body).to.have.property('meta').to.include.all.keys(
                    'totalItems',
                    'currentPage',
                    'itemCount',
                    'itemsPerPage',
                    'totalPages'
                )
            })
        })

        it('Validar retorno 401 - /api/v1/procedimentos/list-lab', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/procedimentos/list-lab',
                headers: {
                    //'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(401);
            })
        })
    })

    describe('Módulo - Procedimentos - Retorna uma lista de procedimentos com tabela de valores', () => {

        it('Validar retorno 200 - /api/v1/procedimentos/appointment', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/procedimentos/appointment?convenioId=1&parceriaId=42&profissionalId=4033&especialidadeId=611&data=20251209&horas=10%3A00&dia=2&parceiroId=1&dataConsulta=20251209&unidadeId=483&unidadePresencialId=483&primeiraConsulta=1%20-%20notFirstConsult&overbooking=false&scheduleId=1461225',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(200);
            })
        })

        it('Validar retorno 401 - /api/v1/procedimentos/appointment', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/procedimentos/appointment',
                headers: {
                    //'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {

                expect(response.status).to.eq(401);
            })
        })
    })

    describe('Módulo - Procedimentos - Retorna uma lista de procedimentos com tabelas de valores', () => {

        it('Validar retorno 200 - /api/v1/procedimentos/table-values', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/procedimentos/table-values?procedureId=1&patientId=1&professionalId=4033&pricingId=1',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(200);
                cy.log('Retorna vazio', JSON.stringify(response.body))
            })
        })

        it('Validar retorno 401 - /api/v1/procedimentos/table-values', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/procedimentos/table-values',
                headers: {
                    //'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {

                expect(response.status).to.eq(401);
            })
        })
    })

    describe('Módulo - Procedimentos - Retorna uma tabela de valores com parceiro', () => {

        it('Validar retorno 200 - /api/v1/procedimentos/table-values-schedule', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/procedimentos/table-values-schedule?partnerId=1&procedureId=611&pricingId=1',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(200);
                cy.log('Retorna vazio', JSON.stringify(response.body))
            })
        })

        it('Validar retorno 401 - /api/v1/procedimentos/table-values-schedule', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/procedimentos/table-values-schedule',
                headers: {
                    //'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {

                expect(response.status).to.eq(401);
            })
        })
    })

    describe('Módulo - Procedimentos - Retorna uma lista, com paginação, de todos os procedimentos que um profissional atende', () => {

        it('Validar retorno 200 - /api/v1/procedimentos/professional/{professionalId}/specialty/{pecialtyId}', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/procedimentos/professional/{professionalId}/specialty/{pecialtyId}?professionalId=4033&specialtyId=611&limit=20',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(200);
                cy.log('Retorna vazio', JSON.stringify(response.body))
            })
        })

        it('Validar retorno 401 - /api/v1/procedimentos/professional/{professionalId}/specialty/{pecialtyId}', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/procedimentos/professional/{professionalId}/specialty/{pecialtyId}',
                headers: {
                    //'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {

                expect(response.status).to.eq(401);
            })
        })
    })

    describe('Módulo - Procedimentos - Retorna uma lista com todos os procedimentos da unidade logada com filtro pelo nome', () => {

        it('Validar retorno 200 - /api/v1/procedimentos/by-unidade', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/procedimentos/by-unidade',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(200);
                expect(response.body).to.be.an('array')
            })
        })

        it('Validar retorno 401 - /api/v1/procedimentos/by-unidade', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/procedimentos/by-unidade',
                headers: {
                    //'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {

                expect(response.status).to.eq(401);
            })
        })
    })

    describe('Módulo - Procedimentos - Atualizar um procedimento por id', () => {

        it('Validar retorno 200 - /api/v1/procedimentos/{id}', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'PUT',
                url: '/api/v1/procedimentos/21502',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: {
                    "fornecedorId": 1,
                    "fornecedorProcedimentoId": 1,
                    "fornecedorUnidade": 1,
                    "procedimentoId": 1,
                    "mnemonico": "1",
                    "procedimentoLaboratorio": "xpto",
                    "material": "sangue",
                    "meioColeta": "seringa",
                    "metodo": "lancetador",
                    "prazo": "string",
                    "prazoDias": "string",
                    "flgVolume": "1 ou 0",
                    "flgAltura": "1 ou 0",
                    "flgTipoMaterial": "1 ou 0",
                    "flgRegiao": "1 ou 0",
                    "flgPeso": "1 ou 0",
                    "instrucaoPreparo": "ejum alimentar de 8 horas.",
                    "instrucaoColeta": "o sangue pode ser coletado via seringa e agulha, adaptador com agulha ou lancetador",
                    "flgPedidoFamiliarTestado": "true ou false",
                    "flgNomeFamiliarTestado": "true ou false",
                    "flgSintoma": "true ou false",
                    "flgPlate": "true ou false",
                    "flgWell": "true ou false",
                    "flgTempoDiurese": "true ou false",
                    "flgDataSintoma": "true ou false",
                    "flgTempoAmostra": "true ou false",
                    "flgPesoAmostra": "true ou false",
                    "flgHematocrito": "true ou false",
                    "flgLinfocitosAbsoluto": "true ou false",
                    "flgHoraUltimaDose": "true ou false",
                    "flgGlicemia": "true ou false",
                    "flgDataUltimaDose": "true ou false",
                    "flgPrimTriGestacao": "true ou false",
                    "flgGestacaoMultipla": "true ou false",
                    "flgPedidoOriginal": "true ou false",
                    "flgSemanaGestacao": "true ou false",
                    "flgBiotina": "true ou false",
                    "flgSexoColhedor": "true ou false",
                    "flgConservante": "true ou false",
                    "mnemonicoMaterial": "DIV",
                    "flagMultiplasAmostras": "true ou false"
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(200)
                expect(response.body).to.have.property('codigo');
                expect(response.body).to.have.property('flagDeError');
                expect(response.body).to.have.property('mensagem');
            })
        })

        it('Validar retorno 400 - /api/v1/procedimentos/{id}', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'PUT',
                url: '/api/v1/procedimentos/{id}',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(400)
            })
        });

        it('Validar retorno 401 - /api/v1/procedimentos/{id}', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'PUT',
                url: '/api/v1/procedimentos/{id}',
                headers: {
                    //'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(401)
            })
        });
    });

    describe('Módulo - Procedimentos - Exclui um procedimento por id', () => {

        it('Validar retorno 200 - /api/v1/procedimentos/{id}', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'DELETE',
                url: '/api/v1/procedimentos/21502',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(200)
                expect(response.body).to.have.property('codigo');
                expect(response.body).to.have.property('flagDeError');
                expect(response.body).to.have.property('mensagem');
            })
        })

        it('Validar retorno 400 - /api/v1/procedimentos/{id}', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'DELETE',
                url: '/api/v1/procedimentos/{id}',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(400)
            })
        });

        it('Validar retorno 401 - /api/v1/procedimentos/{id}', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'DELETE',
                url: '/api/v1/procedimentos/{id}',
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

    describe('Módulo - Procedimentos - Retorna um procedimento por id', () => {

        it('Validar retorno 200 - /api/v1/procedimentos/{id}', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/procedimentos/21502',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(200);
                const item = response.body;

                // Campos principais
                expect(item).to.have.property('id');
                expect(item).to.have.property('nome');
                expect(item).to.have.property('nomeTecnico');
                expect(item).to.have.property('sinonimos');
                expect(item).to.have.property('sigla');
                expect(item).to.have.property('codCbhpm');
                expect(item).to.have.property('atendimentoGrupo');
                expect(item).to.have.property('maxPacientes');
                expect(item).to.have.property('duracao');
                expect(item).to.have.property('encaixe');
                expect(item).to.have.property('obrigarPreenchProfissional');
                expect(item).to.have.property('integracao_laboratorial');
                expect(item).to.have.property('duplicidade_proposta');
                expect(item).to.have.property('telemedicina');
                expect(item).to.have.property('pagamentoOnline');
                expect(item).to.have.property('avisosAgenda');
                expect(item).to.have.property('preparo');
                expect(item).to.have.property('flagAtivo');
                expect(item).to.have.property('codigoTuss');
                expect(item).to.have.property('procedimentoSeriado');
                expect(item).to.have.property('obrigarRespeitarTempo');
                expect(item).to.have.property('naoPermitirDuplicidadeProposta');
                expect(item).to.have.property('exibirAgendamentoOnline');
                expect(item).to.have.property('precificacaoSegmentada');
                expect(item).to.have.property('naoNecessitaAgendamento');
                expect(item).to.have.property('precificacaoVendaPadronizada');
                expect(item).to.have.property('valorCustoPadronizado');
                expect(item).to.have.property('flgNecessitaAcolhimento');
                expect(item).to.have.property('tipoId');

                // Tipo
                expect(item).to.have.property('tipo');
                expect(item.tipo).to.have.property('id');
                expect(item.tipo).to.have.property('descricao');
                expect(item.tipo).to.have.property('status');
                expect(item.tipo).to.have.property('flgLaboratorio');
                expect(item.tipo).to.have.property('valorPrimeiroAtendimento');
                expect(item.tipo).to.have.property('classificacaoFinanceiraId');
                expect(item.tipo).to.have.property('planoDeContasId');
                expect(item.tipo).to.have.property('flgEdit');

                // Arrays
                expect(item).to.have.property('grupo');
                expect(item.grupo).to.be.an('array');

                expect(item).to.have.property('especialidades');
                expect(item.especialidades).to.be.an('array');

                expect(item).to.have.property('unidades');
                expect(item.unidades).to.be.an('array');
            })
        })

        it('Validar retorno 400 - /api/v1/procedimentos/{id}', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/procedimentos/{id}}',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(400);
            })
        })

        it('Validar retorno 401 - /api/v1/procedimentos/{id}', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/procedimentos/21502',
                headers: {
                    //'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(401);
            })
        })
    })

    describe('Módulo - Procedimentos - Cria um grupo de procedimento', () => {

        it('Validar retorno 201 - /api/v1/procedimentos/create-group', () => {
            const token = Cypress.env('access_token');
            const nomeDinamico = `Teste API-${Date.now()}`;

            cy.request({
                method: 'POST',
                url: '/api/v1/procedimentos/create-group',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: {
                    "descricao": nomeDinamico,
                    "procTypeId": 45,
                    "groupProcedures": [
                        20715
                    ]
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(201);
                expect(response.body).to.have.property('descricao');
                expect(response.body).to.have.property('procedureType');
                expect(response.body).to.have.property('id');

                const idGrupo = response.body.id;
                //Salva o ID
                Cypress.env('idGrupo', idGrupo);
                cy.log('Id Salvo:', idGrupo)
            })
        })

        it('Validar retorno 400 - /api/v1/procedimentos/create-group', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/procedimentos/create-group',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(400);
            })
        })

        it('Validar retorno 401 - /api/v1/procedimentos/create-group', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/procedimentos/create-group',
                headers: {
                    //'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: {
                    "descricao": "Teste API2",
                    "procTypeId": 45,
                    "groupProcedures": [
                        20715
                    ]
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(401);
            })
        })
    });

    describe('Módulo - Procedimentos - Altera/atualiza um grupo', () => {

        it('Validar retorno 200 - /api/v1/procedimentos/update-group/{id}', () => {
            const token = Cypress.env('access_token');
            const idGrupo = Cypress.env('idGrupo')

            cy.request({
                method: 'PUT',
                url: '/api/v1/procedimentos/update-group/{id}?id=125',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: {
                    "descricao": "Teste API5",
                    "procTypeId": 45,
                    "groupProcedures": [
                        20715
                    ]
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(200);
                const body = response.body;
                expect(body).to.have.property('message');
                expect(body).to.have.property('updatedGroup');
                expect(body.updatedGroup).to.have.property('id');
                expect(body.updatedGroup).to.have.property('descricao');
                expect(body.updatedGroup).to.have.property('procedureType');
                expect(body).to.have.property('proceduresIdsCompareOldToNew');
                expect(body.proceduresIdsCompareOldToNew).to.have.property('actual');
                expect(body.proceduresIdsCompareOldToNew).to.have.property('received');
                expect(body).to.have.property('equalArrays');
                expect(body).to.have.property('proceduresHaveBeenUpdated');
            })
        })

        it('Validar retorno 400 - /api/v1/procedimentos/update-group/{id}', () => {
            const token = Cypress.env('access_token');
            const idGrupo = Cypress.env('idGrupo')

            cy.request({
                method: 'PUT',
                url: '/api/v1/procedimentos/update-group/{id}',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(400);
            })
        })

        it('Validar retorno 401 - /api/v1/procedimentos/update-group/{id}', () => {
            const token = Cypress.env('access_token');
            const idGrupo = Cypress.env('idGrupo')

            cy.request({
                method: 'PUT',
                url: '/api/v1/procedimentos/update-group/{id}?id=125',
                headers: {
                    //'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: {
                    "descricao": "Teste API5",
                    "procTypeId": 45,
                    "groupProcedures": [
                        20715
                    ]
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(401);
            })
        })
    });

    describe('Módulo - Procedimentos - Retorna um grupo pelo id', () => {

        it('Validar retorno 200 - /api/v1/procedimentos/group/{id}', () => {
            const token = Cypress.env('access_token');
            const idGrupo = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/procedimentos/update-group/125',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(200);
                const body = response.body;

                // Campos principais
                expect(body).to.have.property('id');
                expect(body).to.have.property('descricao');
                expect(body).to.have.property('procedureType');
                expect(body.procedureType).to.have.property('id');
                expect(body.procedureType).to.have.property('descricao');
            })
        })

        it('Validar retorno 400 - /api/v1/procedimentos/group/{id}', () => {
            const token = Cypress.env('access_token');
            const idGrupo = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/procedimentos/group/{id}',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(400);
            })
        })

        it('Validar retorno 401 - /api/v1/procedimentos/group/{id}', () => {
            const token = Cypress.env('access_token');
            const idGrupo = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/procedimentos/group/{id}',
                headers: {
                    //'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(401);
            })
        })
    });

    describe('Módulo - Procedimentos - Exclui um grupo de procedimentos', () => {

        it('Validar retorno 200 - /api/v1/procedimentos/group/{id}', () => {
            const token = Cypress.env('access_token');
            const idGrupo = Cypress.env('idGrupo');

            cy.log("ID carregado para delete:", idGrupo);

            cy.request({
                method: 'DELETE',
                url: '/api/v1/procedimentos/group/{id}?id=105',
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
            });
        });

        it('Validar retorno 400 - /api/v1/procedimentos/group/{id}', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'DELETE',
                url: '/api/v1/procedimentos/group/{id}',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(400);
            })
        })

        it('Validar retorno 401 - /api/v1/procedimentos/group/{id}', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'DELETE',
                url: '/api/v1/procedimentos/group/{id}?id=105',
                headers: {
                    //'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(401);
            })
        })
    })

    describe('Módulo - Procedimentos - Busca um grupo por id', () => {

        it('Validar retorno 200 - /api/v1/procedimentos/group/filters', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/procedimentos/group/filters',
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

        it('Validar retorno 400 - /api/v1/procedimentos/group/filters', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/procedimentos/group/filters',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(400);
            })
        })

        it('Validar retorno 401 - /api/v1/procedimentos/group/filters', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/procedimentos/group/filters',
                headers: {
                    //'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(401);
            })
        })
    })

    describe('Módulo - Procedimentos - Retorna uma lista de grupos por ID de uma area de atuação/especialidade', () => {

        it('Validar retorno 200 - /api/v1/procedimentos/groups/specialty', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/procedimentos/groups/specialty?specialtyId=611',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(200);

                const body = response.body;

                expect(body).to.be.an('array');

                body.forEach((item) => {
                    expect(item).to.have.property('id');
                    expect(item).to.have.property('descricao');
                });
            })
        })

        it('Validar retorno 400 - /api/v1/procedimentos/groups/specialty', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/procedimentos/groups/specialty',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(400);
            })
        })

        it('Validar retorno 401 - /api/v1/procedimentos/groups/specialty', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/procedimentos/groups/specialty',
                headers: {
                    //'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(401);
            })
        })
    })

    describe('Módulo - Procedimentos - Retorna uma lista de grupos com flg_laboratorio=1', () => {

        it('Validar retorno 200 - /api/v1/procedimentos/groups/flgLaboratory', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/procedimentos/groups/flgLaboratory',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(200);
                const body = response.body;

                expect(body).to.be.an('array');

                body.forEach((item) => {
                    expect(item).to.have.property('id');
                    expect(item).to.have.property('descricao');
                    expect(item).to.have.property('procedureType');

                    expect(item.procedureType).to.have.property('id');
                    expect(item.procedureType).to.have.property('descricao');
                    expect(item.procedureType).to.have.property('status');
                    expect(item.procedureType).to.have.property('flgLaboratorio');
                });
            })
        })

        it('Validar retorno 401 - /api/v1/procedimentos/groups/flgLaboratory', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/procedimentos/groups/flgLaboratory',
                headers: {
                    //'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(401);
            })
        })
    })

    describe('Módulo - Procedimentos - Retorna procedimentos de um pacote', () => {

        it('Validar retorno 200 - /api/v1/procedimentos/checkup-package', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/procedimentos/checkup-package',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(200);

                const body = response.body;

                expect(body).to.be.an('array');

                body.forEach((item) => {
                    expect(item).to.have.property('procedure');
                    expect(item).to.have.property('procedureId');
                });
            })
        })

        it('Validar retorno 401 - /api/v1/procedimentos/checkup-package', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/procedimentos/checkup-package',
                headers: {
                    //'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(401);
            })
        })
    })

    describe('Módulo - Procedimentos - Busca procedimentos por um ou mais ids de grupos de procedimentos', () => {

        it('Validar retorno 201 - /api/v1/procedimentos/groups/id-list', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/procedimentos/groups/id-list',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: {
                    "groupsIds": [
                        2,
                        3,
                        24
                    ],
                    "procedureName": "proc"
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(201);
                cy.log('Retorna vazio', JSON.stringify(response.body))
            })
        })

        it('Validar retorno 400 - /api/v1/procedimentos/groups/id-list', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/procedimentos/groups/id-list',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(400);
            })
        })

        it('Validar retorno 401 - /api/v1/procedimentos/groups/id-list', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/procedimentos/groups/id-list',
                headers: {
                    //'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(401);
            })
        })
    });

    describe('Módulo - Procedimentos - Busca procedimentos por um ou mais ids de grupos de procedimentos', () => {

        it('Validar retorno 201 - /api/v1/procedimentos/package', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/procedimentos/package',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: {
                    "nome": "string",
                    "ativo": true,
                    "unidadeIds": [
                        1,
                        2,
                        3
                    ],
                    "profissionalIds": [
                        1,
                        2,
                        3
                    ],
                    "especialidadeIds": [
                        1,
                        2,
                        3
                    ],
                    "procedimentoIds": [
                        1,
                        2,
                        3
                    ]
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(201);
            })
        })

        it('Validar retorno 400 - /api/v1/procedimentos/package', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/procedimentos/package',
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
    })

    describe('Módulo - Procedimentos - Retorna dados de um pacote de procedimentos', () => {

        it('Validar retorno 200 - /api/v1/procedimentos/package', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/procedimentos/package?page=1&limit=1',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(200);
                const body = response.body;

                expect(body).to.have.property('items');
                expect(body).to.have.property('meta');

                // Valida array items
                expect(body.items).to.be.an('array');

                body.items.forEach((item) => {
                    expect(item).to.have.property('id');
                    expect(item).to.have.property('nome');
                    expect(item).to.have.property('createAt');
                    expect(item).to.have.property('ativo');
                    expect(item).to.have.property('createBy');
                    expect(item).to.have.property('createById');
                });

                // Valida meta básico
                expect(body.meta).to.have.property('totalItems');
                expect(body.meta).to.have.property('currentPage');
                expect(body.meta).to.have.property('itemCount');
                expect(body.meta).to.have.property('itemsPerPage');
                expect(body.meta).to.have.property('totalPages');
            })
        })

        it('Validar retorno 401 - /api/v1/procedimentos/package', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/procedimentos/package?page=1&limit=1',
                headers: {
                    //'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(401);
            })
        })
    })

    describe('Módulo - Procedimentos - Busca procedimentos por um ou mais ids de grupos de procedimentos', () => {

        it('Validar retorno 201 - /api/v1/procedimentos/package/{id}', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/procedimentos/package/432',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: {
                    "nome": "string",
                    "ativo": true,
                    "unidadeIds": [
                        1,
                        2,
                        3
                    ],
                    "profissionalIds": [
                        1,
                        2,
                        3
                    ],
                    "especialidadeIds": [
                        1,
                        2,
                        3
                    ],
                    "procedimentoIds": [
                        1,
                        2,
                        3
                    ]
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(201);
            })
        })

        it('Validar retorno 400 - /api/v1/procedimentos/package', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'PUT',
                url: '/api/v1/procedimentos/package/{id}',
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
    })

    describe('Módulo - Procedimentos - Retorna dados de um pacote de procedimentos', () => {

        it('Validar retorno 200 - /api/v1/procedimentos/package/{id}', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/procedimentos/package/1',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(200);
                expect(response.body).to.have.property('id');
                expect(response.body).to.have.property('nome');
                expect(response.body).to.have.property('createAt');
                expect(response.body).to.have.property('ativo');
                expect(response.body).to.have.property('createBy');
                expect(response.body).to.have.property('createById');
            })
        })

        it('Validar retorno 401 - /api/v1/procedimentos/package/{id}', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/procedimentos/package/1',
                headers: {
                    //'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(401);
            })
        })
    })

    describe('Módulo - Procedimentos - Retorna profissionais para filtro de pacote de procedimentos', () => {

        it('Validar retorno 200 - /api/v1/procedimentos/package/professionals', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/procedimentos/package/professionals?especialidadeIds=16&especialidadeIds=2&unidadeIds=183&unidadeIds=383',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(200);
                expect(response.body).to.have.property('items').to.be.an('array');
                expect(response.body).to.have.property('meta');
                expect(response.body.meta).to.have.property('itemCount');
                expect(response.body.meta).to.have.property('totalItems');
                expect(response.body.meta).to.have.property('itemsPerPage');
                expect(response.body.meta).to.have.property('currentPage');
                expect(response.body.meta).to.have.property('totalPages');
            })
        })

        it('Validar retorno 401 - /api/v1/procedimentos/package/professionals', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/procedimentos/package/professionals',
                headers: {
                    //'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(401);
            })
        })
    })

    describe('Módulo - Procedimentos - Retorna arquivo CSV espelhando a grid', () => {

        it('Validar retorno 200 - /api/v1/procedimentos/package/csv/download', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/procedimentos/package/csv/download?page=1&limit=1',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(200);
                cy.log('Retorna vazio', JSON.stringify(response.body))
            })
        })

        it('Validar retorno 401 - /api/v1/procedimentos/package/csv/download', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/procedimentos/package/csv/download',
                headers: {
                    //'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(401);
            })
        })
    })

    describe('Módulo - Procedimentos - GET CSV FILE', () => {

        it('Validar retorno 201 - /api/v1/procedimentos/get-csv-file', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/procedimentos/get-csv-file',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(201);
                cy.log(response.body)
            })
        })

        it('Validar retorno 401 - /api/v1/procedimentos/get-csv-file', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/procedimentos/get-csv-file',
                headers: {
                    //'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(401);
            })
        })
    })

    describe('Módulo - Procedimentos - Retorna os profissionais que atendem um procedimento, buscando por id ou nome', () => {

        it('Validar retorno 200 - /api/v1/procedimentos/professionals/proc-name-or-id', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: 'api/v1/procedimentos/professionals/proc-name-or-id?procedureIds=21502',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(200);
                cy.log('retorna vazio', JSON.stringify(response.body))
            })
        })

        it('Validar retorno 400 - /api/v1/procedimentos/professionals/proc-name-or-id', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/procedimentos/professionals/proc-name-or-id',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(400);
            })
        })

        it('Validar retorno 401 - /api/v1/procedimentos/professionals/proc-name-or-id', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/procedimentos/professionals/proc-name-or-id',
                headers: {
                    //'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(401);
            })
        })
    })

    describe('Módulo - Procedimentos - Buscar um grupo por id', () => {

        it('Validar retorno 200 - /api/v1/procedimentos/groups/type/{id}', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/procedimentos/groups/type/1',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(200);
                const body = response.body;
                expect(body).to.be.an('array');
                body.forEach((item) => {
                    expect(item).to.have.property('id');
                    expect(item).to.have.property('descricao');
                    expect(item).to.have.property('procedureType');
                    expect(item.procedureType).to.have.property('id');
                    expect(item.procedureType).to.have.property('descricao');
                    expect(item.procedureType).to.have.property('status');
                    expect(item.procedureType).to.have.property('flgLaboratorio');
                    expect(item.procedureType).to.have.property('valorPrimeiroAtendimento');
                    expect(item.procedureType).to.have.property('classificacaoFinanceiraId');
                    expect(item.procedureType).to.have.property('planoDeContasId');
                    expect(item.procedureType).to.have.property('flgEdit');
                })
            })
        })

        it('Validar retorno 400 - /api/v1/procedimentos/groups/type/{id}', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/procedimentos/groups/type/{id}',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(400);
            })
        })

        it('Validar retorno 401 - /api/v1/procedimentos/groups/type/{id}', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/procedimentos/groups/type/{id}',
                headers: {
                    //'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(401);
            })
        })
    })

    describe('Módulo - Procedimentos - Cria um tipo de procedimentos', () => {

        it('Validar retorno 201 - /api/v1/procedimentos/type/create-type', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/procedimentos/type/create-type',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(201);
                expect(response.body).to.have.property('descricao');
                expect(response.body).to.have.property('status');
                expect(response.body).to.have.property('classificacaoFinanceiraId');
                expect(response.body).to.have.property('valorPrimeiroAtendimento');
                expect(response.body).to.have.property('id');
            })
        })

        it('Validar retorno 400 - /api/v1/procedimentos/type/create-type', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/procedimentos/type/create-type',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(400);
            })
        })

        it('Validar retorno 401 - /api/v1/procedimentos/type/create-type', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/procedimentos/type/create-type',
                headers: {
                    //'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(401);
            })
        })
    })

    describe('Módulo - Procedimentos - Retorna uma lista de tipos de procedimentos do tipo Laboratorio', () => {

        it('Validar retorno 200 - /api/v1/procedimentos/type/laboratory', () => {
            const token = Cypress.env('access_token');

            cy.api({
                method: 'GET',
                url: '/api/v1/procedimentos/type/laboratory',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(200);
                const body = response.body;

                expect(body).to.be.an('array');

                body.forEach((item) => {
                    expect(item).to.have.property('id');
                    expect(item).to.have.property('descricao');
                    expect(item).to.have.property('status');
                    expect(item).to.have.property('flgLaboratorio');
                    expect(item).to.have.property('valorPrimeiroAtendimento');
                    expect(item).to.have.property('classificacaoFinanceiraId');
                    expect(item).to.have.property('planoDeContasId');
                    expect(item).to.have.property('flgEdit');
                    expect(item).to.have.property('procGrupos');

                    // Validando array de procGrupos
                    expect(item.procGrupos).to.be.an('array');
                    item.procGrupos.forEach((grupo) => {
                        expect(grupo).to.have.property('id');
                        expect(grupo).to.have.property('descricao');
                    })
                })
            })
        })

        it('Validar retorno 401 - /api/v1/procedimentos/type/laboratory', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/procedimentos/type/laboratory',
                headers: {
                    //'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(401);
            })
        })
    })

    describe('Módulo - Procedimentos - Retorna um tipo de procedimento pelo id', () => {

        it('Validar retorno 200 - /api/v1/procedimentos/type/{id}', () => {
            const token = Cypress.env('access_token');

            cy.api({
                method: 'GET',
                url: '/api/v1/procedimentos/type/1',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(200);
                const body = response.body;

                expect(body).to.have.property('id');
                expect(body).to.have.property('descricao');
                expect(body).to.have.property('status');
                expect(body).to.have.property('flgLaboratorio');
                expect(body).to.have.property('valorPrimeiroAtendimento');
                expect(body).to.have.property('classificacaoFinanceiraId');
                expect(body).to.have.property('planoDeContasId');
                expect(body).to.have.property('flgEdit');
                expect(body).to.have.property('procGrupos');

                // Validando array de procGrupos
                expect(body.procGrupos).to.be.an('array');
                body.procGrupos.forEach((grupo) => {
                    expect(grupo).to.have.property('id');
                    expect(grupo).to.have.property('descricao');
                });
            })
        })

        it('Validar retorno 401 - /api/v1/procedimentos/type/{id}', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/procedimentos/type/{id}',
                headers: {
                    //'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(401);
            })
        })
    })

    describe('Módulo - Procedimentos - Exclui um tipo de procedimentos', () => {

        it('Validar retorno 200 - /api/v1/procedimentos/type/{id}', () => {
            const token = Cypress.env('access_token');

            cy.api({
                method: 'DELETE',
                url: '/api/v1/procedimentos/type/94',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(200);
                expect(response.body).to.have.property('raw').to.be.an('array');
                expect(response.body).to.have.property('affected');
            })
        })

        it('Validar retorno 400 - /api/v1/procedimentos/type/{id}', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'DELETE',
                url: '/api/v1/procedimentos/type/{id}',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(400);
            })
        })

        it('Validar retorno 401 - /api/v1/procedimentos/type/{id}', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'DELETE',
                url: '/api/v1/procedimentos/type/{id}',
                headers: {
                    //'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(401);
            })
        })
    })

    describe('Módulo - Procedimentos - Atualiza um tipo de procedimentos', () => {

        it('Validar retorno 200 - /api/v1/procedimentos/type/{id}', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'PUT',
                url: '/api/v1/procedimentos/type/156',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(200);
                expect(response.body).to.have.property('id');
                expect(response.body).to.have.property('descricao');
                expect(response.body).to.have.property('status');
                expect(response.body).to.have.property('flgLaboratorio');
                expect(response.body).to.have.property('valorPrimeiroAtendimento');
                expect(response.body).to.have.property('classificacaoFinanceiraId');
                expect(response.body).to.have.property('planoDeContasId');
                expect(response.body).to.have.property('flgEdit');
            })
        })

        it('Validar retorno 400 - /api/v1/procedimentos/type/{id}', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'PUT',
                url: '/api/v1/procedimentos/type/156',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(400);
            })
        })

        it('Validar retorno 401 - /api/v1/procedimentos/type/{id}', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'PUT',
                url: '/api/v1/procedimentos/type/{id}',
                headers: {
                    //'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(401);
            })
        })
    })
})