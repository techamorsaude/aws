/// <reference types="cypress" />

describe('Módulo - Usuários', () => {
    beforeEach(() => {
        cy.login();
        cy.refreshToken()
    })

    describe('Módulo - Usuários - Trás as informações do usuário logado', () => {

        it('Validar retorno 200 - /api/v1/user/current-user-info', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/user/current-user-info',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(200);

                // Campos Principais
                expect(response.body).to.have.all.keys(
                    'tokenMemed',
                    'professionalId',
                    'tokenInfo',
                    'userinfo',
                    'userProfilePermission'
                )
            })
        })

        it('Validar retorno 401 - /api/v1/user/current-user-info', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/user/current-user-info',
                headers: {
                    //'Authorization': `Bearer ${token}`, //Token inválido
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(401);
            })
        })
    })

    describe('Módulo - Usuários - Cria um usuário com os dados mínimos', () => {

        it('Validar retorno 201 - /api/v1/user/create-first', () => {
            const token = Cypress.env('access_token');

            // Gera os valores dinâmicos e os armazena em variáveis
            const email = `usuarioTesteAPI${Date.now()}@email.com`;
            const password = `@Password${Math.floor(Math.random() * 10000)}`;

            cy.request({
                method: 'POST',
                url: '/api/v1/user/create-first',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: {
                    email: `usuarioTesteAPI${Date.now()}@email.com`,
                    password: `@Password${Math.floor(Math.random() * 10000)}`,
                    firstName: "Teste",
                    lastName: "API",
                    fullName: "Teste API"
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(201)

                const item = response.body;
                expect(item).to.have.property('email');
                expect(item).to.have.property('firstName');
                expect(item).to.have.property('lastName');
                expect(item).to.have.property('fullName');
                expect(item).to.have.property('cpf');
                expect(item).to.have.property('isAdmin');
                expect(item).to.have.property('tratamento');
                expect(item).to.have.property('sexo');
                expect(item).to.have.property('dataNascimento');
                expect(item).to.have.property('celular');
                expect(item).to.have.property('funcao');
                expect(item).to.have.property('profissao');
                expect(item).to.have.property('crm');
                expect(item).to.have.property('uf');
                expect(item).to.have.property('cidade');
                expect(item).to.have.property('role');
                expect(item).to.have.property('isActive');
                expect(item).to.have.property('loginTimes');
                expect(item).to.have.property('passwordIsInvalidCount');
                expect(item).to.have.property('createdAt');
                expect(item).to.have.property('updatedAt');
                expect(item).to.have.property('id');
                const userId = item.id;
                cy.log('Usuário criado com Id:', userId);

                // Guarda os valores email e password
                cy.writeFile('cypress/fixtures/userData.json', {
                    email,
                    password,
                })
            })
        })

        it('Validar retorno 400 - /api/v1/user/create-first', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/user/create-first',
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
    })

    describe('Módulo - Usuários - Cria um usuário com os dados mínimos e sem senha', () => {

        it('Validar retorno 201 - /api/v1/user/create-first-without-password', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/user/create-first-without-password',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: {
                    email: `usuarioTesteAPI${Date.now()}@email.com`,
                    firstName: "Teste",
                    lastName: "API",
                    fullName: "Teste API"
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(201)

                const item = response.body;
                expect(item).to.have.property('email');
                expect(item).to.have.property('firstName');
                expect(item).to.have.property('lastName');
                expect(item).to.have.property('fullName');
                expect(item).to.have.property('cpf');
                expect(item).to.have.property('isAdmin');
                expect(item).to.have.property('tratamento');
                expect(item).to.have.property('sexo');
                expect(item).to.have.property('dataNascimento');
                expect(item).to.have.property('celular');
                expect(item).to.have.property('funcao');
                expect(item).to.have.property('profissao');
                expect(item).to.have.property('crm');
                expect(item).to.have.property('uf');
                expect(item).to.have.property('cidade');
                expect(item).to.have.property('role');
                expect(item).to.have.property('isActive');
                expect(item).to.have.property('loginTimes');
                expect(item).to.have.property('passwordIsInvalidCount');
                expect(item).to.have.property('createdAt');
                expect(item).to.have.property('updatedAt');
                expect(item).to.have.property('id');
                const userId = item.id;
                cy.log('Usuário criado com Id:', userId);
            })
        })

        it('Validar retorno 400 - /api/v1/user/create-first-without-password', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/user/create-first-without-password',
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
    })

    // Precisa de dados reais do Amei
    describe('Módulo - Usuários - Alterar a senha do usuário', () => {

        it('Validar retorno 200 - /api/v1/user', () => {
            cy.readFile('cypress/fixtures/userData.json').then((user) => {
                const { email, password } = user;

                // Primeiro, autentica com o usuário criado para obter o token
                cy.request({
                    method: 'POST',
                    url: '/api/v1/security/login',
                    body: {
                        email: 'ivan.santos+1@amorsaude.com',
                        password: 'Iv@n198529'
                    },
                    failOnStatusCode: false // normalmente esse cod refere-se a uma api pra nao dar erro de false
                }).then((loginResponse) => {
                    expect(loginResponse.status).to.eq(200)

                    const token = loginResponse.body.token;

                    // Agora faz o PATCH com o token do próprio usuário
                    cy.request({
                        method: 'PATCH',
                        url: '/api/v1/user',
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            'Content-Type': 'application/json'
                        },
                        body: {
                            email: user.email,
                            actualPassword: user.password,
                            newPassword: `@Pasword${Math.floor(Math.random() * 10000)}`
                        },
                        failOnStatusCode: false
                    }).then((response) => {
                        expect(response.status).to.eq(200)
                    })
                })
            })
        })

        it('Validar retorno 400 - /api/v1/user', () => {
            const token = Cypress.env('access_token');
            cy.request({
                method: 'PATCH',
                url: '/api/v1/user',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: { //Sem parÂmetro no body
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(400)
            })
        })
    })

    describe('Módulo - Usuários - Lista usuarios por clínica', () => {

        it('Validar retorno 200 - /api/v1/user/by-clinic', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/user/by-clinic',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(200);

                const items = response.body;
                items.forEach((item) => {
                    expect(item).to.have.property('id');
                    expect(item).to.have.property('nome');
                    expect(item).to.have.property('unidadeId');
                    expect(item).to.have.property('unidade');
                    expect(item).to.have.property('funcionarioId');
                })
            })
        })

        it('Validar retorno 401 - /api/v1/user/by-clinic', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/user/by-clinic/',
                headers: {
                    //'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(401);
            })
        })
    })

    describe('Módulo - Usuários - Retorna os grupos regras', () => {

        it('Validar retorno 200 - /api/v1/user/grupo_regras', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/user/grupo_regras',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(200);

                const items = response.body;
                items.forEach((item) => {
                    expect(item).to.have.property('id');
                    expect(item).to.have.property('grupo');
                })
            })
        })

        it('Validar retorno 401 - /api/v1/user/grupo_regras', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/user/grupo_regras',
                headers: {
                    //'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(401);
            })
        })
    })

    // Precisa de dados reais do Amei
    describe('Módulo - Usuários - Criar a senha do usuário', () => {

        it('Validar retorno 200 - /api/v1/user/change-password', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'PATCH',
                url: '/api/v1/user/change-password',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: {
                    email: "usuarioTesteAPI1753211020093@email.com",
                    newPassword: "@Password5916",
                    confirmPassword: "@Password5916"
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(200)

                expect(response.body).to.include.all.key(
                    'codigo',
                    'flagDeError',
                    'mensagem'
                )
            })
        })

        it('Validar retorno 400 - /api/v1/user/change-password', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'PATCH',
                url: '/api/v1/user/change-password',
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
    })

    describe('Módulo - Usuários - Envia recuperação de senha para o usuário', () => {

        it('Validar retorno 201 - /api/v1/user/change-password', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/user/change-password',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: {
                    email: "ivan.santos+1@amorsaude.com",
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(201);

                const item = response.body;
                expect(item).to.have.property('codigo');
                expect(item).to.have.property('flagDeError');
                expect(item).to.have.property('mensagem');
            })
        })

        it('Validar retorno 400 - /api/v1/user/change-password', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/user/change-password',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: {// Sem parâmetro no body

                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(400);
            })
        })

        it('Validar retorno 401 - /api/v1/user/change-password', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/user/change-password',
                headers: {
                    //'Authorization': `Bearer ${token}`, Token inválido
                    'Content-Type': 'application/json'
                },
                body: {
                    email: "ivan.santos+1@amorsaude.com",
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(401);
            })
        })
    })

    // Precisa de dados reais do Amei
    describe('Módulo - Usuários - Alteração de senha internamente pelo usuário', () => {

        it('Validar retorno 201 - /api/v1/user/recovery-password', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/user/recovery-password',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: {
                    email: "ivan.santos+1@amorsaude.com",
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(201);

                const item = response.body;
                expect(item).to.have.property('codigo');
                expect(item).to.have.property('flagDeError');
                expect(item).to.have.property('mensagem');
            })
        })

        it('Validar retorno 400 - /api/v1/user/recovery-password', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/user/recovery-password',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: {

                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(400);
            })
        })

        it('Validar retorno 401 - /api/v1/user/recovery-password', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/user/recovery-password',
                headers: {
                    //'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: {
                    email: "ivan.santos+1@amorsaude.com",
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(401);
            })
        })
    })

    describe('Módulo - Usuários - Recuperar senha', () => {

        it('Validar retorno 201 - /api/v1/user/password-recover', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/user/password-recover',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: {
                    email: "ivan.santos+1@amorsaude.com",
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(201);

                const item = response.body;
                expect(item).to.have.property('codigo');
                expect(item).to.have.property('flagDeError');
                expect(item).to.have.property('mensagem');
            })
        })

        it('Validar retorno 400 - /api/v1/user/password-recover', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/user/password-recover',
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
    })

    // Precisa de dados reais do Amei
    describe('Módulo - Usuários - Recuperar / Nova senha do usuário', () => {

        it('Validar retorno 200 - /api/v1/user/password-recover', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'PATCH',
                url: '/api/v1/user/password-recover',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: {
                    "newPassword": "string",
                    "confirmPassword": "string",
                    "hash": "string"
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(200);
            })
        })

        it('Validar retorno 400 - /api/v1/user/password-recover', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'PATCH',
                url: '/api/v1/user/password-recover',
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
})
