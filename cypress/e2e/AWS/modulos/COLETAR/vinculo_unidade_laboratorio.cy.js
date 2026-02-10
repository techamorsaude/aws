/// <reference types= "cypress" /> 

describe('Módulo - Vinculo Unidade x Laboratório', () => {

  beforeEach(() => {
    cy.login()
    cy.refreshToken()
  });

  describe('Módulo - Create Vinculo - create vinculo - Criar vinculo', () => {

    it('Validar retorno 201 - /api/v1/vinculo-laboratorio/create-vinculo/create-vinculo', () => {
      const token = Cypress.env('access_token');

      cy.request({
        method: 'POST',
        url: '/api/v1/vinculo-laboratorio/create-vinculo/create-vinculo',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: {
          unidadeId: 483,
          fornecedorId: 303,
          agenteId: "kill123",
          password: "123",
          entidade: "entidade",
          endpoint: "https://amei-dev2.amorsaude.com.br/api/v1/",
          statusIntegracao: "0"
        },
        failOnStatusCode: false
      }).then((response) => {
        expect(response.status).to.equal(201);
      });
    });

    it('Validar retorno 400 - /api/v1/vinculo-laboratorio/create-vinculo/create-vinculo', () => {
      const token = Cypress.env('access_token')

      cy.request({
        method: 'POST',
        url: '/api/v1/vinculo-laboratorio/create-vinculo/create-vinculo',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: {},
        failOnStatusCode: false
      }).then((response) => {
        expect(response.status).to.eq(400)
      })
    })

    it('Validar retorno 401 - /api/v1/vinculo-laboratorio/create-vinculo/create-vinculo', () => {
      cy.request({
        method: 'POST',
        url: '/api/v1/vinculo-laboratorio/create-vinculo/create-vinculo',
        body: {
          "unidadeId": 483,
          "fornecedorId": 383
        },
        failOnStatusCode: false
      }).then((response) => {
        expect(response.status).to.eq(401)
      })
    })
  });

  describe('Módulo - Create Vinculo - delete vinculo - Deletar vinculo', () => {

    it('Validar retorno 201 - /api/v1/vinculo-laboratorio/create-vinculo/delete-vinculo', () => {
      const token = Cypress.env('access_token')

      cy.request({
        method: 'POST',
        url: '/api/v1/vinculo-laboratorio/create-vinculo/delete-vinculo',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: {
          "unidadeId": 483,
          "fornecedorId": 303,
        },
        failOnStatusCode: false
      }).then((response) => {
        expect(response.status).to.eq(201)
      })
    })

    it('Validar retorno 400 - /api/v1/vinculo-laboratorio/create-vinculo/delete-vinculo', () => {
      const token = Cypress.env('access_token')

      cy.request({
        method: 'POST',
        url: '/api/v1/vinculo-laboratorio/create-vinculo/delete-vinculo',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: {},
        failOnStatusCode: false
      }).then((response) => {
        expect(response.status).to.eq(400)
      })
    })

    it('Validar retorno 401 - /api/v1/vinculo-laboratorio/create-vinculo/delete-vinculo', () => {
      cy.request({
        method: 'POST',
        url: '/api/v1/vinculo-laboratorio/create-vinculo/delete-vinculo',
        body: {
          "unidadeId": 483,
          "fornecedorId": 383
        },
        failOnStatusCode: false
      }).then((response) => {
        expect(response.status).to.eq(401)
      })
    })
  });

  describe('Módulo - Create Vinculo - check propostas - Buscar unidades vinculadas', () => {

    it('Validar retorno 200 - /api/v1/vinculo-laboratorio/create-vinculo/check-propostas', () => {
      const token = Cypress.env('access_token')

      cy.request({
        method: 'GET',
        url: 'api/v1/vinculo-laboratorio/create-vinculo/unidades-vinculadas/483',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }).then((response) => {
        expect(response.status).to.eq(200)
      })
    })

    it('Validar retorno 401 - /api/v1/vinculo-laboratorio/create-vinculo/check-propostas', () => {
      cy.request({
        method: 'GET',
        url: '/api/v1/vinculo-laboratorio/create-vinculo/check-propostas/1',
        failOnStatusCode: false
      }).then((response) => {
        expect(response.status).to.eq(401)
      })
    })
  });

  describe('Módulo - Create Vinculo - agente password - Buscar unidades sem vinculos', () => {

    it('Validar retorno 200 - /api/v1/vinculo-laboratorio/create-vinculo/agente-password?fornecedorId=292&unidadeId=828', () => {
      const token = Cypress.env('access_token')

      cy.request({
        method: 'GET',
        url: '/api/v1/vinculo-laboratorio/create-vinculo/agente-password',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }).then((response) => {
        expect(response.status).to.eq(200)
      })
    })

    it('Validar retorno 401 - /api/v1/vinculo-laboratorio/create-vinculo/agente-password?fornecedorId=292&unidadeId=828', () => {
      cy.request({
        method: 'GET',
        url: '/api/v1/vinculo-laboratorio/create-vinculo/agente-password',
        failOnStatusCode: false
      }).then((response) => {
        expect(response.status).to.eq(401)
      })
    })
  });

  describe('Módulo - Create Vinculo - unidade sem vinculo - Buscar dados de login do laboratorio', () => {
    it('Validar retorno 200 - /api/v1/vinculo-laboratorio/create-vinculo/unidades-sem-vinculo', () => {
      const token = Cypress.env('access_token')

      cy.request({
        method: 'GET',
        url: '/api/v1/vinculo-laboratorio/create-vinculo/unidades-sem-vinculo',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }).then((response) => {
        expect(response.status).to.eq(200)
      })
    })

    it('Validar retorno 401 - /api/v1/vinculo-laboratorio/create-vinculo/unidades-sem-vinculo', () => {
      cy.request({
        method: 'GET',
        url: '/api/v1/vinculo-laboratorio/create-vinculo/unidades-sem-vinculo',
        failOnStatusCode: false
      }).then((response) => {
        expect(response.status).to.eq(401)
      })
    })
  });

  describe('Módulo - Create Vinculo - unidades vinculadas - Checar se o laboratorio tem proposta pendentes', () => {

    it('Validar retorno 200 - /api/v1/vinculo-laboratorio/create-vinculo/unidades-vinculadas/483', () => {
      const token = Cypress.env('access_token')

      cy.request({
        method: 'GET',
        url: '/api/v1/vinculo-laboratorio/create-vinculo/unidades-vinculadas/1',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }).then((response) => {
        expect(response.status).to.eq(200)
      })
    })

    it('Validar retorno 400 - /api/v1/vinculo-laboratorio/create-vinculo/unidades-vinculadas/483', () => {
      const token = Cypress.env('access_token')

      cy.request({
        method: 'GET',
        url: '/api/v1/vinculo-laboratorio/create-vinculo/unidades-vinculadas/abc',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        failOnStatusCode: false
      }).then((response) => {
        expect(response.status).to.eq(400)
      })

    });

    it('Validar retorno 401 /api/v1/vinculo-laboratorio/create-vinculo/unidades-vinculadas/483', () => {
      cy.request({
        method: 'GET',
        url: '/api/v1/vinculo-laboratorio/create-vinculo/unidades-vinculadas/1',
        failOnStatusCode: false
      }).then((response) => {
        expect(response.status).to.eq(401)
      })
    })
  })

})