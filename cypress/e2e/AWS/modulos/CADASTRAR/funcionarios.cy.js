/// <reference types="cypress" />


describe('Módulo - Funcionários', () => {
    beforeEach(() => {
        cy.login();
        cy.refreshToken();
    })

    describe('Módulo - Funcionários - Retorna lista de funcionários (sem paginação)', () => {

        it('Validar retorno 200 - /api/v1/employees', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/employees?unidadeId=483&nome=Teste',
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
                    expect(item).to.have.property('perfilAcessoId');
                    expect(item).to.have.property('nome');
                    expect(item).to.have.property('sobrenome');
                    expect(item).to.have.property('nomeCompleto');
                    expect(item).to.have.property('status');
                    expect(item).to.have.property('email');
                    expect(item).to.have.property('setor');
                    expect(item).to.have.property('funcao');
                    expect(item).to.have.property('perfil');
                })
            })
        })

        it('Validar retorno 400 - /api/v1/employees', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST', //método divergente
                url: '/api/v1/employees?unidadeId=483',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(400)
            })
        })

        it('Validar retorno 401 - /api/v1/employees', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/employees?unidadeId=483',
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

    describe('Módulo - Funcionários - Cadastrar um funcionário', () => {

        it('Validar retorno 201 - /api/v1/employees', () => {
            const token = Cypress.env('access_token')
            cy.gerarCpfValido().then((cpf) => {

                // Gerar número aleatório de 1 a 1000
                const numeroAleatorio = Math.floor(Math.random() * 1000) + 1;
                // Gerar o email com número no nome
                const email = `testeqa${numeroAleatorio}@gmail.com`;

                // Gerar o sobrenome com número
                const sobrenome = `QA${numeroAleatorio}`;

                cy.request({
                    method: 'POST',
                    url: '/api/v1/employees',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    },
                    body: {
                        status: "1",
                        nome: "Julio",
                        sobrenome: sobrenome,
                        foto: "",
                        cpf: cpf,
                        rg: "42.418.401-1",
                        dataNascimento: "1995-07-17",
                        dataDemissao: null,
                        dataAdmissao: "2025-10-01",
                        tipoFuncionario: "Interno",
                        origemExterno: "",
                        cep: "13580-970",
                        sexoId: 1,
                        setorId: 3,
                        observacao: "",
                        celular: "16992788783",
                        bairro: "Centro",
                        email: email,
                        endereco: "Rua São Paulo",
                        numero: "121",
                        complemento: "",
                        funcaoId: 1,
                        perfilAcessoId: 1,
                        municipioId: 4918,
                        usuarioUnidadeId: 483
                    }
                    ,
                    failOnStatusCode: false,
                }).then((response) => {
                    expect(response.status).to.eq(201);

                    expect(response.body).to.include.all.keys(
                        'nome',
                        'funcao',
                        'perfil',
                        'perfilAcessoId',
                        'setor',
                        'id',
                        'foto',
                        'cpf',
                        'rg',
                        'funcaoId',
                        'status',
                        'statusId',
                        'sobrenome',
                        'dataAdmissao',
                        'dataDemissao',
                        'tipoFuncionario',
                        'origemExterno',
                        'nomeCompleto',
                        'dataNascimento',
                        'sexoId',
                        'sexo',
                        'sexoSigla',
                        'setorId',
                        'observacao',
                        'celular',
                        'email',
                        'cep',
                        'endereco',
                        'numero',
                        'complemento',
                        'bairro',
                        'municipioId',
                        'municipio',
                        'estadoId',
                        'estado',
                        'usuarioId',
                        'usuario',
                        'usuarioEmail',
                        'criadoEm',
                        'unidadeId'
                    )
                    const idFuncionario = response.body.id
                    // Salva o ID para uso posterior
                    Cypress.env('idFuncionario', idFuncionario)
                    cy.log('Funcionario ID:', idFuncionario)
                })
            })
        })

        it('Validar retorno 400 - /api/v1/employees', () => {
            const token = Cypress.env('access_token')
            cy.gerarCpfValido().then((cpf) => {

                // Gerar número aleatório de 1 a 1000
                const numeroAleatorio = Math.floor(Math.random() * 1000) + 1;
                // Gerar o email com número no nome
                const email = `testeqa${numeroAleatorio}@gmail.com`;

                // Gerar o sobrenome com número
                const sobrenome = `QA${numeroAleatorio}`;

                cy.request({
                    method: 'POST',
                    url: '/api/v1/employees',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    },
                    body: { // Sem parÂmetro no body

                    },
                    failOnStatusCode: false,
                }).then((response) => {
                    expect(response.status).to.eq(400);
                })
            })
        })

        it('Validar retorno 401 - /api/v1/employees', () => {
            const token = Cypress.env('access_token')
            cy.gerarCpfValido().then((cpf) => {

                // Gerar número aleatório de 1 a 1000
                const numeroAleatorio = Math.floor(Math.random() * 1000) + 1;
                // Gerar o email com número no nome
                const email = `testeqa${numeroAleatorio}@gmail.com`;

                // Gerar o sobrenome com número
                const sobrenome = `QA${numeroAleatorio}`;

                cy.request({
                    method: 'POST',
                    url: '/api/v1/employees',
                    headers: {
                        //'Authorization': `Bearer ${token}`, token inválido
                        'Content-Type': 'application/json'
                    },
                    body: {
                        nome: "Funcionario",
                        sobrenome: sobrenome,
                        foto: null,
                        cpf: cpf,
                        rg: "363450920",
                        dataNascimento: "19800909",
                        dataAdmissao: "20250101",
                        dataDemissao: null,
                        tipoFuncionario: "Interno",
                        origemExterno: "cVortex",
                        cargo: "Assistente",
                        sexoId: 1,
                        setorId: 1,
                        observacao: "testeAPI",
                        celular: "1699007453",
                        email: email,
                        cep: "16680970",
                        endereco: "Rua Osório Machado",
                        numero: "322",
                        complemento: null,
                        bairro: "Centro",
                        municipioId: 1,
                        usuarioUnidadeId: 1,
                        perfilAcessoId: 1,
                        funcaoId: 1
                    },
                    failOnStatusCode: false,
                }).then((response) => {
                    expect(response.status).to.eq(401);
                })
            })
        })
    })

    describe('Módulo - Funcionários - Retorna a grid de funcionários', () => {

        it('Validar retorno 200 - api/v1/employees/grid', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/employees/grid?page=1&limit=10',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(200)

                const data = response.body;
                expect(data).to.have.property('items').to.be.an('array')
                data.items.forEach((item) => {
                    expect(item).to.have.property('id');
                    expect(item).to.have.property('funcionarioUnidadeId');
                    expect(item).to.have.property('nome');
                    expect(item).to.have.property('sobrenome');
                    expect(item).to.have.property('nomeCompleto');
                    expect(item).to.have.property('status');
                    expect(item).to.have.property('cpf');
                    expect(item).to.have.property('email');
                    expect(item).to.have.property('setor');
                    expect(item).to.have.property('funcao');
                    expect(item).to.have.property('perfil');
                })
                expect(data).to.have.property('meta').to.include.all.keys(
                    'totalItems',
                    'currentPage',
                    'itemCount',
                    'itemsPerPage',
                    'totalPages'
                )
            })
        })

        it('Validar retorno 401 - api/v1/employees/grid', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/employees/grid?page=1&limit=10',
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

    describe('Módulo - Funcionários - Retorna um funcionário por id', () => {

        it('Validar retorno 200 - /api/v1/employees/{id}', () => {
            const token = Cypress.env('access_token');
            const idFuncionario = Cypress.env('idFuncionario'); //Reutiliza ID

            cy.request({
                method: 'GET',
                url: '/api/v1/employees/325',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(200)

                expect(response.body).to.include.all.keys(
                    'id',
                    'foto',
                    'nome',
                    'sobrenome',
                    'nomeCompleto',
                    'dataNascimento',
                    'dataAdmissao',
                    'dataDemissao',
                    'tipoFuncionario',
                    'origemExterno',
                    'cpf',
                    'rg',
                    'status',
                    'statusId',
                    'observacao',
                    'celular',
                    'email',
                    'cep',
                    'endereco',
                    'numero',
                    'complemento',
                    'bairro',
                    'sexoId',
                    'sexo',
                    'sexoSigla',
                    'municipioId',
                    'municipio',
                    'estadoId',
                    'estado',
                    'usuarioId',
                    'usuario',
                    'usuarioEmail',
                    'criadoEm',
                    'unidadeId',
                    'funcaoId',
                    'funcao',
                    'perfilAcessoId',
                    'perfil',
                    'setorId',
                    'setor'
                )
            })
        })

        it('Validar retorno 401 - /api/v1/employees/{id}', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/employees',
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

    describe('Módulo - Funcionários - Atualiza um funcionário por id', () => {

        it('Validar retorno 200 - /api/v1/employees/{id}', () => {
            const token = Cypress.env('access_token');
            const idFuncionario = Cypress.env('idFuncionario'); //Reutiliza ID

            // Gerar número aleatório de 1 a 1000
            const numeroAleatorio = Math.floor(Math.random() * 1000) + 1;
            // Gerar o email com número no nome
            const email = `testeqa${numeroAleatorio}@gmail.com`;

            // Gerar o sobrenome com número
            const sobrenome = `QA${numeroAleatorio}`;

            cy.request({
                method: 'PUT',
                url: '/api/v1/employees/346',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: {
                    "nome": "Paulo",
                    "sobrenome": "funcionário franqueadora",
                    "foto": "string",
                    "cpf": "55399067056",
                    "rg": "123",
                    "dataNascimento": "19900731",
                    "dataAdmissao": "19800101",
                    "dataDemissao": "19800101",
                    "tipoFuncionario": "Interno",
                    "origemExterno": "cVortex",
                    "cargo": "Assistente",
                    "sexoId": 1,
                    "setorId": 1,
                    "observacao": "string",
                    "celular": "16987654302",
                    "email": "paulo.rick+1@amorsaude.com",
                    "cep": "14025110",
                    "endereco": "Rua Barão do Amazonas",
                    "numero": "1234",
                    "complemento": "string",
                    "bairro": "Jardim Sumaré",
                    "municipioId": 1,
                    "usuarioUnidadeId": 1,
                    "perfilAcessoId": 1,
                    "funcaoId": 1
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(200)
                expect(response.body).to.include.all.keys(
                    'nome',
                    'funcao',
                    'perfil',
                    'perfilAcessoId',
                    'setor',
                    'id',
                    'foto',
                    'cpf',
                    'rg',
                    'funcaoId',
                    'status',
                    'statusId',
                    'sobrenome',
                    'dataAdmissao',
                    'dataDemissao',
                    'tipoFuncionario',
                    'origemExterno',
                    'nomeCompleto',
                    'dataNascimento',
                    'sexoId',
                    'sexo',
                    'sexoSigla',
                    'setorId',
                    'observacao',
                    'celular',
                    'email',
                    'cep',
                    'endereco',
                    'numero',
                    'complemento',
                    'bairro',
                    'municipioId',
                    'municipio',
                    'estadoId',
                    'estado',
                    'usuarioId',
                    'usuario',
                    'usuarioEmail',
                    'criadoEm',
                    'unidadeId'
                )
            })
        })

        it('Validar retorno 401 - /api/v1/employees/{id}', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'PUT',
                url: '/api/v1/employees/327',
                headers: {
                    //'Authorization': `Bearer ${token}`, Token inválido
                    'Content-Type': 'application/json'
                },
                body: {
                    nome: "Olsen",
                    sobrenome: "Rodrigo Mott Silva",
                    foto: null,
                    cpf: "35169138865",
                    rg: "37631680-9",
                    dataNascimento: "19860228",
                    dataAdmissao: null,
                    dataDemissao: null,
                    tipoFuncionario: null,
                    origemExterno: null,
                    cargo: "Analista",
                    sexoId: 1,
                    setorId: 3,
                    observacao: null,
                    celular: "16920004578",
                    email: "olsen.silva@amorsaude.com",
                    cep: "14021-644",
                    endereco: "Rua Magid Antônio Calil",
                    numero: "176",
                    complemento: null,
                    bairro: "Jardim Botânico",
                    municipioId: 4,
                    usuarioUnidadeId: 183,
                    perfilAcessoId: 1,
                    funcaoId: 1
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(401)
            })
        })
    })

    describe.only('Módulo - Funcionários - Atualiza e-mail do profissional e do usuário vinculado ao profissional', () => {

        it('Validar retorno 201 - /api/v1/employees/update-email', () => {
            const token = Cypress.env('access_token');
            const idFuncionario = Cypress.env('idFuncionario'); //Reutiliza ID

            // Gerar número aleatório de 1 a 1000
            const numeroAleatorio = Math.floor(Math.random() * 1000) + 1;
            // Gerar o email com número no nome
            const email = `${numeroAleatorio}@gmail.com`;

            cy.request({
                method: 'POST',
                url: '/api/v1/employees/update-email/',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: {
                    employeeId: 1271,
                    newEmail: 'bruna.rosario+RECPROD@amorsaude.com' //email
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(201)
                expect(response.body).to.have.property('codigo');
                expect(response.body).to.have.property('flagDeError');
                expect(response.body).to.have.property('mensagem');
            })
        })

        it('Validar retorno 400 - /api/v1/employees/update-email', () => {
            const token = Cypress.env('access_token');
            const idFuncionario = Cypress.env('idFuncionario'); //Reutiliza ID

            // Gerar número aleatório de 1 a 1000
            const numeroAleatorio = Math.floor(Math.random() * 1000) + 1;
            // Gerar o email com número no nome
            const email = `testeqa${numeroAleatorio}@gmail.com`;

            // Gerar o sobrenome com número
            const sobrenome = `QA${numeroAleatorio}`;

            cy.request({
                method: 'POST',
                url: '/api/v1/employees/update-email/',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: {
                    // Sem parâmetro no body
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(400)
            })
        })

        it('Validar retorno 401 - /api/v1/employees/update-email', () => {
            const token = Cypress.env('access_token');
            const idFuncionario = Cypress.env('idFuncionario'); //Reutiliza ID

            // Gerar número aleatório de 1 a 1000
            const numeroAleatorio = Math.floor(Math.random() * 1000) + 1;
            // Gerar o email com número no nome
            const email = `testeqa${numeroAleatorio}@gmail.com`;

            // Gerar o sobrenome com número
            const sobrenome = `QA${numeroAleatorio}`;

            cy.request({
                method: 'POST',
                url: '/api/v1/employees/update-email/',
                headers: {
                    // 'Authorization': `Bearer ${token}`, Token inválido
                    'Content-Type': 'application/json'
                },
                body: {
                    employeeId: idFuncionario,
                    newEmail: email
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(401)
            })
        })
    })

    describe('Módulo - Funcionários - Inativa e ativa funcionário', () => {

        it('Validar retorno 200 - /api/v1/employees/{id}/update-status', () => {
            const token = Cypress.env('access_token');
            const idFunc = 1046;

            cy.request({
                method: 'PUT',
                url: `/api/v1/employees/${idFunc}/update-status`,
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: {
                    status: "1 ativo / 0 inativo"
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(200)
                expect(response.body).to.have.property('codigo');
                expect(response.body).to.have.property('flagDeError');
                expect(response.body).to.have.property('mensagem');
            })
        })

        it('Validar retorno 400 - /api/v1/employees/{id}/update-status', () => {
            const token = Cypress.env('access_token');
            const idFunc = 1046;

            cy.request({
                method: 'PUT',
                url: `/api/v1/employees/{id}}/update-status`,//sem parâmetro no body
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: {
                    //sem parâmetro no body
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(400)
            })
        })

        it('Validar retorno 401 - /api/v1/employees/{id}/update-status', () => {
            const token = Cypress.env('access_token');
            const idFunc = 1046;

            cy.request({
                method: 'PUT',
                url: `/api/v1/employees/${idFunc}/update-status`,
                headers: {
                    //'Authorization': `Bearer ${token}`, Token inválido
                    'Content-Type': 'application/json'
                },
                body: {
                    status: "1 ativo / 0 inativo"
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(401)
            })
        })
    })

    describe('Módulo - Funcionários - Vincular perfil ao funcionário', () => {

        it('Validar retorno 200 - /api/v1/employees/{id}/perfil', () => {
            const token = Cypress.env('access_token');
            const idFuncionario = Cypress.env('idFuncionario'); //Reutiliza ID

            cy.request({
                method: 'PUT',
                url: `/api/v1/employees/974/perfil`,
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: {
                    unidadeId: 483,
                    setorId: 1,
                    funcaoId: 1,
                    grupoRegrasId: 1
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(200)
                expect(response.body).to.have.property('codigo');
                expect(response.body).to.have.property('flagDeError');
                expect(response.body).to.have.property('mensagem');
            })
        })

        it('Validar retorno 400 - /api/v1/employees/{id}/perfil', () => {
            const token = Cypress.env('access_token');
            const idFunc = 1045;

            cy.request({
                method: 'PUT',
                url: '/api/v1/employees/{id}/perfil',// sem parâmetro no body
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: {// sem parâmetro no body

                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(400)
            })
        })

        it('Validar retorno 401 - /api/v1/employees/{id}/perfil', () => {
            const token = Cypress.env('access_token');
            const idFunc = 1045;

            cy.request({
                method: 'PUT',
                url: `/api/v1/employees/${idFunc}/perfil`,
                headers: {
                    //'Authorization': `Bearer ${token}`, Token inválido
                    'Content-Type': 'application/json'
                },
                body: {
                    unidadeId: 483,
                    setorId: 1,
                    funcaoId: 1,
                    grupoRegrasId: 1
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(401)
            })
        })
    })

    describe('Módulo - Funcionários - Consulta funcionário com perfil', () => {

        it('Validar retorno 200 - /api/v1/employees/{id}/perfil', () => {
            const token = Cypress.env('access_token');
            const idFuncionario = Cypress.env('idFuncionario'); //Reutiliza ID
            cy.request({
                method: 'GET',
                url: '/api/v1/employees/1271/perfil',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(200)

                const items = response.body;
                expect(items).to.have.property('id');
                expect(items).to.have.property('nome');
                expect(items).to.have.property('sobrenome');
                expect(items).to.have.property('funcionarioUnidades').to.be.an('array')
                items.funcionarioUnidades.forEach((item) => {
                    expect(item).to.have.property('id');
                    expect(item).to.have.property('unidadeId');
                    expect(item).to.have.property('setorId');
                    expect(item).to.have.property('funcaoId');
                    expect(item).to.have.property('grupoRegrasId');
                    expect(item).to.have.property('flagAtivo');
                })
            })
        })

        it('Validar retorno 400 - /api/v1/employees/{id}/perfil', () => {
            const token = Cypress.env('access_token');
            const idFunc = 1047;
            cy.request({
                method: 'GET',
                url: `/api/v1/employees/{id}/perfil`, //sem parâmetro
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(400)
            })
        })

        it('Validar retorno 401 - /api/v1/employees/{id}/perfil', () => {
            const token = Cypress.env('access_token');
            const idFunc = 1047;
            cy.request({
                method: 'GET',
                url: `/api/v1/employees/${idFunc}/perfil`,
                headers: {
                    //'Authorization': `Bearer ${token}`, token inválido
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(401)
            })
        })
    })

    describe('Módulo - Funcionários - Remover perfil ao funcionário', () => {

        it('Validar retorno 200 - /api/v1/employees/perfil/{id}', () => {
            const token = Cypress.env('access_token');
            const idFuncionario = Cypress.env('idFuncionario', idFuncionario)


            cy.request({
                method: 'DELETE',
                url: `/api/v1/employees/perfil/${idFuncionario}`,
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(200)

                const items = response.body;
                expect(items).to.have.property('codigo');
                expect(items).to.have.property('flagDeError');
                expect(items).to.have.property('mensagem');
            })
        })

        it('Validar retorno 404 - /api/v1/employees/perfil/{id}', () => {
            const token = Cypress.env('access_token');
            const idFunc = 1047;

            cy.request({
                method: 'DELETE',
                url: '/api/v1/employees/{id}/perfil',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(404);
            })
        })
    })

    describe('Módulo - Funcionários - Excluir um funcionário por id', () => {

        it('Validar retorno 200 - /api/v1/employees/{id}', () => {
            const token = Cypress.env('access_token');
            const idFuncionario = Cypress.env('idFuncionario'); //Reutiliza ID

            cy.request({
                method: 'DELETE',
                url: `/api/v1/employees/${idFuncionario}`,
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(200)
            })
        })

        it('Validar retorno 400 - /api/v1/employees/{id}', () => {
            const token = Cypress.env('access_token');
            const idFuncionario = Cypress.env('idFuncionario'); //Reutiliza I

            cy.request({
                method: 'DELETE',
                url: `/api/v1/employees/ll`, // sem parâmetro
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(400)
            })
        })

        it('Validar retorno 401 - /api/v1/employees/{id}', () => {
            const token = Cypress.env('access_token');
            const idFuncionario = Cypress.env('idFuncionario'); //Reutiliza I

            cy.request({
                method: 'DELETE',
                url: `/api/v1/employees/${idFuncionario}`,
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
