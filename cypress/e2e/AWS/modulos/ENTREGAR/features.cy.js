/// <reference types= "cypress" /> 

let featureName;

describe('Módulo - Features', () => {

  beforeEach(() => {
    cy.login()
    cy.refreshToken()


  });

  describe('Módulo - Features - Criar uma nova Feature', () => {

    it('Validar retorno 201 - /api/v1/features', () => {
      const token = Cypress.env('access_token');
      featureName = `QA-${Date.now()}`;

      cy.request({
        method: 'POST',
        url: '/api/v1/features',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: {
          feature: featureName,
          isActive: 1,
          defaultValueForNewUnits: 1
        },
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.eq(201);
        cy.log(JSON.stringify(response.body))
        cy.log(`✅ Feature ${featureName} criada com sucesso`);
      });
    });

    it('Validar retorno 400 - /api/v1/features', () => {

      const token = Cypress.env('access_token')

      cy.request({
        method: 'POST',
        url: '/api/v1/features',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: { //sem parametro no body

        },
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.eq(400);
      })
    })

    it('Validar retorno 401 - /api/v1/features', () => {
      const token = Cypress.env('access_token');
      featureName = `QA-${Date.now()}`;

      cy.request({
        method: 'POST',
        url: '/api/v1/features',
        headers: {
          //'Authorization': `Bearer ${token}`, Token inválido
          'Content-Type': 'application/json'
        },
        body: {
          feature: featureName,
          isActive: 1,
          defaultValueForNewUnits: 1
        },
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.eq(401);
      })
    })
  })

  describe('Módulo - Features - Retorna uma lista de features de uma unidade', () => {

    it('Validar retorno 200 - /api/v1/features', () => {
      const token = Cypress.env('access_token');

      cy.api({
        method: 'GET',
        url: '/api/v1/features?idUnidade=483',
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
          expect(item).to.have.property('feature');
          expect(item).to.have.property('isActive');
          expect(item).to.have.property('defaultValueForNewUnits');

          // Salva o id da feature
          const idFeat = response.body.id;
          Cypress.env('idFeat', idFeat);
          cy.log('ID Salvo:', idFeat)
        })
      })
    })

    it('Validar retorno 400 - /api/v1/features', () => {
      const token = Cypress.env('access_token');

      cy.request({
        method: 'POST', // Método divergente
        url: '/api/v1/features',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.eq(400)
      })
    })

    it('Validar retorno 401 - /api/v1/features', () => {
      const token = Cypress.env('access_token');

      cy.request({
        method: 'GET',
        url: '/api/v1/features',
        headers: {
          //'Authorization': `Bearer ${token}`, // Token inválido
          'Content-Type': 'application/json'
        },
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.eq(401)
      })
    })
  })

  describe('Módulo - Features - Retorna uma lista de features', () => {

    it('Validar retorno 200 - /api/v1/features/all', () => {
      const token = Cypress.env('access_token');

      cy.request({
        method: 'GET',
        url: '/api/v1/features/all',
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
          expect(item).to.have.property('feature');
          expect(item).to.have.property('isActive');
          expect(item).to.have.property('defaultValueForNewUnits');
        })
      })
    })

    it('Validar retorno 401 - /api/v1/features/all', () => {
      const token = Cypress.env('access_token');

      cy.request({
        method: 'GET',
        url: '/api/v1/features/all',
        headers: {
          //'Authorization': `Bearer ${token}`, // Token Inválido
          'Content-Type': 'application/json'
        },
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.eq(401)
      })
    })
  })

  describe('Módulo - Features - Atualiza uma Feature', () => {

    it('Validar retorno 200 - /api/v1/features/{id}', () => {
      const token = Cypress.env('access_token')
      const idFeat = Cypress.env('idFeat')

      cy.api({
        method: 'PATCH',
        url: '/api/v1/features/144',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: {
          "feature": "QA-1764168452021",
          "isActive": 1,
          "defaultValueForNewUnits": 1
        },
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property('generatedMaps').to.be.an('array');
        expect(response.body).to.have.property('raw').to.be.an('array');
        expect(response.body).to.have.property('affected');
        expect(response.body).to.have.property('name');
      })
    })

    it('Validar retorno 400 - /api/v1/features/{id}', () => {

      const token = Cypress.env('access_token')
      const idFeature = 932;

      cy.request({
        method: 'PATCH',
        url: '/api/v1/features/{id}', // Sem o parametro ID
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: {
          feature: 'QA-1750860022218',
          isActive: 1,
          defaultValueForNewUnits: 1
        },
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.eq(400);
      })
    })

    it('Validar retorno 401 - /api/v1/features/{id}', () => {

      const token = Cypress.env('access_token')
      const idFeature = 932;

      cy.request({
        method: 'PATCH',
        url: `/api/v1/features/${idFeature}`,
        headers: {
          //'Authorization': `Bearer ${token}`, // Token Inválido
          'Content-Type': 'application/json'
        },
        body: {
          feature: 'QA-1750860022218',
          isActive: 1,
          defaultValueForNewUnits: 1
        },
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.eq(401);
      })
    })
  })

  describe('Módulo - Features - Remove uma Feature', () => {

    it('Validar retorno 200 - /api/v1/features/{id}', () => {
      const token = Cypress.env('access_token')
      const idFeat = Cypress.env('idFeat')

      cy.request({
        method: 'DELETE',
        url: '/api/v1/features/144',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.eq(200);
      })
    })

    it('Validar retorno 401 - /api/v1/features/{id}', () => {

      const token = Cypress.env('access_token');
      let idDelete = 830;

      cy.request({
        method: 'DELETE',
        url: `/api/v1/features/${idDelete}`,
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
})