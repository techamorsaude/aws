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

    describe.only('Módulo - Pacientes - ', () => {

        it('Validar retorno 200 - ', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: '',
                url: '',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(400);
            })
        });

        it('Validar retorno 400 - ', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: '',
                url: '',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(400);
            })
        });

        it('Validar retorno 401 - ', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: '',
                url: '',
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

    describe('Módulo - Pacientes - ', () => {

        it('Validar retorno 200 - ', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: '',
                url: '',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(400);
            })
        });

        it('Validar retorno 400 - ', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: '',
                url: '',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(400);
            })
        });

        it('Validar retorno 401 - ', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: '',
                url: '',
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

    describe('Módulo - Pacientes - ', () => {

        it('Validar retorno 200 - ', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: '',
                url: '',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(400);
            })
        });

        it('Validar retorno 400 - ', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: '',
                url: '',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(400);
            })
        });

        it('Validar retorno 401 - ', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: '',
                url: '',
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

    describe('Módulo - Pacientes - ', () => {

        it('Validar retorno 200 - ', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: '',
                url: '',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(400);
            })
        });

        it('Validar retorno 400 - ', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: '',
                url: '',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(400);
            })
        });

        it('Validar retorno 401 - ', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: '',
                url: '',
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

    describe('Módulo - Pacientes - ', () => {

        it('Validar retorno 200 - ', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: '',
                url: '',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(400);
            })
        });

        it('Validar retorno 400 - ', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: '',
                url: '',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(400);
            })
        });

        it('Validar retorno 401 - ', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: '',
                url: '',
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

    describe('Módulo - Pacientes - ', () => {

        it('Validar retorno 200 - ', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: '',
                url: '',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(400);
            })
        });

        it('Validar retorno 400 - ', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: '',
                url: '',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(400);
            })
        });

        it('Validar retorno 401 - ', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: '',
                url: '',
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

    describe('Módulo - Pacientes - ', () => {

        it('Validar retorno 200 - ', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: '',
                url: '',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(400);
            })
        });

        it('Validar retorno 400 - ', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: '',
                url: '',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(400);
            })
        });

        it('Validar retorno 401 - ', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: '',
                url: '',
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

    describe('Módulo - Pacientes - ', () => {

        it('Validar retorno 200 - ', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: '',
                url: '',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(400);
            })
        });

        it('Validar retorno 400 - ', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: '',
                url: '',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(400);
            })
        });

        it('Validar retorno 401 - ', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: '',
                url: '',
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

    describe('Módulo - Pacientes - ', () => {

        it('Validar retorno 200 - ', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: '',
                url: '',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(400);
            })
        });

        it('Validar retorno 400 - ', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: '',
                url: '',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(400);
            })
        });

        it('Validar retorno 401 - ', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: '',
                url: '',
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

    describe('Módulo - Pacientes - ', () => {

        it('Validar retorno 200 - ', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: '',
                url: '',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(400);
            })
        });

        it('Validar retorno 400 - ', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: '',
                url: '',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(400);
            })
        });

        it('Validar retorno 401 - ', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: '',
                url: '',
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

    describe('Módulo - Pacientes - ', () => {

        it('Validar retorno 200 - ', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: '',
                url: '',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(400);
            })
        });

        it('Validar retorno 400 - ', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: '',
                url: '',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(400);
            })
        });

        it('Validar retorno 401 - ', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: '',
                url: '',
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

    describe('Módulo - Pacientes - ', () => {

        it('Validar retorno 200 - ', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: '',
                url: '',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(400);
            })
        });

        it('Validar retorno 400 - ', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: '',
                url: '',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(400);
            })
        });

        it('Validar retorno 401 - ', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: '',
                url: '',
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

    describe('Módulo - Pacientes - ', () => {

        it('Validar retorno 200 - ', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: '',
                url: '',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(400);
            })
        });

        it('Validar retorno 400 - ', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: '',
                url: '',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(400);
            })
        });

        it('Validar retorno 401 - ', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: '',
                url: '',
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

    describe('Módulo - Pacientes - ', () => {

        it('Validar retorno 200 - ', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: '',
                url: '',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(400);
            })
        });

        it('Validar retorno 400 - ', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: '',
                url: '',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(400);
            })
        });

        it('Validar retorno 401 - ', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: '',
                url: '',
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

    describe('Módulo - Pacientes - ', () => {

        it('Validar retorno 200 - ', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: '',
                url: '',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(400);
            })
        });

        it('Validar retorno 400 - ', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: '',
                url: '',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(400);
            })
        });

        it('Validar retorno 401 - ', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: '',
                url: '',
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

    describe('Módulo - Pacientes - ', () => {

        it('Validar retorno 200 - ', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: '',
                url: '',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(400);
            })
        });

        it('Validar retorno 400 - ', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: '',
                url: '',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(400);
            })
        });

        it('Validar retorno 401 - ', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: '',
                url: '',
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

    describe('Módulo - Pacientes - ', () => {

        it('Validar retorno 200 - ', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: '',
                url: '',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(400);
            })
        });

        it('Validar retorno 400 - ', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: '',
                url: '',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(400);
            })
        });

        it('Validar retorno 401 - ', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: '',
                url: '',
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

    describe('Módulo - Pacientes - ', () => {

        it('Validar retorno 200 - ', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: '',
                url: '',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(400);
            })
        });

        it('Validar retorno 400 - ', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: '',
                url: '',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(400);
            })
        });

        it('Validar retorno 401 - ', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: '',
                url: '',
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

    describe('Módulo - Pacientes - ', () => {

        it('Validar retorno 200 - ', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: '',
                url: '',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(400);
            })
        });

        it('Validar retorno 400 - ', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: '',
                url: '',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(400);
            })
        });

        it('Validar retorno 401 - ', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: '',
                url: '',
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

    describe('Módulo - Pacientes - ', () => {

        it('Validar retorno 200 - ', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: '',
                url: '',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(400);
            })
        });

        it('Validar retorno 400 - ', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: '',
                url: '',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(400);
            })
        });

        it('Validar retorno 401 - ', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: '',
                url: '',
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

    describe('Módulo - Pacientes - ', () => {

        it('Validar retorno 200 - ', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: '',
                url: '',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(400);
            })
        });

        it('Validar retorno 400 - ', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: '',
                url: '',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(400);
            })
        });

        it('Validar retorno 401 - ', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: '',
                url: '',
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

    describe('Módulo - Pacientes - ', () => {

        it('Validar retorno 200 - ', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: '',
                url: '',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(400);
            })
        });

        it('Validar retorno 400 - ', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: '',
                url: '',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(400);
            })
        });

        it('Validar retorno 401 - ', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: '',
                url: '',
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

    describe('Módulo - Pacientes - ', () => {

        it('Validar retorno 200 - ', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: '',
                url: '',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(400);
            })
        });

        it('Validar retorno 400 - ', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: '',
                url: '',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(400);
            })
        });

        it('Validar retorno 401 - ', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: '',
                url: '',
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

    describe('Módulo - Pacientes - ', () => {

        it('Validar retorno 200 - ', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: '',
                url: '',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(400);
            })
        });

        it('Validar retorno 400 - ', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: '',
                url: '',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(400);
            })
        });

        it('Validar retorno 401 - ', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: '',
                url: '',
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

    describe('Módulo - Pacientes - ', () => {

        it('Validar retorno 200 - ', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: '',
                url: '',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(400);
            })
        });

        it('Validar retorno 400 - ', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: '',
                url: '',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(400);
            })
        });

        it('Validar retorno 401 - ', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: '',
                url: '',
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

    describe('Módulo - Pacientes - ', () => {

        it('Validar retorno 200 - ', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: '',
                url: '',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(400);
            })
        });

        it('Validar retorno 400 - ', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: '',
                url: '',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(400);
            })
        });

        it('Validar retorno 401 - ', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: '',
                url: '',
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

    describe('Módulo - Pacientes - ', () => {

        it('Validar retorno 200 - ', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: '',
                url: '',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(400);
            })
        });

        it('Validar retorno 400 - ', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: '',
                url: '',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(400);
            })
        });

        it('Validar retorno 401 - ', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: '',
                url: '',
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

    describe('Módulo - Pacientes - ', () => {

        it('Validar retorno 200 - ', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: '',
                url: '',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(400);
            })
        });

        it('Validar retorno 400 - ', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: '',
                url: '',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(400);
            })
        });

        it('Validar retorno 401 - ', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: '',
                url: '',
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
})