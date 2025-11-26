/// <reference types="cypress" />

/// https://amorsaudesuporte.atlassian.net/browse/FRAN-1765
describe('Módulo - Locais de Atendimento', () => {
    beforeEach(() => {
        cy.login();
        cy.refreshToken();
    })

    describe('Módulo - Locais de Atendimento - Cria um local de atendimento', () => {

        it('Validar retorno 200 - /api/v1/locais-de-atendimento', () => {
            const token = Cypress.env('access_token');
            const geraDescricao = `descricao${Math.floor(Math.random() * 1000) + 1}`;

            cy.request({
                method: 'POST',
                url: '/api/v1/locais-de-atendimento',
                headers: {
                    "Authorization": `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: {
                    "descricao": geraDescricao,
                    "clinicaId": {
                        "id": 483
                    }
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(201);

                expect(response.body).to.have.property('codigo');
                expect(response.body).to.have.property('flagDeError');
                expect(response.body).to.have.property('mensagem');
                expect(response.body).to.have.property('id');

                // Salva o ID
                const idLocal = response.body.id;
                Cypress.env('idLocal', idLocal);
                cy.log('ID salvo:', idLocal);
            })
        })

        it('Validar retorno 400 - /api/v1/locais-de-atendimento', () => {
            const token = Cypress.env('access_token');
            const geraDescricao = Math.floor(Math.random() * 1000) + 1;

            cy.request({
                method: 'POST',
                url: '/api/v1/locais-de-atendimento',
                headers: {
                    "Authorization": `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: { // Sem parâmetro no body
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(400);
            })
        })

        it('Validar retorno 401 - /api/v1/locais-de-atendimento', () => {
            const token = Cypress.env('access_token');
            const geraDescricao = Math.floor(Math.random() * 1000) + 1;

            cy.request({
                method: 'POST',
                url: '/api/v1/locais-de-atendimento',
                headers: {
                    //"Authorization": `Bearer ${token}`, Token inválido
                    'Content-Type': 'application/json'
                },
                body: {
                    descricao: `testeqa${geraDescricao}`,
                    clinicaId: {
                        id: 1
                    },
                    contaCorrentId: 135,
                    flagCaixa: {}
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(401);
            })
        })
    })

    describe('Módulo - Locais de Atendimento - Retorna uma lista de locais de atendimento', () => {

        it('Validar retorno 200 - /api/v1/locais-de-atendimento', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/locais-de-atendimento',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(200)

                const items = response.body;
                items.forEach((item) => {
                    expect(item).to.have.property('id');
                    expect(item).to.have.property('localAtendimento');
                    expect(item).to.have.property('unidade');
                    expect(item).to.have.property('unidadeId');
                    expect(item).to.have.property('flagCaixa');
                    expect(item).to.have.property('flagStatus');
                    expect(item).to.have.property('contaCorrenteId');
                })
            })
        })

        it('Validar retorno 401 - /api/v1/locais-de-atendimento', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/locais-de-atendimento',
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

    describe('Módulo - Locais de Atendimento - Retorna uma lista de locais de atendimento paginados', () => {

        it('Validar retorno 200 - /api/v1/locais-de-atendimento/filter', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/locais-de-atendimento/filter',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(200);

                const data = response.body;
                expect(data).to.have.property('items').to.be.an('array');

                data.items.forEach((item) => {
                    expect(item).to.have.property('id');
                    expect(item).to.have.property('localAtendimento');
                    expect(item).to.have.property('unidade');
                    expect(item).to.have.property('unidadeId');
                    expect(item).to.have.property('flagCaixa');
                    expect(item).to.have.property('flagStatus');
                    expect(item).to.have.property('contaCorrenteId');
                })

                const items = response.body;
                expect(items).to.have.property('meta');
                expect(items.meta).to.have.property('totalItems');
                expect(items.meta).to.have.property('currentPage');
                expect(items.meta).to.have.property('itemCount');
                expect(items.meta).to.have.property('itemsPerPage');
                expect(items.meta).to.have.property('totalPages');

            })
        })

        it('Validar retorno 401 - /api/v1/locais-de-atendimento/filter', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/locais-de-atendimento/filter',
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

    describe('Módulo - Locais de Atendimento - Retorna uma lista de locais de atendimento com caixa aberto', () => {

        it('Validar retorno 200 - /api/v1/locais-de-atendimento/caixa_aberto', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/locais-de-atendimento/caixa_aberto',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(200);

                const items = response.body;
                items.forEach((item) => {
                    expect(item).to.have.property('id');
                    expect(item).to.have.property('fkUnidade');
                    expect(item).to.have.property('descricao');
                    expect(item).to.have.property('flagAtivo');
                    expect(item).to.have.property('flagCaixa');
                    expect(item).to.have.property('createdAt');
                    expect(item).to.have.property('updatedAt');
                    expect(item).to.have.property('lastUserId');
                    expect(item).to.have.property('ipClient');
                    expect(item).to.have.property('flgRegistroFiserv');
                    expect(item).to.have.property('tokenTerminalFiserv');
                    expect(item).to.have.property('fkContaCorrente');
                })

            })
        })

        it('Validar retorno 401 - /api/v1/locais-de-atendimento/caixa_aberto', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/locais-de-atendimento/caixa_aberto',
                headers: {
                    //'Authorization': `Bearer ${token}`, // Token inválido
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(401);
            })
        })
    })

    describe('Módulo - Locais de Atendimento - Retorna locais de atendimento de acordo com ids enviados como parâmetro', () => {

        it('Validar retorno 200 - /api/v1/locais-de-atendimento/by-id', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/locais-de-atendimento/by-id',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(200);
                expect(response.body).to.be.an('object').that.is.empty;

            })
        })

        it('Validar retorno 401 - /api/v1/locais-de-atendimento/by-id', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/locais-de-atendimento/by-id',
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

    describe('Módulo - Locais de Atendimento - Retorna um local de atendimento', () => {

        it('Validar retorno 200 - /api/v1/locais-de-atendimento/{id}', () => {
            const token = Cypress.env('access_token');
            const idLocal = Cypress.env('idLocal');
            cy.log('ID:', idLocal)

            cy.request({
                method: 'GET',
                //url: `api/v1/locais-de-atendimento/${idLocal}`,
                url: '/api/v1/locais-de-atendimento/106',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(200)

                const items = response.body;
                expect(items).to.have.property('id');
                expect(items).to.have.property('localAtendimento');
                expect(items).to.have.property('unidade');
                expect(items).to.have.property('unidadeId');
                expect(items).to.have.property('flagCaixa');
                expect(items).to.have.property('flagStatus');
                expect(items).to.have.property('contaCorrenteId');
            })
        })

        it('Validar retorno 401 - /api/v1/locais-de-atendimento/{id}', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/locais-de-atendimento/{id}',
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

    describe('Módulo - Locais de Atendimento - Atualiza um local de atendimento', () => {

        it('Validar retorno 200 - /api/v1/locais-de-atendimento/{id}', () => {
            const token = Cypress.env('access_token')
            const idLocal = Cypress.env('idLocal');
            cy.log('ID:', idLocal)

            const geraDescricao = `descricao${Math.floor(Math.random() * 1000) + 1}`;

            cy.request({
                method: 'PUT',
                //url: `api/v1/locais-de-atendimento/${idLocal}`,
                url: '/api/v1/locais-de-atendimento/56',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: {
                    "descricao": "string",
                    "clinicaId": {
                        "id": 1
                    },
                    "contaCorrentId": 0,
                    "flagCaixa": {}
                    /*
                    descricao: geraDescricao,
                    clinicaId: {
                        id: 483
                    },
                    contaCorrentId: 135,
                    flagCaixa: {}*/
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(200);

                expect(response.body).to.have.property('flagCaixa')

                /*expect(response.body).to.have.property('id')
                expect(response.body).to.have.property('localAtendimento')
                expect(response.body).to.have.property('unidade')
                expect(response.body).to.have.property('unidadeId')
                expect(response.body).to.have.property('flagCaixa')
                expect(response.body).to.have.property('flagStatus')
                expect(response.body).to.have.property('contaCorrenteId')*/
            })
        })

        it('Validar retorno 400 - /api/v1/locais-de-atendimento/{id}', () => {
            const token = Cypress.env('access_token')

            cy.request({
                method: 'PUT',
                url: 'api/v1/locais-de-atendimento/430',
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

        it('Validar retorno 401 - /api/v1/locais-de-atendimento/{id}', () => {
            const token = Cypress.env('access_token')

            cy.request({
                method: 'PUT',
                url: 'api/v1/locais-de-atendimento/430',
                headers: {
                    //'Authorization': `Bearer ${token}`, Token inválido
                    'Content-Type': 'application/json'
                },
                body: {
                    descricao: "testeqa899",
                    clinicaId: {
                        id: 483
                    },
                    contaCorrentId: 135,
                    flagCaixa: {}
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(401);
            })
        })
    })

    // Precisa de dados reais do Amei
    describe('Módulo - Locais de Atendimento - Exclui um local de atendimento', () => {

        it('Validar retorno 200 - /api/v1/locais-de-atendimento/{id}', () => {
            const token = Cypress.env('access_token');
            const idLocal = Cypress.env('idLocal');

            cy.request({
                method: 'DELETE',
                url: `/api/v1/locais-de-atendimento/${idLocal}`,
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

        it('Validar retorno 400 - /api/v1/locais-de-atendimento/{id}', () => {
            const token = Cypress.env('access_token');
            const idLocal = Cypress.env('idLocal');

            cy.request({
                method: 'DELETE',
                url: '/api/v1/locais-de-atendimento/{id}',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(400);
            })
        })

        it('Validar retorno 401 - /api/v1/locais-de-atendimento/{id}', () => {
            const token = Cypress.env('access_token');
            const idLocal = Cypress.env('idLocal');

            cy.request({
                method: 'DELETE',
                url: `/api/v1/locais-de-atendimento/${idLocal}`,
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
})