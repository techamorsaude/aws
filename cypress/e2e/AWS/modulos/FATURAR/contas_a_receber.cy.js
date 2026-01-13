/// <reference types="cypress"/>

describe('Módulo - Contas a Receber', () => {
    beforeEach(() => {
        cy.login();
        cy.refreshToken();
    })

    describe('Módulo - Contas a Receber - Retorna lista de recebimentos', () => {

        it('Validar retorno 200 - /api/v1/contas-receber', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/contas-receber?page=1&limit=1',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'appliation/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(200);
                cy.log(JSON.stringify(response.body));

                response.body.items.forEach(item => {
                    expect(item).to.have.property('id')
                    expect(item).to.have.property('notaFiscal')
                    expect(item).to.have.property('createdAt')
                    expect(item).to.have.property('valorTotal')
                    expect(item).to.have.property('valorTotalClinica')
                    expect(item).to.have.property('parcelas')
                    expect(item).to.have.property('tipoPagador')
                    expect(item).to.have.property('tipoReceita')
                    expect(item).to.have.property('status')
                    expect(item).to.have.property('itens')
                    expect(item).to.have.property('fornecedor')
                    expect(item).to.have.property('paciente')
                    expect(item).to.have.property('profissional')
                    expect(item).to.have.property('origemIdAgendamento')
                })
            })
        })

        it('Validar retorno 400 - /api/v1/contas-receber', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/contas-receber',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(400);
                cy.log(JSON.stringify(response.body));
            })
        })

        it('Validar retorno 401 - /api/v1/contas-receber', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/contas-receber?page=1&limit=10',
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

    describe('Módulo - Contas a Receber - Cadastro de uma conta a receber', () => {

        it('Validar retorno 201 - /api/v1/contas-receber', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/contas-receber',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: {
                    "tipoPagadorId": 2,
                    "tipoRecebimentoId": 2,
                    "notaFiscal": "",
                    "recorrencia": 1,
                    "tipoIntervalo": "M",
                    "observacao": "teste",
                    "pacienteId": null,
                    "fornecedorId": "420",
                    "profissionalId": null,
                    "quantidadeParcelas": 1,
                    "itens": [
                        {
                            "descricao": "Aluguel Sala",
                            "quantidade": 1,
                            "valorUnitario": 100,
                            "classificacaoFinanceiraId": 136,
                            "valorTotal": 100,
                            "executanteId": 0,
                            "executado": "0"
                        }
                    ],
                    "parcelas": [],
                    "origemId": 1,
                    "origem": "Manual"
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(201);
                cy.log(JSON.stringify(response.body));
                
                const idRecebimento = response.body.id

                const body = response.body;
                expect(body).to.have.property('id');
                expect(body).to.have.property('tipoPagadorId');
                expect(body).to.have.property('statusId');
                expect(body).to.have.property('tipoReceitaId');
                expect(body).to.have.property('fkPaciente');
                expect(body).to.have.property('fkTipoLiquidante');
                expect(body).to.have.property('origem');
                expect(body).to.have.property('origemId');
                expect(body).to.have.property('notaFiscal');
                expect(body).to.have.property('quantidadeParcelas');
                expect(body).to.have.property('recorrencia');
                expect(body).to.have.property('tipoIntervalo');
                expect(body).to.have.property('observacao');
                expect(body).to.have.property('flagAtivo');
                expect(body).to.have.property('ipClient');
                expect(body).to.have.property('createdAt');
                expect(body).to.have.property('updatedAt');
                expect(body).to.have.property('createdBy');
                expect(body).to.have.property('lastUser');
                expect(body).to.have.property('valorTotal');
                expect(body).to.have.property('valorTotalClinica');
                expect(body).to.have.property('fkUnidade');
                expect(body).to.have.property('fkRecebimentoStatus');
                expect(body).to.have.property('fkFornecedor');
                expect(body).to.have.property('fkProfissional');
                expect(body).to.have.property('itens');
                expect(body).to.have.property('parcelas');

                // 🔐 Salva o ID para uso posterior
                Cypress.env('idRecebimento', idRecebimento);
                cy.log('ID salvo:', idRecebimento);
            })
        })

        it('Validar retorno 400 - /api/v1/contas-receber', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/contas-receber',
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

        it('Validar retorno 401 - /api/v1/contas-receber', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/contas-receber',
                headers: {
                    //'Authorization': `Bearer ${token}`, Token inválido
                    'Content-Type': 'application/json'
                },
                body: {
                    "tipoPagadorId": 1,
                    "tipoRecebimentoId": 1,
                    "fornecedorId": null,
                    "pacienteId": 1,
                    "profissionalId": null,
                    "notaFiscal": "21345",
                    "quantidadeParcelas": 4,
                    "recorrencia": 3,
                    "tipoIntervalo": "M",
                    "observacao": "Lorem ipsum...",
                    "origemId": 1,
                    "origem": "Manual",
                    "itens": [
                        {
                            "id": 1,
                            "classificacaoFinanceiraId": 1,
                            "descricao": "Item 1",
                            "quantidade": 3,
                            "valorUnitario": 10,
                            "executanteId": 348,
                            "executado": "0"
                        }
                    ],
                    "parcelas": [
                        {
                            "dataVencimento": "20251020",
                            "observacao": "Lorem ipsum...",
                            "numeroParcela": 1,
                            "valor": 10
                        },
                        {
                            "dataVencimento": "20251120",
                            "observacao": "Lorem ipsum...",
                            "numeroParcela": 2,
                            "valor": 10
                        },
                        {
                            "dataVencimento": "20251220",
                            "observacao": "Lorem ipsum...",
                            "numeroParcela": 3,
                            "valor": 10
                        }
                    ]
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(401);
                cy.log(JSON.stringify(response.body));
            })
        })
    })

    describe('Módulo - Contas a Receber - Retorna um recebimento pelo id', () => {

        it('Validar retorno 200 - /api/v1/contas-receber/{id}', () => {
            const token = Cypress.env('access_token');
            const idRecebimento = Cypress.env('8524164') // Reutiliza o ID

            cy.request({
                method: 'GET',
                url: `/api/v1/contas-receber/${8524164}`,
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(200);
                cy.log(JSON.stringify(response.body));

                const body = response.body

                // Verifica os campos principais do objeto
                expect(body).to.include.all.keys(
                    'id',
                    'origem',
                    'origemId',
                    'notaFiscal',
                    'quantidadeParcelas',
                    'recorrencia',
                    'tipoIntervalo',
                    'observacao',
                    'createdAt',
                    'valorTotalClinica',
                    'itens',
                    'parcelas',
                    'tipoPagador',
                    'voucher',
                    'status',
                    'tipoReceita',
                    'fornecedor',
                    'paciente',
                    'profissional'
                )

                // Verifica estrutura de itens
                expect(body.itens).to.be.an('array')
                if (body.itens.length > 0) {
                    expect(body.itens[0]).to.include.all.keys(
                        'id',
                        'descricao',
                        'quantidade',
                        'valorUnitario',
                        'valorTotal',
                        'valorTotalClinica',
                        'executado',
                        'classificacaoFinanceira',
                        'executante'
                    )

                    expect(body.itens[0].classificacaoFinanceira).to.include.all.keys(
                        'id',
                        'classificacaoFinanceira'
                    )

                    expect(body.itens[0].executante).to.be.null
                }

                // Verifica estrutura de parcelas
                expect(body.parcelas).to.be.an('array')
                if (body.parcelas.length > 0) {
                    expect(body.parcelas[0]).to.include.all.keys(
                        'id',
                        'dataVencimento',
                        'numeroParcela',
                        'valor',
                        'observacao',
                        'status',
                        'liquidacoes',
                        'valorPago',
                        'valorPagar'
                    )

                    expect(body.parcelas[0].status).to.include.all.keys(
                        'id',
                        'status'
                    )

                    expect(body.parcelas[0].liquidacoes).to.be.an('array')
                }

                // Verifica estrutura de tipoPagador
                expect(body.tipoPagador).to.include.all.keys(
                    'id',
                    'liquidante'
                )

                // Verifica estrutura de status
                expect(body.status).to.include.all.keys(
                    'id',
                    'status'
                )

                // Verifica estrutura de tipoReceita
                expect(body.tipoReceita).to.include.all.keys(
                    'id',
                    'tipoRecebimento'
                )
            })
        })

        it('Validar retorno 400 - /api/v1/contas-receber/{id}', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/contas-receber/{id}',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(400);
                cy.log(JSON.stringify(response.body));
            })
        })

        it('Validar retorno 401 - /api/v1/contas-receber/{id}', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/contas-receber/{id}',
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

    describe('Módulo - Contas a Receber - Atualiza um recebimento por id', () => {

        it('Validar retorno 200 - /api/v1/contas-receber/{id}', () => {
            const token = Cypress.env('access_token');
            const idRecebimento = Cypress.env('8524164') // Reutiliza o ID

            cy.request({
                method: 'PUT',
                url: `/api/v1/contas-receber/${8524164}`,
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: {
                    "tipoPagadorId": 2,
                    "tipoRecebimentoId": 2,
                    "notaFiscal": null,
                    "recorrencia": 1,
                    "tipoIntervalo": "M",
                    "observacao": "teste",
                    "pacienteId": null,
                    "fornecedorId": 420,
                    "profissionalId": null,
                    "quantidadeParcelas": 1,
                    "itens": [
                        {
                            "descricao": "Aluguel Sala",
                            "quantidade": 1,
                            "id": 43507,
                            "valorUnitario": 100,
                            "classificacaoFinanceiraId": 136,
                            "valorTotal": 100,
                            "executanteId": 0,
                            "executado": "0"
                        }
                    ],
                    "parcelas": [
                        {
                            "dataVencimento": "20260108",
                            "observacao": null,
                            "numeroParcela": 1,
                            "valor": 100
                        }
                    ],
                    "origemId": 1,
                    "origem": "Manual"
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(200);
                cy.log(JSON.stringify(response.body));
                expect(response.body).to.have.property('flagDeError');
                expect(response.body).to.have.property('codigo');
                expect(response.body).to.have.property('mensagem');
            })
        })

        it('Validar retorno 400 - /api/v1/contas-receber/{id}', () => {
            const token = Cypress.env('access_token');
            const idRecebimento = Cypress.env('idRecebimento') // Reutiliza o ID

            cy.request({
                method: 'PUT',
                url: `/api/v1/contas-receber/${idRecebimento}`,
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

        it('Validar retorno 401 - /api/v1/contas-receber/{id}', () => {
            const token = Cypress.env('access_token');
            const idRecebimento = Cypress.env('idRecebimento') // Reutiliza o ID

            cy.request({
                method: 'PUT',
                url: `/api/v1/contas-receber/${idRecebimento}`,
                headers: {
                    //'Authorization': `Bearer ${token}`, Token inválido
                    'Content-Type': 'application/json'
                },
                body: {
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(401);
                cy.log(JSON.stringify(response.body));
            })
        })
    })

    describe('Módulo - Contas a Receber - Exclui um recebimento por id', () => {

        it('Validar retorno 200 - /api/v1/contas-receber/{id}', () => {
            const token = Cypress.env('access_token');
            const idRecebimento = Cypress.env('idRecebimento') // Reutiliza o ID

            cy.request({
                method: 'DELETE',
                url: `/api/v1/contas-receber/${idRecebimento}`,
                //url: '/api/v1/contas-receber/23',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(200);
                cy.log(JSON.stringify(response.body));
                expect(response.body).to.have.property('codigo');
                expect(response.body).to.have.property('flagDeError');
                expect(response.body).to.have.property('mensagem');
            })
        })

        it('Validar retorno 400 - /api/v1/contas-receber/{id}', () => {
            const token = Cypress.env('access_token');
            const idRecebimento = Cypress.env('idRecebimento') // Reutiliza o ID

            cy.request({
                method: 'DELETE',
                url: '/api/v1/contas-receber/${id}',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(400);
                cy.log(JSON.stringify(response.body));
            })
        })

        it('Validar retorno 401 - /api/v1/contas-receber/{id}', () => {
            const token = Cypress.env('access_token');
            const idRecebimento = Cypress.env('idRecebimento') // Reutiliza o ID

            cy.request({
                method: 'DELETE',
                url: `/api/v1/contas-receber/${idRecebimento}`,
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

    describe('Módulo - Contas a Receber - Receber uma parcela da conta a receber', () => {

        it('Validar retorno 201 - /api/v1/contas-receber/parcela/recebimento', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/contas-receber/parcela/recebimento',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: {
                    "parcelaId": 26651871,
                    "dataRecebimento": "20251205",
                    "valorRecebido": "10.00",
                    "formaLiquidacaoId": 1,
                    "contaCorrenteId": 133
                },
                failOnStatusCode: false
            }).then((response) => {

                expect(response.status).to.eq(201);
                cy.log(JSON.stringify(response.body));

                // Valida somente os campos do objeto principal
                expect(response.body).to.have.all.keys(
                    "id",
                    "dataVencimento",
                    "numeroParcela",
                    "valor",
                    "observacao",
                    "flagAtivo",
                    "ipClient",
                    "createdAt",
                    "updatedAt",
                    "createdBy",
                    "lastUser",
                    "dataCriacao",
                    "fkRecebimento",
                    "fkRecebimentoStatus",
                    "liquidacoes"
                );

                // Valida somente os campos da primeira liquidação
                expect(response.body.liquidacoes[0]).to.have.all.keys(
                    "id",
                    "fkRecebimentoParcela",
                    "fklancamentoFinaceiro",
                    "contaCorrenteId",
                    "dataRecebimento",
                    "valor",
                    "flagAtivo",
                    "ipClient",
                    "createdAt",
                    "updatedAt",
                    "createdBy",
                    "lastUser",
                    "fkFormaLiquidacao",
                    "dataEntrada"
                )
            })
        })

        it('Validar retorno 400 - /api/v1/contas-receber/parcela/recebimento', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/contas-receber/parcela/recebimento',
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

        it('Validar retorno 401 - /api/v1/contas-receber/parcela/recebimento', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/contas-receber/parcela/recebimento',
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

    describe('Módulo - Contas a Receber - Pagamento de uma conta a receber por cartão', () => {

        it('Validar retorno 201 - /api/v1/contas-receber/parcela/recebimento/cartao', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/contas-receber/parcela/recebimento/cartao',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: {
                    "unidadeId": 1,
                    "propostaId": 1,
                    "parcelaId": 1,
                    "valor": 100,
                    "dataPagamento": "20251205",
                    "quantidadeParcelas": 2,
                    "flagUseFiserv": true
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(201);
            })
        })

        it('Validar retorno 400 - /api/v1/contas-receber/parcela/recebimento/cartao', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/contas-receber/parcela/recebimento/cartao',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: { // sem parâmetro no body
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(400);
            })
        })

        it('Validar retorno 401 - /api/v1/contas-receber/parcela/recebimento/cartao', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/contas-receber/parcela/recebimento/cartao',
                headers: {
                    //'Authorization': `Bearer ${token}`, Token inválido
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

    describe('Módulo - Contas a Receber - Atualiza o evento do recebimento em cartão', () => {

        it('Validar retorno 201 - /api/v1/contas-receber/parcela/recebimento/resposta-cartao-fiserv', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/contas-receber/parcela/recebimento/resposta-cartao-fiserv',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: {
                    "evento": "transaction.succeeded",
                    "hashZoop": 1,
                    "transacaoId": "efda277e38ae4ffa96605ddf44220d99",
                    "taxaCartao": "1.12",
                    "contaCorrenteId": 123,
                    "formaLiquidacao": 8,
                    "parcelaId": 8,
                    "propostaId": 1,
                    "nomeTitular": "João Marques",
                    "codBandeira": "20003",
                    "autorizacao": "1231241"
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(201);
            })
        })

        it('Validar retorno 400 - /api/v1/contas-receber/parcela/recebimento/resposta-cartao-fiserv', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/contas-receber/parcela/recebimento/resposta-cartao-fiserv',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: { // sem parâmetro no body
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(400);
            })
        })

        it('Validar retorno 401 - /api/v1/contas-receber/parcela/recebimento/resposta-cartao-fiserv', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/contas-receber/parcela/recebimento/resposta-cartao-fiserv',
                headers: {
                    //'Authorization': `Bearer ${token}`, token inválido
                    'Content-Type': 'application/json'
                },
                body: {
                    "evento": "transaction.succeeded",
                    "hashZoop": 1,
                    "transacaoId": "efda277e38ae4ffa96605ddf44220d99",
                    "taxaCartao": "1.12",
                    "contaCorrenteId": 123,
                    "formaLiquidacao": 8,
                    "parcelaId": 8,
                    "propostaId": 1,
                    "nomeTitular": "João Marques",
                    "codBandeira": "20003",
                    "autorizacao": "1231241"
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(401);
            })
        })
    })

    describe('Módulo - Contas a Receber - Cancela uma liquidacao de uma parcela da conta a receber', () => {

        it('Validar retorno 201 - /api/v1/contas-receber/parcela/recebimento/cancelar', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/contas-receber/parcela/recebimento/cancelar',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: {
                    "parcelaId": 1,
                    "parcelaLiquidacaoId": 1
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(201);
            })
        })

        it('Validar retorno 400 - /api/v1/contas-receber/parcela/recebimento/cancelar', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/contas-receber/parcela/recebimento/cancelar',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: { // sem parâmetro no body
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(400);
            })
        })

        it('Validar retorno 401 - /api/v1/contas-receber/parcela/recebimento/cancelar', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/contas-receber/parcela/recebimento/cancelar',
                headers: {
                    //'Authorization': `Bearer ${token}`, token inválido
                    'Content-Type': 'application/json'
                },
                body: {
                    "parcelaId": 1,
                    "parcelaLiquidacaoId": 1
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(401);
            })
        })
    })

    describe('Módulo - Contas a Receber - Gerar recibo pelo Id da parcela', () => {

        it('Validar retorno 200 - /api/v1/contas-receber/parcela/{parcelaId}/recibo', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/contas-receber/parcela/206/recibo',
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

        it('Validar retorno 400 - /api/v1/contas-receber/parcela/{parcelaId}/recibo', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/contas-receber/parcela/{parcelaId}/recibo', // sem parâmetro na url
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

        it('Validar retorno 401 - /api/v1/contas-receber/parcela/{parcelaId}/recibo', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/contas-receber/parcela/{parcelaId}/recibo',
                headers: {
                    //'Authorization': `Bearer ${token}`, token inválido
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(401);
                cy.log(JSON.stringify(response.body));
            })
        })
    })

    describe('Módulo - Contas a Receber - Retorna lista de historico da contas a receber', () => {

        it('Validar retorno 200 - /api/v1/contas-receber/{id}/historico', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/contas-receber/4543/historico',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(200);
                cy.log(JSON.stringify(response.body));

                const body = response.body;
                expect(response.body).to.be.an('array')
                body.forEach((item) => {
                    expect(item).to.have.property('recebimentoId');
                    expect(item).to.have.property('itemId');
                    expect(item).to.have.property('data');
                    expect(item).to.have.property('msg');
                })
            })
        })

        it('Validar retorno 400 - /api/v1/contas-receber/{id}/historico', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/contas-receber/{id}/historico', // sem parâmetro na url
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

        it('Validar retorno 401 - /api/v1/contas-receber/{id}/historico', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/contas-receber/4543/historico',
                headers: {
                    //'Authorization': `Bearer ${token}`, token inválido
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(401);
                cy.log(JSON.stringify(response.body));
            })
        })
    })

    describe('Módulo - Contas a Receber - Retorna lista de status de contas a receber', () => {

        it('Validar retorno 200 - /api/v1/contas-receber/status/list', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/contas-receber/status/list',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(200);
                cy.log(JSON.stringify(response.body));

                const body = response.body;
                expect(response.body).to.be.an('array');
                body.forEach((item) => {
                    expect(item).to.have.property('id');
                    expect(item).to.have.property('status');
                    expect(item).to.have.property('flagAtivo');
                    expect(item).to.have.property('ipClient');
                    expect(item).to.have.property('createdAt');
                    expect(item).to.have.property('updatedAt');
                    expect(item).to.have.property('createdBy');
                    expect(item).to.have.property('lastUser');
                })
            })
        })

        it('Validar retorno 401 - /api/v1/contas-receber/status/list', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/contas-receber/status/list',
                headers: {
                    //'Authorization': `Bearer ${token}`, token inválido
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(401);
                cy.log(JSON.stringify(response.body));
            })
        })
    })

    describe('Módulo - Contas a Receber - Retorna lista de classificacao financeira do tipo Receita', () => {

        it('Validar retorno 200 - /api/v1/contas-receber/classificacao-financeira/list', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/contas-receber/classificacao-financeira/list',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(200);
                cy.log(JSON.stringify(response.body));

                const body = response.body;
                body.forEach((item) => {
                    expect(item).to.have.property('id');
                    expect(item).to.have.property('classificacaoFinanceira');
                    expect(item).to.have.property('categoriaFinanceira');
                })
            })
        })

        it('Validar retorno 401 - /api/v1/contas-receber/classificacao-financeira/list', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/contas-receber/classificacao-financeira/list',
                headers: {
                    //'Authorization': `Bearer ${token}`, token inválido
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(401);
                cy.log(JSON.stringify(response.body));
            })
        })
    })

    describe('Módulo - Contas a Receber - Retorna lista de tipos de pagadores de conta a receber', () => {

        it('Validar retorno 200 - /api/v1/contas-receber/tipos-pagadores/list', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/contas-receber/tipos-pagadores/list',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(200);
                cy.log(JSON.stringify(response.body));

                const body = response.body;
                body.forEach((item) => {
                    expect(item).to.have.property('id');
                    expect(item).to.have.property('liquidante');
                })
            })
        })

        it('Validar retorno 401 - /api/v1/contas-receber/tipos-pagadores/list', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/contas-receber/tipos-pagadores/list',
                headers: {
                    //'Authorization': `Bearer ${token}`, token inválido
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(401);
                cy.log(JSON.stringify(response.body));
            })
        })
    })

    describe('Módulo - Contas a Receber - Retorna lista de tipos de recebimento de conta a receber', () => {

        it('Validar retorno 200 - /api/v1/contas-receber/tipos-recebimento/list', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/contas-receber/tipos-recebimento/list',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(200);
                cy.log(JSON.stringify(response.body));

                const body = response.body;
                body.forEach((item) => {
                    expect(item).to.have.property('id');
                    expect(item).to.have.property('tipoRecebimento');
                })
            })
        })

        it('Validar retorno 401 - /api/v1/contas-receber/tipos-recebimento/list', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/contas-receber/tipos-recebimento/list',
                headers: {
                    //'Authorization': `Bearer ${token}`, token inválido
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(401);
                cy.log(JSON.stringify(response.body));
            })
        })
    })

    describe('Módulo - Contas a Receber - Retorna dados de um lançamento financeiro', () => {
        it('Validar retorno 200 - /api/v1/contas-receber/parcela/lancamento-financeiro', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/contas-receber/parcela/lancamento-financeiro',
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

        it('Validar retorno 400 - /api/v1/contas-receber/parcela/lancamento-financeiro', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/contas-receber/parcela/lancamento-financeiro', //sem parâmetro
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

        it('Validar retorno 401 - /api/v1/contas-receber/parcela/lancamento-financeiro', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/contas-receber/parcela/lancamento-financeiro',
                headers: {
                    //'Authorization': `Bearer ${token}`, token inválido
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
