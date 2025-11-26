/// <reference types= "cypress" />  

describe('Módulo - Cadastro de usuários', () => {

    beforeEach(() => {
        cy.login()
        cy.refreshToken()
    });

    // Precisa de dados reais do Amei
    describe('Módulo - Cadastro de usuários - Após logar, permite criar novo usuários', () => {

        it('Validar retorno 201 - /api/v1/user/create-complete', () => {
            const token = Cypress.env('access_token');  // Obter o token de acesso do Cypress.env()

            // Verifique se o token está disponível
            if (!token) {
                throw new Error('Token de acesso não encontrado!');
            }

            // Função para gerar um email aleatório
            const generateRandomEmail = () => {
                return `usuario${Math.floor(Math.random() * 100000)}@email.com`;
            };

            // Função para gerar um CPF aleatório (apenas para teste, sem validade real)
            const generateRandomCPF = () => {
                return `${Math.floor(Math.random() * 1000000000)}`;
            };

            // Função para gerar um celular aleatório
            const generateRandomPhone = () => {
                return `+5511${Math.floor(Math.random() * 10000000000)}`;
            };

            // Função para gerar um CRM aleatório (apenas para teste)
            const generateRandomCRM = () => {
                return `${Math.floor(Math.random() * 100000)}`;
            };

            cy.request({
                method: 'POST',  // O método do endpoint é POST
                url: '/api/v1/user/create-complete', // URL do seu endpoint
                headers: {
                    'Authorization': `Bearer ${token}`,  // Cabeçalho de autenticação com o token
                    'Content-Type': 'application/json'  // Certificando-se de que a requisição é JSON
                },
                failOnStatusCode: false, // Não fazer falhar o teste automaticamente em status 4xx ou 5xx
                body: {
                    "id": 0,
                    "email": generateRandomEmail(),
                    "password": "@Password",
                    "firstName": "João",
                    "lastName": "da Silva",
                    "fullName": "João da Silva",
                    "cpf": generateRandomCPF(),
                    "isAdmin": false,
                    "tratamento": "tratamento x",
                    "sexo": "masculino",
                    "data_nascimento": "19801219",
                    "celular": generateRandomPhone(),
                    "funcao": "Profissional de saúde - nível superior",
                    "profissao": "Médico",
                    "crm": generateRandomCRM(),
                    "uf": "SP",
                    "cidade": "São Paulo",
                    "role": "user",
                    "isActive": true,
                    "createAd": "20220531",
                    "updateAd": "20220531"
                }
            }).then((response) => {
                // Verificar se o status é 201 (criado com sucesso)
                expect(response.status).to.eq(201);

                // Opcional: Verificar se o corpo da resposta contém o campo "id" ou outra informação esperada
                expect(response.body).to.have.property('id');  // Verifica se a resposta contém um 'id' atribuído
            });
        });

        it('Validar retorno 401 - /api/v1/user/create-complete', () => {

            const token = Cypress.env('access_token')
            // Função para gerar um email aleatório
            const generateRandomEmail = () => {
                return `usuario${Math.floor(Math.random() * 100000)}@email.com`;
            };

            // Função para gerar um CPF aleatório (apenas para teste, sem validade real)
            const generateRandomCPF = () => {
                return `${Math.floor(Math.random() * 1000000000)}`;
            };

            // Função para gerar um celular aleatório
            const generateRandomPhone = () => {
                return `+5511${Math.floor(Math.random() * 10000000000)}`;
            };

            // Função para gerar um CRM aleatório (apenas para teste)
            const generateRandomCRM = () => {
                return `${Math.floor(Math.random() * 100000)}`;
            };

            cy.request({
                method: 'POST',  // O método do endpoint é POST
                url: '/api/v1/user/create-complete', // URL do seu endpoint
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                failOnStatusCode: false, // Não fazer falhar o teste automaticamente em status 4xx ou 5xx
                body: {
                    "id": 0,
                    "email": generateRandomEmail(),
                    "password": "@Password",
                    "firstName": "João",
                    "lastName": "da Silva",
                    "fullName": "João da Silva",
                    "cpf": generateRandomCPF(),
                    "isAdmin": false,
                    "tratamento": "tratamento x",
                    "sexo": "masculino",
                    "data_nascimento": "19801219",
                    "celular": generateRandomPhone(),
                    "funcao": "Profissional de saúde - nível superior",
                    "profissao": "Médico",
                    "crm": generateRandomCRM(),
                    "uf": "SP",
                    "cidade": "São Paulo",
                    "role": "user",
                    "isActive": true,
                    "createAd": "20220531",
                    "updateAd": "20220531"
                }
            }).then((response) => {
                // Verificar se o status é 401 (não autorizado)
                expect(response.status).to.eq(401);

                expect(response.body).to.deep.equal({
                    message: "Usuário não cadastrado, por favor, contate a central para solicitar seu cadastro.",
                    error: "Unauthorized",
                    statusCode: 401
                });
            });
        })
    })

    // Precisa de dados reais do Amei
    describe('Módulo - Cadastro de usuários - Após um usuário logado no sistema, permite atualizar usuário existente', () => {

        it('Validar retorno 200 - /api/v1/user/update', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'PUT',
                url: '/api/v1/user/update',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: {
                    "id": 0,
                    "email": generateRandomEmail(),
                    "password": "@Password",
                    "firstName": "João",
                    "lastName": "da Silva",
                    "fullName": "João da Silva",
                    "cpf": generateRandomCPF(),
                    "isAdmin": false,
                    "tratamento": "tratamento x",
                    "sexo": "masculino",
                    "data_nascimento": "19801219",
                    "celular": generateRandomPhone(),
                    "funcao": "Profissional de saúde - nível superior",
                    "profissao": "Médico",
                    "crm": generateRandomCRM(),
                    "uf": "SP",
                    "cidade": "São Paulo",
                    "role": "user",
                    "isActive": true,
                    "createAd": "20220531",
                    "updateAd": "20220531"
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(200);
            })
        })

        it('Validar retorno 400 - /api/v1/user/update', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'PUT',
                url: '/api/v1/user/update',
                headers: {
                    //'Authorization': `Bearer ${token}`, token inválido
                    'Content-Type': 'application/json'
                },
                body: {
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(401);
            })
        })
    })
})