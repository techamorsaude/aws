/// <reference types="cypress" />

describe('Módulo - Lista Espera', () => {
    beforeEach(() => {
        cy.login();
        cy.refreshToken();
    })

    // Precisa de dados reais do Amei
    describe('Módulo - Lista Espera - Cria uma lista de espera', () => {

        it('Validar retorno 201 - /api/v1/lista-espera', () => {
            const token = Cypress.env('access_token');
            const cpfListaCriada = "79295868803"

            cy.request({
                method: 'POST',
                url: '/api/v1/lista-espera',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: {
                    cpf: `${cpfListaCriada}`,
                    pacienteId: 353494,
                    especialidadeId: 611,
                    profissionalId: 3601,
                    observacoes: `${cpfListaCriada}`
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(201)

                expect(response.body).to.have.property('flagDeError');
                expect(response.body).to.have.property('codigo');
                expect(response.body).to.have.property('mensagem');

                // Salva a descrição em um arquivo temporário
                cy.writeFile('cypress/fixtures/lista-espera.json', { observacoes: cpfListaCriada })
            })
        })

        it('Validar retorno 401 - /api/v1/lista-espera', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/lista-espera',
                headers: {
                    //'Authorization': `Bearer ${token}`, Token inválido
                    'Content-Type': 'application/json'
                },
                body: {
                    "pacienteId": 245352,
                    "clinicaId": 483,
                    "procedimentoId": 20715,
                    "especialidadeId": 611,
                    "convenioId": 5,
                    "profissionalId": 4121,
                    "parceriaId": 20486,
                    "observacoes": "observacoes",
                    "tabela": "convenio",
                    "cpf": "43657772898"
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(401)
            })
        })
    })

    // Precisa de dados reais do Amei
    describe('Módulo - Lista Espera - Lista de Espera', () => {

        it('Validar retorno 200 - /api/v1/lista-espera', () => {
            const token = Cypress.env('access_token');

            cy.readFile('cypress/fixtures/lista-espera.json').then((data) => {
                const observacoes = data.observacoes

                cy.request({
                    method: 'GET',
                    url: 'api/v1/lista-espera?especialidadeId=611&profissionalId=3601&withoutProfessional=true&page=1&limit=100&search=79295868803&blockedGrid=100',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    },
                    failOnStatusCode: false,
                }).then((response) => {
                    expect(response.status).to.eq(200)

                    // Variável para acessar array items
                    const items = response.body.items;

                    const data = response.body;
                    expect(data).to.have.property('items').to.be.an('array')
                    data.items.forEach((item) => {
                        expect(item).to.have.property('id');
                        expect(item).to.have.property('observacoes');
                        expect(item).to.have.property('criadoEm');
                        expect(item).to.have.property('pacienteId');
                        expect(item.pacienteId).to.have.property('id');
                        expect(item.pacienteId).to.have.property('cpf');
                        expect(item.pacienteId).to.have.property('nome');
                        expect(item.pacienteId).to.have.property('sobrenome');
                        expect(item.pacienteId).to.have.property('dataNascimento');
                        expect(item.pacienteId).to.have.property('telefone');
                        expect(item.pacienteId).to.have.property('celular');
                        expect(item.pacienteId).to.have.property('celularAlternativo');
                        expect(item).to.have.property('statusId');
                        expect(item.statusId).to.have.property('id');
                        expect(item.statusId).to.have.property('description');
                        expect(item).to.have.property('origemId');
                        expect(item.origemId).to.have.property('id');
                        expect(item.origemId).to.have.property('description');
                        expect(item).to.have.property('criadoPor');
                        expect(item.criadoPor).to.have.property('id');
                        expect(item.criadoPor).to.have.property('fullName');
                        expect(item).to.have.property('especialidadeId');
                        expect(item.especialidadeId).to.have.property('id');
                        expect(item.especialidadeId).to.have.property('descricao');
                        expect(item).to.have.property('profissionalId');
                        expect(item.profissionalId).to.have.property('id');
                        expect(item.profissionalId).to.have.property('tratamento');
                        expect(item.profissionalId).to.have.property('nome');
                        expect(item.profissionalId).to.have.property('sobrenome');
                        expect(item).to.have.property('parceriaId');
                        expect(item).to.have.property('procedimentoId');
                        expect(item).to.have.property('agendamento');
                    })

                    // Valida objeto meta 
                    expect(response.body).to.have.property('meta').to.include.all.keys(
                        'itemCount',
                        'totalItems',
                        'itemsPerPage',
                        'currentPage',
                        'totalPages'
                    )

                    const listaEncontrada = response.body.items.find(item =>
                        item.observacoes === observacoes);

                    expect(listaEncontrada, 'Lista Encontrada').to.not.be.undefined;

                    //Salva o id para uso nos próximos testes
                    cy.writeFile('cypress/fixtures/lista-espera.json', {
                        observacoes,
                        id: listaEncontrada.id
                    })
                })
            })
        })

        it('Validar retorno 400 - /api/v1/lista-espera', () => {
            const token = Cypress.env('access_token');

            cy.readFile('cypress/fixtures/lista-espera.json').then((data) => {
                const observacoes = data.observacoes

                cy.request({
                    method: 'POST', //método divergente
                    url: 'api/v1/lista-espera?especialidadeId=611&profissionalId=3601&withoutProfessional=true&page=1&limit=100&search=79295868803&blockedGrid=100',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    },
                    failOnStatusCode: false,
                }).then((response) => {
                    expect(response.status).to.eq(400)
                })
            })
        })

        it('Validar retorno 401 - /api/v1/lista-espera', () => {
            const token = Cypress.env('access_token');

            cy.readFile('cypress/fixtures/lista-espera.json').then((data) => {
                const observacoes = data.observacoes

                cy.request({
                    method: 'GET',
                    url: 'api/v1/lista-espera?especialidadeId=611&profissionalId=3601&withoutProfessional=true&page=1&limit=100&search=79295868803&blockedGrid=100',
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

    // Precisa de dados reais do Amei
    describe('Módulo - Lista Espera - Retorna por id', () => {

        it('Validar retorno 200 - /api/v1/lista-espera/{id}', () => {
            const token = Cypress.env('access_token');

            cy.readFile('cypress/fixtures/lista-espera.json').then((data) => {
                const id = data.id

                cy.request({
                    method: 'GET',
                    url: `/api/v1/lista-espera/${id}`,
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    },
                    failOnStatusCode: false,
                }).then((response) => {
                    expect(response.status).to.eq(200)

                    expect(response.body).to.have.property('id');
                    expect(response.body).to.have.property('tabela');
                    expect(response.body).to.have.property('status');
                    expect(response.body).to.have.property('observacoes');
                    expect(response.body).to.have.property('criadoPorId');
                    expect(response.body).to.have.property('criadoEm');
                    expect(response.body).to.have.property('unidadeId');
                    expect(response.body).to.have.property('updateBy');
                    expect(response.body).to.have.property('updateAt');
                    expect(response.body).to.have.property('deletedAt');
                    expect(response.body).to.have.property('deletedBy');
                    expect(response.body).to.have.property('descricaoMotivoCancelamento');
                    expect(response.body).to.have.property('pacienteId');
                    expect(response.body).to.have.property('procedimentoId');
                    expect(response.body).to.have.property('especialidadeId');
                    expect(response.body).to.have.property('convenioId');
                    expect(response.body).to.have.property('profissionalId');
                    expect(response.body).to.have.property('parceriaId');
                    expect(response.body).to.have.property('pacienteNome');
                    expect(response.body).to.have.property('pacienteSobrenome');
                    expect(response.body).to.have.property('pacienteDataNascimento');
                    expect(response.body).to.have.property('pacienteCelular');
                    expect(response.body).to.have.property('pacienteTelefone');
                    expect(response.body).to.have.property('pacienteCpf');
                    expect(response.body).to.have.property('pacienteEmail');
                })
            })
        })

        it('Validar retorno 400 - /api/v1/lista-espera/{id}', () => {
            const token = Cypress.env('access_token');

            cy.readFile('cypress/fixtures/lista-espera.json').then((data) => {
                const id = data.id

                cy.request({
                    method: 'DELETE',
                    url: `/api/v1/lista-espera/${id}`,
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    },
                    failOnStatusCode: false,
                }).then((response) => {
                    expect(response.status).to.eq(400)
                })
            })
        })

        it('Validar retorno 401 - /api/v1/lista-espera/{id}', () => {
            const token = Cypress.env('access_token');

            cy.readFile('cypress/fixtures/lista-espera.json').then((data) => {
                const id = data.id

                cy.request({
                    method: 'GET',
                    url: `/api/v1/lista-espera/${id}`,
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

    // Precisa de dados reais do Amei
    describe('Módulo - Lista Espera - Atualizar por id', () => {

        it('Validar retorno 200 - /api/v1/lista-espera/{id}', () => {
            const token = Cypress.env('access_token');

            cy.readFile('cypress/fixtures/lista-espera.json').then((data) => {
                const id = data.id

                cy.request({
                    method: 'PATCH',
                    url: `/api/v1/lista-espera/${id}`,
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    },
                    body: {
                        especialidadeId: 611,
                        profissionalId: 3601,
                        observacoes: "79295868803"
                    },
                    failOnStatusCode: false,
                }).then((response) => {
                    expect(response.status).to.eq(200)

                    expect(response.body).to.have.property('codigo');
                    expect(response.body).to.have.property('flagDeError');
                    expect(response.body).to.have.property('mensagem');
                })
            })
        })

        it('Validar retorno 401 - /api/v1/lista-espera/{id}', () => {
            const token = Cypress.env('access_token');

            cy.readFile('cypress/fixtures/lista-espera.json').then((data) => {
                const id = data.id

                cy.request({
                    method: 'PATCH',
                    url: `/api/v1/lista-espera/${id}`,
                    headers: {
                        //'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    },
                    body: {
                        especialidadeId: 611,
                        profissionalId: 3601,
                        observacoes: "79295868803"
                    },
                    failOnStatusCode: false,
                }).then((response) => {
                    expect(response.status).to.eq(401)
                })
            })
        })
    })

    // Precisa de dados reais do Amei
    describe('Módulo - Lista Espera - Deletar por id', () => {

        it('Validar retorno 200 - /api/v1/lista-espera/{id}', () => {
            const token = Cypress.env('access_token');

            cy.readFile('cypress/fixtures/lista-espera.json').then((data) => {
                const id = data.id

                cy.request({
                    method: 'DELETE',
                    url: `/api/v1/lista-espera/${id}`,
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    },
                    body: {
                        idMotivo: 1,
                        motivoDescricao: "motivo do cancelamento (outros)"
                    },
                    failOnStatusCode: false,
                }).then((response) => {
                    expect(response.status).to.eq(200)
                    const item = response.body;

                    expect(item).to.have.property('codigo');
                    expect(item).to.have.property('flagDeError');
                    expect(item).to.have.property('mensagem');
                })
            })
        })

        it('Validar retorno 400 - /api/v1/lista-espera/{id}', () => {
            const token = Cypress.env('access_token');

            cy.readFile('cypress/fixtures/lista-espera.json').then((data) => {
                const id = data.id

                cy.request({
                    method: 'DELETE',
                    url: `/api/v1/lista-espera/${id}`,
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    },
                    body: {}, // sem parâmetro no body
                    failOnStatusCode: false,
                }).then((response) => {
                    expect(response.status).to.eq(400)
                })
            })
        })

        it('Validar retorno 401 - /api/v1/lista-espera/{id}', () => {
            const token = Cypress.env('access_token');

            cy.readFile('cypress/fixtures/lista-espera.json').then((data) => {
                const id = data.id

                cy.request({
                    method: 'DELETE',
                    url: `/api/v1/lista-espera/${id}`,
                    headers: {
                        // 'Authorization': `Bearer ${token}`, Token inválido
                        'Content-Type': 'application/json'
                    },
                    body: {
                        idMotivo: 1,
                        motivoDescricao: "motivo do cancelamento (outros)"
                    },
                    failOnStatusCode: false,
                }).then((response) => {
                    expect(response.status).to.eq(401)
                    const item = response.body;
                })
            })
        })
    })

    describe('Módulo - Lista Espera - Retorna lista de espera por id para criar agendamento - Criar agendamento', () => {

        it('Validar retorno 200 - /api/v1/lista-espera/{id}/appointment', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/pacientes/353494/appointments/number-of-absences',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(200)
         
                expect(response.body).to.have.property('flagDeError');
                expect(response.body).to.have.property('codigo');
                expect(response.body).to.have.property('total');
                expect(response.body).to.have.property('message');
            })
        })

        it('Validar retorno 400 - /api/v1/lista-espera/{id}/appointment', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/pacientes/353494/appointments',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(400)
            })
        })

        it('Validar retorno 401 - /api/v1/lista-espera/{id}/appointment', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/pacientes/353494/appointments/number-of-absences',
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

    describe('Módulo - Lista Espera - Motivo Cancelamento', () => {

        it('Validar retorno 200 - /api/v1/lista-espera/lista/motivo-cancelamento', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '//api/v1/lista-espera/lista/motivo-cancelamento',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(200)
                cy.log(JSON.stringify(response.body))

                const items = response.body
                items.forEach((data) => {
                expect(data).to.have.property('id');
                expect(data).to.have.property('description');
                })
            })
        })

        it('Validar retorno 400 - /api/v1/lista-espera/lista/motivo-cancelamento', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/lista-espera',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(400)
            })
        })

        it('Validar retorno 401 - /api/v1/lista-espera/lista/motivo-cancelamento', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/lista-espera',
                headers: {
                    //'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(401)
            })
        })
    })
})
