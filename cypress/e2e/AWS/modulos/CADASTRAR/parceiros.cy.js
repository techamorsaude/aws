/// <reference types="cypress" />

describe('Módulo - Parceiros', () => {
    beforeEach(() => {
        cy.login();
        cy.refreshToken();
    })

    describe('Módulo - Parceiros - Lista os tipos de parceiros cadastrados', () => {

        it('Validar retorno 200 - /api/v1/parceiros/tipos', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/parceiros/tipos',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(200);

                const dado = response.body;
                expect(dado).to.have.property('items').to.be.an('array')
                dado.items.forEach((item) => {
                    expect(item).to.have.property('id');
                    expect(item).to.have.property('tipo');
                })

                expect(dado).to.have.property('meta').to.include.all.keys(
                    'totalItems',
                    'currentPage',
                    'itemCount',
                    'itemsPerPage',
                    'totalPages'
                )
            })
        })

        it('Validar retorno 401 - /api/v1/parceiros/tipos', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/parceiros/tipos',
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

    describe('Módulo - Parceiros - Obtém todos os parceiros ativos de uma clínica', () => {

        it('Validar retorno 200 - /api/v1/parceiros/partners-by-clinic', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/parceiros/partners-by-clinic',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(200)

                const item = response.body;
                item.forEach((items) => {
                    expect(items).to.have.property('id');
                    expect(items).to.have.property('nome');
                })
            })
        })

        it('Validar retorno 401 - /api/v1/parceiros/partners-by-clinic', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/parceiros/partners-by-clinic',
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

    describe('Módulo - Parceiros - Lista as tabelas de referência cadastrada', () => {

        it('Validar retorno 200 - /api/v1/parceiros/tabelas', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/parceiros/tabelas',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(200)

                const dado = response.body;
                expect(dado).to.have.property('items').to.be.an('array')
                dado.items.forEach((item) => {
                    expect(item).to.have.property('id');
                    expect(item).to.have.property('tabela');
                })

                expect(dado).to.have.property('meta').to.include.all.keys(
                    'totalItems',
                    'currentPage',
                    'itemCount',
                    'itemsPerPage',
                    'totalPages'
                )
            })

        })

        it('Validar retorno 401 - /api/v1/parceiros/tabelas', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/parceiros/tabelas',
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

    describe('Módulo - Parceiros - Lista as abrangências cadastradas', () => {

        it('Validar retorno 200 - /api/v1/parceiros/abrangencias', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/parceiros/abrangencias',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(200)

                const dado = response.body;
                expect(dado).to.have.property('items').to.be.an('array')
                dado.items.forEach((item) => {
                    expect(item).to.have.property('id');
                    expect(item).to.have.property('abrangencia');
                })

                expect(dado).to.have.property('meta').to.include.all.keys(
                    'totalItems',
                    'currentPage',
                    'itemCount',
                    'itemsPerPage',
                    'totalPages'
                )
            })

        })

        it('Validar retorno 401 - /api/v1/parceiros/abrangencias', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/parceiros/abrangencias',
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

    describe('Módulo - Parceiros - Lista os tipos de cobrança cadastrados', () => {

        it('Validar retorno 200 - /api/v1/parceiros/tipo-cobrancas', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/parceiros/tipo-cobrancas',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(200)

                const dado = response.body;
                expect(dado).to.have.property('items').to.be.an('array')
                dado.items.forEach((item) => {
                    expect(item).to.have.property('id');
                    expect(item).to.have.property('tipoCobranca');
                })

                expect(dado).to.have.property('meta').to.include.all.keys(
                    'totalItems',
                    'currentPage',
                    'itemCount',
                    'itemsPerPage',
                    'totalPages'
                )
            })

        })

        it('Validar retorno 401 - /api/v1/parceiros/tipo-cobrancas', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/parceiros/tipo-cobrancas',
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

    describe('Módulo - Parceiros - Lista os parceiros com tabelas de preços', () => {

        it('Validar retorno 200 - /api/v1/parceiros/tabela-precos', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/parceiros/tabela-precos?unidadeId=483',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(200);
                const item = response.body;
                expect(item).to.have.property('items').to.be.an('array')
                item.items.forEach((data) => {
                    expect(data).to.have.property('id');
                    expect(data).to.have.property('nome');
                    expect(data).to.have.property('tipoCobrancaId');
                    expect(data).to.have.property('createdAt');
                    expect(data).to.have.property('updatedAt');
                    expect(data).to.have.property('tabela');
                    expect(data.tabela).to.have.property('id');
                    expect(data.tabela).to.have.property('tabela');
                })

                expect(item).to.have.property('meta').to.include.all.keys(
                    'totalItems',
                    'currentPage',
                    'itemCount',
                    'itemsPerPage',
                    'totalPages'
                )
            })
        })

        it('Validar retorno 401 - /api/v1/parceiros/tabela-precos', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/parceiros/tabela-precos?unidadeId=483',
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

    describe('Módulo - Parceiros - Lista os parceiros cadastrados', () => {

        it('Validar retorno 200 - /api/v1/parceiros', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: 'api/v1/parceiros?disablePagination=false&page=1&limit=10&tipoId=1&nome=Unimed&abrangenciaId=1&unidades=483&unidades=483&tipoCobrancaId=1&tabelaId=4&flagAtivo=1',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(200)

                const dado = response.body;
                expect(dado).to.have.property('items').to.be.an('array')
                dado.items.forEach((item) => {
                    expect(item).to.have.property('id');
                    expect(item).to.have.property('tipoId');
                    expect(item).to.have.property('nome');
                    expect(item).to.have.property('tabelaId');
                    expect(item).to.have.property('abrangenciaId');
                    expect(item).to.have.property('tipoCobrancaId');
                    expect(item).to.have.property('prazoFaturamento');
                    expect(item).to.have.property('dataBase');
                    expect(item).to.have.property('flagAtivo');
                    expect(item).to.have.property('createdAt');
                    expect(item).to.have.property('updatedAt');
                    expect(item).to.have.property('cnpj');
                    expect(item).to.have.property('razaoSocial');
                    expect(item).to.have.property('telefone');
                    expect(item).to.have.property('email');
                    expect(item).to.have.property('cep');
                    expect(item).to.have.property('endereco');
                    expect(item).to.have.property('numero');
                    expect(item).to.have.property('bairro');
                    expect(item).to.have.property('cidade');
                    expect(item).to.have.property('estado');
                    expect(item).to.have.property('nomeFantasia');
                    expect(item).to.have.property('telefoneSecundario');
                    expect(item).to.have.property('regiaoZona');
                    expect(item).to.have.property('emailAlternativo');
                    expect(item).to.have.property('complemento');
                    expect(item).to.have.property('urlParceiro');
                    expect(item).to.have.property('tipo');
                    expect(item.tipo).to.have.property('id');
                    expect(item.tipo).to.have.property('tipo');
                    expect(item).to.have.property('tabela');
                    expect(item.tabela).to.have.property('id');
                    expect(item.tabela).to.have.property('tabela');
                    expect(item).to.have.property('abrangencia');
                    expect(item.abrangencia).to.have.property('id');
                    expect(item.abrangencia).to.have.property('abrangencia');
                    expect(item).to.have.property('tipoCobranca');
                    expect(item.tipoCobranca).to.have.property('id');
                    expect(item.tipoCobranca).to.have.property('tipoCobranca');
                })

                expect(dado).to.have.property('meta').to.include.all.keys(
                    'totalItems',
                    'currentPage',
                    'itemCount',
                    'itemsPerPage',
                    'totalPages'
                )
            })
        })

        it('Validar retorno 400 - /api/v1/parceiros', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST', // Método divergente
                url: 'api/v1/parceiros',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(400)
            })
        })

        it('Validar retorno 401 - /api/v1/parceiros', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: 'api/v1/parceiros',
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

    describe('Módulo - Parceiros - Cadastra um novo parceiro', () => {

        it('Validar retorno 201 - /api/v1/parceiros', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/parceiros',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: {
                    flagAtivo: "1",
                    nome: "Teste QA",
                    canais: [
                        {
                            "id": 3
                        }
                    ],
                    unidades: [
                        {
                            "id": 483
                        }
                    ],
                    tipoId: 1,
                    tabelaId: 3,
                    abrangenciaId: 1,
                    tipoCobrancaId: 1,
                    prazoFaturamento: null,
                    dataBase: null
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(201)

                expect(response.body).to.have.property('codigo');
                expect(response.body).to.have.property('flagDeError');
                expect(response.body).to.have.property('mensagem');
            })
        })

        it('Validar retorno 400 - /api/v1/parceiros', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/parceiros',
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

        it('Validar retorno 401 - /api/v1/parceiros', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/parceiros',
                headers: {
                    //'Authorization': `Bearer ${token}`, Token
                    'Content-Type': 'application/json'
                },
                body: {
                    flagAtivo: "1",
                    nome: "Teste QA",
                    canais: [
                        {
                            "id": 3
                        }
                    ],
                    unidades: [
                        {
                            "id": 483
                        }
                    ],
                    tipoId: 1,
                    tabelaId: 3,
                    abrangenciaId: 1,
                    tipoCobrancaId: 1,
                    prazoFaturamento: null,
                    dataBase: null
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(401)
            })
        })
    })

    describe('Módulo - Parceiros - Lista os parceiros cadastrados pela unidade logada', () => {

        it('Validar retorno 200 - /api/v1/parceiros/unit', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/parceiros/unit',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(200)

                const items = response.body;
                items.forEach((item) => {
                    expect(item).to.have.property('unidadeId');
                    expect(item).to.have.property('parceiroId');
                    expect(item).to.have.property('tipoId');
                    expect(item).to.have.property('nome');
                    expect(item).to.have.property('tabelaId');
                    expect(item).to.have.property('abrangenciaId');
                    expect(item).to.have.property('tipoCobrancaId');
                })
            })
        })

        it('Validar retorno 401 - /api/v1/parceiros/unit', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/parceiros/unit',
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

    describe('Módulo - Parceiros - Lista todos os parceiros ativos', () => {

        it('Validar retorno 200 - /api/v1/parceiros/all', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/parceiros/all?tipoId=1&nome=Teste%20QA&abrangenciaId=1&unidades=483&unidades=483&tipoCobrancaId=1&tabelaId=3',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(200)

                response.body.forEach((item) => {
                    expect(item).to.have.property('id');
                    expect(item).to.have.property('name');
                })
            })
        })

        it('Validar retorno 401 - /api/v1/parceiros/all', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/parceiros/all?tipoId=1&nome=Teste%20QA&abrangenciaId=1&unidades=483&unidades=483&tipoCobrancaId=1&tabelaId=3',
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


    describe('Módulo - Parceiros - Verifica se já existe um parceiro com os mesmos dados', () => {

        it('Validar retorno 201 - /api/v1/parceiros/check-existing', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/parceiros/check-existing',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: {
                    tipoCobrancaId: 1,
                    nome: "Teste QA",
                    unidades: [{ "id": 483 }],
                    id: 534
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(201);
                cy.log(JSON.stringify(response.body))
            })
        })

        it('Validar retorno 400 - /api/v1/parceiros/check-existing', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/parceiros/check-existing',
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

        it('Validar retorno 401 - /api/v1/parceiros/check-existing', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/parceiros/check-existing',
                headers: {
                    //'Authorization': `Bearer ${token}`, Token inválido
                    'Content-Type': 'application/json'
                },
                body: {
                    tipoCobrancaId: 1,
                    nome: "Teste QA",
                    unidades: [{ "id": 483 }],
                    id: 1163
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(401);
            })
        })
    })

    // Precisa de dados reais do Amei
    describe('Módulo - Parceiros - Exibe os dados do parceiro', () => {

        it('Validar retorno 200 - /api/v1/parceiros/{id}', () => {
            const token = Cypress.env('access_token');
            const idParceiro = 1;

            cy.request({
                method: 'GET',
                url: `/api/v1/parceiros/${idParceiro}`,
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(200);

                 const item = response.body;
                 expect(item).to.include.all.keys(
                     'id',
                     'tipoId',
                     'nome',
                     'tabelaId',
                     'abrangenciaId',
                     'tipoCobrancaId',
                     'prazoFaturamento',
                     'dataBase',
                     'flagAtivo',
                     'createdAt',
                     'updatedAt',
                     'cnpj',
                     'razaoSocial',
                     'telefone',
                     'email',
                     'cep',
                     'endereco',
                     'numero',
                     'bairro',
                     'cidade',
                     'estado',
                     'nomeFantasia',
                     'telefoneSecundario',
                     'regiaoZona',
                     'emailAlternativo',
                     'complemento',
                     'urlParceiro',
                 )
 
                 expect(item).to.have.property('canais').to.be.an('array')
                 item.canais.forEach((data) => {
                     expect(data).to.have.property('id');
                     expect(data).to.have.property('nome');
                 })
 
                 expect(item).to.have.property('unidades').to.be.an('array')
                 item.unidades.forEach((data) => {
                     expect(data).to.have.property('id');
                     expect(data).to.have.property('descricao');
                     expect(data).to.have.property('endereco');
                     expect(data).to.have.property('flgCentral');
                     expect(data).to.have.property('feegowClinicId');
                     expect(data).to.have.property('flgTelemedicina');
                     expect(data).to.have.property('flgAmorCirurgias');
                     expect(data).to.have.property('regiaoId');
                     expect(data).to.have.property('flgAtivo');
                     expect(data).to.have.property('flgAtivarTef');
                     expect(data).to.have.property('razaoSocial');
                     expect(data).to.have.property('cnpj');
                     expect(data).to.have.property('cnes');
                     expect(data).to.have.property('fkRegimeTributario');
                     expect(data).to.have.property('fkUnidadeStatus');
                     expect(data).to.have.property('consultor');
                     expect(data).to.have.property('telefonePrincipal');
                     expect(data).to.have.property('telefoneSecundario');
                     expect(data).to.have.property('emailPrincipal');
                     expect(data).to.have.property('emailSecundario');
                     expect(data).to.have.property('cep');
                     expect(data).to.have.property('numero');
                     expect(data).to.have.property('complemento');
                     expect(data).to.have.property('bairro');
                     expect(data).to.have.property('regiaoZona');
                     expect(data).to.have.property('observacao');
                     expect(data).to.have.property('sigla');
                     expect(data).to.have.property('fkFusoHorario');
                     expect(data).to.have.property('fkTipoUnidade');
                     expect(data).to.have.property('flgAgendaOnline');
                     expect(data).to.have.property('sellerId');
                     expect(data).to.have.property('flgAtivarSplit');
                     expect(data).to.have.property('fkParceiroInstitucional');
                     expect(data).to.have.property('dataInauguracao');
                     expect(data).to.have.property('fkTipoSegmento');
                     expect(data).to.have.property('status');
                     expect(data).to.have.property('mcc');
                     expect(data).to.have.property('latitude');
                     expect(data).to.have.property('longitude');
                 })
 
                 expect(item).to.have.property('hasPricesTable')
            })
        }) 

        it('Validar retorno 401 - /api/v1/parceiros/{id}', () => {
            const token = Cypress.env('access_token');
            const idParceiro = 1163;

            cy.request({
                method: 'GET',
                url: `/api/v1/parceiros/${idParceiro}`,
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

    // Precisa de dados reais do Amei
    describe('Módulo - Parceiros - Atualiza os dados do parceiro', () => {

        it('Validar retorno 200 - /api/v1/parceiros/{id}', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'PUT',
                url: '/api/v1/parceiros/1',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: {
                    flagAtivo: "1",
                    nome: "Teste QA2",
                    canais: [
                        {
                            "id": 3
                        }
                    ],
                    unidades: [
                        {
                            id: 483
                        }
                    ],
                    tipoId: 1,
                    tabelaId: 3,
                    abrangenciaId: 1,
                    tipoCobrancaId: 1,
                    prazoFaturamento: null,
                    dataBase: null
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(200)
                expect(response.body).to.have.property('codigo');
                expect(response.body).to.have.property('flagDeError');
                expect(response.body).to.have.property('mensagem');
            })
        }) 

        it('Validar retorno 400 - /api/v1/parceiros/{id}', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'PUT',
                url: '/api/v1/parceiros/1165',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: {
                    // Sem parâmetro no body
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(400)
            })
        })

        it('Validar retorno 401 - /api/v1/parceiros/{id}', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'PUT',
                url: '/api/v1/parceiros/1165',
                headers: {
                    //'Authorization': `Bearer ${token}`, Token inválido
                    'Content-Type': 'application/json'
                },
                body: {
                    flagAtivo: "1",
                    nome: "Teste QA2",
                    canais: [{ "id": 3 }],
                    unidades: [{ "id": 483 }],
                    tipoId: 1,
                    tabelaId: 3,
                    abrangenciaId: 1,
                    tipoCobrancaId: 1,
                    prazoFaturamento: null,
                    dataBase: null
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(401)
            })
        })
    })

    // Precisa de dados reais do Amei
    describe('Módulo - Parceiros - Exibe as unidades do parceiro', () => {

        it('Validar retorno 200 - /api/v1/parceiros/{id}/unidades', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/parceiros/1/unidades?regionaisIds=1&regionaisIds=1',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(200)
                expect(response.body).to.have.property('unidades').to.be.an('array');
            })
        }) 

        it('Validar retorno 401 - /api/v1/parceiros/{id}/unidades', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/parceiros/1165/unidades?regionaisIds=1&regionaisIds=2',
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

    describe('Módulo - Parceiros - Lista os parceiros cadastrados para filtro', () => {

        it('Validar retorno 200 - /api/v1/parceiros/lists/search', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/parceiros/lists/search?limit=10&name=Teste%20QA',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(200)
                const item = response.body;
                expect(item).to.be.an('array')
                item.forEach((items) => {
                    expect(items).to.have.property('id');
                    expect(items).to.have.property('nome');
                })
            })
        })

        it('Validar retorno 401 - /api/v1/parceiros/lists/search', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/parceiros/lists/search',
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
})