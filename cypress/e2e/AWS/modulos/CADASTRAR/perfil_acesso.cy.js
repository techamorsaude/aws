/// <reference types= "cypress" /> 

describe('Módulo - Perfil de Acesso', () => {

  beforeEach(() => {
    cy.login()
    cy.refreshToken()
  });

  describe('Módulo - Perfil de Acesso - Cria um novo Perfil de acesso', () => {

    it('Validar retorno 201 - /api/v1/perfil-acesso', () => {
      const token = Cypress.env('access_token');
      const perfilCriado = "testeQa";

      cy.request({
        method: 'POST',
        url: '/api/v1/perfil-acesso',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: {
          descricaoAcessoProfile: `${perfilCriado}`,
          recursos: [
            7,
            7,
            7
          ]
        },
        failOnStatusCode: false
      }).then((response) => {
        expect(response.status).to.eq(201)

        const item = response.body;
        expect(item).to.have.property('flagDeError', false);
        expect(item).to.have.property('codigo', 201);
        expect(item).to.have.property('mensagem', 'Perfil cadastrada com sucesso.');

        cy.writeFile('cypress/fixtures/perfil-acesso.json', { gr_descricao: perfilCriado });
      })
    })

    it('Validar retorno 400 - /api/v1/perfil-acesso', () => {
      const token = Cypress.env('access_token');

      cy.request({
        method: 'POST',
        url: '/api/v1/perfil-acesso',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json' // Sem parâmetro no body
        },
        failOnStatusCode: false
      }).then((response) => {
        expect(response.status).to.eq(400)
      })
    })

    it('Validar retorno 401 - /api/v1/perfil-acesso', () => {
      const token = Cypress.env('access_token');

      cy.request({
        method: 'POST',
        url: '/api/v1/perfil-acesso',
        headers: {
          //'Authorization': `Bearer ${token}`, // Token Inválido
          'Content-Type': 'application/json'
        },
        body: {
          descricaoAcessoProfile: 'testeQa',
          recursos: [
            7,
            7,
            7
          ]
        },
        failOnStatusCode: false
      }).then((response) => {
        expect(response.status).to.eq(401)
      })
    })
  })

  describe('Módulo - Perfil de Acesso - Lista Perfis de acesso', () => {

    it('Validar retorno 200 - /api/v1/perfil-acesso', () => {
      const token = Cypress.env('access_token');

      cy.readFile('cypress/fixtures/perfil-acesso.json').then((data) => {
        const gr_descricao = data.perfilCriado;

        cy.request({
          method: 'GET',
          url: '/api/v1/perfil-acesso?page=1&limit=10',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          failOnStatusCode: false,
        }).then((response) => {
          expect(response.status).to.eq(200);

          // Atribuir corretamente o body da resposta
          const body = response.body;

          // Validar que vieram 10 itens
          expect(body.items).to.have.length(10);

          // Valida que cada item do array tem as chaves esperadas
          body.items.forEach((item) => {
            expect(body.items[0]).to.have.all.keys('id', 'grupoDescricao', 'flg_status');
          })

          // Valida estrutura de meta
          expect(body.meta).to.have.all.keys('totalItems', 'currentPage', 'itemCount', 'itemsPerPage', 'totalPages');

          // Procura o Perfil criado
          const perfilEncontrado = body.items.find(item => item.gr_descricao === gr_descricao);

          // Protege contra erro de acessar ID de undefined
          expect(perfilEncontrado, 'Perfil criado foi encontrado na lista').to.exist;

          // Salva o ID no mesmo arquivo
          cy.writeFile('cypress/fixtures/perfil-acesso.json', {
            gr_descricao: gr_descricao,
            id: perfilEncontrado.id
          })
        })
      })
    })

    it('Validar retorno 400 - /api/v1/perfil-acesso', () => {
      const token = Cypress.env('access_token');

      cy.request({
        method: 'GET',
        url: '/api/v1/perfil-acesso', // Sem parâmetros na requisição da url
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.eq(400);
      })
    })

    it('Validar retorno 401 - /api/v1/perfil-acesso', () => {
      const token = Cypress.env('access_token');

      cy.request({
        method: 'GET',
        url: '/api/v1/perfil-acesso',
        headers: {
          // 'Authorization': `Bearer ${token}`, // Token Inválido
          'Content-Type': 'application/json'
        },
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.eq(401);
      })
    })
  })

  describe('Módulo - Perfil de Acesso - Lista recursos', () => {

    it('Validar retorno 200 - /api/v1/perfil-acesso/recursos', () => {
      const token = Cypress.env('access_token');

      cy.request({
        method: 'GET',
        url: '/api/v1/perfil-acesso/recursos',
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
          expect(item).to.have.property('recDescLogico');
          expect(item).to.have.property('recDescFisico');
          expect(item).to.have.property('recTipoRecurso');
          expect(item).to.have.property('subModule');
        })

      })
    })

    it('Validar retorno 401 - /api/v1/perfil-acesso/recursos', () => {
      const token = Cypress.env('access_token');

      cy.request({
        method: 'GET',
        url: '/api/v1/perfil-acesso/recursos',
        headers: {
          //'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.eq(401)
      })
    })
  })

  describe('Módulo - Perfil de Acesso - Atualiza o Perfil de acesso', () => {

    it('Validar retorno 200 - /api/v1/perfil-acesso/{id}', () => {
      const token = Cypress.env('access_token');

      cy.readFile('cypress/fixtures/perfil-acesso.json').then((data) => {
        const id = 298;

        cy.request({
          method: 'PUT',
          url: `api/v1/perfil-acesso/${id}`,
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: {
            descricaoAcessoProfile: "Teste AWS QA1",
            flg_status: true,
            recursos: [
              26,
              63,
              5
            ]
          },
          failOnStatusCode: false,
        }).then((response) => {
          expect(response.status).to.eq(400)

          console.log(response)
          expect(response.body).to.have.property('flagDeError');
          expect(response.body).to.have.property('codigo');
          expect(response.body).to.have.property('mensagem');
        })
      })
    })

    it('Valdiar retorno 400 - /api/v1/perfil-acesso/{id}', () => {
      const token = Cypress.env('access_token');
      const idPerfil = 433;

      cy.request({
        method: 'PUT',
        url: `/api/v1/perfil-acesso/${idPerfil}`,
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

    it('Valdiar retorno 401 - /api/v1/perfil-acesso/{id}', () => {
      const token = Cypress.env('access_token');
      const idPerfil = 433;

      cy.request({
        method: 'PUT',
        url: `/api/v1/perfil-acesso/${idPerfil}`,
        headers: {
          //'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: {
          descricaoAcessoProfile: 'Teste AWS QA',
          flg_status: 'true',
          recursos: [
            26,
            63,
            5
          ]
        },
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.eq(401)
      })
    })
  })

  describe('Módulo - Perfil de Acesso - Deleta o Perfil de acesso', () => {

    it('Validar retorno 200 - /api/v1/perfil-acesso/{id}', () => {
      const token = Cypress.env('access_token');
      cy.readFile('cypress/fixtures/perfil-acesso.json').then((data) => {
        const id = data.id;

        cy.request({
          method: 'DELETE',
          url: `/api/v1/perfil-acesso/${id}`,
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

    it('Validar retorno 401 - /api/v1/perfil-acesso/{id}', () => {
      const token = Cypress.env('access_token');
      const idPerfil = 433;

      cy.request({
        method: 'DELETE',
        url: `/api/v1/perfil-acesso/${idPerfil}`,
        headers: {
          // 'Authorization': `Bearer ${token}`, // Token Inválido
          'Content-Type': 'application/json'
        },
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.eq(401)
      })
    })
  })

  describe('Módulo - Perfil de Acesso - Lista recursos pertencentes ao perfil de acesso', () => {

    it('Validar retorno 200 - /api/v1/perfil-acesso/{id}', () => {
      const token = Cypress.env('access_token');
      const idPerfil = 433;

      cy.request({
        method: 'GET',
        url: `/api/v1/perfil-acesso/${idPerfil}`,
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.eq(200);
      })
    })

    it('Validar retorno 400 - /api/v1/perfil-acesso/{id}', () => {
      const token = Cypress.env('access_token');

      cy.request({
        method: 'GET',
        url: '/api/v1/perfil-acesso/{id}', // Sem parâmetro ID
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.eq(400);
      })
    })

    it('Validar retorno 401 - /api/v1/perfil-acesso/{id}', () => {
      const token = Cypress.env('access_token');
      const idPerfil = 433;

      cy.request({
        method: 'GET',
        url: `/api/v1/perfil-acesso/${idPerfil}`,
        headers: {
          //'Authorization': `Bearer ${token}`, // Token Inválido
          'Content-Type': 'application/json'
        },
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.eq(401);
      })
    })
  })
})
