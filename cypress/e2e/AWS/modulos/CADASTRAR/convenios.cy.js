/// <reference types= "cypress" /> 

describe('Módulo - Convênios', () => {
    beforeEach(() => {
        cy.login()
        cy.refreshToken()
    })

    describe('Módulo - Convênios - Cria um convênio', () => {

        it('Validar retorno 201 - /api/v1/convenios', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/convenios',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: {
                    "nome": "Convenio Teste API",
                    "razaoSocial": "Convenio Teste API",
                    "cnpj": null,
                    "parceria": null,
                    "registroAns": null,
                    "retornoConsulta": null,
                    "diasRecebimento": null,
                    "numGuiaAtual": null,
                    "cep": null,
                    "endereco": null,
                    "numero": null,
                    "complemento": null,
                    "bairro": null,
                    "cidade": null,
                    "estado": null,
                    "telefone": null,
                    "email": null,
                    "percentual2Procedimento": null,
                    "percentual3Procedimento": null,
                    "percentual4Procedimento": null,
                    "unidCalculo": null,
                    "valorCh": null,
                    "valorUco": null,
                    "valorM2Filme": null,
                    "observacoes": null,
                    "ativo": true,
                    "materiais": null,
                    "medicamentos": null,
                    "taxas": null,
                    "filmes": null,
                    "procedimentos": null,
                    "versaoTissId": null,
                    "cbhpmId": null,
                    "porteId": null,
                    "planos": [],
                    "contratos": []
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(201);
                cy.log(JSON.stringify(response.body));

                expect(response.body).to.have.property('created')
                expect(response.body).to.have.property('data')

                expect(response.body.data).to.have.property('created')

                const created = response.body.data.created

                expect(created).to.have.property('nome')
                expect(created).to.have.property('razaoSocial')
                expect(created).to.have.property('cnpj')
                expect(created).to.have.property('parceria')
                expect(created).to.have.property('registroAns')
                expect(created).to.have.property('retornoConsulta')
                expect(created).to.have.property('diasRecebimento')
                expect(created).to.have.property('numGuiaAtual')
                expect(created).to.have.property('cep')
                expect(created).to.have.property('endereco')
                expect(created).to.have.property('numero')
                expect(created).to.have.property('complemento')
                expect(created).to.have.property('bairro')
                expect(created).to.have.property('cidade')
                expect(created).to.have.property('estado')
                expect(created).to.have.property('telefone')
                expect(created).to.have.property('email')
                expect(created).to.have.property('percentual2Procedimento')
                expect(created).to.have.property('percentual3Procedimento')
                expect(created).to.have.property('percentual4Procedimento')
                expect(created).to.have.property('unidCalculo')
                expect(created).to.have.property('valorCh')
                expect(created).to.have.property('valorUco')
                expect(created).to.have.property('valorM2Filme')
                expect(created).to.have.property('observacoes')
                expect(created).to.have.property('ativo')
                expect(created).to.have.property('materiais')
                expect(created).to.have.property('medicamentos')
                expect(created).to.have.property('taxas')
                expect(created).to.have.property('filmes')
                expect(created).to.have.property('procedimentos')
                expect(created).to.have.property('versaoTissId')
                expect(created).to.have.property('cbhpmId')
                expect(created).to.have.property('porteId')
                expect(created).to.have.property('planos')
                expect(created).to.have.property('contratos')
                expect(created).to.have.property('id')

                // Salva o ID
                const idConvenios = response.body.data.created.id
                Cypress.env('idConvenios', idConvenios);
                
            })
        })

        it('Validar retorno 401 - /api/v1/convenios', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/convenios',
                headers: {
                    //'Authorization': `Bearer ${token}`, // Token inválido
                    'Content-Type': 'application/json'
                },
                body: {
                    "items": [
                        {
                            nome: null,
                            razaoSocial: null,
                            cnpj: null,
                            parceria: null,
                            registroAns: null,
                            retornoConsulta: null,
                            diasRecebimento: null,
                            numGuiaAtual: null,
                            cep: null,
                            endereco: null,
                            numero: null,
                            complemento: null,
                            bairro: null,
                            cidade: null,
                            estado: null,
                            telefone: null,
                            email: null,
                            percentual2Procedimento: null,
                            percentual3Procedimento: null,
                            percentual4Procedimento: null,
                            unidCalculo: null,
                            valorCh: null,
                            valorUco: null,
                            valorM2Filme: null,
                            observacoes: null,
                            ativo: false
                        }
                    ]
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(401)
                cy.log('Retorno completo do body:', JSON.stringify(response.body));


            })
        })
    })

    describe('Módulo - Convênios - Retorna um lista de convênios com paginação', () => {

        it('Validar retorno 200 - /api/v1/convenios', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/convenios',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(200);
                cy.log(JSON.stringify(response.body));

                const body = response.body;
                body.items.forEach((item) => {
                    expect(item).to.include.keys({
                        id: null,
                        nome: null,
                        razaoSocial: null,
                        cnpj: null,
                        parceria: null,
                        registroAns: null,
                        retornoConsulta: null,
                        diasRecebimento: null,
                        numGuiaAtual: null,
                        cep: null,
                        endereco: null,
                        numero: null,
                        complemento: null,
                        bairro: null,
                        cidade: null,
                        estado: null,
                        telefone: null,
                        email: null,
                        percentual2Procedimento: null,
                        percentual3Procedimento: null,
                        percentual4Procedimento: null,
                        unidCalculo: null,
                        valorCh: null,
                        valorUco: null,
                        valorM2Filme: null,
                        observacoes: null,
                        ativo: false
                    })
                })
            })
        })

        it('Validar retorno 400 - /api/v1/convenios', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/convenios/ffff', // Url inválida
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

        it('Validar retorno 401 - /api/v1/convenios', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/convenios',
                headers: {
                    //'Authorization': `Bearer ${token}`, // Token inválido
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(401);
                cy.log(JSON.stringify(response.body));
            })
        })
    })

    describe('Módulo - Convênios - Retorna um lista de convênios', () => {

        it('Validar retorno 200 - /api/v1/convenios/all', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/convenios/all',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(200);
                cy.log(JSON.stringify(response.body));

                const data = response.body.data;

                // Verifica se items existem dentro do objeto
                data.forEach((item) => {
                    expect(item).to.have.all.keys({
                        id: null,
                        nome: null,
                        razaoSocial: null,
                        cnpj: null,
                        parceria: null,
                        registroAns: null,
                        retornoConsulta: null,
                        diasRecebimento: null,
                        numGuiaAtual: null,
                        cep: null,
                        endereco: null,
                        numero: null,
                        complemento: null,
                        bairro: null,
                        cidade: null,
                        estado: null,
                        telefone: null,
                        email: null,
                        percentual2Procedimento: null,
                        percentual3Procedimento: null,
                        percentual4Procedimento: null,
                        unidCalculo: null,
                        valorCh: null,
                        valorUco: null,
                        valorM2Filme: null,
                        observacoes: null,
                        ativo: null,
                        contratos: []
                    })
                })
            })
        })

        it('Validar retorno 400 - /api/v1/convenios/all', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'DELETE', // Método divergente
                url: '/api/v1/convenios/all',
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

        it('Validar retorno 401 - /api/v1/convenios/all', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/convenios/all',
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

    describe('Módulo - Convênios - Retorna um convênio buscando por id', () => {

        it('Validar retorno 200 - /api/v1/convenios/{id}', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: `/api/v1/convenios/${1}`,
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(200);
                cy.log(JSON.stringify(response.body));

                // Verifica se items existem dentro do objeto
                expect(response.body).to.have.all.keys(
                    'id', 'nome', 'razaoSocial', 'cnpj', 'parceria', 'registroAns',
                    'retornoConsulta', 'diasRecebimento', 'numGuiaAtual', 'cep',
                    'endereco', 'numero', 'complemento', 'bairro', 'cidade', 'estado',
                    'telefone', 'email', 'percentual2Procedimento', 'percentual3Procedimento',
                    'percentual4Procedimento', 'unidCalculo', 'valorCh', 'valorUco',
                    'valorM2Filme', 'observacoes', 'ativo', 'contratos'
                )
            })
        })

        it('Validar retorno 400 - /api/v1/convenios/{id}', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/convenios/{id}', // url inválido
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

        it('Validar retorno 401 - /api/v1/convenios/{id}', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: `/api/v1/convenios/${1}`,
                headers: {
                    //'Authorization': `Bearer ${token}`, // Token inválido
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(401);
                cy.log(JSON.stringify(response.body));
            })
        })
    })

    describe('Módulo - Convênios - Atualiza um convênio por id', () => {

        it('Validar retorno 200 - /api/v1/convenios/{id}', () => {
            const token = Cypress.env('access_token');

            // Lê o ID salvo do arquivo
            cy.readFile('cypress/fixtures/idConvenios.json').then((data) => {
                const idConvenios = data.id


                cy.request({
                    method: 'PATCH',
                    url: `/api/v1/convenios/${idConvenios}`,
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application'
                    },
                    body: {
                        "nome": "Teste",
                        "cnpj": null,
                        "parceria": null,
                        "registroAns": null,
                        "retornoConsulta": null,
                        "diasRecebimento": null,
                        "numGuiaAtual": null,
                        "cep": null,
                        "endereco": null,
                        "numero": null,
                        "complemento": null,
                        "bairro": null,
                        "cidade": null,
                        "estado": null,
                        "telefone": null,
                        "email": null,
                        "percentual2Procedimento": null,
                        "percentual3Procedimento": null,
                        "percentual4Procedimento": null,
                        "unidCalculo": null,
                        "valorCh": null,
                        "valorUco": null,
                        "valorM2Filme": null,
                        "observacoes": null,
                        "ativo": true,
                        "materiais": null,
                        "medicamentos": null,
                        "taxas": null,
                        "filmes": null,
                        "procedimentos": null,
                        "versaoTissId": null,
                        "cbhpmId": null,
                        "porteId": null,
                        "planos": [
                            {
                                "valorCh": null,
                                "valorFilme": null,
                                "valorPortes": null,
                                "valorUco": null
                            }
                        ],
                        "contratos": [
                            {
                                "codigoOperadora": null,
                                "unidadeId": null,
                                "contaBancariaId": null
                            }
                        ]
                    },
                    failOnStatusCode: false,
                }).then((response) => {
                    expect(response.status).to.eq(200);
                    cy.log(JSON.stringify(response.body));

                    // Verifica se o body tem os campos esperados
                    expect(response.body).to.include.all.keys('data', 'id');

                    // Verifica se o campo 'data' contém a chave 'message'
                    expect(response.body.data).to.include.all.keys('message');

                    cy.log(`Convenio com ID ${idConvenios} alterado com sucesso.`);
                })
            })
        })

        it('Validar retorno 400 - /api/v1/convenios/{id}', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'PATCH',
                url: '/api/v1/convenios/{id}', // Sem parametro na url e body
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(400);
                cy.log(JSON.stringify(response.body));
            })
        })

        it('Validar retorno 401 - /api/v1/convenios/{id}', () => {
            const token = Cypress.env('access_token');

            // Lê o ID salvo do arquivo
            cy.readFile('cypress/fixtures/idConvenios.json').then((data) => {
                const idConvenios = data.id


                cy.request({
                    method: 'PATCH',
                    url: `/api/v1/convenios/${idConvenios}`,
                    headers: {
                        //'Authorization': `Bearer ${token}`, // Token inválido
                        'Content-Type': 'application'
                    },
                    body: {
                        "nome": "Teste",
                        "cnpj": null,
                        "parceria": null,
                        "registroAns": null,
                        "retornoConsulta": null,
                        "diasRecebimento": null,
                        "numGuiaAtual": null,
                        "cep": null,
                        "endereco": null,
                        "numero": null,
                        "complemento": null,
                        "bairro": null,
                        "cidade": null,
                        "estado": null,
                        "telefone": null,
                        "email": null,
                        "percentual2Procedimento": null,
                        "percentual3Procedimento": null,
                        "percentual4Procedimento": null,
                        "unidCalculo": null,
                        "valorCh": null,
                        "valorUco": null,
                        "valorM2Filme": null,
                        "observacoes": null,
                        "ativo": true,
                        "materiais": null,
                        "medicamentos": null,
                        "taxas": null,
                        "filmes": null,
                        "procedimentos": null,
                        "versaoTissId": null,
                        "cbhpmId": null,
                        "porteId": null,
                        "planos": [
                            {
                                "valorCh": null,
                                "valorFilme": null,
                                "valorPortes": null,
                                "valorUco": null
                            }
                        ],
                        "contratos": [
                            {
                                "codigoOperadora": null,
                                "unidadeId": null,
                                "contaBancariaId": null
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
    })

    describe('Módulo - Convênios - Exclui um convênio por id', () => {

        it('Validar retorno 200 - /api/v1/convenios/{id}', () => {
            const token = Cypress.env('access_token');

            // Lê o ID salvo do arquivo
            cy.readFile('cypress/fixtures/idConvenios.json').then((data) => {
                const idConvenios = data.id


                cy.request({
                    method: 'DELETE',
                    url: `/api/v1/convenios/${idConvenios}`,
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application'
                    },
                    failOnStatusCode: false,
                }).then((response) => {
                    expect(response.status).to.eq(200);
                    cy.log(JSON.stringify(response.body));

                    // Verifica se o body tem os campos esperados
                    expect(response.body).to.include.all.keys('data', 'id');

                    // Verifica se o campo 'data' contém a chave 'message'
                    expect(response.body.data).to.include.all.keys('message');

                    cy.log(`Convenio com ID ${idConvenios} excluído com sucesso.`);

                })
            })
        })

        it('Validar retorno 400 - /api/v1/convenios/{id}', () => {
            const token = Cypress.env('access_token');

            // Lê o ID salvo do arquivo
            cy.readFile('cypress/fixtures/idConvenios.json').then((data) => {
                const idConvenios = data.id


                cy.request({
                    method: 'DELETE',
                    url: '/api/v1/convenios/{id}', // Sem parâmetro na url
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application'
                    },
                    failOnStatusCode: false,
                }).then((response) => {
                    expect(response.status).to.eq(400);
                    cy.log(JSON.stringify(response.body));
                })
            })
        })

        it('Validar retorno 401 - /api/v1/convenios/{id}', () => {
            const token = Cypress.env('access_token');

            // Lê o ID salvo do arquivo
            cy.readFile('cypress/fixtures/idConvenios.json').then((data) => {
                const idConvenios = data.id


                cy.request({
                    method: 'DELETE',
                    url: `/api/v1/convenios/${idConvenios}`,
                    headers: {
                        //'Authorization': `Bearer ${token}`, // Token inválido
                        'Content-Type': 'application'
                    },
                    failOnStatusCode: false
                }).then((response) => {
                    expect(response.status).to.eq(401);
                    cy.log(JSON.stringify(response.body));
                })
            })
        })
    })
})
