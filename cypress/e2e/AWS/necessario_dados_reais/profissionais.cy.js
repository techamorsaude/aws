/// <reference types="cypress"/>


describe('Módulo - Profissionais', () => {
    beforeEach(() => {
        cy.login();
        cy.refreshToken();
    })

    describe('Módulo - Profissionais - Cadastrar profissional', () => {

        it('Validar retorno 201 - /api/v1/profissionais', () => {
            const token = Cypress.env('access_token');

            cy.gerarCpfValido().then((cpfGerado) => {

                cy.request({
                    method: 'POST',
                    url: '/api/v1/profissionais',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    },
                    body: {
                        "tratamento": "Dr.",
                        "nome": "Paulo",
                        "sobrenome": "do Produto",
                        "rg": "18.872.351-9",
                        "dataNascimento": "19900125",
                        "telefone1": "16996233425",
                        "email": `joao_${cpfGerado}@email.com.br`, // evita duplicação de e-mail,
                        "cep": "14021-676",
                        "endereco": "Rua Cavalheiro Torquato Rizzi",
                        "numero": "490",
                        "bairro": "Bosque das Juritis",
                        "cpf": cpfGerado,   // <<< CPF DINÂMICO
                        "cidade": "Ribeirão Preto",
                        "estadoEndereco": "SP",
                        "especialidadesRqe": [
                            {
                                "id": 611,
                                "specialtyId": "Acupuntura",
                                "conselhoProfissionalId": {
                                    "id": 6,
                                    "descricao": "CRM"
                                },
                                "registroProfissional": "11111111111",
                                "state": "SP",
                                "titulo": "Experiência na Área - Não Especialista",
                                "tituloId": 2,
                                "rqe": "",
                                "memedId": 1,
                                "profissaoId": 65
                            }
                        ],
                        "titulo": "Dr.",
                        "ativo": true,
                        "conselhoProfissionalId": [
                            {
                                "id": 6
                            }
                        ],
                        "funcaoId": [
                            {
                                "id": 1
                            }
                        ],
                        "profissaoID": [
                            {
                                "id": 65
                            }
                        ],
                        "unidades": [
                            {
                                "id": 483
                            }
                        ],
                        "sexoId": [
                            {
                                "id": 1
                            }
                        ],
                        "exibirNaAgenda": true,
                        "responsavelTecnicoClinica": false,
                        "usuarioId": [
                            {
                                "id": 1427
                            }
                        ],
                        "convenios": true,
                        "usuarioUnidadeId": 483,
                        "perfilAcessoId": 2
                    },
                    failOnStatusCode: false
                }).then((response) => {
                    expect(response.status).to.eq(201);
                    expect(response.body).to.have.property('codigo');
                    expect(response.body).to.have.property('flagDeError');
                    expect(response.body).to.have.property('mensagem');
                    expect(response.body).to.have.property('professionalId');
                })
            })
        })

        it('Validar retorno 400 - /api/v1/profissionais', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/profissionais',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: {
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(400);
            })
        })
    })

    describe('Módulo - Profissionais - Listar profissionais com paginação e filtros', () => {

        it('Validar retorno 200 - /api/v1/profissionais', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/profissionais?page=1&limit=1',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(200);

                const body = response.body;
                expect(body).to.have.property('items').to.be.an('array')
                body.items.forEach((item) => {
                    expect(item).to.have.property('id');
                    expect(item).to.have.property('tratamento');
                    expect(item).to.have.property('nome');
                    expect(item).to.have.property('sobrenome');
                    expect(item).to.have.property('cpf');
                    expect(item).to.have.property('rg');
                    expect(item).to.have.property('flagMemedPdf');
                    expect(item).to.have.property('titulo');
                    expect(item).to.have.property('dataNascimento');
                    expect(item).to.have.property('email');
                    expect(item).to.have.property('telefone1');
                    expect(item).to.have.property('telefone2');
                    expect(item).to.have.property('cep');
                    expect(item).to.have.property('endereco');
                    expect(item).to.have.property('numero');
                    expect(item).to.have.property('complemento');
                    expect(item).to.have.property('bairro');
                    expect(item).to.have.property('cidade');
                    expect(item).to.have.property('estadoEndereco');
                    expect(item).to.have.property('observacaoPublica');
                    expect(item).to.have.property('convenios');
                    expect(item).to.have.property('exibirNaAgenda');
                    expect(item).to.have.property('responsavelTecnicoClinica');
                    expect(item).to.have.property('mensagemAgenda');
                    expect(item).to.have.property('ativo');
                    expect(item).to.have.property('fotografia');
                    expect(item).to.have.property('tokenMemed');
                    expect(item).to.have.property('criadoPor');
                    expect(item).to.have.property('birdIdToken');
                    expect(item).to.have.property('birdIdExpiration');
                    expect(item).to.have.property('observacaoPrivada');
                    expect(item).to.have.property('cnpj');
                    expect(item).to.have.property('fkUsuario');
                    expect(item).to.have.property('memedUpdateAt');
                    expect(item).to.have.property('profissaoID').to.be.an('array')
                    expect(item).to.have.property('profissionaisUnidades').to.be.an('array')
                    expect(item).to.have.property('regionais').to.be.an('array')
                    expect(item).to.have.property('fornecedorId').to.be.an('array')
                    expect(item).to.have.property('especialidades').to.be.an('array')
                })
            })
        })

        it('Validar retorno 401 - /api/v1/profissionais', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/profissionais?page=1&limit=1',
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

    describe.only('Módulo - Profissionais - Cadastrar fotografia do profissional', () => {

        it('Validar retorno 201 - /api/v1/profissionais/avatar/{id}', () => {
            const token = Cypress.env('access_token');
            const id = 4033;

            cy.fixture('testedeFoto.bmp', 'binary')
                .then(Cypress.Blob.binaryStringToBlob)
                .then(fileBlob => {

                    const formData = new FormData();
                    formData.append('avatar', fileBlob, 'testedeFoto.bmp');

                    cy.request({
                        method: 'POST',
                        url: `/api/v1/profissionais/avatar/${id}`,
                        headers: {
                            'Authorization': `Bearer ${token}`
                        },
                        body: {
                            formData,
                            form: false,
                            encoding: 'binary'
                        },
                        failOnStatusCode: false
                    }).then(response => {
                        expect(response.status).to.eq(201);
                    });
                });
        });


        it('Validar retorno 400 - /api/v1/profissionais/avatar/{id}', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/profissionais/avatar/{id}',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(400);
            })
        })

        it('Validar retorno 401 - /api/v1/profissionais/avatar/{id}', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/profissionais/avatar/{id}',
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

    describe.only('Módulo - Profissionais - Baixar fotografia do profissional', () => {

        it('Validar retorno 200 - /api/v1/profissionais/avatar/{id}', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/profissionais/avatar/4033',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(200);
            })
        })

        it('Validar retorno 400 - /api/v1/profissionais/avatar/{id}', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/profissionais/avatar/{id}',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(400);
            })
        })

    })

    describe.only('Módulo - Profissionais - Remove fotografia do profissional', () => {

        it('Validar retorno 200 - /api/v1/profissionais/avatar/{id}', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'DELETE',
                url: '/api/v1/profissionais/avatar/4033',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(200);
            })
        })

        it('Validar retorno 400 - /api/v1/profissionais/avatar/{id}', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'DELETE',
                url: '/api/v1/profissionais/avatar/{id}',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(400);
            })
        })

        it('Validar retorno 401 - /api/v1/profissionais/avatar/{id}', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'DELETE',
                url: '/api/v1/profissionais/avatar/{id}',
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

    describe('Módulo - Profissionais - Atualizar profissional por id', () => {

        it('Validar retorno 200 - /api/v1/profissionais/{id}', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'PUT',
                url: '/api/v1/profissionais/{id}',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: {
                    "tratamento": "Tratamento x",
                    "nome": "João",
                    "sobrenome": "da Silva",
                    "cpf": "99999999999",
                    "rg": "31.658.268-6",
                    "registroProfissional": "90.264/SP",
                    "titulo": "Dr.",
                    "dataNascimento": "19801219",
                    "telefone1": "+5511911112222",
                    "telefone2": "+551141112222",
                    "email": "joaodasilva@email.com.br",
                    "cep": "08111-123",
                    "endereco": "Rua arco verde",
                    "numero": 123,
                    "complemento": "Sala 2",
                    "bairro": "Jardim arco verde",
                    "cidade": "São Paulo",
                    "estado": "São Paulo",
                    "estadoEndereco": "São Paulo",
                    "observacaoPublica": "Observacao para uso interno.",
                    "observacaoPrivada": "Observacao para uso externo.",
                    "convenios": true,
                    "exibirNaAgenda": true,
                    "responsavelTecnicoClinica": true,
                    "mensagemAgenda": "Mensagem etc...",
                    "ativo": true,
                    "fotografia": "https://img.freepik.com/vetores-gratis/avatar-homem-barba_96853-399.jpg",
                    "tokenMemed": "string",
                    "fornecedorId": [
                        {
                            "id": 2
                        }
                    ],
                    "funcaoId": [
                        {
                            "id": 1
                        }
                    ],
                    "restricoes": [
                        {
                            "id": 1
                        }
                    ],
                    "sexoId": [
                        {
                            "id": 1
                        }
                    ],
                    "conselhoProfissionalId": [
                        {
                            "id": 6
                        }
                    ],
                    "usuarioId": [
                        {
                            "id": 1
                        }
                    ],
                    "profissaoID": [
                        {
                            "id": 1
                        }
                    ],
                    "unidades": [
                        {
                            "id": 1
                        }
                    ],
                    "especialidades": [
                        {
                            "id": 1
                        }
                    ],
                    "regionais": [
                        {
                            "id": 1
                        }
                    ],
                    "especialidadesRqe": [
                        "string"
                    ],
                    "idUsuario": 1,
                    "usuarioUnidadeId": 1,
                    "perfilAcessoId": 1,
                    "cnpj": "123456780000123"
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(200);
            })
        })

        it('Validar retorno 400 - /api/v1/profissionais/{id}', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'PUT',
                url: '/api/v1/profissionais/{id}',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: {
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(400);
            })
        })

        it('Validar retorno 401 - /api/v1/profissionais/{id}', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'PUT',
                url: '/api/v1/profissionais/{id}',
                headers: {
                    //'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: {
                    "tratamento": "Tratamento x",
                    "nome": "João",
                    "sobrenome": "da Silva",
                    "cpf": "99999999999",
                    "rg": "31.658.268-6",
                    "registroProfissional": "90.264/SP",
                    "titulo": "Dr.",
                    "dataNascimento": "19801219",
                    "telefone1": "+5511911112222",
                    "telefone2": "+551141112222",
                    "email": "joaodasilva@email.com.br",
                    "cep": "08111-123",
                    "endereco": "Rua arco verde",
                    "numero": 123,
                    "complemento": "Sala 2",
                    "bairro": "Jardim arco verde",
                    "cidade": "São Paulo",
                    "estado": "São Paulo",
                    "estadoEndereco": "São Paulo",
                    "observacaoPublica": "Observacao para uso interno.",
                    "observacaoPrivada": "Observacao para uso externo.",
                    "convenios": true,
                    "exibirNaAgenda": true,
                    "responsavelTecnicoClinica": true,
                    "mensagemAgenda": "Mensagem etc...",
                    "ativo": true,
                    "fotografia": "https://img.freepik.com/vetores-gratis/avatar-homem-barba_96853-399.jpg",
                    "tokenMemed": "string",
                    "fornecedorId": [
                        {
                            "id": 2
                        }
                    ],
                    "funcaoId": [
                        {
                            "id": 1
                        }
                    ],
                    "restricoes": [
                        {
                            "id": 1
                        }
                    ],
                    "sexoId": [
                        {
                            "id": 1
                        }
                    ],
                    "conselhoProfissionalId": [
                        {
                            "id": 6
                        }
                    ],
                    "usuarioId": [
                        {
                            "id": 1
                        }
                    ],
                    "profissaoID": [
                        {
                            "id": 1
                        }
                    ],
                    "unidades": [
                        {
                            "id": 1
                        }
                    ],
                    "especialidades": [
                        {
                            "id": 1
                        }
                    ],
                    "regionais": [
                        {
                            "id": 1
                        }
                    ],
                    "especialidadesRqe": [
                        "string"
                    ],
                    "idUsuario": 1,
                    "usuarioUnidadeId": 1,
                    "perfilAcessoId": 1,
                    "cnpj": "123456780000123"
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(401);
            })
        })
    })

    describe('Módulo - Profissionais - Busca profissional por id', () => {

        it('Validar retorno 200 - /api/v1/profissionais/{id}', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/profissionais/{id}',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(200);
            })
        })

        it('Validar retorno 400 - /api/v1/profissionais/{id}', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/profissionais/{id}',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(400);
            })
        })

        it('Validar retorno 401 - /api/v1/profissionais/{id}', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/profissionais/{id}',
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

    describe('Módulo - Profissionais - Deleta profissional por id', () => {

        it('Validar retorno 200 - /api/v1/profissionais/{id}', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'DELETE',
                url: '/api/v1/profissionais/{id}',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(200);
            })
        })

        it('Validar retorno 400 - /api/v1/profissionais/{id}', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'DELETE',
                url: '/api/v1/profissionais/{id}',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(400);
            })
        })

        it('Validar retorno 401 - /api/v1/profissionais/{id}', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'DELETE',
                url: '/api/v1/profissionais/{id}',
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

    describe('Módulo - Profissionais - Listar todos os profissionais cadastrados', () => {

        it('Validar retorno 200 - /api/v1/profissionais/full', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/profissionais/full',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(200);

                const body = response.body;
                expect(body).to.be.an('array');

                body.forEach((item) => {
                    expect(item).to.have.property('id');
                    expect(item).to.have.property('tratamento');
                    expect(item).to.have.property('nome');
                    expect(item).to.have.property('sobrenome');
                })
            })
        })

        it('Validar retorno 401 - /api/v1/profissionais/full', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/profissionais/full',
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

    describe('Módulo - Profissionais - Listar todos os profissionais da unidade do usuário logado', () => {

        it('Validar retorno 200 - /api/v1/profissionais/by-unidade', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/profissionais/by-unidade',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(200);

                const body = response.body;
                expect(body).to.be.an('array');

                body.forEach((item) => {
                    expect(item).to.have.property('id');
                    expect(item).to.have.property('tratamento');
                    expect(item).to.have.property('nome');
                    expect(item).to.have.property('sobrenome');
                })
            })
        })

        it('Validar retorno 401 - /api/v1/profissionais/by-unidade', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/profissionais/by-unidade',
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

    describe('Módulo - Profissionais - Listar todos os profissionais cadastrados', () => {

        it('Validar retorno 200 - /api/v1/profissionais/especialidade/{id}', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/profissionais/especialidade/{id}',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(200);
            })
        })

        it('Validar retorno 400 - /api/v1/profissionais/especialidade/{id}', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/profissionais/especialidade/{id}',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(400);
            })
        })

        it('Validar retorno 401 - /api/v1/profissionais/especialidade/{id}', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/profissionais/especialidade/{id}',
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

    describe('Módulo - Profissionais - Listar unidades em que o profissional atende', () => {

        it('Validar retorno 200 - /api/v1/profissionais/unidades-profissional/{id}', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/profissionais/unidades-profissional/{id}',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(200);
            })
        })

        it('Validar retorno 400 - /api/v1/profissionais/unidades-profissional/{id}', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/profissionais/unidades-profissional/{id}',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(400);
            })
        })

        it('Validar retorno 401 - /api/v1/profissionais/unidades-profissional/{id}', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/profissionais/unidades-profissional/{id}',
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

    describe('Módulo - Profissionais - Vincular perfil ao profissional', () => {

        it('Validar retorno 200 - /api/v1/profissionais/{id}/perfil', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'PUT',
                url: '/api/v1/profissionais/{id}/perfil',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: {
                    "unidadeId": 1,
                    "setorId": 1,
                    "funcaoId": 1,
                    "grupoRegrasId": 1
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(200);
            })
        })

        it('Validar retorno 400 - /api/v1/profissionais/{id}/perfil', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'PUT',
                url: '/api/v1/profissionais/{id}/perfil',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: {
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(400);
            })
        })

        it('Validar retorno 401 - /api/v1/profissionais/{id}/perfil', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'PUT',
                url: '/api/v1/profissionais/{id}/perfil',
                headers: {
                    //'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: {
                    "unidadeId": 1,
                    "setorId": 1,
                    "funcaoId": 1,
                    "grupoRegrasId": 1
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(401);
            })
        })
    })

    describe('Módulo - Profissional - Consultar perfil do profissional', () => {

        it('Validar retorno 200 - /api/v1/profissionais/{id}/perfil', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/profissionais/{id}/perfil',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(200);
            })
        })

        it('Validar retorno 400 - /api/v1/profissionais/{id}/perfil', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/profissionais/{id}/perfil',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(400);
            })
        })

        it('Validar retorno 401 - /api/v1/profissionais/{id}/perfil', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/profissionais/{id}/perfil',
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

    describe('Módulo - Profissional - Remover perfil do profissional', () => {

        it('Validar retorno 200 - /api/v1/profissionais/perfil/{id}', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'DELETE',
                url: '/api/v1/profissionais/perfil/{id}',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(200);
            })
        })

        it('Validar retorno 400 - /api/v1/profissionais/perfil/{id}', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'DELETE',
                url: '/api/v1/profissionais/perfil/{id}',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(400);
            })
        })

        it('Validar retorno 401 - /api/v1/profissionais/perfil/{id}', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'DELETE',
                url: '/api/v1/profissionais/perfil/{id}',
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

    describe('Módulo - Profissional - Listar profissionais que seja responsavel da clinica', () => {

        it('Validar retorno 200 - /api/v1/profissionais/responsible-clinic', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/profissionais/responsible-clinic',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(200);
            })
        })

        it('Validar retorno 401 - /api/v1/profissionais/responsible-clinic', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/profissionais/responsible-clinic',
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

    describe('Módulo - Profissional - Ativar ou Desativar profissional por id', () => {

        it('Validar retorno 201 - /api/v1/profissionais/activation/toggle/{id}', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/profissionais/activation/toggle/{id}',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(201);
            })
        })

        it('Validar retorno 400 - /api/v1/profissionais/activation/toggle/{id}', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/profissionais/activation/toggle/{id}',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(400);
            })
        })

        it('Validar retorno 401 - /api/v1/profissionais/activation/toggle/{id}', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/profissionais/activation/toggle/{id}',
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

    describe('Módulo - Profissional - Lista especialidades do profissional', () => {

        it('Validar retorno 200 - /api/v1/profissionais/{id}/specialties', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/profissionais/{id}/specialties',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(200);
            })
        })

        it('Validar retorno 400 - /api/v1/profissionais/{id}/specialties', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/profissionais/{id}/specialties',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(400);
            })
        })

        it('Validar retorno 401 - /api/v1/profissionais/{id}/specialties', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/profissionais/{id}/specialties',
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

    describe('Módulo - Profissional - Lista repasses a receber de um profissional', () => {

        it('Validar retorno 200 - /api/v1/profissionais/{id}/repasses', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/profissionais/{id}/repasses',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(200);
            })
        })

        it('Validar retorno 400 - /api/v1/profissionais/{id}/repasses', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/profissionais/{id}/repasses',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(400);
            })
        })

        it('Validar retorno 401 - /api/v1/profissionais/{id}/repasses', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/profissionais/{id}/repasses',
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

    describe('Módulo - Profissional - Atualiza e-mail do profissional e do usuário vinculado ao profissional', () => {

        it('Validar retorno 201 - /api/v1/profissionais/update-email', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: '',
                url: '/api/v1/profissionais/update-email',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body:
                {
                    "employeeId": 123,
                    "newEmail": "teste@teste.com"
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(201);
            })
        })

        it('Validar retorno 400 - /api/v1/profissionais/update-email', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: '',
                url: '/api/v1/profissionais/update-email',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: {
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(400);
            })
        })

        it('Validar retorno 401 - /api/v1/profissionais/update-email', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: '',
                url: '/api/v1/profissionais/update-email',
                headers: {
                    //'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body:
                {
                    "employeeId": 123,
                    "newEmail": "teste@teste.com"
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(401);
            })
        })
    })

    describe('Módulo - Profissional - Retorna uma lista de Titulos para o profissional', () => {

        it('Validar retorno 200 - /api/v1/profissionais/list/degree', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/profissionais/list/degree',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(200);
            })
        })

        it('Validar retorno 401 - /api/v1/profissionais/list/degree', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/profissionais/list/degree',
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

    describe('Módulo - Profissional - Retorna uma lista de profissionais por especialidades', () => {

        it('Validar retorno 200 - /api/v1/profissionais/especialidades/{expertiseAreaIds}', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/profissionais/especialidades/{expertiseAreaIds}',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(200);
            })
        })

        it('Validar retorno 401 - /api/v1/profissionais/especialidades/{expertiseAreaIds}', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/profissionais/especialidades/{expertiseAreaIds}',
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

    describe('Módulo - Profissional - Listar profissionais com paginação e filtros', () => {

        it('Validar retorno 200 - /api/v1/profissionais/buscar-por-cpf/{cpf}', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/profissionais/buscar-por-cpf/{cpf}',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(200);
            })
        })

        it('Validar retorno 400 - /api/v1/profissionais/buscar-por-cpf/{cpf}', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/profissionais/buscar-por-cpf/{cpf}',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(400);
            })
        })

        it('Validar retorno 401 - /api/v1/profissionais/buscar-por-cpf/{cpf}', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/profissionais/buscar-por-cpf/{cpf}',
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

    describe('Módulo - Profissional - Cadastrar restrições do profissional', () => {

        it('Validar retorno 201 - /api/v1/profissionais/{id}/professional-restrictions', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/profissionais/{id}/professional-restrictions',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: {
                    "restrictionType": {
                        "age": true,
                        "gender": true,
                        "newPatients": true
                    },
                    "ageRange": {
                        "ageStart": 0,
                        "ageEnd": 10
                    },
                    "gender": {
                        "male": true,
                        "female": true,
                        "notDefined": true
                    }
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(201);
            })
        })

        it('Validar retorno 400 - /api/v1/profissionais/{id}/professional-restrictions', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/profissionais/{id}/professional-restrictions',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: {
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(400);
            })
        })

        it('Validar retorno 401 - /api/v1/profissionais/{id}/professional-restrictions', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/profissionais/{id}/professional-restrictions',
                headers: {
                    //'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: {
                    "restrictionType": {
                        "age": true,
                        "gender": true,
                        "newPatients": true
                    },
                    "ageRange": {
                        "ageStart": 0,
                        "ageEnd": 10
                    },
                    "gender": {
                        "male": true,
                        "female": true,
                        "notDefined": true
                    }
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(401);
            })
        })
    })

    describe('Módulo - Profissional - Listar restrições do profissional', () => {

        it('Validar retorno 200 - /api/v1/profissionais/{id}/professional-restrictions', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/profissionais/{id}/professional-restrictions',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(200);
            })
        })

        it('Validar retorno 400 - /api/v1/profissionais/{id}/professional-restrictions', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/profissionais/{id}/professional-restrictions',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(400);
            })
        })

        it('Validar retorno 401 - /api/v1/profissionais/{id}/professional-restrictions', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/profissionais/{id}/professional-restrictions',
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

    describe('Módulo - Profissional - Listar restrições do profissional por grade', () => {

        it('Validar retorno 200 - /api/v1/profissionais/restrictions-schedule/{scheduleId}', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/profissionais/restrictions-schedule/{scheduleId}',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(200);
            })
        })

        it('Validar retorno 400 - /api/v1/profissionais/restrictions-schedule/{scheduleId}', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/profissionais/restrictions-schedule/{scheduleId}',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(400);
            })
        })

        it('Validar retorno 401 - /api/v1/profissionais/restrictions-schedule/{scheduleId}', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/profissionais/restrictions-schedule/{scheduleId}',
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

    describe('Módulo - Profissional - Deletar restrições do profissional', () => {

        it('Validar retorno 200 - /api/v1/profissionais/professional-restrictions/{id}', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'DELETE',
                url: '/api/v1/profissionais/professional-restrictions/{id}',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(200);
            })
        })

        it('Validar retorno 400 - /api/v1/profissionais/professional-restrictions/{id}', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'DELETE',
                url: '/api/v1/profissionais/professional-restrictions/{id}',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(400);
            })
        })

        it('Validar retorno 401 - /api/v1/profissionais/professional-restrictions/{id}', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'DELETE',
                url: '/api/v1/profissionais/professional-restrictions/{id}',
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

    describe('Módulo - Profissional - Verificar se o paciente está nas restrições do profissional', () => {

        it('Validar retorno 200 - /api/v1/profissionais/restrictions-patient/{patientId}/schedule/{scheduleId}', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/profissionais/restrictions-patient/{patientId}/schedule/{scheduleId}',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(200);
            })
        })

        it('Validar retorno 400 - /api/v1/profissionais/restrictions-patient/{patientId}/schedule/{scheduleId}', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/profissionais/restrictions-patient/{patientId}/schedule/{scheduleId}',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(400);
            })
        })

        it('Validar retorno 401 - /api/v1/profissionais/restrictions-patient/{patientId}/schedule/{scheduleId}', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/profissionais/restrictions-patient/{patientId}/schedule/{scheduleId}',
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

    describe('Módulo - Profissional - Observações do profissional', () => {

        it('Validar retorno 200 - /api/v1/profissionais/observations/{professionalId}', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/profissionais/observations/{professionalId}',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(200);
            })
        })

        it('Validar retorno 400 - /api/v1/profissionais/observations/{professionalId}', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/profissionais/observations/{professionalId}',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(400);
            })
        })

        it('Validar retorno 401 - /api/v1/profissionais/observations/{professionalId}', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/profissionais/observations/{professionalId}',
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

    describe('Módulo - Profissional - Retorna a quantidade assinaturas do profissional', () => {

        it('Validar retorno 200 - /api/v1/profissionais/signatures/{professionalId}', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/profissionais/signatures/{professionalId}',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(200);
            })
        })

        it('Validar retorno 400 - /api/v1/profissionais/signatures/{professionalId}', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/profissionais/signatures/{professionalId}',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(400);
            })
        })

        it('Validar retorno 401 - /api/v1/profissionais/signatures/{professionalId}', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/profissionais/signatures/{professionalId}',
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

    describe('Módulo - Profissional - Cadastra um token Memed para um profissional', () => {

        it('Validar retorno 201 - /api/v1/profissionais/token-memed/professional/{id}', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/profissionais/token-memed/professional/{id}',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(201);
            })
        })

        it('Validar retorno 400 - /api/v1/profissionais/token-memed/professional/{id}', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/profissionais/token-memed/professional/{id}',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(400);
            })
        })

        it('Validar retorno 401 - /api/v1/profissionais/token-memed/professional/{id}', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/profissionais/token-memed/professional/{id}',
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

    describe('Módulo - Profissional - Retorna um token Memed por cpf de um profissional', () => {

        it('Validar retorno 200 - /api/v1/profissionais/token-memed/professional/{cpf}', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/profissionais/token-memed/professional/{cpf}',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(200);
            })
        })

        it('Validar retorno 400 - /api/v1/profissionais/token-memed/professional/{cpf}', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/profissionais/token-memed/professional/{cpf}',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(400);
            })
        })

        it('Validar retorno 401 - /api/v1/profissionais/token-memed/professional/{cpf}', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/profissionais/token-memed/professional/{cpf}',
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