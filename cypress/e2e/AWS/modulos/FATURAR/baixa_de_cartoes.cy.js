/// <reference types="cypress"/>

describe('Módulo - Baixa de Cartões', () => {
    beforeEach(() => {
        cy.login()
        cy.refreshToken()
    })

    describe('Módulo - Baixa de Cartões - Retorna lista de lançamentos financeiros com cartão', () => {

        it('Validar retorno 200 - /api/v1/baixa-cartao', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/baixa-cartao?page=1&limit=1&dataInicial=20250102&dataFinal=20251230',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(200);
                cy.log(JSON.stringify(response.body));

                const body = response.body;
                expect(body).to.have.property('items').to.be.an('array')
                body.items.forEach((item) => {
                    expect(item).to.have.property('id');
                    expect(item).to.have.property('pagador');
                    expect(item).to.have.property('pagadorId');
                    expect(item).to.have.property('titularCartao');
                    expect(item).to.have.property('transacao');
                    expect(item).to.have.property('autorizacao');
                    expect(item).to.have.property('dataCompra');
                    expect(item).to.have.property('bandeira');
                    expect(item).to.have.property('valorCompra');
                    expect(item).to.have.property('valorCredito');
                    expect(item).to.have.property('valorCreditoMovingPay');
                    expect(item).to.have.property('dataCredito');
                    expect(item).to.have.property('recibo');
                    expect(item).to.have.property('parcela');
                    expect(item).to.have.property('conciliado');
                    expect(item).to.have.property('conciliadoEm');
                    expect(item).to.have.property('cancelado');
                    expect(item).to.have.property('splits');
                    expect(item).to.have.property('dataVencimento');
                    expect(item).to.have.property('diasCreditoConta');
                    expect(item).to.have.property('numeroParcelas');
                    expect(item).to.have.property('quantidadeParcelas');
                    expect(item).to.have.property('valorMovingPay');
                    expect(item).to.have.property('taxaCartao');
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

        it('Validar retorno 400 - /api/v1/baixa-cartao', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/baixa-cartao', // sem parâmetro
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

        it('Validar retorno 401 - /api/v1/baixa-cartao', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/baixa-cartao?page=1&limit=10&dataInicial=20250102&dataFinal=20251230',
                headers: {
                    //'Authorization': `Bearer ${token}`, token inválido
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(401);
                cy.log(JSON.stringify(response.body));
            })
        })
    })

    // Tabela lancamentos_financeiros_splits (coluna fk_lancamentos_financeiros)
    describe('Módulo - Baixa de Cartões - Retorna lista de splits de um lançamento financeiro', () => {

        it('Validar retorno 200 - /api/v1/baixa-cartao/{id}/splits', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/baixa-cartao/66001/splits',
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
                    expect(body).to.have.property('lancamentoFinanceiroId');
                    expect(body).to.have.property('origem');
                    expect(body).to.have.property('sellerId');
                    expect(body).to.have.property('taxaCartao');
                    expect(body).to.have.property('valorBruto');
                    expect(body).to.have.property('valorLiquido');
                })
            })
        })

        it('Validar retorno 400 - /api/v1/baixa-cartao/{id}/splits', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/baixa-cartao/{id}/splits', // sem parâmetro
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

        it('Validar retorno 401 - /api/v1/baixa-cartao/{id}/splits', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/baixa-cartao/0/splits',
                headers: {
                    //'Authorization': `Bearer ${token}`, token inválido
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(401);
                cy.log(JSON.stringify(response.body));
            })
        })
    })

    // Tabela lancamentos_financeiros (coluna id)
    //select * from lancamentos_financeiros lf where lf.id = '1454397'
    describe.only('Módulo - Baixa de Cartões - Concializa/faz a baixa dos pagamentos selecionados ou unico', () => {

        it('Validar retorno 201 - /api/v1/baixa-cartao/conciliar', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/baixa-cartao/conciliar',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: {
                    "pagamentos": [
                        {
                            "id": 1452454,
                            "valor": 5,
                            "dataCredito": "20260106",
                            "dataVencimento": "20260205",
                            "conciliado": false
                        }
                    ]
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(201);
                cy.log(JSON.stringify(response.body));

                expect(response.body).to.have.property('codigo');
                expect(response.body).to.have.property('flagDeError');
                expect(response.body).to.have.property('mensagem');
            })
        })

        it('Validar retorno 400 - /api/v1/baixa-cartao/conciliar', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/baixa-cartao/conciliar',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: { // Sem parâmtros 
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(400);
                cy.log(JSON.stringify(response.body));
            })
        })

        it('Validar retorno 401 - /api/v1/baixa-cartao/conciliar', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/baixa-cartao/conciliar',
                headers: {
                    //'Authorization': `Bearer ${token}`, Token inválido
                    'Content-Type': 'application/json'
                },
                body: {
                    pagamentos: [
                        {
                            id: 75331,
                            valor: 1,
                            dataCredito: "20251001",
                            dataVencimento: "20250814",
                            conciliado: false
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
})