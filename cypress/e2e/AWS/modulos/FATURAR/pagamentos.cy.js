/// <reference types="cypress"/>

describe('Módulo - Pagamentos', () => {
    beforeEach(() => {
        cy.login();
        cy.refreshToken();
    })

    describe('Módulo - Pagamentos - Pagamento de um agendamento', () => {

        it('Validar retorno 200 - /api/v1/payments', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/payments',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: {
                    "unidadeId": 483,
                    "agendamentoId": 23659467,
                    "formaLiquidacaoId": 1,
                    "ipClient": "10.244.5.128",
                    "valor": 120,
                    "dataPagamento": "20260113"
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(201);
                cy.log(JSON.stringify(response.body));

                expect(response.body).to.have.property('codigo');
                expect(response.body).to.have.property('mensagem');
                expect(response.body).to.have.property('id').to.be.an('array');
                expect(response.body).to.have.property('valorRecebido');
                expect(response.body).to.have.property('valorPagamento');
                expect(response.body).to.have.property('recebimentos').to.be.an('array');
                response.body.recebimentos.forEach((recebimento) => {
                    expect(recebimento).to.have.property('id').to.be.a('number');
                    expect(recebimento).to.have.property('fkFormaLiquidacao').to.be.a('number');
                    expect(recebimento).to.have.property('valor').to.be.a('number');
                    expect(recebimento).to.have.property('valorTotal').to.be.a('number');
                    expect(recebimento).to.have.property('criadoEm').to.be.a('string');
                    expect(recebimento).to.have.property('flgConciliada').to.be.a('string');
                    expect(recebimento).to.have.property('fkContaCorrente').to.be.a('number');
                    expect(recebimento).to.have.property('dataPagamento').to.be.a('string');

                    expect(recebimento.contaCorrenteId).to.be.an('object');
                    expect(recebimento.contaCorrenteId).to.have.property('id').to.be.a('number');
                    expect(recebimento.contaCorrenteId).to.have.property('fkContaCorrente').to.be.null;
                })
            })
        })

        it('Validar retorno 400 - /api/v1/payments', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/payments',
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

        it('Validar retorno 401 - /api/v1/payments', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/payments',
                headers: {
                    //'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: {
                    "unidadeId": 483,
                    "agendamentoId": 23658228,
                    "formaLiquidacaoId": 1,
                    "ipClient": "10.244.5.128",
                    "valor": 120,
                    "dataPagamento": "20260107"
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(401);
                cy.log(JSON.stringify(response.body));
            })
        })
    })

    //Rota não está mais sendo utilizada
    describe('Módulo - Pagamentos - Pagamento de um agendamento', () => {

        it('Validar retorno 201 - /api/v1/payments/multiple-scheduling', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/payments/multiple-scheduling',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: {
                    "unidadeId": 483,
                    "agendamentoId": 23659507,
                    "formaLiquidacaoId": 1,
                    "ipClient": "10.244.5.128",
                    "valor": 120,
                    "dataPagamento": "20260113"
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(201);
                cy.log(JSON.stringify(response.body));

                expect(response.body).to.have.property('payment');
                expect(response.body).to.have.property('ipClient');
                expect(response.body).to.have.property('currentUser');
            })
        })

        it('Validar retorno 400 - /api/v1/payments/multiple-scheduling', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/payments/multiple-scheduling',
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

        it('Validar retorno 401 - /api/v1/payments/multiple-scheduling', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/payments/multiple-scheduling',
                headers: {
                    //'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: {
                    "unidadeId": 483,
                    "agendamentoId": 23659507,
                    "formaLiquidacaoId": 1,
                    "ipClient": "10.244.5.128",
                    "valor": 120,
                    "dataPagamento": "20260113"
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(401);
                cy.log(JSON.stringify(response.body));
            })
        })
    })

    //Esta rota não é passível de testes no momento.
    describe('Módulo - Pagamentos - Pagamento de um agendamento por cartão', () => {

        it('Validar retorno 201 - /api/v1/payments/cartao', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/payments/cartao',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: {
                    "unidadeId": 1,
                    "propostaId": 1,
                    "parcelaId": 1,
                    "valor": 100,
                    "dataPagamento": "20230101",
                    "quantidadeParcelas": 2,
                    "flagUseFiserv": true
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(201);
                cy.log(JSON.stringify(response.body));

                expect(response.body).to.have.property('payment');
                expect(response.body).to.have.property('ipClient');
                expect(response.body).to.have.property('currentUser');
            })
        })

        it('Validar retorno 400 - /api/v1/payments/cartao', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/payments/cartao',
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

        it('Validar retorno 401 - /api/v1/payments/cartao', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/payments/cartao',
                headers: {
                    //'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: {
                    "unidadeId": 1,
                    "propostaId": 1,
                    "parcelaId": 1,
                    "valor": 100,
                    "dataPagamento": "20230101",
                    "quantidadeParcelas": 2,
                    "flagUseFiserv": true
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(401);
                cy.log(JSON.stringify(response.body));
            })
        })
    })

    describe('Módulo - Pagamentos - Verifica se a unidade logada utiliza serviços da FiServ', () => {

        it('Validar retorno 200 - /api/v1/payments/check-fiserv', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/payments/check-fiserv',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(200);
                cy.log(JSON.stringify(response.body));

                expect(response.body).to.have.property('useFiserv');
            })
        })

        it('Validar retorno 401 - /api/v1/payments/check-fiserv', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/payments/check-fiserv',
                headers: {
                    //'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(401);
                cy.log(JSON.stringify(response.body));
            })
        })
    })

    //Esta rota não é passível de testes no momento.
    describe('Módulo - Pagamentos - Atualiza o evento do recebimento em cartão pela operadora FiServ', () => {

        it('Validar retorno 201 - /api/v1/payments/resposta-cartao-fiserv', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/payments/resposta-cartao-fiserv',
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
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(201);
                cy.log(JSON.stringify(response.body));

                expect(response.body).to.have.property('ipClient');
                expect(response.body).to.have.property('confirmPayment');
                expect(response.body).to.have.property('user');
                expect(response.body).to.have.property('token');
            })
        })

        it('Validar retorno 400 - /api/v1/payments/resposta-cartao-fiserv', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/payments/resposta-cartao-fiserv',
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

        it('Validar retorno 401 - /api/v1/payments/resposta-cartao-fiserv', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/payments/resposta-cartao-fiserv',
                headers: {
                    //'Authorization': `Bearer ${token}`,
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
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(401);
                cy.log(JSON.stringify(response.body));
            })
        })
    })

    describe('Módulo - Pagamentos - Altera a Flag Registrado do token diario da unidade para 1', () => {

        it('Validar retorno 200 - /api/v1/payments/registered-fiserv-token', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/payments/registered-fiserv-token',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: {
                    "id": 142,
                    "token": "1424-2123-4125-4232"
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(201);
                cy.log(JSON.stringify(response.body));

                expect(response.body).to.have.property('codigo');
                expect(response.body).to.have.property('flagDeError');
                expect(response.body).to.have.property('mensagem');
            })
        })

        it('Validar retorno 401 - /api/v1/payments/registered-fiserv-token', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/payments/registered-fiserv-token',
                headers: {
                    //'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: {
                    "id": 142,
                    "token": "1424-2123-4125-4232"
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(401);
                cy.log(JSON.stringify(response.body));
            })
        })
    })

    describe('Módulo - Pagamentos - Lista forma de liquidação', () => {

        it('Validar retorno 200 - /api/v1/payments/form-liquidation', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/payments/form-liquidation',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(200);
                cy.log(JSON.stringify(response.body));

                expect(response.body).to.be.an('array');
                response.body.forEach((body) => {
                    expect(body).to.have.property('id');
                    expect(body).to.have.property('formaLiquidacao');
                    expect(body).to.have.property('tipoOperacaoId');
                    expect(body).to.have.property('tipoOperacao');
                })
            })
        })

        it('Validar retorno 401 - /api/v1/payments/form-liquidation', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/payments/form-liquidation',
                headers: {
                    //'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(401);
                cy.log(JSON.stringify(response.body));
            })
        })
    })

    describe('Módulo - Pagamentos - Lista forma de liquidação', () => {

        it('Validar retorno 200 - /api/v1/payments/form-liquidation-new-checkin', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/payments/form-liquidation-new-checkin?unidadeId=483',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(200);
                cy.log(JSON.stringify(response.body));

                expect(response.body).to.be.an('array');
                response.body.forEach((body) => {
                    expect(body).to.have.property('id');
                    expect(body).to.have.property('formaLiquidacao');
                    expect(body).to.have.property('tipoOperacaoId');
                    expect(body).to.have.property('tipoOperacao');
                    expect(body).to.have.property('fkUnidade');
                    expect(body).to.have.property('idContaCorrente');
                    expect(body).to.have.property('contaCorrente');
                })
            })
        })

        it('Validar retorno 401 - /api/v1/payments/form-liquidation-new-checkin', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/payments/form-liquidation-new-checkin?unidadeId=483',
                headers: {
                    //'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(401);
                cy.log(JSON.stringify(response.body));
            })
        })
    })

    describe('Módulo - Pagamentos - Webhook Zoop', () => {

        it('Validar retorno 200 - /api/v1/payments/webhookZoop', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/payments/webhookZoop',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(200);
                cy.log('Retorna vazio', JSON.stringify(response.body));
            })
        })
    })

    describe('Módulo - Pagamentos - Lista origens de splits', () => {

        it('Validar retorno 200 - /api/v1/payments/splits/origens', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/payments/splits/origens',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(200);
                cy.log(JSON.stringify(response.body));

                expect(response.body).to.be.an('array');
                response.body.forEach((body) => {
                    expect(body).to.have.property('origem');
                    expect(body).to.have.property('origemDescricao');
                })
            })
        })

        it('Validar retorno 401 - /api/v1/payments/splits/origens', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/payments/splits/origens',
                headers: {
                    //'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(401);
                cy.log(JSON.stringify(response.body));
            })
        })
    })

    describe('Módulo - Pagamentos - Lista de splits', () => {

        it('Validar retorno 200 - /api/v1/payments/splits', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/payments/splits?page=1&limit=1&dataInicio=2025-10-01&dataFim=2026-01-13',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(200);
                cy.log(JSON.stringify(response.body));

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

        it('Validar retorno 400 - /api/v1/payments/splits', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/payments/splits',
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

        it('Validar retorno 401 - /api/v1/payments/splits', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/payments/splits?page=1&limit=1&dataInicio=2025-10-01&dataFim=2026-01-13',
                headers: {
                    //'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(401);
                cy.log(JSON.stringify(response.body));
            })
        })
    })

    describe('Módulo - Pagamentos - Lista os dados de um split', () => {

        it('Validar retorno 200 - /api/v1/payments/splits', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/payments/splits/17132841',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(200);
                cy.log(JSON.stringify(response.body));

                expect(response.body).to.be.an('object');
                expect(response.body).to.have.property('id');
                expect(response.body).to.have.property('data');
                expect(response.body).to.have.property('formaLiquidacao');
                expect(response.body).to.have.property('valorTransacao');
                expect(response.body).to.have.property('bandeira');
                expect(response.body).to.have.property('transacaoId');
                expect(response.body).to.have.property('usuario');
                expect(response.body).to.have.property('movementId');
                expect(response.body).to.have.property('invoiceId');
                expect(response.body).to.have.property('splits');

                expect(response.body.splits).to.be.an('array');
                response.body.splits.forEach((split) => {
                    expect(split).to.have.property('recebedor');
                    expect(split).to.have.property('status');
                    expect(split).to.have.property('dataSplit');
                    expect(split).to.have.property('sellerId');
                    expect(split).to.have.property('origem');
                    expect(split).to.have.property('valorSplit');
                    expect(split).to.have.property('splitId');
                    expect(split).to.have.property('id');
                })
            })
        })

        it('Validar retorno 400 - /api/v1/payments/splits', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/payments/splits',
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

        it('Validar retorno 401 - /api/v1/payments/splits', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/payments/splits/17132841',
                headers: {
                    //'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(401);
                cy.log(JSON.stringify(response.body));
            })
        })
    })

    describe('Módulo - Pagamentos - Lista forma de liquidacao tipo de operação 2.', () => {

        it('Validar retorno 200 - /api/v1/payments/form-liquidation-billsToPay', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/payments/form-liquidation-billsToPay',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(200);
                cy.log(JSON.stringify(response.body));

                expect(response.body).to.be.an('array');
                response.body.forEach((body) => {
                    expect(body).to.have.property('id');
                    expect(body).to.have.property('formaLiquidacao');
                    expect(body).to.have.property('tipoOperacaoId');
                    expect(body).to.have.property('tipoOperacao');
                })
            })
        })

        it('Validar retorno 401 - /api/v1/payments/form-liquidation-billsToPay', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/payments/form-liquidation-billsToPay',
                headers: {
                    //'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(401);
                cy.log(JSON.stringify(response.body));
            })
        })
    })

    describe('Módulo - Pagamentos - Cancelar um pagamento', () => {

        it('Validar retorno 200 - /api/v1/payments/cancelar', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'PUT',
                url: '/api/v1/payments/cancelar',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: {
                    "parcelaId": 18444404,
                    "agendamentoId": 23659447
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(200);
                cy.log(JSON.stringify(response.body));
                
                expect(response.body).to.have.property('codigo');
                expect(response.body).to.have.property('flagDeError');
                expect(response.body).to.have.property('mensagem');
                expect(response.body).to.have.property('recebimentos').to.be.an('array');
            })
        })

        it('Validar retorno 400 - /api/v1/payments/cancelar', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'PUT',
                url: '/api/v1/payments/cancelar',
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

        it('Validar retorno 401 - /api/v1/payments/cancelar', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'PUT',
                url: '/api/v1/payments/cancelar',
                headers: {
                    //'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: {
                    "parcelaId": 18444404,
                    "agendamentoId": 23659447
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(401);
                cy.log(JSON.stringify(response.body));
            })
        })
    })

    //Rota não está mais sendo utilizada
    describe('Módulo - Pagamentos - Log Zoop', () => {

        it('Validar retorno 200 - /api/v1/payments/logZoop', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/payments/logZoop',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(201);
                cy.log(JSON.stringify(response.body));

                expect(response.body).to.have.property('flagDeError');
                expect(response.body).to.have.property('codigo');
                expect(response.body).to.have.property('mensagem');
            })
        })

        it('Validar retorno 401 - /api/v1/payments/logZoop', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/payments/logZoop',
                headers: {
                    //'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(401);
                cy.log(JSON.stringify(response.body));
            })
        })
    })
})