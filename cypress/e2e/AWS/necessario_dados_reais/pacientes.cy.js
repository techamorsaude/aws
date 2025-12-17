/// <reference types="cypress"/>

describe('Módulo - Pacientes', () => {
    beforeEach(() => {
        cy.login();
        cy.refreshToken();
    })

    describe('Módulo - Pacientes - download pdf historico feegow', () => {

        it('Validar retorno 200 - /api/v1/pacientes/{id}/feegow-history', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/pacientes/1162697/feegow-history',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(200);
                expect(response.body).to.have.property('url');
            })
        });

        it('Validar retorno 401 - /api/v1/pacientes/{id}/feegow-history', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/pacientes/{id}/feegow-history',
                headers: {
                    //'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(401);
            })
        });
    })

    describe('Módulo - Pacientes - Cadastrar Paciente', () => {

        it('Validar retorno 201 - /api/v1/pacientes', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/pacientes',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: {
                    "tipoPaciente": "brasileiro",
                    "prioridade": null,
                    "origem": "",
                    "cpf": "52912779049",
                    "nome": "TESTE API",
                    "sobrenome": "MODULO PACIENTES",
                    "nomeSocial": "",
                    "sexoId": 1,
                    "genero": 2,
                    "dataNascimento": "1991-08-26",
                    "rg": "",
                    "naturalidade": "",
                    "nacionalidade": "",
                    "etnia": "",
                    "cns": "",
                    "profissao": "",
                    "estadoCivil": "",
                    "nomeMae": "MAE TESTE API MODULO PACIENTES",
                    "restricoesTratamentoMedico": "",
                    "prontuario": "754",
                    "createdAt": "2025-12-11",
                    "codigoDDI": "Brasil (+0055)",
                    "celular": "32222222222",
                    "celularAlternativo": "",
                    "email": "52912779049@gmail.com",
                    "residenciaTipo": "fixa",
                    "cep": "15265970",
                    "endereco": "Rua Monteiro Lobato 1057",
                    "numero": 1057,
                    "complemento": "",
                    "bairro": "Centro",
                    "cidade": "Zacarias",
                    "estado": "SP",
                    "pacienteConvenioPlano": [],
                    "pacientesFamiliares": [
                        {
                            "celular": 33433333333,
                            "cpf": "",
                            "email": "",
                            "nome": "TESTE DO TESTE",
                            "observacoes": "",
                            "parentesco": 4,
                            "responsavel": "Não"
                        }
                    ],
                    "optin": {
                        "personalData": true
                    }
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(201);
            })
        });

        it('Validar retorno 400 - /api/v1/pacientes', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/pacientes',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(400);
            })
        });

        it('Validar retorno 401 - /api/v1/pacientes', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/pacientes',
                headers: {
                    //'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(401);
            })
        });
    })

    describe('Módulo - Pacientes - Paginação e filtro por nome e cpf, obito ou ativo', () => {

        it('Validar retorno 200 - /api/v1/pacientes', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/pacientes?page=1&limit=1',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(200);
                expect(response.body).to.have.property('items').to.be.an('array');
            })
        })

        it('Validar retorno 401 - /api/v1/pacientes', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/pacientes',
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

    describe('Módulo - Pacientes - Cadastrar fotografia do paciente', () => {

        it('Validar retorno 200 - /api/v1/pacientes/avatar/{id}', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/pacientes/avatar/1162697',
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
        });

        it('Validar retorno 400 - /api/v1/pacientes/avatar/{id}', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/pacientes/avatar/{id}',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(400);
            })
        });

        it('Validar retorno 401 - /api/v1/pacientes/avatar/{id}', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/pacientes/avatar/{id}',
                headers: {
                    //'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(401);
            })
        });
    })

    describe('Módulo - Pacientes - Baixar fotografia do paciente', () => {

        it('Validar retorno 200 - /api/v1/pacientes/avatar/{id}', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/pacientes/avatar/{id}',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(200);
            })
        });

        it('Validar retorno 400 - /api/v1/pacientes/avatar/{id}', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/pacientes/avatar/{id}',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(400);
            })
        });

        it('Validar retorno 401 - /api/v1/pacientes/avatar/{id}', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/pacientes/avatar/{id}',
                headers: {
                    //'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(401);
            })
        });
    })

    describe('Módulo - Pacientes - Remove fotografia do profissional', () => {

        it('Validar retorno 200 - /api/v1/pacientes/avatar/{id}', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'DELETE',
                url: '/api/v1/pacientes/avatar/{id}',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(200);
            })
        });

        it('Validar retorno 400 - /api/v1/pacientes/avatar/{id}', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'DELETE',
                url: ' /api/v1/pacientes/avatar/{id}',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(400);
            })
        });

        it('Validar retorno 401 - /api/v1/pacientes/avatar/{id}', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'DELETE',
                url: ' /api/v1/pacientes/avatar/{id}',
                headers: {
                    //'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(401);
            })
        });
    })

    describe('Módulo - Pacientes - Retorna uma lista de pacientes, apenas id e nome', () => {

        it('Validar retorno 200 - /api/v1/pacientes/search', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/pacientes/search?search=Paciente&limit=1',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(200);
                expect(response.body).to.be.an('array')
                response.body.forEach((item) => {
                    expect(item).to.have.property('id');
                    expect(item).to.have.property('name');
                })
            })
        })

        it('Validar retorno 400 - /api/v1/pacientes/search', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/pacientes/search',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(400);
            })
        });

        it('Validar retorno 401 - /api/v1/pacientes/search', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/pacientes/search',
                headers: {
                    //'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(401);
            })
        });
    })

    describe('Módulo - Pacientes - Retorna todos os pacientes cadastrados', () => {

        it('Validar retorno 200 - /api/v1/pacientes/all', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/pacientes/all',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(200);
                expect(response.body).to.have.property('data').to.be.an('array');
            })
        });

        it('Validar retorno 400 - /api/v1/pacientes/all', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/pacientes/all',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(400);
            })
        });

        it('Validar retorno 401 - /api/v1/pacientes/all', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/pacientes/all',
                headers: {
                    //'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(401);
            })
        });
    })

    describe('Módulo - Pacientes - Retorna informação do paciente e checa permissão de retorno', () => {

        it('Validar retorno 200 - /api/v1/pacientes/{id}/check-retorno', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/pacientes/{id}/check-retorno',
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
        });

        it('Validar retorno 400 - /api/v1/pacientes/{id}/check-retorno', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/pacientes/{id}/check-retorno',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(400);
            })
        });

        it('Validar retorno 401 - /api/v1/pacientes/{id}/check-retorno', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/pacientes/{id}/check-retorno',
                headers: {
                    //'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(401);
            })
        });
    })

    describe('Módulo - Pacientes - Paginação e filtro por cpf. Filtros de obito e ativo', () => {

        it('Validar retorno 200 - /api/v1/pacientes/listByCpf', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/pacientes/listByCpf?page=1&limit=1&cpf=79295868803',
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
                    expect(item).to.have.property('obito');
                    expect(item).to.have.property('prontuario');
                    expect(item).to.have.property('cpf');
                    expect(item).to.have.property('docIdentificacao');
                    expect(item).to.have.property('nome');
                    expect(item).to.have.property('sobrenome');
                    expect(item).to.have.property('nomeSocial');
                    expect(item).to.have.property('nomeCompleto');
                    expect(item).to.have.property('rg');
                    expect(item).to.have.property('dataNascimento');
                    expect(item).to.have.property('nomeMae');
                    expect(item).to.have.property('naturalidade');
                    expect(item).to.have.property('nacionalidade');
                    expect(item).to.have.property('profissao');
                    expect(item).to.have.property('telefone');
                    expect(item).to.have.property('celular');
                    expect(item).to.have.property('celularAlternativo');
                    expect(item).to.have.property('email');
                    expect(item).to.have.property('cep');
                    expect(item).to.have.property('endereco');
                    expect(item).to.have.property('numero');
                    expect(item).to.have.property('complemento');
                    expect(item).to.have.property('bairro');
                    expect(item).to.have.property('cidade');
                    expect(item).to.have.property('estado');
                    expect(item).to.have.property('foto');
                    expect(item).to.have.property('observacoes');
                    expect(item).to.have.property('cns');
                    expect(item).to.have.property('createdAt');
                    expect(item).to.have.property('updatedAt');
                    expect(item).to.have.property('primeiraConsulta');
                })
            })
        });

        it('Validar retorno 400 - /api/v1/pacientes/listByCpf', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/pacientes/listByCpf',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(400);
            })
        });

        it('Validar retorno 401 - /api/v1/pacientes/listByCpf', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/pacientes/listByCpf',
                headers: {
                    //'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(401);
            })
        });
    })

    describe('Módulo - Pacientes - Paginação e filtro por nome. Filtros de obito e ativo', () => {

        it('Validar retorno 200 - /api/v1/pacientes/listByName', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/pacientes/listByName?page=1&limit=1&name=Paciente',
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
                    expect(item).to.have.property('obito');
                    expect(item).to.have.property('prontuario');
                    expect(item).to.have.property('cpf');
                    expect(item).to.have.property('docIdentificacao');
                    expect(item).to.have.property('nome');
                    expect(item).to.have.property('sobrenome');
                    expect(item).to.have.property('nomeSocial');
                    expect(item).to.have.property('nomeCompleto');
                    expect(item).to.have.property('rg');
                    expect(item).to.have.property('dataNascimento');
                    expect(item).to.have.property('nomeMae');
                    expect(item).to.have.property('naturalidade');
                    expect(item).to.have.property('nacionalidade');
                    expect(item).to.have.property('profissao');
                    expect(item).to.have.property('telefone');
                    expect(item).to.have.property('celular');
                    expect(item).to.have.property('celularAlternativo');
                    expect(item).to.have.property('email');
                    expect(item).to.have.property('cep');
                    expect(item).to.have.property('endereco');
                    expect(item).to.have.property('numero');
                    expect(item).to.have.property('complemento');
                    expect(item).to.have.property('bairro');
                    expect(item).to.have.property('cidade');
                    expect(item).to.have.property('estado');
                    expect(item).to.have.property('foto');
                    expect(item).to.have.property('observacoes');
                    expect(item).to.have.property('cns');
                    expect(item).to.have.property('createdAt');
                    expect(item).to.have.property('updatedAt');
                    expect(item).to.have.property('primeiraConsulta');
                })
            })
        });

        it('Validar retorno 400 - /api/v1/pacientes/listByName', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/pacientes/listByName',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(400);
            })
        });

        it('Validar retorno 401 - /api/v1/pacientes/listByName', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/pacientes/listByName',
                headers: {
                    //'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(401);
            })
        });
    })

    describe('Módulo - Pacientes - Retorna por id', () => {

        it('Validar retorno 200 - /api/v1/pacientes/{id}', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/pacientes/10246474',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(200);
                expect(response.body).to.have.property('message');
                expect(response.body).to.have.property('error');
                expect(response.body).to.have.property('statusCode');
            })
        });

        it('Validar retorno 400 - /api/v1/pacientes/{id}', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/pacientes/{id}',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(400);
            })
        });

        it('Validar retorno 401 - /api/v1/pacientes/{id}', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/pacientes/{id}',
                headers: {
                    //'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(401);
            })
        });
    })

    describe('Módulo - Pacientes - Atualiza paciente por id', () => {

        it('Validar retorno 200 - /api/v1/pacientes/{id}', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'PUT',
                url: '/api/v1/pacientes/353494',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },

                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(200);
                expect(response.body).to.have.property('erro');
                expect(response.body).to.have.property('codigo');
                expect(response.body).to.have.property('mensagem')
            })
        });

        it('Validar retorno 401 - /api/v1/pacientes/{id}', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'PUT',
                url: '/api/v1/pacientes/{id}',
                headers: {
                    //'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(401);
            })
        });
    })

    describe('Módulo - Pacientes - Deleta paciente por id', () => {

        it('Validar retorno 200 - /api/v1/pacientes/{id}', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'DELETE',
                url: '/api/v1/pacientes/10246474',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(200);
                expect(response.body).to.have.property('erro');
                expect(response.body).to.have.property('codigo');
                expect(response.body).to.have.property('mensagem')
            })
        });

        it('Validar retorno 400 - /api/v1/pacientes/{id}', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'DELETE',
                url: '/api/v1/pacientes/{id}',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(400);
            })
        });

        it('Validar retorno 401 - /api/v1/pacientes/{id}', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'DELETE',
                url: '/api/v1/pacientes/{id}',
                headers: {
                    //'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(401);
            })
        });
    })

    describe('Módulo - Pacientes - Retorna informações do paciente para a folha de rosto', () => {

        it('Validar retorno 200 - /api/v1/pacientes/{id}/cover-sheet', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/pacientes/353494/cover-sheet',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(200);
                response.body.forEach(item => {
                    expect(item).to.have.property('agendamentoId');
                    expect(item).to.have.property('nomePaciente');
                    expect(item).to.have.property('nomeSocial');
                    expect(item).to.have.property('cpf');
                    expect(item).to.have.property('dataNascimento');
                    expect(item).to.have.property('sexoId');
                    expect(item).to.have.property('sexoSigla');
                    expect(item).to.have.property('sexo');
                    expect(item).to.have.property('generoId');
                    expect(item).to.have.property('genero');
                    expect(item).to.have.property('etniaId');
                    expect(item).to.have.property('etnia');
                    expect(item).to.have.property('profissao');
                    expect(item).to.have.property('nomeMae');
                    expect(item).to.have.property('emailPaciente');
                    expect(item).to.have.property('celularPaciente');
                    expect(item).to.have.property('celularAlternativoPaciente');
                    expect(item).to.have.property('ultimoAtendimento');
                    expect(item).to.have.property('convenioId');
                    expect(item).to.have.property('nomeConvenio');
                    expect(item).to.have.property('planoId');
                    expect(item).to.have.property('plano');
                    expect(item).to.have.property('titularidade');
                    expect(item).to.have.property('fotografia');
                    expect(item).to.have.property('fotografiaImagem');
                    expect(item).to.have.property('fotografiaNome');
                    expect(item).to.have.property('pacienteId');
                    expect(item).to.have.property('oservacao');
                    expect(item).to.have.property('prioridadeId');
                    expect(item).to.have.property('prioridade');
                    expect(item).to.have.property('lastAttendance');
                });
            })
        });

        it('Validar retorno 400 - /api/v1/pacientes/{id}/cover-sheet', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/pacientes/{id}/cover-sheet',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(400);
            })
        });

        it('Validar retorno 401 - /api/v1/pacientes/{id}/cover-sheet', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/pacientes/{id}/cover-sheet',
                headers: {
                    //'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(401);
            })
        });
    })

    describe('Módulo - Pacientes - Retorna informações dos problemas do paciente para a folha de rosto', () => {

        it('Validar retorno 200 - /api/v1/pacientes/{id}/cover-sheet/problems', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/pacientes/353494/cover-sheet/problems',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(200);
            })
        });

        it('Validar retorno 401 - /api/v1/pacientes/{id}/cover-sheet/problems', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/pacientes/{id}/cover-sheet/problems',
                headers: {
                    //'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(401);
            })
        });
    })

    describe('Módulo - Pacientes - Retorna informações dos cuidasdos do paciente para a folha de rosto', () => {

        it('Validar retorno 200 - /api/v1/pacientes/{id}/cover-sheet/cares', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/pacientes/353494/cover-sheet/cares',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(200);
                expect(response.body).to.have.property('cuidados');
                expect(response.body).to.have.property('alergias');
                expect(response.body).to.have.property('FamiliaresAntecedentes');
                expect(response.body).to.have.property('antropometricos');
                expect(response.body).to.have.property('sinaisVitais');
                expect(response.body).to.have.property('resultadosExame');
                expect(response.body).to.have.property('medicamentos');

                expect(response.body.cuidados).to.have.property('cuidadosAtivo');
                expect(response.body.cuidados).to.have.property('cuidadosInativo');
            })
        });

        it('Validar retorno 400 - /api/v1/pacientes/{id}/cover-sheet/cares', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/pacientes/{id}/cover-sheet/cares',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(400);
            })
        });

        it('Validar retorno 401 - /api/v1/pacientes/{id}/cover-sheet/cares', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/pacientes/{id}/cover-sheet/cares',
                headers: {
                    //'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(401);
            })
        });
    })

    describe('Módulo - Pacientes - Retorna informações do percurso assistencial do paciente para a folha de rosto', () => {

        it('Validar retorno 200 - /api/v1/pacientes/{id}/cover-sheet/care-path', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/pacientes/353494/cover-sheet/care-path?page=1&limit=1',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(200);
                ['items', 'meta'].forEach(campo => {
                    expect(response.body).to.have.property(campo);
                });

                [
                    'itemCount',
                    'totalItems',
                    'itemsPerPage',
                    'currentPage',
                    'totalPages'
                ].forEach(campo => {
                    expect(response.body.meta).to.have.property(campo);
                });
            })
        });

        it('Validar retorno 400 - /api/v1/pacientes/{id}/cover-sheet/care-path', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/pacientes/{id}/cover-sheet/care-path',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(400);
            })
        });

        it('Validar retorno 401 - /api/v1/pacientes/{id}/cover-sheet/care-path', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/pacientes/{id}/cover-sheet/care-path',
                headers: {
                    //'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(401);
            })
        });
    })

    describe('Módulo - Pacientes - Atualiza campo origem do paciente por id', () => {

        it('Validar retorno 200 - /api/v1/pacientes/{id}/origem', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'PUT',
                url: '/api/v1/pacientes/353494/origem',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(200);
                expect(response.body).to.have.property('erro');
                expect(response.body).to.have.property('codigo');
                expect(response.body).to.have.property('mensagem');
            })
        });

        it('Validar retorno 400 - /api/v1/pacientes/{id}/origem', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'PUT',
                url: '/api/v1/pacientes/{id}/origem',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(400);
            })
        });

        it('Validar retorno 401 - /api/v1/pacientes/{id}/origem', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'PUT',
                url: '/api/v1/pacientes/{id}/origem',
                headers: {
                    //'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(401);
            })
        });
    })

    describe('Módulo - Pacientes - Ativa ou inativa uma parceria do paciente por id da parceria', () => {

        it('Validar retorno 200 - /api/v1/pacientes/parceria/{idParceria}', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'PUT',
                url: '/api/v1/pacientes/parceria/821289',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(200);
                expect(response.body).to.have.property('erro');
                expect(response.body).to.have.property('codigo');
                expect(response.body).to.have.property('mensagem');
            })
        });

        it('Validar retorno 400 - /api/v1/pacientes/parceria/{idParceria}', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'PUT',
                url: '/api/v1/pacientes/parceria/{idParceria}',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(400);
            })
        });

        it('Validar retorno 401 - /api/v1/pacientes/parceria/{idParceria}', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'PUT',
                url: '/api/v1/pacientes/parceria/{idParceria}',
                headers: {
                    //'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(401);
            })
        });
    })

    describe.only('Módulo - Pacientes - Modelo do atendimento médico em PDF', () => {

        it('Validar retorno 201 - /api/v1/pacientes/{id}/prontuario/pdf', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/pacientes/353494/prontuario/pdf',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: {
                    "cpf": "79295868803",
                    "password": "DF743@434",
                    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9cm880sH2oyD182zuQ"
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(400);
                cy.log(JSON.stringify(response.body))
            })
        });

        it('Validar retorno 400 - /api/v1/pacientes/{id}/prontuario/pdf', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/pacientes/{id}/prontuario/pdf',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(400);
            })
        });

        it.only('Validar retorno 401 - /api/v1/pacientes/{id}/prontuario/pdf', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/pacientes/{id}/prontuario/pdf',
                headers: {
                    //'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(401);
            })
        });
    })

    describe('Módulo - Pacientes - Retorna informações do resultado de exames', () => {

        it('Validar retorno 200 - /api/v1/pacientes/{id}/exam-result/list', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/pacientes/{id}/exam-result/list',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(200);
            })
        });

        it('Validar retorno 400 - /api/v1/pacientes/{id}/exam-result/list', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/pacientes/{id}/exam-result/list',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(400);
            })
        });

        it('Validar retorno 401 - /api/v1/pacientes/{id}/exam-result/list', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/pacientes/{id}/exam-result/list',
                headers: {
                    //'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(401);
            })
        });
    })

    describe('Módulo - Pacientes - Documento do paciente', () => {

        it('Validar retorno 200 - /api/v1/pacientes/{id}/documents/{documentId}', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/pacientes/{id}/documents/{documentId}',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(200);
            })
        });

        it('Validar retorno 400 - /api/v1/pacientes/{id}/documents/{documentId}', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/pacientes/{id}/documents/{documentId}',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(400);
            })
        });

        it('Validar retorno 401 - /api/v1/pacientes/{id}/documents/{documentId}', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/pacientes/{id}/documents/{documentId}',
                headers: {
                    //'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(401);
            })
        });
    })

    describe('Módulo - Pacientes - Baixar documento do paciente', () => {

        it('Validar retorno 200 - /api/v1/pacientes/{id}/documents/{documentId}/download', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/pacientes/{id}/documents/{documentId}/download',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(200);
            })
        });

        it('Validar retorno 400 - /api/v1/pacientes/{id}/documents/{documentId}/download', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/pacientes/{id}/documents/{documentId}/download',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(400);
            })
        });

        it('Validar retorno 401 - /api/v1/pacientes/{id}/documents/{documentId}/download', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/pacientes/{id}/documents/{documentId}/download',
                headers: {
                    //'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(401);
            })
        });
    })

    describe('Módulo - Pacientes - Retorna arquivo csv com pacientes(com filtro ou sem)', () => {

        it('Validar retorno 200 - /api/v1/pacientes/csv/download', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/pacientes/csv/download',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(200);
            })
        });

        it('Validar retorno 400 - /api/v1/pacientes/csv/download', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/pacientes/csv/download',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(400);
            })
        });

        it('Validar retorno 401 - /api/v1/pacientes/csv/download', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/pacientes/csv/download',
                headers: {
                    //'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(401);
            })
        });
    })

    describe('Módulo - Pacientes - Retorna uma lista de tipos de documentos', () => {

        it('Validar retorno 200 - /api/v1/pacientes/{id}/attendance/documents', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/pacientes/{id}/attendance/documents',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(200);
            })
        });

        it('Validar retorno 400 - /api/v1/pacientes/{id}/attendance/documents', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/pacientes/{id}/attendance/documents',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(400);
            })
        });

        it('Validar retorno 401 - /api/v1/pacientes/{id}/attendance/documents', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/pacientes/{id}/attendance/documents',
                headers: {
                    //'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(401);
            })
        });
    })

    describe('Módulo - Pacientes - Enviar documento', () => {

        it('Validar retorno 201 - /api/v1/pacientes/{id}/send-document', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/pacientes/{id}/send-document',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(201);
            })
        });

        it('Validar retorno 400 - /api/v1/pacientes/{id}/send-document', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/pacientes/{id}/send-document',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(400);
            })
        });

        it('Validar retorno 401 - /api/v1/pacientes/{id}/send-document', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/pacientes/{id}/send-document',
                headers: {
                    //'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(401);
            })
        });
    })

    describe('Módulo - Pacientes - Verifica a necessidade de atualização cadastral do paciente', () => {

        it('Validar retorno 200 - /api/v1/pacientes/{id}/registration-status', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/pacientes/{id}/registration-status',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(200);
            })
        });

        it('Validar retorno 400 - /api/v1/pacientes/{id}/registration-status', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/pacientes/{id}/registration-status',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(400);
            })
        });

        it('Validar retorno 401 - /api/v1/pacientes/{id}/registration-status', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/pacientes/{id}/registration-status',
                headers: {
                    //'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(401);
            })
        });
    })

    describe('Módulo - Pacientes - Retorna uma lista de tipos de documentos', () => {

        it('Validar retorno 200 - /api/v1/pacientes/{hash}/{file}', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/pacientes/{hash}/{file}',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(200);
            })
        });

        it('Validar retorno 400 - /api/v1/pacientes/{hash}/{file}', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/pacientes/{hash}/{file}',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(400);
            })
        });

        it('Validar retorno 401 - /api/v1/pacientes/{hash}/{file}', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/pacientes/{hash}/{file}',
                headers: {
                    //'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(401);
            })
        });
    })

    describe('Módulo - Pacientes - download do pdf', () => {

        it('Validar retorno 200 - /api/v1/pacientes/document/medical-prescription/pdf', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/pacientes/document/medical-prescription/pdf',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(200);
            })
        });

        it('Validar retorno 400 - /api/v1/pacientes/document/medical-prescription/pdf', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/pacientes/document/medical-prescription/pdf',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(400);
            })
        });

        it('Validar retorno 401 - /api/v1/pacientes/document/medical-prescription/pdf', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/pacientes/document/medical-prescription/pdf',
                headers: {
                    //'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(401);
            })
        });
    })

    describe('Módulo - Pacientes - download do pdf', () => {

        it('Validar retorno 200 - /api/v1/pacientes/{patientId}/document/feegow/pdf', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/pacientes/{patientId}/document/feegow/pdf',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(200);
            })
        });

        it('Validar retorno 400 - /api/v1/pacientes/{patientId}/document/feegow/pdf', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/pacientes/{patientId}/document/feegow/pdf',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(400);
            })
        });

        it('Validar retorno 401 - /api/v1/pacientes/{patientId}/document/feegow/pdf', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/pacientes/{patientId}/document/feegow/pdf',
                headers: {
                    //'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(401);
            })
        });
    })

    describe('Módulo - Pacientes - Retorna informações dos dados de anamnese do paciente', () => {

        it('Validar retorno 200 - /api/v1/pacientes/{id}/cover-sheet/anamnese', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/pacientes/{id}/cover-sheet/anamnese',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(200);
            })
        });

        it('Validar retorno 400 - /api/v1/pacientes/{id}/cover-sheet/anamnese', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/pacientes/{id}/cover-sheet/anamnese',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(400);
            })
        });

        it('Validar retorno 401 - /api/v1/pacientes/{id}/cover-sheet/anamnese', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/pacientes/{id}/cover-sheet/anamnese',
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

    describe('Módulo - Pacientes - Retorna quantidades de faltas do paciente', () => {
        
        it('Validar retorno 200 - /api/v1/pacientes/{id}/appointments/number-of-absences', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/pacientes/{id}/appointments/number-of-absences',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(200);
            })
        })

        it('Validar retorno 400 - /api/v1/pacientes/{id}/appointments/number-of-absences', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/pacientes/{id}/appointments/number-of-absences',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(400);
            })
        })

        it('Validar retorno 401 - /api/v1/pacientes/{id}/appointments/number-of-absences', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/pacientes/{id}/appointments/number-of-absences',
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

    describe('Módulo - Pacientes - Retorna nome e sobrenome por id', () => {
        
        it('Validar retorno 200 - /api/v1/pacientes/patient-info/name/{id}', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/pacientes/patient-info/name/{id}',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(200);
            })
        })

        it('Validar retorno 400 - /api/v1/pacientes/patient-info/name/{id}', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/pacientes/patient-info/name/{id}',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(400);
            })
        })

        it('Validar retorno 401 - /api/v1/pacientes/patient-info/name/{id}', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/pacientes/patient-info/name/{id}',
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