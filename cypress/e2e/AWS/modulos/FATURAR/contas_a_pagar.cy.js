/// <reference types="cypress"/>

describe('Módulo - Contas a Pagar', () => {
    beforeEach(() => {
        cy.login()
        cy.refreshToken()
    })

    describe('Módulo - Contas a Pagar - Retorna uma lista por filtro de Contas a pagar', () => {

        it('Validar retorno 200 - /api/v1/bills-to-pay/list-filter', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/bills-to-pay/list-filter',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(200);
                cy.log('Retorna vazio', JSON.stringify(response.body));
            })
        })

        it('Validar retorno 401 - /api/v1/bills-to-pay/list-filter', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/bills-to-pay/list-filter',
                headers: {
                    //'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(401);
                cy.log(JSON.stringify(response.body));
            })
        })
    })

    describe('Módulo - Contas a Pagar - Cria um registro contas a pagar', () => {

        it('Validar retorno 201 - /api/v1/bills-to-pay/add-bills', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/bills-to-pay/add-bills',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: {
                    "accountsPayableInsert": {
                        "dateInit": "2025-12-31T09:26:17-03:00",
                        "notaFiscal": "",
                        "status": "Não quitada",
                        "observationHeader": "teste",
                        "typeFavoredId": "3",
                        "fornecedor": "",
                        "funcionario": "",
                        "profissional": "4033"
                    },
                    "accountsPayableEnterItems": [
                        {
                            "quantity": 1,
                            "description": "Serviço de consultoria",
                            "classificacaoFinanceiraId": 122,
                            "classificacaoFinanceira": "",
                            "expenses": 0,
                            "valorUnitario": 200,
                            "valorTotal": "200.00",
                            "actions": "1"
                        }
                    ],
                    "accountsPayableInsertInstallment": [
                        {
                            "tipoIntervalo": "U",
                            "qrdParcela": "1",
                            "qtdIntervalo": "1",
                            "dataIntervalo": "mes",
                            "dataVencimento": "2025-12-31T03:00:00",
                            "firstBilss": 0,
                            "repeatIn": 0,
                            "dateRepetition": 0,
                            "breakIn": 0,
                            "vencimentos": "",
                            "observationDatePagament": "",
                            "valorParcela": "200.00",
                            "valorPago": "",
                            "nrParcela": 1
                        }
                    ]
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(201);
                cy.log(JSON.stringify(response.body));

                expect(response.body).to.have.property('flagDeError');
                expect(response.body).to.have.property('codigo');
                expect(response.body).to.have.property('id');
                expect(response.body).to.have.property('mensagem');
            })
        })

        it('Validar retorno 401 - /api/v1/bills-to-pay/add-bills', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/bills-to-pay/add-bills',
                headers: {
                    //'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: {
                    "accountsPayableInsert": {
                        "dateInit": "2025-12-31T09:26:17-03:00",
                        "notaFiscal": "",
                        "status": "Não quitada",
                        "observationHeader": "teste",
                        "typeFavoredId": "3",
                        "fornecedor": "",
                        "funcionario": "",
                        "profissional": "4033"
                    },
                    "accountsPayableEnterItems": [
                        {
                            "quantity": 1,
                            "description": "Serviço de consultoria",
                            "classificacaoFinanceiraId": 122,
                            "classificacaoFinanceira": "",
                            "expenses": 0,
                            "valorUnitario": 200,
                            "valorTotal": "200.00",
                            "actions": "1"
                        }
                    ],
                    "accountsPayableInsertInstallment": [
                        {
                            "tipoIntervalo": "U",
                            "qrdParcela": "1",
                            "qtdIntervalo": "1",
                            "dataIntervalo": "mes",
                            "dataVencimento": "2025-12-31T03:00:00",
                            "firstBilss": 0,
                            "repeatIn": 0,
                            "dateRepetition": 0,
                            "breakIn": 0,
                            "vencimentos": "",
                            "observationDatePagament": "",
                            "valorParcela": "200.00",
                            "valorPago": "",
                            "nrParcela": 1
                        }
                    ]
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(401);
                cy.log(JSON.stringify(response.body));
            })
        })
    })

    describe('Módulo - Contas a Pagar - Atualizar os registros contas a pagar', () => {

        it('Validar retorno 200 - /api/v1/bills-to-pay/update-bills', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'PUT',
                url: '/api/v1/bills-to-pay/update-bills',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: {
                    "accountsPayableInsert": {
                        "fornecedor": "",
                        "funcionario": "",
                        "profissional": 4033,
                        "observationHeader": "eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
                        "notaFiscal": null,
                        "tipoFavorecido": 3,
                        "id": 1106518,
                        "paciente": ""
                    },
                    "accountsPayableEnterItems": [
                        {
                            "id": 1471894,
                            "contasPagar": 1106518,
                            "description": "Teste",
                            "classificacaoFinanceiraId": 122,
                            "classificacaoFinanceira": "Internet",
                            "quantity": 1,
                            "valorUnitario": 200,
                            "valorTotal": 200
                        }
                    ],
                    "accountsPayableInsertInstallment": [
                        {
                            "id": 1256700,
                            "contasPagar": 1106518,
                            "nrParcela": 1,
                            "dataVencimento": "2025-12-31T03:00:00",
                            "observationDatePagament": "",
                            "valorParcela": 200,
                            "valorPago": 0,
                            "dataPagamento": null,
                            "status": "A",
                            "formaPagamento": null
                        }
                    ]
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(200);
                cy.log(JSON.stringify(response.body));

                const body = response.body
                expect(body).to.have.property('accountsPayableInsert').to.be.an('array');
                body.accountsPayableInsert.forEach((itemPayableInsert) => {
                    expect(itemPayableInsert).to.have.property('id');
                    expect(itemPayableInsert).to.have.property('tipoFavorecido');
                    expect(itemPayableInsert).to.have.property('fornecedor');
                    expect(itemPayableInsert).to.have.property('profissional');
                    expect(itemPayableInsert).to.have.property('funcionario');
                    expect(itemPayableInsert).to.have.property('paciente');
                    expect(itemPayableInsert).to.have.property('fornecedorName');
                    expect(itemPayableInsert).to.have.property('profissionalName');
                    expect(itemPayableInsert).to.have.property('funcionarioName');
                    expect(itemPayableInsert).to.have.property('pacienteName');
                    expect(itemPayableInsert).to.have.property('dataCadastro');
                    expect(itemPayableInsert).to.have.property('notaFiscal');
                    expect(itemPayableInsert).to.have.property('observacao');
                    expect(itemPayableInsert).to.have.property('tipoPagamento');
                    expect(itemPayableInsert).to.have.property('status');
                    expect(itemPayableInsert).to.have.property('origin');
                })

                expect(body).to.have.property('accountsPayableEnterItems').to.be.an('array');
                body.accountsPayableEnterItems.forEach((itemPayableEnterItems) => {
                    expect(itemPayableEnterItems).to.have.property('id');
                    expect(itemPayableEnterItems).to.have.property('contasPagar');
                    expect(itemPayableEnterItems).to.have.property('description');
                    expect(itemPayableEnterItems).to.have.property('classificacaoFinanceiraId');
                    expect(itemPayableEnterItems).to.have.property('classificacaoFinanceira');
                    expect(itemPayableEnterItems).to.have.property('quantity');
                    expect(itemPayableEnterItems).to.have.property('valorUnitario');
                    expect(itemPayableEnterItems).to.have.property('valorTotal');
                })

                expect(body).to.have.property('accountsPayableInsertInstallment').to.be.an('array');
                body.accountsPayableInsertInstallment.forEach((itemPayableInsertInstallment) => {
                    expect(itemPayableInsertInstallment).to.have.property('id');
                    expect(itemPayableInsertInstallment).to.have.property('contasPagar');
                    expect(itemPayableInsertInstallment).to.have.property('nrParcela');
                    expect(itemPayableInsertInstallment).to.have.property('dataVencimento');
                    expect(itemPayableInsertInstallment).to.have.property('observationDatePagament');
                    expect(itemPayableInsertInstallment).to.have.property('valorParcela');
                    expect(itemPayableInsertInstallment).to.have.property('valorPago');
                    expect(itemPayableInsertInstallment).to.have.property('dataPagamento');
                    expect(itemPayableInsertInstallment).to.have.property('status');
                    expect(itemPayableInsertInstallment).to.have.property('formaPagamento');
                })
            })
        })

        it('Validar retorno 401 - /api/v1/bills-to-pay/update-bills', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'PUT',
                url: '/api/v1/bills-to-pay/update-bills',
                headers: {
                    //'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: {
                    "accountsPayableInsert": {
                        "fornecedor": "",
                        "funcionario": "",
                        "profissional": 4033,
                        "observationHeader": "eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
                        "notaFiscal": null,
                        "tipoFavorecido": 3,
                        "id": 1106518,
                        "paciente": ""
                    },
                    "accountsPayableEnterItems": [
                        {
                            "id": 1471894,
                            "contasPagar": 1106518,
                            "description": "Teste",
                            "classificacaoFinanceiraId": 122,
                            "classificacaoFinanceira": "Internet",
                            "quantity": 1,
                            "valorUnitario": 200,
                            "valorTotal": 200
                        }
                    ],
                    "accountsPayableInsertInstallment": [
                        {
                            "id": 1256700,
                            "contasPagar": 1106518,
                            "nrParcela": 1,
                            "dataVencimento": "2025-12-31T03:00:00",
                            "observationDatePagament": "",
                            "valorParcela": 200,
                            "valorPago": 0,
                            "dataPagamento": null,
                            "status": "A",
                            "formaPagamento": null
                        }
                    ]
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(401);
                cy.log(JSON.stringify(response.body));
            })
        })
    })

    describe('Módulo - Contas a Pagar - Retorna uma lista dos Histórico de contas a pagar', () => {

        it('Validar retorno 200 - /api/v1/bills-to-pay/{id}/list-edit', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/bills-to-pay/7/list-edit',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(200);
                cy.log(JSON.stringify(response.body));

                const body = response.body;
                expect(body).to.have.property('accountsPayableInsert').to.be.an('array');
                body.accountsPayableInsert.forEach((itemPayableInsert) => {
                    expect(itemPayableInsert).to.have.property('id');
                    expect(itemPayableInsert).to.have.property('tipoFavorecido');
                    expect(itemPayableInsert).to.have.property('fornecedor');
                    expect(itemPayableInsert).to.have.property('profissional');
                    expect(itemPayableInsert).to.have.property('funcionario');
                    expect(itemPayableInsert).to.have.property('paciente');
                    expect(itemPayableInsert).to.have.property('fornecedorName');
                    expect(itemPayableInsert).to.have.property('profissionalName');
                    expect(itemPayableInsert).to.have.property('funcionarioName');
                    expect(itemPayableInsert).to.have.property('pacienteName');
                    expect(itemPayableInsert).to.have.property('dataCadastro');
                    expect(itemPayableInsert).to.have.property('notaFiscal');
                    expect(itemPayableInsert).to.have.property('observacao');
                    expect(itemPayableInsert).to.have.property('tipoPagamento');
                    expect(itemPayableInsert).to.have.property('status');
                    expect(itemPayableInsert).to.have.property('origin');
                })

                expect(body).to.have.property('accountsPayableEnterItems').to.be.an('array');
                body.accountsPayableEnterItems.forEach((itemPayableEnterItems) => {
                    expect(itemPayableEnterItems).to.have.property('id');
                    expect(itemPayableEnterItems).to.have.property('contasPagar');
                    expect(itemPayableEnterItems).to.have.property('description');
                    expect(itemPayableEnterItems).to.have.property('classificacaoFinanceiraId');
                    expect(itemPayableEnterItems).to.have.property('classificacaoFinanceira');
                    expect(itemPayableEnterItems).to.have.property('quantity');
                    expect(itemPayableEnterItems).to.have.property('valorUnitario');
                    expect(itemPayableEnterItems).to.have.property('valorTotal');
                })

                expect(body).to.have.property('accountsPayableInsertInstallment').to.be.an('array');
                body.accountsPayableInsertInstallment.forEach((item) => {
                    expect(item).to.have.property('id');
                    expect(item).to.have.property('contasPagar');
                    expect(item).to.have.property('nrParcela');
                    expect(item).to.have.property('dataVencimento');
                    expect(item).to.have.property('observationDatePagament');
                    expect(item).to.have.property('valorParcela');
                    expect(item).to.have.property('valorPago');
                    expect(item).to.have.property('dataPagamento');
                    expect(item).to.have.property('status');
                    expect(item).to.have.property('formaPagamento');
                })
            })
        })

        it('Validar retorno 400 - /api/v1/bills-to-pay/{id}/list-edit', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/bills-to-pay/{id}/list-edit',
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

        it('Validar retorno 401 - /api/v1/bills-to-pay/{id}/list-edit', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/bills-to-pay/{id}/list-edit',
                headers: {
                    //'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(401);
                cy.log(JSON.stringify(response.body));
            })
        })
    })

    describe('Módulo - Contas a Pagar - Retorna uma lista dos Histórico de contas a pagar', () => {

        it('Validar retorno 200 - /api/v1/bills-to-pay/{id}/list-history', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/bills-to-pay/7/list-history',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(200);
                cy.log(JSON.stringify(response.body));

                expect(response.body).to.be.an('array');
                response.body.forEach((body) => {
                    expect(body).to.have.property('contasPagarId');
                    expect(body).to.have.property('itemId');
                    expect(body).to.have.property('data');
                    expect(body).to.have.property('msg');
                })
            })
        })

        it('Validar retorno 400 - /api/v1/bills-to-pay/{id}/list-history', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/bills-to-pay/{id}/list-history',
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

        it('Validar retorno 401 - /api/v1/bills-to-pay/{id}/list-history', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/bills-to-pay/{id}/list-history',
                headers: {
                    //'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(401);
                cy.log(JSON.stringify(response.body));
            })
        })
    })

    describe('Módulo - Contas a Pagar - Retorna uma lista dos Fornecedores', () => {

        it('Validar retorno 200 - /api/v1/bills-to-pay/provider', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/bills-to-pay/provider',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(200);
                cy.log(JSON.stringify(response.body));

                expect(response.body).to.be.an('array');
                response.body.forEach((body) => {
                    expect(body).to.have.property('id');
                    expect(body).to.have.property('unidadeId');
                    expect(body).to.have.property('fornecedorId');
                    expect(body).to.have.property('tipoFornecedor');
                    expect(body).to.have.property('unidade');
                    expect(body).to.have.property('regiaoId');
                    expect(body).to.have.property('regiao');
                    expect(body).to.have.property('statusIntegracao');
                    expect(body).to.have.property('flgPagamentoParcial');
                })
            })
        })

        it('Validar retorno 401 - /api/v1/bills-to-pay/provider', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/bills-to-pay/provider',
                headers: {
                    //'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(401);
                cy.log(JSON.stringify(response.body));
            })
        })
    })

    describe('Módulo - Contas a Pagar - Retorna uma lista dos Funcionários', () => {

        it('Validar retorno 200 - /api/v1/bills-to-pay/employee', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/bills-to-pay/employee',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(200);
                cy.log(JSON.stringify(response.body));

                expect(response.body).to.be.an('array');
                response.body.forEach((body) => {
                    expect(body).to.have.property('nome');
                    expect(body).to.have.property('funcao');
                    expect(body).to.have.property('perfil');
                    expect(body).to.have.property('perfilAcessoId');
                    expect(body).to.have.property('status');
                    expect(body).to.have.property('setor');
                    expect(body).to.have.property('id');
                    expect(body).to.have.property('foto');
                    expect(body).to.have.property('cpf');
                    expect(body).to.have.property('rg');
                    expect(body).to.have.property('funcaoId');
                    expect(body).to.have.property('statusId');
                    expect(body).to.have.property('sobrenome');
                    expect(body).to.have.property('nomeCompleto');
                    expect(body).to.have.property('dataNascimento');
                    expect(body).to.have.property('sexoId');
                    expect(body).to.have.property('sexo');
                    expect(body).to.have.property('sexoSigla');
                    expect(body).to.have.property('setorId');
                    expect(body).to.have.property('observacao');
                    expect(body).to.have.property('celular');
                    expect(body).to.have.property('email');
                    expect(body).to.have.property('cep');
                    expect(body).to.have.property('endereco');
                    expect(body).to.have.property('numero');
                    expect(body).to.have.property('complemento');
                    expect(body).to.have.property('bairro');
                    expect(body).to.have.property('municipioId');
                    expect(body).to.have.property('municipio');
                    expect(body).to.have.property('estadoId');
                    expect(body).to.have.property('estado');
                    expect(body).to.have.property('usuarioId');
                    expect(body).to.have.property('usuario');
                    expect(body).to.have.property('usuarioEmail');
                    expect(body).to.have.property('unidadeId');
                })
            })
        })

        it('Validar retorno 401 - /api/v1/bills-to-pay/employee', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/bills-to-pay/employee',
                headers: {
                    //'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(401);
                cy.log(JSON.stringify(response.body));
            })
        })
    })

    describe('Módulo - Contas a Pagar - Retorna uma lista dos Profissionais', () => {

        it('Validar retorno 200 - /api/v1/bills-to-pay/professional', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/bills-to-pay/professional',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(200);
                cy.log(JSON.stringify(response.body));

                expect(response.body).to.be.an('array');
                response.body.forEach((body) => {
                    expect(body).to.have.property('id');
                    expect(body).to.have.property('cpf');
                    expect(body).to.have.property('nome');
                    expect(body).to.have.property('sobrenome');
                    expect(body).to.have.property('nomeCompleto');
                    expect(body).to.have.property('profissao');
                    expect(body).to.have.property('conselho');
                    expect(body).to.have.property('unidadeId');
                })
            })
        })

        it('Validar retorno 401 - /api/v1/bills-to-pay/professional', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/bills-to-pay/professional',
                headers: {
                    //'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(401);
                cy.log(JSON.stringify(response.body));
            })
        })
    })

    describe('Módulo - Contas a Pagar - Retorna uma lista de Categoria', () => {

        it('Validar retorno 200 - /api/v1/bills-to-pay/category', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/bills-to-pay/category',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(200);
                cy.log(JSON.stringify(response.body));

                expect(response.body).to.be.an('array');
                response.body.forEach((body) => {
                    expect(body).to.have.property('id');
                    expect(body).to.have.property('categoriaDespesa');
                })
            })
        })

        it('Validar retorno 401 - /api/v1/bills-to-pay/category', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/bills-to-pay/category',
                headers: {
                    //'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(401);
                cy.log(JSON.stringify(response.body));
            })
        })
    })

    describe('Módulo - Contas a Pagar - Recebimento de uma parcela contas a pagar', () => {

        it('Validar retorno 201 - /api/v1/bills-to-pay/parcela/contas-pagar/{parcelaRecebimentoId}', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/bills-to-pay/parcela/contas-pagar/1106536',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: {
                    "parcelaId": 1256841,
                    "dataRecebimento": "20260105",
                    "valorRecebido": 100,
                    "formaLiquidacaoId": 3,
                    "contaCorrenteId": 143
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(201);
                cy.log('Retorna vazio', JSON.stringify(response.body));
            })
        })

        it('Validar retorno 400 - /api/v1/bills-to-pay/parcela/contas-pagar/{parcelaRecebimentoId}', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/bills-to-pay/parcela/contas-pagar/1256814',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(400);
                cy.log(JSON.stringify(response.body))
            })
        })

        it('Validar retorno 401 - /api/v1/bills-to-pay/parcela/contas-pagar/{parcelaRecebimentoId}', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/bills-to-pay/parcela/contas-pagar/1256814',
                headers: {
                    //'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: {
                    "parcelaId": 1256814,
                    "dataRecebimento": "20260105",
                    "valorRecebido": "100.00",
                    "formaLiquidacaoId": 3,
                    "contaCorrenteId": 143
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(401);
                cy.log(JSON.stringify(response.body))
            })
        })
    })

    describe('Módulo - Contas a Pagar - Atualizar data de vencimento', () => {

        it('Validar retorno 200 - /api/v1/bills-to-pay/{parcelaRecebimentoId}/expiration-date', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'PUT',
                url: '/api/v1/bills-to-pay/1256816/expiration-date',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: {
                    "dataVencimento": "2026-01-06T03:00:00.000Z"
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(200);
                cy.log(JSON.stringify(response.body))
                expect(response.body).to.have.property('flagDeError');
                expect(response.body).to.have.property('id');
                expect(response.body).to.have.property('mensagem');
            })
        })

        it('Validar retorno 401 - /api/v1/bills-to-pay/{parcelaRecebimentoId}/expiration-date', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'PUT',
                url: '/api/v1/bills-to-pay/1256816/expiration-date',
                headers: {
                    //'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: {
                    "dataVencimento": "2026-01-06T03:00:00.000Z"
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(401);
                cy.log(JSON.stringify(response.body))
            })
        })
    })

    //Id utilizado para testar essa rota está na tabela PAG_PAR_LIQ (coluna id)
    describe('Módulo - Contas a Pagar - Cancela o recebimento de uma parcela contas a pagar', () => {

        it('Validar retorno 200 - /api/v1/bills-to-pay/parcela/contas-pagar/{parcelaRecebimentoId}', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'DELETE',
                url: '/api/v1/bills-to-pay/parcela/contas-pagar/385045',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(200);
                cy.log(JSON.stringify(response.body));
                expect(response.body).to.have.property('flagDeError');
                expect(response.body).to.have.property('codigo');
                expect(response.body).to.have.property('mensagem');
            })
        })

        it('Validar retorno 400 - /api/v1/bills-to-pay/parcela/contas-pagar/{parcelaRecebimentoId}', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'DELETE',
                url: '/api/v1/bills-to-pay/parcela/contas-pagar/{parcelaRecebimentoId}',
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

        it('Validar retorno 401 - /api/v1/bills-to-pay/parcela/contas-pagar/{parcelaRecebimentoId}', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'DELETE',
                url: '/api/v1/bills-to-pay/parcela/contas-pagar/1256816',
                headers: {
                    //'Authorization': `Bearer ${token}`,
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