/// <reference types="cypress"/>

describe('Módulo - Tabela de Preços', () => {
    beforeEach(() => {
        cy.login();
        cy.refreshToken();
    })

    describe('Módulo - Tabela de Preços - Retorna o(s) campo(s) de preços e as regras do procedimento informado', () => {

        it('Validar o retorno 200 - /api/v1/tabela-precos/campos-procedimento', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/tabela-precos/campos-procedimento?procedimentoId=20357&parceiroId=41&date=2025-10-29',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(200);

                const body = response.body;
                expect(body).to.have.property('referenceTable');
                expect(body).to.have.property('procedure');
                expect(body).to.have.property('tipoProcedure');
                expect(body.tipoProcedure).to.have.property('id');
                expect(body.tipoProcedure).to.have.property('descricao');
                expect(body.tipoProcedure).to.have.property('status');
                expect(body.tipoProcedure).to.have.property('flgLaboratorio');
                expect(body.tipoProcedure).to.have.property('valorPrimeiroAtendimento');
                expect(body.tipoProcedure).to.have.property('classificacaoFinanceiraId');
                expect(body.tipoProcedure).to.have.property('planoDeContasId');
                expect(body.tipoProcedure).to.have.property('flgEdit');

                expect(body).to.have.property('isStandardProcedure');
                expect(body).to.have.property('hasSegmentation');

                expect(body).to.have.property('fields').to.be.an('array')
                body.fields.forEach((item) => {
                    expect(item).to.have.property('label');
                    expect(item).to.have.property('value');
                    expect(item).to.have.property('key');
                    expect(item).to.have.property('isBlocked');
                    expect(item).to.have.property('hasMinimumRule');
                })
            })
        })

        it('Validar o retorno 400 - /api/v1/tabela-precos/campos-procedimento', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/tabela-precos/campos-procedimento',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(400);
            })
        })

        it('Validar o retorno 401 - /api/v1/tabela-precos/campos-procedimento', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/tabela-precos/campos-procedimento?procedimentoId=20357&parceiroId=41&date=2025-10-29',
                headers: {
                    //'Authorization': `Bearer ${token}`, Toen inválido
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(401);
            })
        })
    })

    describe('Módulo - Tabela de Preços - Retorna o(s) procedimento(s) do parceiro para a unidade informada', () => {

        it('Validar retorno 200 - /api/v1/tabela-precos/procedimentos', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/tabela-precos/procedimentos?parceiroId=41&unidadeId=483&data=2026-01-07',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(200);

                const body = response.body;
                expect(body).to.have.property('items').to.be.an('array')
                body.items.forEach((item) => {
                    expect(item).to.have.property('id');
                    expect(item).to.have.property('nome');
                })

                expect(body).to.have.property('meta');
                expect(body.meta).to.have.property('totalItems');
                expect(body.meta).to.have.property('currentPage');
                expect(body.meta).to.have.property('itemCount');
                expect(body.meta).to.have.property('itemsPerPage');
                expect(body.meta).to.have.property('totalPages');
            })
        })

        it('Validar retorno 400 - /api/v1/tabela-precos/procedimentos', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/tabela-precos/procedimentos', //Sem parâmetro
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(400);
            })
        })

        it('Validar retorno 401 - /api/v1/tabela-precos/procedimentos', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/tabela-precos/procedimentos?parceiroId=41&unidadeId=483&data=2025-10-29',
                headers: {
                    //'Authorization': `Bearer ${token}`, Token inválido
                    'Content-Type': 'application/json',
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(401);
            })
        })
    })

    describe('Módulo - Tabela de Preços - Retorna o(s) preço(s) do(s) procedimento(s) para o parceiro e unidade informados', () => {

        it('Validar retorno 200 - /api/v1/tabela-precos/precos-procedimentos', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: 'api/v1/tabela-precos/precos-procedimentos?parceiroId=42&unidadeId=483&procedimentosIds=20357&procedimentosIds=20357&data=2024-05-25&pacienteId=1162697',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(200);

                const body = response.body;
                expect(body).to.have.property('referenceTable');
                expect(body).to.have.property('procedures').to.be.an('array')
                body.procedures.forEach((item) => {
                    expect(item).to.have.property('id');
                    expect(item).to.have.property('name');
                    expect(item).to.have.property('typeId');
                    expect(item).to.have.property('price');
                })
                expect(body).to.have.property('isMissingProcedures');
            })
        })

        it('Validar retorno 400 - /api/v1/tabela-precos/precos-procedimentos', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/tabela-precos/precos-procedimentos', //Sem parâmetro
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(400);
            })
        })

        it('Validar retorno 401 - /api/v1/tabela-precos/precos-procedimentos', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/tabela-precos/precos-procedimentos?parceiroId=41&unidadeId=483&procedimentosIds=20357&procedimentosIds=20357&data=2025-10-29&pacienteId=353494',
                headers: {
                    //'Authorization' :`Bearer ${token}`, Token inválido
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(401);
            })
        })
    })

    describe('Módulo - Tabela de Preços - Lista as tabelas de preços cadastardas', () => {

        it('Validar retorno 200 - /api/v1/tabela-precos', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/tabela-precos?page=1&limit=10&parceiroId=41&parceiroTipoId=3&procedimentosIds=20357&procedimentosIds=20357&unidadesIds=483&unidadesIds=483&vigenciaInicio=2023-06-01&vigenciaTermino=2025-12-31&flagAtivo=1&flagGestaoFranqueadora=0',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(200);
                expect(response.body).to.have.property('items').to.be.an('array')

                expect(response.body).to.have.property('meta');
                expect(response.body.meta).to.have.property('totalItems');
                expect(response.body.meta).to.have.property('currentPage');
                expect(response.body.meta).to.have.property('itemCount');
                expect(response.body.meta).to.have.property('itemsPerPage');
                expect(response.body.meta).to.have.property('totalPages');
            })
        })

        it('Validar retorno 401 - /api/v1/tabela-precos', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/tabela-precos',
                headers: {
                    //'Authorization': `Bearer ${token}`, Token inválido
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(401);
            })
        })
    })

    describe('Módulo - Tabela de Preços - Cadastra uma nova tabela de preço', () => {

        it('Validar retorno 200 - /api/v1/tabela-precos', () => {
            const token = Cypress.env('access_token');
            const gerarTabela = `TESTE API${Math.floor(Math.random() * 1000) + 1}`;

            cy.request({
                method: 'POST',
                url: '/api/v1/tabela-precos',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: {
                    nome: gerarTabela,
                    parceiroId: 41,
                    vigenciaInicio: "2023-01-01",
                    vigenciaTermino: "2023-12-31",
                    regionais: [
                        {
                            id: 1
                        }
                    ],
                    unidades: [
                        {
                            id: 483
                        }
                    ],
                    procedimentos: [
                        {
                            procedimento: {
                                id: 20357
                            },
                            precoCdtAaa: null,
                            precoCdtAa: null,
                            precoCdtA: null,
                            precoCdtB: null,
                            precoCdtC: null,
                            precoCdtUnico: null,
                            precoParticular: null,
                            precoParceiro: null,
                            preco: 199
                        }
                    ],
                    flagAtivo: "1",
                    flagGestaoFranqueadora: 0
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(201);
                expect(response.body).to.have.property('codigo');
                expect(response.body).to.have.property('flagDeError');
                expect(response.body).to.have.property('mensagem');
            })
        })

        it('Validar retorno 400 - /api/v1/tabela-precos', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/tabela-precos',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: { //Sem parâmetro no body
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(400)
            })
        })

        it('Validar retorno 401 - /api/v1/tabela-precos', () => {
            const token = Cypress.env('access_token');
            const gerarTabela = `TESTE API${Math.floor(Math.random() * 1000) + 1}`;

            cy.request({
                method: 'POST',
                url: '/api/v1/tabela-precos',
                headers: {
                    //'Authorization': `Bearer ${token}`, Token inválido
                    'Content-Type': 'application/json'
                },
                body: {
                    nome: gerarTabela,
                    parceiroId: 41,
                    vigenciaInicio: "2023-01-01",
                    vigenciaTermino: "2023-12-31",
                    regionais: [
                        {
                            id: 1
                        }
                    ],
                    unidades: [
                        {
                            id: 483
                        }
                    ],
                    procedimentos: [
                        {
                            procedimento: {
                                id: 20357
                            },
                            precoCdtAaa: null,
                            precoCdtAa: null,
                            precoCdtA: null,
                            precoCdtB: null,
                            precoCdtC: null,
                            precoCdtUnico: null,
                            precoParticular: null,
                            precoParceiro: null,
                            preco: 199
                        }
                    ],
                    flagAtivo: "1",
                    flagGestaoFranqueadora: 0
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(401);
            })
        })
    })

    describe('Módulo - Tabela de Preços - Verifica se os procedimentos enviados ja estão cadastrados para uma tabela de preço com a mesma parceria e unidade', () => {

        it('Validar retorno 200 - /api/v1/tabela-precos/verify-procedures', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/tabela-precos/verify-procedures?parceiroId=41&procedimentosIds=20357&procedimentosIds=20357&unidadesIds=483&unidadesIds=483',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(200);
                expect(response.body).to.have.property('validProcedures');
                expect(response.body).to.have.property('isMissingProcedures');
                expect(response.body).to.have.property('message');
            })
        })

        it('Validar retorno 400 - /api/v1/tabela-precos/verify-procedures', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/tabela-precos/verify-procedures', //Sem parâmetro
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(400);
            })
        })

        it('Validar retorno 401 - /api/v1/tabela-precos/verify-procedures', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/tabela-precos/verify-procedures?parceiroId=41&procedimentosIds=20357&procedimentosIds=20357&unidadesIds=483&unidadesIds=483',
                headers: {
                    //'Authorization' :`Bearer ${token}`, Token inválido
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(401);
            })
        })
    })

    describe('Módulo - Tabela de Preços - Lista a tabela de preço por Id', () => {

        it('Validar retorno 200 - /api/v1/tabela-precos/{id}', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: 'api/v1/tabela-precos/193?page=1&limit=1&procedimentosIds=20357&procedimentosIds=20357',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(200);

                const body = response.body;

                // ITEM PRINCIPAL
                expect(body).to.have.property('item');
                expect(body.item).to.have.property('id');
                expect(body.item).to.have.property('parceiroId');
                expect(body.item).to.have.property('vigenciaInicio');
                expect(body.item).to.have.property('vigenciaTermino');
                expect(body.item).to.have.property('flagAtivo');
                expect(body.item).to.have.property('flagPrimeiraConsulta');
                expect(body.item).to.have.property('flagGestaoFranqueadora');
                expect(body.item).to.have.property('createdAt');
                expect(body.item).to.have.property('updatedAt');
                expect(body.item).to.have.property('nome');

                //PARCEIRO
                expect(body.item).to.have.property('parceiro');
                expect(body.item.parceiro).to.have.property('id');
                expect(body.item.parceiro).to.have.property('tipoId');
                expect(body.item.parceiro).to.have.property('nome');
                expect(body.item.parceiro).to.have.property('tabelaId');
                expect(body.item.parceiro).to.have.property('abrangenciaId');
                expect(body.item.parceiro).to.have.property('tipoCobrancaId');
                expect(body.item.parceiro).to.have.property('prazoFaturamento');
                expect(body.item.parceiro).to.have.property('dataBase');
                expect(body.item.parceiro).to.have.property('flagAtivo');
                expect(body.item.parceiro).to.have.property('createdAt');
                expect(body.item.parceiro).to.have.property('updatedAt');
                expect(body.item.parceiro).to.have.property('cnpj');
                expect(body.item.parceiro).to.have.property('razaoSocial');
                expect(body.item.parceiro).to.have.property('telefone');
                expect(body.item.parceiro).to.have.property('email');
                expect(body.item.parceiro).to.have.property('cep');
                expect(body.item.parceiro).to.have.property('endereco');
                expect(body.item.parceiro).to.have.property('numero');
                expect(body.item.parceiro).to.have.property('bairro');
                expect(body.item.parceiro).to.have.property('cidade');
                expect(body.item.parceiro).to.have.property('estado');
                expect(body.item.parceiro).to.have.property('nomeFantasia');
                expect(body.item.parceiro).to.have.property('telefoneSecundario');
                expect(body.item.parceiro).to.have.property('regiaoZona');
                expect(body.item.parceiro).to.have.property('emailAlternativo');
                expect(body.item.parceiro).to.have.property('complemento');
                expect(body.item.parceiro).to.have.property('urlParceiro');

                //UNIDADES
                expect(body.item).to.have.property('unidades').to.be.an('array');
                body.item.unidades.forEach((unidade) => {
                    expect(unidade).to.have.property('id');
                    expect(unidade).to.have.property('descricao');
                    expect(unidade).to.have.property('endereco');
                    expect(unidade).to.have.property('flgCentral');
                    expect(unidade).to.have.property('feegowClinicId');
                    expect(unidade).to.have.property('flgTelemedicina');
                    expect(unidade).to.have.property('flgAmorCirurgias');
                    expect(unidade).to.have.property('regiaoId');
                    expect(unidade).to.have.property('flgAtivo');
                    expect(unidade).to.have.property('flgAtivarTef');
                    expect(unidade).to.have.property('razaoSocial');
                    expect(unidade).to.have.property('cnpj');
                    expect(unidade).to.have.property('cnes');
                    expect(unidade).to.have.property('fkRegimeTributario');
                    expect(unidade).to.have.property('fkUnidadeStatus');
                    expect(unidade).to.have.property('consultor');
                    expect(unidade).to.have.property('telefonePrincipal');
                    expect(unidade).to.have.property('telefoneSecundario');
                    expect(unidade).to.have.property('emailPrincipal');
                    expect(unidade).to.have.property('emailSecundario');
                    expect(unidade).to.have.property('cep');
                    expect(unidade).to.have.property('numero');
                    expect(unidade).to.have.property('complemento');
                    expect(unidade).to.have.property('bairro');
                    expect(unidade).to.have.property('regiaoZona');
                    expect(unidade).to.have.property('observacao');
                    expect(unidade).to.have.property('sigla');
                    expect(unidade).to.have.property('fkFusoHorario');
                    expect(unidade).to.have.property('fkTipoUnidade');
                    expect(unidade).to.have.property('flgAgendaOnline');
                    expect(unidade).to.have.property('sellerId');
                    expect(unidade).to.have.property('flgAtivarSplit');
                    expect(unidade).to.have.property('fkParceiroInstitucional');
                    expect(unidade).to.have.property('dataInauguracao');
                    expect(unidade).to.have.property('fkTipoSegmento');
                    expect(unidade).to.have.property('status');
                    expect(unidade).to.have.property('mcc');
                    expect(unidade).to.have.property('latitude');
                    expect(unidade).to.have.property('longitude');
                });

                // REGIONAIS
                expect(body.item).to.have.property('regionais').to.be.an('array');
                body.item.regionais.forEach((regional) => {
                    expect(regional).to.have.property('id');
                    expect(regional).to.have.property('nome');
                    expect(regional).to.have.property('flgAtivo');
                });

                // PROCEDIMENTOS
                expect(body.item).to.have.property('procedimentos').to.be.an('array');
                body.item.procedimentos.forEach((proc) => {
                    expect(proc).to.have.property('id');
                    expect(proc).to.have.property('tabelaPrecoId');
                    expect(proc).to.have.property('procedimentoId');
                    expect(proc).to.have.property('preco');
                    expect(proc).to.have.property('createdAt');
                    expect(proc).to.have.property('updatedAt');
                });

                //REFERENCIA
                expect(body.item).to.have.property('referencia').to.be.an('array');
                body.item.referencia.forEach((ref) => {
                    expect(ref).to.have.property('referenceTable');
                    expect(ref).to.have.property('procedureTableId');
                    expect(ref).to.have.property('procedureId');
                    expect(ref).to.have.property('procedure');
                    expect(ref).to.have.property('tipoProcedure');
                    expect(ref.tipoProcedure).to.have.property('id');
                    expect(ref.tipoProcedure).to.have.property('descricao');
                    expect(ref.tipoProcedure).to.have.property('status');
                    expect(ref.tipoProcedure).to.have.property('flgLaboratorio');
                    expect(ref.tipoProcedure).to.have.property('valorPrimeiroAtendimento');
                    expect(ref.tipoProcedure).to.have.property('classificacaoFinanceiraId');
                    expect(ref.tipoProcedure).to.have.property('planoDeContasId');
                    expect(ref.tipoProcedure).to.have.property('flgEdit');

                    //CAMPOS INTERNOS (FIELDS)
                    expect(ref).to.have.property('fields').to.be.an('array');
                    ref.fields.forEach((field) => {
                        expect(field).to.have.property('label');
                        expect(field).to.have.property('value');
                        expect(field).to.have.property('key');
                        expect(field).to.have.property('isBlocked');
                        expect(field).to.have.property('hasMinimumRule');
                    });
                });

                //META
                expect(body).to.have.property('meta');
                expect(body.meta).to.have.property('totalItems');
                expect(body.meta).to.have.property('currentPage');
                expect(body.meta).to.have.property('itemCount');
                expect(body.meta).to.have.property('itemsPerPage');
                expect(body.meta).to.have.property('totalPages');

            })
        })

        it('Validar retorno 401 - /api/v1/tabela-precos/{id}', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/tabela-precos/989?page=1&limit=10&procedimentosIds=20357&procedimentosIds=20357',
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

    describe('Módulo - Tabela de Preços - Cadastra procedimentos na tabela de preço', () => {

        it('Validar retorno 201 - /api/v1/tabela-precos/{id}', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/tabela-precos/48',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: {
                    "procedimentos": [
                        21884
                    ]
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(201);
                expect(response.body).to.have.property('codigo');
                expect(response.body).to.have.property('flagDeError');
                expect(response.body).to.have.property('mensagem');
            })
        })

        it('Validar retorno 400 - /api/v1/tabela-precos/{id}', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/tabela-precos/1029',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: { //sem parâmetro no body
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(400);
            })
        })

        it('Validar retorno 401 - /api/v1/tabela-precos/{id}', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/tabela-precos/1029',
                headers: {
                    //'Authorization': `Bearer ${token}`, token inválido
                    'Content-Type': 'application/json'
                },
                body: {
                    "procedimentos": [
                        21382
                    ]
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(401);
            })
        })
    })

    describe('Módulo - Tabela de Preços - Atualiza os dados da tabela de preço', () => {

        it('Validar retorno 200 - /api/v1/tabela-precos/{id}', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'PUT',
                url: '/api/v1/tabela-precos/285',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: {
                    "nome": "utt 555",
                    "parceiroId": 225,
                    "vigenciaInicio": "2024-10-01",
                    "vigenciaTermino": "2024-12-13",
                    "regionais": [
                        {
                            "id": 1
                        },
                        {
                            "id": 2
                        },
                        {
                            "id": 21
                        },
                        {
                            "id": 22
                        },
                        {
                            "id": 23
                        },
                        {
                            "id": 24
                        },
                        {
                            "id": 25
                        },
                        {
                            "id": 26
                        },
                        {
                            "id": 27
                        },
                        {
                            "id": 28
                        },
                        {
                            "id": 29
                        },
                        {
                            "id": 30
                        },
                        {
                            "id": 3
                        },
                        {
                            "id": 31
                        },
                        {
                            "id": 32
                        }
                    ],
                    "unidades": [
                        {
                            "id": 483
                        }
                    ],
                    "tipoProcedimentoId": null,
                    "grupoProcedimentoId": null,
                    "procedimentosIds": [
                        28002
                    ],
                    "procedimentos": [
                        {
                            "id": 1501,
                            "procedimento": {
                                "id": 28002
                            },
                            "preco": 1229
                        }
                    ],
                    "flagAtivo": "1",
                    "flagPrimeiraConsulta": "0",
                    "flagGestaoFranqueadora": 0
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(200);
                expect(response.body).to.have.property('codigo');
                expect(response.body).to.have.property('flagDeError');
                expect(response.body).to.have.property('mensagem');
            })
        })

        it('Validar retorno 400 - /api/v1/tabela-precos/{id}', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'PUT',
                url: '/api/v1/tabela-precos/285',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: { //Sem parâmetro no body
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(400);
            })
        })

        it('Validar retorno 401 - /api/v1/tabela-precos/{id}', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'PUT',
                url: '/api/v1/tabela-precos/285',
                headers: {
                    //'Authorization': `Bearer ${token}`, Token inválido
                    'Content-Type': 'application/json'
                },
                body: {
                    "nome": "utt 555",
                    "parceiroId": 225,
                    "vigenciaInicio": "2024-10-01",
                    "vigenciaTermino": "2024-12-13",
                    "regionais": [
                        {
                            "id": 1
                        },
                        {
                            "id": 2
                        },
                        {
                            "id": 21
                        },
                        {
                            "id": 22
                        },
                        {
                            "id": 23
                        },
                        {
                            "id": 24
                        },
                        {
                            "id": 25
                        },
                        {
                            "id": 26
                        },
                        {
                            "id": 27
                        },
                        {
                            "id": 28
                        },
                        {
                            "id": 29
                        },
                        {
                            "id": 30
                        },
                        {
                            "id": 3
                        },
                        {
                            "id": 31
                        },
                        {
                            "id": 32
                        }
                    ],
                    "unidades": [
                        {
                            "id": 483
                        }
                    ],
                    "tipoProcedimentoId": null,
                    "grupoProcedimentoId": null,
                    "procedimentosIds": [
                        28002
                    ],
                    "procedimentos": [
                        {
                            "id": 1501,
                            "procedimento": {
                                "id": 28002
                            },
                            "preco": 1229
                        }
                    ],
                    "flagAtivo": "1",
                    "flagPrimeiraConsulta": "0",
                    "flagGestaoFranqueadora": 0
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(401);
            })
        })
    })

    describe.only('Módulo - Tabela de Preços - Deletar procedimento da tabela', () => {

        it('Validar retorno 200 - /api/v1/tabela-precos/{id}', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'DELETE',
                url: '/api/v1/tabela-precos/25413',
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

        it('Validar retorno 401 - /api/v1/tabela-precos/{id}', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'DELETE',
                url: '/api/v1/tabela-precos/{id}',
                headers: {
                    //'Authorization': `Bearer ${token}`, token inválido
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(401);
            })
        })
    })
})