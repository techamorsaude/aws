/// <reference types="cypress"/>

///>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>EM CONSTRUÇÃO<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<


describe('Módulo - Tabela Padrão', () => {
    beforeEach(() => {
        cy.login()
        cy.refreshToken()
    })

    // Rota descotinuada, no front dentro do Amei não existe o botão cadastrar
    /*
    describe('Módulo - Tabela Padrão - Cria uma tabela padrão', () => {

        it('Validar retorno 200 - /api/v1/tabela-padrao', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/tabela-padrao',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: {
                    dataInicio: "20250101",
                    dataFim: "20250130",
                    nomeTabelaPreco: "Tabela Padrão QA",
                    valorConsultaInicio: "40.99",
                    ipClient: "null",
                    createBy: "null"
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(201);
            })
        })

        it('Validar retorno 400 - /api/v1/tabela-padrao', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/tabela-padrao',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: {
                    // sem parâmetro no body
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(400);
            })
        })
    })
        */

    describe('Módulo - Tabela Padrão - Retorna tabela padrão', () => {

        it('Validar retorno 200 - /api/v1/tabela-padrao', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/tabela-padrao',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(200);

                const body = response.body;
                expect(body).to.have.property('tabelaPadrao').to.include.all.keys(
                    'id',
                    'dataInicio',
                    'dataFim',
                    'nomeTabelaPreco',
                    'valorConsultaInicio',
                    'flgAtivo',
                    'restauradaEm'
                )
                expect(body).to.have.property('unidades').to.be.an('array');
                body.unidades.forEach((item) => {
                    expect(item).to.have.property('id');
                    expect(item).to.have.property('unidade');
                    expect(item).to.have.property('unidadeId');
                    expect(item).to.have.property('tabelaPadraoId');
                    expect(item).to.have.property('tabelaPadrao');
                    expect(item).to.have.property('flgVinculado');
                    expect(item).to.have.property('regiao');
                    expect(item).to.have.property('regiaoId');
                })
                expect(body).to.have.property('excecoes').to.be.an('array');
                expect(body).to.have.property('procedimentos').to.be.an('array');
                body.procedimentos.forEach((item) => {
                    expect(item).to.have.property('id');
                    expect(item).to.have.property('idTabelaPadrao');
                    expect(item).to.have.property('nomeTabela');
                    expect(item).to.have.property('dataInicio');
                    expect(item).to.have.property('dataFim');
                    expect(item).to.have.property('procedimentoId');
                    expect(item).to.have.property('procedimento');
                    expect(item).to.have.property('tipoProcedimentoId');
                    expect(item).to.have.property('tipoProcedimento');
                    expect(item).to.have.property('particularVenda');
                    expect(item).to.have.property('particularCusto');
                    expect(item).to.have.property('parceiroVenda');
                    expect(item).to.have.property('parceiroCusto');
                    expect(item).to.have.property('cdtAVenda');
                    expect(item).to.have.property('cdtAAVenda');
                    expect(item).to.have.property('cdtAAAVenda');
                    expect(item).to.have.property('cdtBVenda');
                    expect(item).to.have.property('cdtCVenda');
                    expect(item).to.have.property('cdtVenda');
                    expect(item).to.have.property('cdtCusto');
                    expect(item).to.have.property('precoPrimeiraConsulta');
                })
            })
        })

        it('Validar retorno 401 - /api/v1/tabela-padrao', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/tabela-padrao',
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

    // Precisa de dados reais do Amei
    describe('Módulo - Tabela Padrão - Vincula uma unidade a uma tabela preço', () => {

        it('Validar retorno 201 - /api/v1/tabela-padrao/link-price-clinic', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/tabela-padrao/link-price-clinic',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: {
                    "tablePriceId": 0,
                    "clinicId": 0
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(200);
            })
        })

        it('Validar retorno 400 - /api/v1/tabela-padrao/link-price-clinic', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/tabela-padrao/link-price-clinic',
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

        it('Validar retorno 401 - /api/v1/tabela-padrao/link-price-clinic', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/tabela-padrao/link-price-clinic',
                headers: {
                    //'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: {
                    "tablePriceId": 0,
                    "clinicId": 0
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(401);
            })
        })
    })

    // Precisa de dados reais do Amei
    describe('Módulo - Tabela Padrão - Cria uma tabela padrão preço', () => {

        it('Validar retorno 201 - /api/v1/tabela-padrao/tb-padrao-preco', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/tabela-padrao/tb-padrao-preco',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: {
                    "tabelaPadraoId": 1,
                    "procedimentoId": 1,
                    "parceiroVenda": "119.99",
                    "parceiroCusto": "79.99",
                    "particularVenda": "129.99",
                    "particularCusto": "99.99",
                    "ipClient": "192.168.1.111",
                    "lastUserId": 1,
                    "unidadeLogadaId": 1
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(201);
            })
        })

        it('Validar retorno 400 - /api/v1/tabela-padrao/tb-padrao-preco', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/tabela-padrao/tb-padrao-preco',
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

        it('Validar retorno 401 - /api/v1/tabela-padrao/tb-padrao-preco', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/tabela-padrao/tb-padrao-preco',
                headers: {
                    //'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: {
                    "tabelaPadraoId": 1,
                    "procedimentoId": 1,
                    "parceiroVenda": "119.99",
                    "parceiroCusto": "79.99",
                    "particularVenda": "129.99",
                    "particularCusto": "99.99",
                    "ipClient": "192.168.1.111",
                    "lastUserId": 1,
                    "unidadeLogadaId": 1
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(401);
            })
        })
    })

    // Precisa de dados reais do Amei
    describe('Módulo - Tabela Padrão - Cria uma exceção na tabela exceções executantes', () => {

        it('Validar retorno 201 - /api/v1/tabela-padrao/exception-exec', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/tabela-padrao/exception-exec',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: {
                    "fkTabelaPadrao": 1,
                    "fkProcedimento": 1,
                    "fkProfissional": 265,
                    "valorCusto": "99,89",
                    "valorPreco": "59,89",
                    "ipClient": "192.168.0.1",
                    "fkLastUser": 1,
                    "fkUnidadeLogadaId": 1
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(201);
            })
        })

        it('Validar retorno 400 - /api/v1/tabela-padrao/exception-exec', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/tabela-padrao/exception-exec',
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

        it('Validar retorno 401 - /api/v1/tabela-padrao/exception-exec', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/tabela-padrao/exception-exec',
                headers: {
                    //'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: {
                    "fkTabelaPadrao": 1,
                    "fkProcedimento": 1,
                    "fkProfissional": 265,
                    "valorCusto": "99,89",
                    "valorPreco": "59,89",
                    "ipClient": "192.168.0.1",
                    "fkLastUser": 1,
                    "fkUnidadeLogadaId": 1
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(401);
            })
        })
    })

    describe('Módulo - Tabela Padrão - Retorna lista de historico da tabela padrão', () => {

        it('Validar retorno 200 - /api/v1/tabela-padrao/history', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/tabela-padrao/history?page=1&limit=10',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(200);
                const body = response.body;

                expect(body).to.have.property('items').to.be.an('array');
                body.items.forEach((item) => {
                    expect(item).to.have.property('id');
                    expect(item).to.have.property('dataInicio');
                    expect(item).to.have.property('dataFim');
                    expect(item).to.have.property('nomeTabelaPreco');
                    expect(item).to.have.property('valorConsultaInicio');
                    expect(item).to.have.property('createdAt');
                    expect(item).to.have.property('updatedAt');
                    expect(item).to.have.property('flgAtivo');
                    expect(item).to.have.property('ipClient');
                    expect(item).to.have.property('createdById');
                    expect(item).to.have.property('lastUser');
                    expect(item).to.have.property('restauradaEm');
                    expect(item).to.have.property('createdBy');
                    expect(item.createdBy).to.have.property('isActive');
                    expect(item.createdBy).to.have.property('fullName');
                })
                expect(body).to.have.property('meta').to.include.all.keys(
                    'totalItems',
                    'currentPage',
                    'itemCount',
                    'itemsPerPage',
                    'totalPages'
                )
            })
        })

        it('Validar retorno 401 - /api/v1/tabela-padrao/history', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/tabela-padrao/history?page=1&limit=10',
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

    // Precisa de dados reais do Amei
    describe('Módulo - Tabela Padrão - Retorna tabela padrão por id', () => {

        it('Validar retorno 200 - /api/v1/tabela-padrao/13', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/tabela-padrao/13',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(200);

                const body = response.body;

                // Estrutura principal
                expect(body).to.have.property('tabelaPadrao').and.to.be.an('object');
                expect(body).to.have.property('unidades').and.to.be.an('array');
                expect(body).to.have.property('excecoes').and.to.be.an('array');
                expect(body).to.have.property('procedimentos').and.to.be.an('array');

                // Valida tabelaPadrao
                const tabela = body.tabelaPadrao;
                expect(tabela).to.include.all.keys(
                    'id',
                    'dataInicio',
                    'dataFim',
                    'nomeTabelaPreco',
                    'valorConsultaInicio',
                    'flgAtivo',
                    'restauradaEm'
                );
                expect(tabela.id).to.be.a('number');
                expect(tabela.nomeTabelaPreco).to.be.a('string');

                // Valida unidades (aqui está vazio, mas testamos tipo)
                expect(body.unidades).to.be.an('array');
                if (body.unidades.length > 0) {
                    body.unidades.forEach((unidade) => {
                        expect(unidade).to.have.property('id');
                        expect(unidade).to.have.property('nome');
                    });
                }

                // Valida excecoes (também vazio, mas estrutura pronta)
                expect(body.excecoes).to.be.an('array');
                if (body.excecoes.length > 0) {
                    body.excecoes.forEach((exc) => {
                        expect(exc).to.have.property('id');
                        expect(exc).to.have.property('descricao');
                    });
                }

                // Valida procedimentos
                expect(body.procedimentos).to.be.an('array').and.not.to.be.empty;
                body.procedimentos.forEach((proc) => {
                    expect(proc).to.include.all.keys(
                        'id',
                        'idTabelaPadrao',
                        'nomeTabela',
                        'dataInicio',
                        'dataFim',
                        'procedimentoId',
                        'procedimento',
                        'tipoProcedimentoId',
                        'tipoProcedimento',
                        'particularVenda',
                        'particularCusto',
                        'parceiroVenda',
                        'parceiroCusto',
                        'cdtAVenda',
                        'cdtAAVenda',
                        'cdtAAAVenda',
                        'cdtBVenda',
                        'cdtCVenda',
                        'cdtVenda',
                        'cdtCusto',
                        'precoPrimeiraConsulta'
                    );

                    expect(proc.idTabelaPadrao).to.eq(tabela.id);
                    expect(proc.nomeTabela).to.eq(tabela.nomeTabelaPreco);
                    expect(proc.tipoProcedimento).to.be.a('string');
                    expect(proc.particularVenda).to.be.a('number');
                })
            })
        })

        it('Validar retorno 400 - /api/v1/tabela-padrao/13', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/tabela-padrao/{id}',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(400);
            })
        })

        it('Validar retorno 401 - /api/v1/tabela-padrao/13', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/tabela-padrao/13',
                headers: {
                    // 'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(401);
            })
        })
    })

    // Precisa de dados reais do Amei
    describe('Módulo - Tabela Padrão - Atualiza uma tabela padrão', () => {

        it('Validar retorno 200 - /api/v1/tabela-padrao/{id}', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'PUT',
                url: '/api/v1/tabela-padrao/{id}',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: {
                    "tabelaPadrao": {
                        "id": 0,
                        "dataInicio": "string",
                        "dataFim": "string",
                        "nomeTabelaPreco": "string",
                        "valorConsultaInicio": 0
                    },
                    "unidades": [
                        {
                            "id": 0,
                            "unidade": "string",
                            "unidadeId": 0,
                            "tabelaPadraoId": 0,
                            "tabelaPadrao": "string",
                            "flgVinculado": 0,
                            "regiao": "string",
                            "regiaoId": 0
                        }
                    ],
                    "excecoes": [
                        {
                            "id": 0,
                            "tabelaPadraoId": 0,
                            "unidadeId": 0,
                            "unidade": "string",
                            "profissionalId": 0,
                            "profissionalTratamento": "string",
                            "profissionalNome": "string",
                            "profissionalSobrenome": "string",
                            "procedimentoId": 0,
                            "procedimento": "string",
                            "valorCusto": "string",
                            "valorVenda": "string"
                        }
                    ],
                    "procedimentos": [
                        {
                            "id": 0,
                            "idTabelaPadrao": 0,
                            "nomeTabela": "string",
                            "dataInicio": "string",
                            "dataFim": "string",
                            "procedimentoId": 0,
                            "procedimento": "string",
                            "tipoProcedimentoId": 0,
                            "tipoProcedimento": "string",
                            "particularVenda": "string",
                            "particularCusto": "string",
                            "parceiroVenda": "string",
                            "parceiroCusto": "string",
                            "cdtAVenda": "string",
                            "cdtAAVenda": "string",
                            "cdtAAAVenda": "string",
                            "cdtBVenda": "string",
                            "cdtCVenda": "string",
                            "cdtVenda": "string",
                            "cdtCusto": "string",
                            "precoPrimeiraConsulta": "string"
                        }
                    ]
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(200);
            })
        })

        it('Validar retorno 400 - /api/v1/tabela-padrao/{id}', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'PUT',
                url: '/api/v1/tabela-padrao/{id}',
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

        it('Validar retorno 401 - /api/v1/tabela-padrao/{id}', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'PUT',
                url: '/api/v1/tabela-padrao/{id}',
                headers: {
                    //'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: {
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(401);
            })
        })
    })

    // Precisa de dados reais do Amei
    describe('Módulo - Tabela Padrão - Retorna uma lista de unidades por tabela padrão', () => {

        it('Validar retorno 200 - /api/v1/tabela-padrao/unidades', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/tabela-padrao/unidades',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(200);
            })
        })

        it('Validar retorno 400 - /api/v1/tabela-padrao/unidades', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/tabela-padrao/unidades',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(400);
            })
        })

        it('Validar retorno 401 - /api/v1/tabela-padrao/unidades', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/tabela-padrao/unidades',
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

    // Precisa de dados reais do Amei
    describe('Módulo - Tabela Padrão - Atualiza uma unidade. Flag vinculada', () => {

        it('Validar retorno 200 - /api/v1/tabela-padrao/unidades', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'PUT',
                url: '/api/v1/tabela-padrao/unidades',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: {
                    "unidades": [
                        {
                            "id": 0,
                            "unidade": "string",
                            "unidadeId": 0,
                            "tabelaPadraoId": 0,
                            "tabelaPadrao": "string",
                            "flgVinculado": 0,
                            "regiao": "string",
                            "regiaoId": 0
                        }
                    ]
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(200);
                expect(response.body).to.have.property('status')
            })
        })

        it('Validar retorno 401 - /api/v1/tabela-padrao/unidades', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'PUT',
                url: '/api/v1/tabela-padrao/unidades',
                headers: {
                    //'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: {
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(401);
            })
        })
    })

    // Precisa de dados reais do Amei
    describe('Módulo - Tabela Padrão - Restaura uma tabela padrão', () => {

        it('Validar retorno 200 - /api/v1/tabela-padrao/{id}/restore', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/tabela-padrao/13/restore',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(200);
            })
        })

        it('Validar retorno 400 - /api/v1/tabela-padrao/{id}/restore', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/tabela-padrao/13/restore',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(400);
            })
        })

        it('Validar retorno 401 - /api/v1/tabela-padrao/{id}/restore', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/tabela-padrao/13/restore',
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

    // Precisa de dados reais do Amei
    describe('Módulo - Tabela Padrão - Retorna tabelas de parceiros afetadas pela mudança de valores', () => {

        it('Validar retorno 200 - /api/v1/tabela-padrao/{id}/affectedPartnersTable', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/tabela-padrao/{id}/affectedPartnersTable',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(200);
            })
        })

         it('Validar retorno 400 - /api/v1/tabela-padrao/{id}/affectedPartnersTable', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/tabela-padrao/{id}/affectedPartnersTable',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(400);
            })
        })

         it('Validar retorno 401 - /api/v1/tabela-padrao/{id}/affectedPartnersTable', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/tabela-padrao/{id}/affectedPartnersTable',
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

    // Precisa de dados reais do Amei
    describe('Módulo - Tabela Padrão - Get CSV File', () => {

        it('Validar retorno 200 - /api/v1/tabela-padrao/get-csv-file', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/tabela-padrao/get-csv-file',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(200);
            })
        })

        it('Validar retorno 400 - /api/v1/tabela-padrao/get-csv-file', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/tabela-padrao/get-csv-file',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(400);
            })
        })

        it('Validar retorno 401 - /api/v1/tabela-padrao/get-csv-file', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/tabela-padrao/get-csv-file',
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

    describe('Módulo - Tabela Padrão - CSV Download', () => {
        
       it('Validar retorno 200 - /api/v1/tabela-padrao/csv/download', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/tabela-padrao/csv/download',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(200);
                cy.log(JSON.stringify(response.body));
            })
        })

        it('Validar retorno 401 - /api/v1/tabela-padrao/csv/download', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/tabela-padrao/csv/download',
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