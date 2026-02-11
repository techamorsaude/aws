/// <reference types="cypress"/>


describe('Módulo - Repasses', () => {
    beforeEach(() => {
        cy.login();
        cy.refreshToken();
    })

    describe('Módulo - Repasses - Retorna lista de repasses', () => {

        it('Validar retorno 200 - /api/v1/repasses/novo-repasse', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/repasses/novo-repasse?page=1&limit=1',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(200);
                cy.log(JSON.stringify(response.body));

                const body = response.body;
                expect(body).to.have.property('items').to.be.an('array');
                body.items.forEach((item) => {
                    expect(item).to.have.property('id');
                    expect(item).to.have.property('dataExecucao');
                    expect(item).to.have.property('dataPagamento');
                    expect(item).to.have.property('valorRepasse');
                    expect(item).to.have.property('pacienteName');
                    expect(item).to.have.property('profissionalName');
                    expect(item).to.have.property('fornecedorName');
                    expect(item).to.have.property('procedimentoName');
                    expect(item).to.have.property('dataConciliacao');
                    expect(item).to.have.property('descricao');
                    expect(item).to.have.property('total_count');
                    expect(item).to.have.property('paciente');
                    expect(item).to.have.property('fornecedor');
                    expect(item).to.have.property('procedimento');
                    expect(item).to.have.property('profissional');
                    expect(item).to.have.property('statusPagamento');
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

        it('Validar retorno 401 - /api/v1/repasses/novo-repasse', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/repasses/novo-repasse',
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

    describe('Módulo - Repasses - Retorna uma lista de Executante', () => {

        it('Validar retorno 200 - /api/v1/repasses/executante', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/repasses/executante',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(200);
                cy.log(JSON.stringify(response.body));

                const body = response.body;
                expect(body).to.be.an('array');
                body.forEach((item) => {
                    expect(item).to.have.property('id');
                    expect(item).to.have.property('unidade');
                    expect(item).to.have.property('unidadeId');
                    expect(item).to.have.property('idFornecedor');
                    expect(item).to.have.property('fornecedor');
                    expect(item).to.have.property('nomeFantasia');
                    expect(item).to.have.property('tipoFornecedor');
                    expect(item).to.have.property('flgExecutante');
                })
            })
        })

        it('Validar retorno 401 - /api/v1/repasses/executante', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/repasses/executante',
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

    describe('Módulo - Repasses - Consolidar', () => {

        it('Validar retorno 201 - /api/v1/repasses/novo-consolidar', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/repasses/novo-consolidar',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: {
                    "repasseIds": [
                        17828856
                    ]
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(201);
                cy.log('Response body retorna vazio', JSON.stringify(response.body))
            })
        })

        it('Validar retorno 400 - /api/v1/repasses/novo-consolidar', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/repasses/novo-consolidar',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: { //Sem parâmetro no body
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(400);
                cy.log(JSON.stringify(response.body));
            })
        })

        it('Validar retorno 401 - /api/v1/repasses/novo-consolidar', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/repasses/novo-consolidar',
                headers: {
                    //'Authorization': `Bearer ${token}`, Token inválido
                    'Content-Type': 'application/json'
                },
                body: {
                    "repasseIds": [
                        17828856
                    ]
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(401);
                cy.log(JSON.stringify(response.body));
            })
        })
    })

    describe('Módulo - Repasses - Desconsolidar', () => {

        it('Validar retorno 201 - /api/v1/repasses/novo-desconsolidar', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/repasses/novo-desconsolidar',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: {
                    "repasseIds": [
                        17828856
                    ]
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(201);
                cy.log('Response body retorna vazio', JSON.stringify(response.body))
            })
        })

        it('Validar retorno 400 - /api/v1/repasses/novo-desconsolidar', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/repasses/novo-desconsolidar',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: { // Sem parametro no body
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(400);
                cy.log(JSON.stringify(response.body));
            })
        })

        it('Validar retorno 401 - /api/v1/repasses/novo-desconsolidar', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/repasses/novo-desconsolidar',
                headers: {
                    //'Authorization': `Bearer ${token}`, Token inválido
                    'Content-Type': 'application/json'
                },
                body: {
                    repasseIds: [
                        0,
                        1,
                        2,
                        3,
                        4,
                        5
                    ]
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(401);
                cy.log(JSON.stringify(response.body));
            })
        })
    })

    // Para a execução do teste abaixo, utilize o ID do repasse (coluna `id`).
    //(A_PAGAR = 1, PAGO = 2, CONTA_GERADA = 3, CONSOLIDADO = 4, AGUARDANDO_SPLIT = 5, SPLITADO = 6)
    // Consulta de apoio: 
    // select * from repasse r
    // where r.fk_status_pagamento = '4'
    // order by r.id desc;
    describe('Módulo - Repasses - Criar um contas a pagar pelo repasse', () => {

        it('validar retorno 201 - /api/v1/repasses/novo-conta-pagar-repasse', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/repasses/novo-conta-pagar-repasse',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: {
                    repassesIds: [12320005],
                    flgCaixa: 0,
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(400);
                cy.log(JSON.stringify(response.body));
                expect(response.body).to.have.property('codigo');
                expect(response.body).to.have.property('flagDeError');
                expect(response.body).to.have.property('mensagem');
                expect(response.body).to.have.property('id');
            })
        })

        it('validar retorno 400 - /api/v1/repasses/novo-conta-pagar-repasse', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/repasses/novo-conta-pagar-repasse',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: {
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(400);
                cy.log(JSON.stringify(response.body));
            })
        })

        it('validar retorno 401 - /api/v1/repasses/novo-conta-pagar-repasse', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/repasses/novo-conta-pagar-repasse',
                headers: {
                    //'Authorization': `Bearer ${token}`, Token inválido
                    'Content-Type': 'application/json'
                },
                body: {
                    repassesIds: [147675],
                    flgCaixa: 0,
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(401);
                cy.log(JSON.stringify(response.body));
            })
        })
    })
})