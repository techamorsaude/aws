/// <reference types="cypress"/>

describe('Módulo - Fornecedores', () => {
    beforeEach(() => {
        cy.login();
        cy.refreshToken();
    })

    //GET - FINALIZADO
    describe('Módulo - Fornecedores - Retorna os executantes (fornecedores e profissionais relacionados)', () => {

        it('Validar retorno 200 - /api/v1/fornecedores/executantes', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/fornecedores/executantes?parceiroId=42&procedimentoId=20715&unidadeId=483',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(200);

                const body = response.body;
                expect(body).to.have.property('items').to.be.an('array')
                body.items.forEach((item) => {
                    expect(item).to.have.property('id');
                    expect(item).to.have.property('nomeFantasia');

                    expect(item).to.have.property('fornecedorUnidades').to.be.an('array');
                    item.fornecedorUnidades.forEach((unidade) => {
                        expect(unidade).to.have.property('flgPagamentoParcial')
                    })

                    expect(item).to.have.property('fornecedorProcedimentos').to.be.an('array');
                    item.fornecedorProcedimentos.forEach((procedimento) => {
                        expect(procedimento).to.have.property('procedimentoId');
                        expect(procedimento).to.have.property('fornecedorUnidadeId');
                        expect(procedimento).to.have.property('valorCusto');
                        expect(procedimento).to.have.property('valorVenda');
                    })
                })
            })
        })

        it('Validar retorno 400 - /api/v1/fornecedores/executantes', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/fornecedores/executantes', // Sem parâmetro
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(400);
            })
        })

        it('Validar retorno 401 - /api/v1/fornecedores/executantes', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/fornecedores/executantes?parceiroId=42&procedimentoId=20715&unidadeId=483',
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

    //GET - FINALIZADO
    describe('Módulo - Fornecedores - Retorna os executantes (fornecedores e profissionais relacionados)', () => {

        it('Validar retorno 200 - /api/v1/fornecedores/procedures-executants', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/fornecedores/procedures-executants?partnerId=42&proceduresIds=20715&proceduresIds=20715&unitId=483',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(200)

                const body = response.body;
                expect(body).to.have.property('items').to.be.an('array');
                body.items.forEach((item) => {
                    expect(item).to.have.property('id');
                    expect(item).to.have.property('nome');

                    expect(item).to.have.property('fornecedor').to.be.an('array');
                    item.fornecedor.forEach((fornecedor) => {
                        expect(fornecedor).to.have.property('id');
                        expect(fornecedor).to.have.property('nomeFantasia');

                        // Valida fornecedorUnidades dentro do fornecedor
                        expect(fornecedor).to.have.property('fornecedorUnidades').to.be.an('array');
                        fornecedor.fornecedorUnidades.forEach((unidades) => {
                            expect(unidades).to.have.property('flgPagamentoParcial')
                        })

                        expect(fornecedor).to.have.property('fornecedorProcedimentos').to.be.an('array');
                        fornecedor.fornecedorProcedimentos.forEach((procedimento) => {
                            expect(procedimento).to.have.property('fornecedorUnidadeId');
                            expect(procedimento).to.have.property('procedimentoId');
                            expect(procedimento).to.have.property('valorCusto');
                            expect(procedimento).to.have.property('valorVenda');
                        })
                    })
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

        it('Validar retorno 400 - /api/v1/fornecedores/procedures-executants', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/fornecedores/procedures-executants', // Sem parâmetros
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(400)
            })
        })

        it('Validar retorno 401 - /api/v1/fornecedores/procedures-executants', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/fornecedores/procedures-executants?partnerId=42&proceduresIds=20715&proceduresIds=20715&unitId=483',
                headers: {
                    //'Authorization': `Bearer ${token}`, Token inválido
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(401)
            })
        })
    })

    //GET - FINALIZADO
    describe('Módulo - Fornecedores - Retorna uma lista de tipos de fornecedor', () => {

        it('Validar retorno 200 - /api/v1/fornecedores/tipos', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/fornecedores/tipos',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(200);

                expect(response.body).to.be.an('array')
                response.body.forEach((item) => {
                    expect(item).to.have.property('id');
                    expect(item).to.have.property('tipoPrestador');
                })

                cy.log(JSON.stringify(response.body));
            })
        })

        it('Validar retorno 401 - /api/v1/fornecedores/tipos', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/fornecedores/tipos',
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

    //GET - FINALIZADO
    describe('Módulo - Fornecedores - Retorna uma agente e senha do vinculo do laboratoio', () => {

        it('Validar retorno 200 - /api/v1/fornecedores/agente-entidade', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/fornecedores/agente-entidade?regiaoId=22&unidadeId=483&fornecedorId=292',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(200)

                expect(response.body).to.be.an('array');
                response.body.forEach((item) => {
                    expect(item).to.have.property('idAgente');
                    expect(item).to.have.property('password');
                    expect(item).to.have.property('statusIntegracao');
                    expect(item).to.have.property('prazoLogistica');
                })
            })
        })

        it('Validar retorno 400 - /api/v1/fornecedores/agente-entidade', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'DELETE', // Método divergente
                url: '/api/v1/fornecedores/agente-entidade',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(400)
            })
        })

        it('Validar retorno 401 - /api/v1/fornecedores/agente-entidade', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/fornecedores/agente-entidade',
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

    // POST - FINALIZADO
    describe('Módulo - Fornecedores - Vincular um fornecedor a uma cidade', () => {

        it('Validar retorno 201 - /api/v1/fornecedores/vincular-unidade-fornecedor', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/fornecedores/vincular-unidade-fornecedor',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: [
                    {
                        "unidadeId": 483,
                        "fornecedorId": 296

                    }
                ],
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(201)

                expect(response.body).to.have.property('codigo');
                expect(response.body).to.have.property('flagDeError');
                expect(response.body).to.have.property('mensagem');
            })
        })

        it('Validar retorno 400 - /api/v1/fornecedores/vincular-unidade-fornecedor', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/fornecedores/vincular-unidade-fornecedor',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: [ //Sem parâmetro
                ],
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(400)
            })
        })

        it('Validar retorno 401 - /api/v1/fornecedores/vincular-unidade-fornecedor', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/fornecedores/vincular-unidade-fornecedor',
                headers: {
                    //'Authorization': `Bearer ${token}`, Token inválido
                    'Content-Type': 'application/json'
                },
                body: [
                    {
                        "unidadeId": 483,
                        "fornecedorId": 296

                    }
                ],
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(401)
            })
        })
    })

    // POST - FINALIZADO
    describe('Módulo - Fornecedores - update agente e senha', () => {

        it('Validar retorno 201 - /api/v1/fornecedores/update-agente-password', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/fornecedores/update-agente-password',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: [
                    {
                        "unidadeId": 483,
                        "fornecedorId": 296

                    }
                ],
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(201)
                expect(response.body).to.have.property('codigo');
                expect(response.body).to.have.property('flagDeError');
                expect(response.body).to.have.property('mensagem');
            })
        })

        it('Validar retorno 401 - /api/v1/fornecedores/update-agente-password', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/fornecedores/update-agente-password',
                headers: {
                    //'Authorization': `Bearer ${token}`, Token inválido
                    'Content-Type': 'application/json'
                },
                body: [
                    {
                        "unidadeId": 483,
                        "fornecedorId": 296

                    }
                ],
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(401)
            })
        })
    })

    // POST - FINALIZADO
    describe('Módulo - Fornecedores - Atualizar unidades vinculadas a um fornecedor', () => {

        it('Validar retorno 201 - /api/v1/fornecedores/atualizar-unidades-fornecedor', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/fornecedores/atualizar-unidades-fornecedor',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: {
                    "providerId": 402,
                    "unitsToAdd": [
                        {
                            "unidadeId": 503,
                            "fornecedorId": 402,
                            "flgPagamentoParcial": 0
                        }
                    ],
                    "unitsToRemove": []
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(500);
                /*expect(response.body).to.have.property('codigo');
                expect(response.body).to.have.property('flagDeError');
                expect(response.body).to.have.property('mensagem');*/
            })
        })

        it('Validar retorno 400 - /api/v1/fornecedores/atualizar-unidades-fornecedor', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/fornecedores/atualizar-unidades-fornecedor',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: { // Sem parâmetro no body
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(400)
            })
        })

        it('Validar retorno 401 - /api/v1/fornecedores/atualizar-unidades-fornecedor', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/fornecedores/atualizar-unidades-fornecedor',
                headers: {
                    //'Authorization': `Bearer ${token}`, Token inválido
                    'Content-Type': 'application/json'
                },
                body: {
                    "providerId": 402,
                    "unitsToAdd": [
                        {
                            "unidadeId": 503,
                            "fornecedorId": 402,
                            "flgPagamentoParcial": 0
                        }
                    ],
                    "unitsToRemove": []
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(401)
            })
        })
    })

    // POST - FINALIZADO
    describe('Módulo - Fornecedores - Desvincular um fornecedor a uma unidade', () => {
/*
        Rota que esta sendo utilizada para desvincular um fornecedor a uma unidade
        /api/v1/fornecedores/atualizar-unidades-fornecedor
        it.only('Validar retorno 201 - /api/v1/fornecedores/desvincular-unidade-fornecedor', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/fornecedores/desvincular-unidade-fornecedor',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: [
                    {
                        "unitiesId": [483, 483],
                        "providerId": 292

                    }
                ],
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(201)
                expect(response.body).to.have.property('message');
                expect(response.body).to.have.property('error')
                expect(response.body).to.have.property('statusCode')
            })
        })
*/
        it('Validar retorno 400 - /api/v1/fornecedores/desvincular-unidade-fornecedor', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/fornecedores/desvincular-unidade-fornecedor',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: [ // Sem parâmetro no body
                ],
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(400)
            })
        })

        it('Validar retorno 401 - /api/v1/fornecedores/desvincular-unidade-fornecedor', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/fornecedores/desvincular-unidade-fornecedor',
                headers: {
                    //'Authorization': `Bearer ${token}`, Token inválido
                    'Content-Type': 'application/json'
                },
                body: [
                    {
                        "unitiesId": [483, 483],
                        "providerId": 292

                    }
                ],
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(401)
            })
        })
    })

    // GET - FINALIZADO
    describe('Módulo - Fornecedores - Retorna uma lista de unidades vinculadas ao fornecedor', () => {

        it('Validar retorno 200 - /api/v1/fornecedores/unidades-vinculadas/{id}', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/fornecedores/unidades-vinculadas/454',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(200);

                const body = response.body;
                body.forEach((items) => {
                    expect(items).to.have.property('id');
                    expect(items).to.have.property('unidadeId');
                    expect(items).to.have.property('fornecedorId');
                    expect(items).to.have.property('tipoFornecedor');
                    expect(items).to.have.property('unidade');
                    expect(items).to.have.property('regiaoId');
                    expect(items).to.have.property('regiao');
                    expect(items).to.have.property('statusIntegracao');
                    expect(items).to.have.property('flgPagamentoParcial');
                })
            })
        })

        it('Validar retorno 400 - /api/v1/fornecedores/unidades-vinculadas/{id}', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/fornecedores/unidades-vinculadas/{id}', // Sem parâmetro
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(400);
            })
        })

        it('Validar retorno 401 - /api/v1/fornecedores/unidades-vinculadas/{id}', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/fornecedores/unidades-vinculadas/454',
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

    // POST - FINALIZADO
    describe('Módulo - Fornecedores - Cria um fornecedor', () => {

        it('Validar retorno 201 - /api/v1/fornecedores', () => {
            const token = Cypress.env('access_token');

            // Chama o comando customizado que gera CPF
            cy.gerarCpfValido().then((cpfGerado) => {
                cy.log('CPF gerado', cpfGerado)

                cy.request({
                    method: 'POST',
                    url: '/api/v1/fornecedores',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    },
                    body: {
                        "ativo": true,
                        "cnpj": cpfGerado, // CPF dinâmico aqui
                        "inscricaoEstadual": "",
                        "inscricaoMunicipal": "",
                        "nomeFantasia": "Teste API QA",
                        "razaoSocial": "Teste",
                        "tipoPrestadorId": 1,
                        "integracaoId": null,
                        "observacao": "",
                        "bairro": "Jardim América",
                        "complemento": "",
                        "numero": "10",
                        "endereco": "Rua Altino Arantes",
                        "municipio": "Ribeirão Preto",
                        "uf": "SP",
                        "cep": "14020-200",
                        "email": "xixit58271@fogdiver.com",
                        "emailAlternativo": "",
                        "celular": "22222222222",
                        "telefone": "11111111111",
                        "municipioId": 0
                    },
                    failOnStatusCode: false
                }).then((response) => {
                    expect(response.status).to.eq(201)

                    const body = response.body;
                    const idFornecedor = response.body.id

                    expect(body).to.have.property('id');
                    expect(body).to.have.property('fkMunicipio');
                    expect(body).to.have.property('razaoSocial');
                    expect(body).to.have.property('nomeFantasia');
                    expect(body).to.have.property('cnpj');
                    expect(body).to.have.property('inscricaoEstadual');
                    expect(body).to.have.property('cep');
                    expect(body).to.have.property('endereco');
                    expect(body).to.have.property('numero');
                    expect(body).to.have.property('complemento');
                    expect(body).to.have.property('bairro');
                    expect(body).to.have.property('email');
                    expect(body).to.have.property('telefone');
                    expect(body).to.have.property('inscricaoMunicipal');
                    expect(body).to.have.property('celular');
                    expect(body).to.have.property('ipClient');
                    expect(body).to.have.property('createdAt');
                    expect(body).to.have.property('updatedAt');
                    expect(body).to.have.property('flagAtivo');
                    expect(body).to.have.property('flagStatus');
                    expect(body).to.have.property('codigoInterno');
                    expect(body).to.have.property('emailAlternativo');
                    expect(body).to.have.property('sellerId');
                    expect(body).to.have.property('flgSplit');
                    expect(body).to.have.property('integracaoId');

                    //Salva o id do Fornecedor
                    Cypress.env('idFornecedor', idFornecedor)
                    cy.log('Id Fornecedor:', idFornecedor)
                })
            })
        })

        it('Validar retorno 400 - /api/v1/fornecedores', () => {
            const token = Cypress.env('access_token');

            // Chama o comando customizado que gera CPF
            cy.gerarCpfValido().then((cpfGerado) => {
                cy.log('CPF gerado', cpfGerado)

                cy.request({
                    method: 'POST',
                    url: '/api/v1/fornecedores',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    },
                    body: {
                        // Sem parâmetro no body
                    },
                    failOnStatusCode: false
                }).then((response) => {
                    expect(response.status).to.eq(400)
                })
            })
        })

        it('Validar retorno 401 - /api/v1/fornecedores', () => {
            const token = Cypress.env('access_token');

            // Chama o comando customizado que gera CPF
            cy.gerarCpfValido().then((cpfGerado) => {
                cy.log('CPF gerado', cpfGerado)

                cy.request({
                    method: 'POST',
                    url: '/api/v1/fornecedores',
                    headers: {
                        //'Authorization': `Bearer ${token}`, Token inválido
                        'Content-Type': 'application/json'
                    },
                    body: {
                        "ativo": true,
                        "cnpj": cpfGerado, // CPF dinâmico aqui
                        "inscricaoEstadual": "",
                        "inscricaoMunicipal": "",
                        "nomeFantasia": "Teste API QA",
                        "razaoSocial": "Teste",
                        "tipoPrestadorId": 1,
                        "integracaoId": null,
                        "observacao": "",
                        "bairro": "Jardim América",
                        "complemento": "",
                        "numero": "10",
                        "endereco": "Rua Altino Arantes",
                        "municipio": "Ribeirão Preto",
                        "uf": "SP",
                        "cep": "14020-200",
                        "email": "xixit58271@fogdiver.com",
                        "emailAlternativo": "",
                        "celular": "22222222222",
                        "telefone": "11111111111",
                        "municipioId": 0
                    },
                    failOnStatusCode: false
                }).then((response) => {
                    expect(response.status).to.eq(401)
                })
            })
        })
    })

    //GET - FINALIZADO
    describe('Módulo - Fornecedores - Retorna uma lista de fornecedores', () => {

        it('Validar retorno 200 - /api/v1/fornecedores', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/fornecedores',
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
                    expect(item).to.have.property('razaoSocial');
                    expect(item).to.have.property('nomeFantasia');
                    expect(item).to.have.property('cnpj');
                    expect(item).to.have.property('id');
                    expect(item).to.have.property('inscricaoEstadual');
                    expect(item).to.have.property('inscricaoMunicipal');
                    expect(item).to.have.property('cep');
                    expect(item).to.have.property('endereco');
                    expect(item).to.have.property('numero');
                    //expect(item).to.have.property('complemento');
                    expect(item).to.have.property('bairro');
                    expect(item).to.have.property('municipioId');
                    expect(item).to.have.property('municipio');
                    expect(item).to.have.property('uf');
                    expect(item).to.have.property('email');
                    //expect(item).to.have.property('emailAlternativo');
                    expect(item).to.have.property('telefone');
                    expect(item).to.have.property('celular');
                    //expect(item).to.have.property('flagRecebeParcial');
                    //expect(item).to.have.property('observacao');
                    expect(item).to.have.property('ativo');
                    //expect(item).to.have.property('tipoPrestadorId');
                    //expect(item).to.have.property('tipoPrestador');
                    //expect(item).to.have.property('criadoEm');
                    //expect(item).to.have.property('integracaoId');
                })

                expect(body).to.have.property('meta').to.include.all.keys(
                    'totalItems',
                    'itemCount',
                    'itemsPerPage',
                    'totalPages',
                    'currentPage'
                )
            })
        })

        it('Validar retorno 400 - /api/v1/fornecedores', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST', // Método divergente
                url: '/api/v1/fornecedores',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(400);
            })
        })

        it('Validar retorno 401 - /api/v1/fornecedores', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/fornecedores',
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

    //GET - FINALIZADO
    describe('Módulo - Fornecedores - Retorna uma lista de fornecedores sem pagina ate com referencia a procedimentos', () => {

        it('Validar retorno 200 - /api/v1/fornecedores/laboratorio', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/fornecedores/laboratorio',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(200);
                cy.log(JSON.stringify(response.body));

               /* const body = response.body;
                body.forEach((item) => {
                    expect(item).to.have.property('razaoSocial');
                    expect(item).to.have.property('nomeFantasia');
                    expect(item).to.have.property('cnpj');
                    expect(item).to.have.property('id');
                    expect(item).to.have.property('inscricaoEstadual');
                    expect(item).to.have.property('inscricaoMunicipal');
                    expect(item).to.have.property('cep');
                    expect(item).to.have.property('endereco');
                    expect(item).to.have.property('numero');
                    //expect(item).to.have.property('complemento');
                    expect(item).to.have.property('bairro');
                    expect(item).to.have.property('municipioId');
                    expect(item).to.have.property('municipio');
                    expect(item).to.have.property('uf');
                    expect(item).to.have.property('email');
                    //expect(item).to.have.property('emailAlternativo');
                    expect(item).to.have.property('telefone');
                    expect(item).to.have.property('celular');
                    //expect(item).to.have.property('flagRecebeParcial');
                    //expect(item).to.have.property('observacao');
                    expect(item).to.have.property('ativo');
                    //expect(item).to.have.property('tipoPrestadorId');
                    //expect(item).to.have.property('tipoPrestador');
                    //expect(item).to.have.property('criadoEm');
                    //expect(item).to.have.property('integracaoId');
                })*/
            })
        })

        it('Validar retorno 400 - /api/v1/fornecedores/laboratorio', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'DELETE', //Método divergente
                url: '/api/v1/fornecedores/laboratorio',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(400);
            })
        })

        it('Validar retorno 401 - /api/v1/fornecedores/laboratorio', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/fornecedores/laboratorio',
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

    //GET
    describe('Módulo - Fornecedores - Retorna uma lista de fornecedores e pelo id dos procedimentos', () => {
        
/* // Sem possibilidade de inserir parâmetro no Swagger
        it('Validar retorno 200 - /api/v1/fornecedores/list-dados-laboratorio-exame', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/fornecedores/list-dados-laboratorio-exame?id=5193',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(200)
                const body = response.body;

                expect(body).to.have.property('id');
                expect(body).to.have.property('fornecedorId');
                expect(body).to.have.property('procedimentoId');
                expect(body).to.have.property('fornecedorUnidadeId');
                expect(body).to.have.property('valorCusto');
                expect(body).to.have.property('primeiraConsultaCusto');
                expect(body).to.have.property('precoPrimeiraConsulta');
                expect(body).to.have.property('valorVenda');
                expect(body).to.have.property('flagAtivo');
                expect(body).to.have.property('createBy');
                expect(body).to.have.property('createAt');
                expect(body).to.have.property('updateAt');
                expect(body).to.have.property('lastUser');
                expect(body).to.have.property('ipClient');
                expect(body).to.have.property('mneumonico');
                expect(body).to.have.property('procedimentoLaboratorio');
                expect(body).to.have.property('material');
                expect(body).to.have.property('meioColeta');
                expect(body).to.have.property('metodo');
                expect(body).to.have.property('prazo');
                expect(body).to.have.property('prazoDias');
                expect(body).to.have.property('flgVolume');
                expect(body).to.have.property('flgAltura');
                expect(body).to.have.property('flgRegiao');
                expect(body).to.have.property('flgPeso');
                expect(body).to.have.property('flgTipoMaterial');
                expect(body).to.have.property('instrucaoPreparo');
                expect(body).to.have.property('instrucaoColeta');
                expect(body).to.have.property('parceiroId');
                expect(body).to.have.property('mnemonicoMaterial');
                expect(body).to.have.property('flagMultiplasAmostras');
            })
        })
*/
        it('Validar retorno 400 - /api/v1/fornecedores/list-dados-laboratorio-exame', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/fornecedores/list-dados-laboratorio-exame', // Sem parâmetro
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(400)
            })
        })

        it('Validar retorno 401 - /api/v1/fornecedores/list-dados-laboratorio-exame', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/fornecedores/list-dados-laboratorio-exame',
                headers: {
                    //'Authorization': `Bearer ${token}`, Token inválido
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(401)
            })
        })
    })

    //GET - FINALIZADO
    describe('Módulo - Fornecedores - Retorna uma lista de fornecedores por id do procedimento', () => {

        it('Validar retorno 200 - /api/v1/fornecedores/by-procedimento', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/fornecedores/by-procedimento?procedimentoId=20715&pricingId=3',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(200)

                cy.log('Response Body da API', JSON.stringify(response.body))
            })
        })

        it('Validar retorno 401 - /api/v1/fornecedores/by-procedimento', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/fornecedores/by-procedimento',
                headers: {
                    //'Authorization': `Bearer ${token}`, Token inválido
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(401)
            })
        })
    })

    //GET - FINALIZADO
    describe('Módulo - Fornecedores - Retorna um fornecedor com base no CNPJ buscado', () => {

        it('Validar retorno 200 - /api/v1/fornecedores/search/{cnpj}', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/fornecedores/search/30661945000115',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(200)

                const item = response.body;
                expect(item).to.have.property('createAt');
                expect(item).to.have.property('flgExecutante');
                expect(item).to.have.property('id');
                expect(item).to.have.property('razaoSocial');
                expect(item).to.have.property('nomeFantasia');
                expect(item).to.have.property('cnpj');
                expect(item).to.have.property('inscricaoEstadual');
                expect(item).to.have.property('inscricaoMunicipal');
                expect(item).to.have.property('cep');
                expect(item).to.have.property('endereco');
                expect(item).to.have.property('numero');
                expect(item).to.have.property('complmento');
                expect(item).to.have.property('bairro');
                expect(item).to.have.property('municipioId');
                expect(item).to.have.property('municipio');
                expect(item).to.have.property('ufId');
                expect(item).to.have.property('uf');
                expect(item).to.have.property('email');
                expect(item).to.have.property('telefone');
                expect(item).to.have.property('celular');
                expect(item).to.have.property('flgRecebeParcial');
                expect(item).to.have.property('obervacao');
                expect(item).to.have.property('ativo');
                expect(item).to.have.property('tipoFornecedorId');
                expect(item).to.have.property('tipoFornecedor');
                expect(item).to.have.property('condigoInterno');
                expect(item).to.have.property('criadoPor');
                expect(item).to.have.property('integracao');
            })
        })

        it('Validar retorno 401 - /api/v1/fornecedores/search/{cnpj}', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/fornecedores/search/{cnpj}',
                headers: {
                    //'Authorization': `Bearer ${token}`, token inválido
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(401)
            })
        })
    })

    //PUT - FINALIZADO
    describe('Módulo - Fornecedores - Atualiza um fornecedor', () => {

        it('Validar retorno 200 - /api/v1/fornecedores/{id}', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'PUT',
                url: '/api/v1/fornecedores/296',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: {
                    "ativo": 1,
                    "cnpj": "04517780309",
                    "inscricaoEstadual": "",
                    "inscricaoMunicipal": "",
                    "nomeFantasia": "Ágata Stanisci",
                    "razaoSocial": "Ágata Stanisci",
                    "tipoPrestadorId": 1,
                    "integracaoId": null,
                    "observacao": "",
                    "bairro": "Boa Vista",
                    "complemento": "",
                    "numero": 1111,
                    "endereco": "Avenida João de Barros",
                    "municipio": "Recife",
                    "uf": "PE",
                    "cep": "50050-902",
                    "email": "agathastanisci@gmail.com",
                    "emailAlternativo": "",
                    "celular": "",
                    "telefone": "(81) 98286-4202",
                    "municipioId": 0
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(200);

                const item = response.body;
                expect(item).to.have.property('createAt');
                expect(item).to.have.property('flgExecutante');
                expect(item).to.have.property('id');
                expect(item).to.have.property('razaoSocial');
                expect(item).to.have.property('nomeFantasia');
                expect(item).to.have.property('cnpj');
                expect(item).to.have.property('inscricaoEstadual');
                expect(item).to.have.property('inscricaoMunicipal');
                expect(item).to.have.property('cep');
                expect(item).to.have.property('endereco');
                expect(item).to.have.property('numero');
                expect(item).to.have.property('complmento');
                expect(item).to.have.property('bairro');
                expect(item).to.have.property('municipioId');
                expect(item).to.have.property('municipio');
                expect(item).to.have.property('ufId');
                expect(item).to.have.property('uf');
                expect(item).to.have.property('email');
                expect(item).to.have.property('telefone');
                expect(item).to.have.property('celular');
                expect(item).to.have.property('flgRecebeParcial');
                expect(item).to.have.property('obervacao');
                expect(item).to.have.property('ativo');
                expect(item).to.have.property('tipoFornecedorId');
                expect(item).to.have.property('tipoFornecedor');
                expect(item).to.have.property('condigoInterno');
                expect(item).to.have.property('criadoPor');
                expect(item).to.have.property('integracao');
            })
        })

        it('Validar retorno 400 - /api/v1/fornecedores/{id}', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'PUT',
                url: '/api/v1/fornecedores/296',
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

        it('Validar retorno 401 - /api/v1/fornecedores/{id}', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'PUT',
                url: '/api/v1/fornecedores/296',
                headers: {
                    //'Authorization': `Bearer ${token}`, Token inválido
                    'Content-Type': 'application/json'
                },
                body: {
                    "ativo": 1,
                    "cnpj": "04517780309",
                    "inscricaoEstadual": "",
                    "inscricaoMunicipal": "",
                    "nomeFantasia": "Ágata Stanisci",
                    "razaoSocial": "Ágata Stanisci",
                    "tipoPrestadorId": 1,
                    "integracaoId": null,
                    "observacao": "",
                    "bairro": "Boa Vista",
                    "complemento": "",
                    "numero": 1111,
                    "endereco": "Avenida João de Barros",
                    "municipio": "Recife",
                    "uf": "PE",
                    "cep": "50050-902",
                    "email": "agathastanisci@gmail.com",
                    "emailAlternativo": "",
                    "celular": "",
                    "telefone": "(81) 98286-4202",
                    "municipioId": 0
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(401);
            })
        })
    })

    //DELETE - FINALIZADO
    describe('Módulo - Fornecedores - Exclui um fornecedor', () => {

        it('Validar retorno 200 - /api/v1/fornecedores/{id}', () => {
            const token = Cypress.env('access_token');
            const idFornecedor = Cypress.env('idFornecedor') // Reutiliza o ID

            cy.request({
                method: 'DELETE',
                url: `/api/v1/fornecedores/${idFornecedor}`,
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(200)
                cy.log('Response retornando vazio', JSON.stringify(response.body))
            })
        })

        it('Validar retorno 400 - /api/v1/fornecedores/{id}', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'DELETE',
                url: '/api/v1/fornecedores/{id}',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(400)
            })
        })

        it('Validar retorno 401 - /api/v1/fornecedores/{id}', () => {
            const token = Cypress.env('access_token');
            const idFornecedor = Cypress.env('idFornecedor') // Reutiliza o ID

            cy.request({
                method: 'DELETE',
                url: `/api/v1/fornecedores/${idFornecedor}`,
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

    //GET  - FINALIZADO
    describe('Módulo - Fornecedores - Retorna um fornecedor por id', () => {

        it('Validar retorno 200 - /api/v1/fornecedores/{id}', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/fornecedores/296',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(200);

                const item = response.body;
                expect(item).to.have.property('createAt');
                expect(item).to.have.property('flgExecutante');
                expect(item).to.have.property('id');
                expect(item).to.have.property('razaoSocial');
                expect(item).to.have.property('nomeFantasia');
                expect(item).to.have.property('cnpj');
                expect(item).to.have.property('inscricaoEstadual');
                expect(item).to.have.property('inscricaoMunicipal');
                expect(item).to.have.property('cep');
                expect(item).to.have.property('endereco');
                expect(item).to.have.property('numero');
                expect(item).to.have.property('complmento');
                expect(item).to.have.property('bairro');
                expect(item).to.have.property('municipioId');
                expect(item).to.have.property('municipio');
                expect(item).to.have.property('ufId');
                expect(item).to.have.property('uf');
                expect(item).to.have.property('email');
                expect(item).to.have.property('telefone');
                expect(item).to.have.property('celular');
                expect(item).to.have.property('flgRecebeParcial');
                expect(item).to.have.property('obervacao');
                expect(item).to.have.property('ativo');
                expect(item).to.have.property('tipoFornecedorId');
                expect(item).to.have.property('tipoFornecedor');
                expect(item).to.have.property('condigoInterno');
                expect(item).to.have.property('criadoPor');
                expect(item).to.have.property('integracao');
            })
        })

        it('Validar retorno 401 - /api/v1/fornecedores/{id}', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/fornecedores/296',
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

    //GET - FINALIZADO
    describe('Módulo - Fornecedores - Retorna uma lista de fornecedores e procedimentos com preços vinculados', () => {

        it('Validar retorno 200 - /api/v1/fornecedores/list/fornecedor-price/procedimento', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/fornecedores/list/fornecedor-price/procedimento?page=1&perPage=10&idFornecedor=296&nameProcedimento=Consulta%20Cl%C3%ADnica%20M%C3%A9dica',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(200)
                expect(response.body).to.have.property('meta').to.include.all.keys(
                    'page',
                    'perPage',
                    'total'
                )
                expect(response.body).to.have.property('data').to.be.an('array')
            })
        })

        it('Validar retorno 400 - /api/v1/fornecedores/list/fornecedor-price/procedimento', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/fornecedores/list/fornecedor-price/procedimento', //sem parâmetro
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(400)
            })
        })

        it('Validar retorno 401 - /api/v1/fornecedores/list/fornecedor-price/procedimento', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/fornecedores/list/fornecedor-price/procedimento?page=1&perPage=10&idFornecedor=296&nameProcedimento=Consulta%20Cl%C3%ADnica%20M%C3%A9dica',
                headers: {
                    //'Authorization': `Bearer ${token}`, Token inválido
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(401)
            })
        })
    })

    //GET - FINALIZADO
    describe('Módulo - Fornecedores - Retorna uma lista de fornecedores e pelo id dos procedimentos', () => {

        it('Validar retorno 200 - /api/v1/fornecedores/list/fornecedor-by-procedimento', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/fornecedores/list/fornecedor-by-procedimento?page=1&limit=10&procedimentoId=20356&procedimentoId=20357&fornecedorId=296',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(200)

                const body = response.body;
                expect(body).to.have.property('items').to.be.an('array')
                body.items.forEach((item) => {
                    expect(item).to.have.property('id');
                    expect(item).to.have.property('valorCusto');
                    expect(item).to.have.property('valorVenda');
                    expect(item).to.have.property('fornecedor');
                    expect(item.fornecedor).to.have.property('id');
                    expect(item.fornecedor).to.have.property('nomeFantasia');
                    expect(item).to.have.property('procedimento');
                    expect(item.procedimento).to.have.property('id');
                    expect(item.procedimento).to.have.property('nome');
                    expect(item.procedimento).to.have.property('sinonimos');
                })
                expect(response.body).to.have.property('meta').to.include.all.keys(
                    'totalItems',
                    'currentPage',
                    'itemCount',
                    'itemsPerPage',
                    'totalPages'
                )
            })
        })

        it('Validar retorno 400 - /api/v1/fornecedores/list/fornecedor-by-procedimento', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/fornecedores/list/fornecedor-by-procedimento', // sem parâmetro
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(400)
            })
        })

        it('Validar retorno 401 - /api/v1/fornecedores/list/fornecedor-by-procedimento', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/fornecedores/list/fornecedor-by-procedimento?page=1&limit=10&procedimentoId=20356&procedimentoId=20357&fornecedorId=296',
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
    //POST - FINALIZADO    
    // SELECT * FROM FORNECEDOR_UNIDADES fu WHERE fu.FK_FORNECEDOR = '296'
    // Necessário pegar o ID na tabela FORNECEDOR_UNIDADES
    describe('Módulo - Fornecedores - Cria um fornecedor e procedimento com preço', () => {

        it('Validar retorno 201 - /api/v1/fornecedores/add/fornecedor-price/procedimento', () => {
            const token = Cypress.env('access_token');
            const fornecedor_UnidadeID = [
                1723, 1724, 1725, 1726, 1727, 1728, 1729, 1730, 1731, 1732, 1733, 1734,
                1735, 1736, 1737, 1738, 1739, 1740, 1741, 1742, 1743, 1744, 1745, 1746,
                1747, 1748, 1749, 1750, 1751, 1752, 1753, 1754, 1755, 1756, 1757, 1758,
                1759, 1760, 1761, 1762, 1763, 1764, 1765, 1766, 1767, 1768, 1769, 1770,
                1771, 1772, 1773, 1774, 1775, 1776, 1777, 1778, 1779, 1780, 1781, 1782,
                1783, 1784, 1785, 1786, 1787, 1788, 1789, 1790, 1791, 1792, 1793, 1794,
                1795, 1796, 1797, 1798, 1799, 1800, 1801, 1802, 1803, 1804, 1805, 1806,
                1807, 1808, 1809, 1810, 1811, 1812, 1813, 1814, 1815, 1816, 1817, 1818,
                1819, 1820, 1821, 1822, 1823, 1824, 1825, 1826, 1827, 1828, 1829, 1830,
                1831, 1832];

            // Seleciona um ID aleatório do array
            const idAleatorio = fornecedor_UnidadeID[
                Math.floor(Math.random() * fornecedor_UnidadeID.length)
            ];

            cy.request({
                method: 'POST',
                url: '/api/v1/fornecedores/add/fornecedor-price/procedimento',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: {
                    vfornecedor_unidade_id: idAleatorio,
                    vprocedimento_id: 20357,
                    vfornecedor_id: 296
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(201)
                expect(response.body).to.have.property('flagDeError');
                expect(response.body).to.have.property('codigo');
                expect(response.body).to.have.property('mensagem');
            })
        })

        it('Validar retorno 400 - /api/v1/fornecedores/add/fornecedor-price/procedimento', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/fornecedores/add/fornecedor-price/procedimento',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: {  //sem parâmetro no body
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(400)
            })
        })

        it('Validar retorno 401 - /api/v1/fornecedores/add/fornecedor-price/procedimento', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/fornecedores/add/fornecedor-price/procedimento',
                headers: {
                    //'Authorization': `Bearer ${token}`, Token inválido
                    'Content-Type': 'application/json'
                },
                body: {
                    vfornecedor_unidade_id: 336388,
                    vprocedimento_id: 20357,
                    vfornecedor_id: 292
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(401)
            })
        })
    })

    //PUT - FINALIZADO
    describe('Módulo - Fornecedores - Atualiza um fornecedor e procedimento com preço', () => {

        it('Validar retorno 201 - /api/v1/fornecedores/update/fornecedor-price/procedimento', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'PUT',
                url: '/api/v1/fornecedores/update/fornecedor-price/procedimento',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: {
                    vfornecedor_unidade_id: 336388,
                    vprocedimento_id: 20357,
                    vfornecedor_id: 292
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(200);
                expect(response.body).to.have.property('flagDeError');
                expect(response.body).to.have.property('codigo');
                expect(response.body).to.have.property('mensagem');
            })
        })

        it('Validar retorno 401 - /api/v1/fornecedores/update/fornecedor-price/procedimento', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'PUT',
                url: '/api/v1/fornecedores/update/fornecedor-price/procedimento',
                headers: {
                    //'Authorization': `Bearer ${token}`, token inválido
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

    //GET - FINALIZADO
    describe('Módulo - Fornecedores - Retorna os fornecedores que tem seller id', () => {

        it('Validar retorno 200 - /api/v1/fornecedores/split', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/fornecedores/split',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(200);
                const body = response.body;

                expect(body).to.be.an('array')
                body.forEach((item) => {
                    expect(item).to.have.property('id');
                    expect(item).to.have.property('fkMunicipio');
                    expect(item).to.have.property('razaoSocial');
                    expect(item).to.have.property('nomeFantasia');
                    expect(item).to.have.property('cnpj');
                    expect(item).to.have.property('inscricaoEstadual');
                    expect(item).to.have.property('cep');
                    expect(item).to.have.property('endereco');
                    expect(item).to.have.property('numero');
                    expect(item).to.have.property('complemento');
                    expect(item).to.have.property('bairro');
                    expect(item).to.have.property('email');
                    expect(item).to.have.property('telefone');
                    expect(item).to.have.property('inscricaoMunicipal');
                    expect(item).to.have.property('celular');
                    expect(item).to.have.property('ipClient');
                    expect(item).to.have.property('createdAt');
                    expect(item).to.have.property('updatedAt');
                    expect(item).to.have.property('flagAtivo');
                    expect(item).to.have.property('flagStatus');
                    expect(item).to.have.property('codigoInterno');
                    expect(item).to.have.property('emailAlternativo');
                    expect(item).to.have.property('sellerId');
                    expect(item).to.have.property('flgSplit');
                    expect(item).to.have.property('integracaoId');
                })
            })
        })

        it('Validar retorno 401 - /api/v1/fornecedores/split', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/fornecedores/split',
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

    //GET - FINALIZADO    
    describe('Módulo - Fornecedores - Retorna os dados de split de um fornecedor', () => {

        it('Validar retorno 200 - /api/v1/fornecedores/split/{id}', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/fornecedores/split/296',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(200)
                expect(response.body).to.have.property('sellerId');
                expect(response.body).to.have.property('flgSplit');
            })
        })

        it('Validar retorno 400 - /api/v1/fornecedores/split/{id}', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/fornecedores/split/{id}', // sem parâmetro
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(400)
            })
        })

        it('Validar retorno 401 - /api/v1/fornecedores/split/{id}', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/fornecedores/split/296',
                headers: {
                    //'Authorization' :`Bearer ${token}`, Token inválido
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(401)
            })
        })
    })

    // Precisa de dados reais do Amei
    //PUT - FINALIZADO
    describe('Módulo - Fornecedores - Atualiza os dados de split de um fornecedor', () => {

        it('Validar retorno 200 - /api/v1/fornecedores/split/{id}', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'PUT',
                url: '/api/v1/fornecedores/split/296',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: {
                    "sellerId": "123456",
                    "flgSplit": true
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(200);

                expect(response.body).to.have.property('flagDeError');
                expect(response.body).to.have.property('codigo');
                expect(response.body).to.have.property('mensagem')
            })
        })

        it('Validar retorno 400 - /api/v1/fornecedores/split/{id}', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'PUT',
                url: '/api/v1/fornecedores/split/296',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: { //Sem parâmetro no body
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(400);
            })
        })

        it('Validar retorno 401 - /api/v1/fornecedores/split/{id}', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'PUT',
                url: '/api/v1/fornecedores/split/296',
                headers: {
                    //'Authorization': `Bearer ${token}`, Token inválido
                    'Content-Type': 'application/json'
                },
                body: {
                    "sellerId": "123456",
                    "flgSplit": true
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(401);
            })
        })
    })

    //DELETE - FINALIZADO
    describe('Módulo - Fornecedores - Delete o procedimento do fornecedor por id', () => {

        it('Validar retorno 200 - /api/v1/fornecedores/procedure/{id}', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'DELETE',
                url: '/api/v1/fornecedores/procedure/1',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(200);
                cy.log('Response retornando vazio', JSON.stringify(response.body));
            })
        })

        it('Validar retorno 400 - /api/v1/fornecedores/procedure/{id}', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'DELETE',
                url: '/api/v1/fornecedores/procedure/{id}', //sem parâmetro
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(400);
            })
        })

        it('Validar retorno 401 - /api/v1/fornecedores/procedure/{id}', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'DELETE',
                url: '/api/v1/fornecedores/procedure/1',
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

    //GET - FINALIZADO
    describe('Módulo - Fornecedores - Retorna os procedimentos do fornecedor cadastrado', () => {

        it('Validar retorno 200 - /api/v1/fornecedores/{id}/procedimentos', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/fornecedores/296/procedimentos?unidadeId=483&page=1&limit=10',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(200)

                const body = response.body;
                expect(body).to.have.property('items').to.be.an('array')
                body.items.forEach((item) => {
                    expect(item).to.have.property('id');
                    expect(item).to.have.property('valorCusto');
                    expect(item).to.have.property('primeiraConsultaCusto');
                    expect(item).to.have.property('procedimento');
                    expect(item.procedimento).to.have.property('nome');
                    expect(item.procedimento).to.have.property('tipo');
                    expect(item.procedimento.tipo).to.have.property('id');
                    expect(item).to.have.property('parceiro');
                    expect(item.parceiro).to.have.property('nome');
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

        it('Validar retorno 400 - /api/v1/fornecedores/{id}/procedimentos', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/fornecedores/{id}}/procedimentos', // Sem parâmetro no body
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(400)
            })
        })

        it('Validar retorno 401 - /api/v1/fornecedores/{id}/procedimentos', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/fornecedores/296/procedimentos?unidadeId=483&page=1&limit=10',
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
    //POST - FINALIZADO
    describe('Módulo - Fornecedores - Cadastra os procedimentos do fornecedor', () => {

        it('Validar retorno 201 - /api/v1/fornecedores/{id}/procedimentos', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/fornecedores/296/procedimentos',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: {
                    fornecedorUnidadeId: 273,
                    parceiros: [
                        {
                            id: 42
                        }
                    ],
                    procedimentos: [
                        {
                            id: 20715
                        }
                    ],
                    data: "2025-10-24"
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(201);
                expect(response.body).to.have.property('codigo');
                expect(response.body).to.have.property('flagDeError');
                expect(response.body).to.have.property('mensagem');
            })
        })

        it('Validar retorno 400 - /api/v1/fornecedores/{id}/procedimentos', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/fornecedores/296/procedimentos',
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

        it('Validar retorno 401 - /api/v1/fornecedores/{id}/procedimentos', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/fornecedores/296/procedimentos',
                headers: {
                    //'Authorization': `Bearer ${token}`, Token inválido
                    'Content-Type': 'application/json'
                },
                body: {
                    fornecedorUnidadeId: 336295,
                    parceiros: [
                        {
                            id: 42
                        }
                    ],
                    procedimentos: [
                        {
                            id: 20715
                        }
                    ],
                    data: "2025-10-24"
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(401);
            })
        })
    })

    //GET - FINALIZADO
    describe('Módulo - Fornecedores - Retorna os procedimentos do fornecedor, com paginação, buscando por parceiro E/OU nome E/OU grupo E/OU Tipo de procedimentos', () => {

        it('Validar retorno 200 - /api/v1/fornecedores/{id}/procedimentos/filter', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/fornecedores/296/procedimentos/filter?unidadeId=483&page=1&limit=10',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(200)

                const body = response.body;
                expect(body).to.have.property('items').to.be.an('array');
                body.items.forEach((item) => {
                    expect(item).to.have.property('id');
                    expect(item).to.have.property('valorCusto');
                    expect(item).to.have.property('primeiraConsultaCusto');
                    expect(item).to.have.property('precoPrimeiraConsulta');
                    expect(item).to.have.property('valorVenda');
                    expect(item).to.have.property('createAt');
                    expect(item).to.have.property('updateAt');
                    expect(item).to.have.property('fornecedorUnidade');
                    expect(item.fornecedorUnidade).to.have.property('id');
                    expect(item.fornecedorUnidade).to.have.property('unidadeId');
                    expect(item.fornecedorUnidade).to.have.property('unidade');
                    expect(item.fornecedorUnidade.unidade).to.have.property('descricao');
                    expect(item).to.have.property('parceiro');
                    expect(item.parceiro).to.have.property('nome');
                    expect(item).to.have.property('procedimento');
                    expect(item.procedimento).to.have.property('nome');
                    expect(item.procedimento).to.have.property('tipo');
                    expect(item.procedimento.tipo).to.have.property('id');
                    expect(item.procedimento.tipo).to.have.property('descricao');
                })
            })
        })

        it('Validar retorno 401 - /api/v1/fornecedores/{id}/procedimentos/filter', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/fornecedores/296/procedimentos/filter?unidadeId=483&page=1&limit=10',
                headers: {
                    //'Authorization' :`Bearer ${token}`, Token inválido
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(401)
            })
        })
    })

    // Precisa de dados reais do Amei
    //PUT - FINALIZADO
    describe('Módulo - Fornecedores - Atualiza os dados do procedimento do fornecedor', () => {

        it('Validar retorno 200 - /api/v1/fornecedores/{id}/procedimentos/{procedimentoId}', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'PUT',
                url: 'api/v1/fornecedores/296/procedimentos/19533',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: {
                    "valorCusto": 1,
                    "primeiraConsultaCusto": 0
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(200);
                expect(response.body).to.have.property('codigo');
                expect(response.body).to.have.property('flagDeError');
                expect(response.body).to.have.property('mensagem');
            })
        })

        it('Validar retorno 400 - /api/v1/fornecedores/{id}/procedimentos/{procedimentoId}', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'PUT',
                url: 'api/v1/fornecedores/{id}}/procedimentos/{procedimentoId}}',
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

        it('Validar retorno 401 - /api/v1/fornecedores/{id}/procedimentos/{procedimentoId}', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'PUT',
                url: 'api/v1/fornecedores/296/procedimentos/19533',
                headers: {
                    //'Authorization': `Bearer ${token}`, Token inválido
                    'Content-Type': 'application/json'
                },
                body: {
                    "valorCusto": 1,
                    "primeiraConsultaCusto": 0
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(401);
            })
        })
    })

    // Precisa de dados reais do Amei
    //DELETE - FINALIZADO
    describe('Módulo - Fornecedores - Inativa o procedimento do fornecedor', () => {

        it('Validar retorno 200 - /api/v1/fornecedores/{id}/procedimentos/{procedimentoId}', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'DELETE',
                url: '/api/v1/fornecedores/296/procedimentos/19533',
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

        it('Validar retorno 400 - /api/v1/fornecedores/{id}/procedimentos/{procedimentoId}', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'DELETE',
                url: '/api/v1/fornecedores/{id}}/procedimentos/{procedimentoId}}',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(500);
            })
        })

        it('Validar retorno 401 - /api/v1/fornecedores/{id}/procedimentos/{procedimentoId}', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'DELETE',
                url: '/api/v1/fornecedores/296/procedimentos/19533',
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

    //PUT  Rota descontinuada
    /*  describe('Módulo - Fornecedores - Atualiza o vinculo da unidade com o fornecedor', () => {
        })
        */
})

