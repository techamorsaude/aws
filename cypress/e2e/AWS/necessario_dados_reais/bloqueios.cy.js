/// <reference types="cypress"/>

describe('Módulo - Bloqueios', () => {
    beforeEach(() => {
        cy.login();
        cy.refreshToken();
    })

    // Precisa de dados reais do Amei
    describe('Módulo - Bloqueios - Cria um bloqueio', () => {

        it.only('Validar retorno 201 - /api/v1/bloqueios', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/bloqueios',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: {
                    "dataInicio": 20251119,
                    "dataFim": 20251119,
                    "horaInicio": "22:30",
                    "horaFim": "23:00",
                    "diasSemana": [
                        4
                    ],
                    "especialidadeIds": [
                        611
                    ],
                    "descricao": "Teste",
                    "profissionalId": "1475"
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(201)
                expect(response.body).to.have.property('flagDeError');
                expect(response.body).to.have.property('codigo');
                expect(response.body).to.have.property('mensagem');
            })
        })

        it('Validar retorno 400 - /api/v1/bloqueios', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/bloqueios',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: { // Sem parâmetros no body
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(400)
            })
        })

        it('Validar retorno 401 - /api/v1/bloqueios', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/bloqueios',
                headers: {
                    //'Authorization': `Bearer ${token}`, Token inválido
                    'Content-Type': 'application/json'
                },
                body: {
                    dataInicio: 20251009,
                    dataFim: 20251009,
                    horaInicio: "23:00",
                    horaFim: "23:50",
                    diasSemana: [
                        4
                    ],
                    especialidadeIds: [
                        611
                    ],
                    descricao: "Teste",
                    profissionalId: "4121"
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(401)
            })
        })
    })

    // Precisa de dados reais do Amei
    describe('Módulo - Bloqueios - Retorna uma lista de bloqueios', () => {

        it('Validar retorno 200 - /api/v1/bloqueios', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/bloqueios?profissionalId=8470',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(200)

                const bloqueio = response.body[0];

                // Validação de propriedades principais
                expect(bloqueio).to.have.property('id');
                expect(bloqueio).to.have.property('dataInicio');
                expect(bloqueio).to.have.property('dataFim');
                expect(bloqueio).to.have.property('horaInicio');
                expect(bloqueio).to.have.property('horaFim');
                expect(bloqueio).to.have.property('descricao');

                // Validação da especialidade
                expect(bloqueio.especialidades).to.be.an('array');
                expect(bloqueio.especialidades[0]).to.have.property('id');
                expect(bloqueio.especialidades[0]).to.have.property('descricao');

                // Validação de dados do profissional
                const profissional = bloqueio.profissionalId;
                expect(profissional).to.have.property('id');
                expect(profissional).to.have.property('nome');
                expect(profissional).to.have.property('sobrenome');
                expect(profissional).to.have.property('email');
                expect(profissional).to.have.property('cpf');
                expect(profissional).to.have.property('ativo');

                //Salva id do bloqueio
                const idBloqueio = bloqueio.id;
                Cypress.env('idBloqueio', idBloqueio)
                cy.log('ID do Bloqueio:', idBloqueio)
            })
        })

        it('Validar retorno 401 - /api/v1/bloqueios', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/bloqueios?profissionalId=4121',
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

    /* A rota PATCH está temporariamente indisponível para testes. O sistema apresenta erro ao tentar editar bloqueios de grade. O problema já foi reportado e está sendo acompanhado por meio do card: https://amorsaudesuporte.atlassian.net/browse/PP-1705
        describe.only('Módulo - Bloqueios - Atualiza bloqueio por id', () => {
            
            it('Validar retorno 200 - /api/v1/bloqueios/{id}', () => {
                const token = Cypress.env('access_token');
                const idBloqueio = Cypress.env('idBloqueio')
    
                cy.request({
                    method: 'PATCH',
                    url: `/api/v1/bloqueios/${idBloqueio}`,
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    },
                    failOnStatusCode: false
                }).then((response) => {
                    expect(response.status).to.eq(200)
                })
            })
        })
        */

    // Precisa de dados reais do Amei
    describe('Módulo - Bloqueios - Deletar bloqueio', () => {

        it('Validar retorno 200 - /api/v1/bloqueios/{id}', () => {
            const token = Cypress.env('access_token');
            const idBloqueio = Cypress.env('idBloqueio');

            cy.request({
                method: 'DELETE',
                url: `/api/v1/bloqueios/${idBloqueio}`,
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(200)
                expect(response.body).to.have.property('flagDeError');
                expect(response.body).to.have.property('codigo');
                expect(response.body).to.have.property('mensagem');
            })
        })

        it('Validar retorno 400 - /api/v1/bloqueios/{id}', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'DELETE',
                url: '/api/v1/bloqueios/{id}', // sem parâmetro
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(400)
            })
        })

        it('Validar retorno 401 - /api/v1/bloqueios/{id}', () => {
            const token = Cypress.env('access_token');
            const idBloqueio = Cypress.env('idBloqueio');

            cy.request({
                method: 'DELETE',
                url: `/api/v1/bloqueios/${idBloqueio}`,
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

    describe('Módulo - Bloqueios - Retorna uma lista de bloqueios', () => {

        it('Validar retorno 201 - /api/v1/bloqueios/check-patient', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/bloqueios/check-patient',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: {
                    dataInicio: "20251009",
                    dataFim: "20251009",
                    horaInicio: "23:00",
                    horaFim: "23:50",
                    diasSemana: [
                        1,
                        2,
                        3,
                        4
                    ],
                    especialidadeIds: [
                        611
                    ],
                    descricao: "Teste",
                    profissionalId: 4121
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(201)
                cy.log('Retorna vazio', JSON.stringify(response.body))
            })
        })

        it('Validar retorno 401 - /api/v1/bloqueios/check-patient', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/bloqueios/check-patient',
                headers: {
                    //'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: {
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(401)
            })
        })
    })
})