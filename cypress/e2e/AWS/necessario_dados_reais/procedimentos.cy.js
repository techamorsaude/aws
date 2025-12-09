/// <reference types="cypress"/>

describe('Módulo - Procedimentos', () => {
    beforeEach(() => {
        cy.login();
        cy.refreshToken();
    })

    describe('Módulo - Procedimentos - Cria um procedimento', () => {

        it('Validar retorno 201 - /api/v1/procedimentos', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/procedimentos',
                headers: {
                    'Authorization': `Bearer ${token}`,
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

            cy.request({
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
            const professionalId = 1234;

            cy.request({
                method: 'POST',
                url: `/api/v1/procedimentos/professional/procedures/${professionalId}`,
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

            cy.request({
                method: 'PUT',
                url: `/api/v1/procedimentos/professional/procedures/${professionalId}`,
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

            cy.request({
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

    describe.only('Módulo - Procedimentos - Retorna uma lista de procedimentos do tipo laboratório', () => {

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

    describe.only('Módulo - Procedimentos - Retorna uma lista de procedimentos com tabela de valores', () => {

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
                expect(response.status).to.eq(400);
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

    describe.only('Módulo - Procedimentos - Retorna uma lista de procedimentos com tabelas de valores', () => {

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

    describe.only('Módulo - Procedimentos - Retorna uma tabela de valores com parceiro', () => {

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

    describe.only('Módulo - Procedimentos - Retorna uma lista, com paginação, de todos os procedimentos que um profissional atende', () => {

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

    describe.only('Módulo - Procedimentos - Retorna uma lista com todos os procedimentos da unidade logada com filtro pelo nome', () => {

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
})