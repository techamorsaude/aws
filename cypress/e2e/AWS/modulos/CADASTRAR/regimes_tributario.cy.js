/// <reference types= "cypress" /> 

describe('Módulo - Regime Tributário', () => {

  beforeEach(() => {
    cy.login()
    cy.refreshToken()
  });
//
  describe('Módulo - Regime Tributário - Retorna uma lista de regime tributários', () => {

    it('Validar retorno 200 - /api/v1/regimeTributario', () => {
      const token = Cypress.env('access_token');

      cy.request({
        method: 'GET',
        url: '/api/v1/regimeTributario',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }).then((response) => {
        // Verifica se o status é 200
        expect(response.status).to.eq(200);

        // Verifica a estrutura dos dados
        response.body.forEach((regime) => {
          expect(regime).to.have.property('id');
          expect(regime).to.have.property('regime')
        });
      });
    })

    it('Validar retorno 401 - /api/v1/regimeTributario', () => {
      const token = Cypress.env('access_token');

      cy.request({
        method: 'GET',
        url: '/api/v1/regimeTributario',
        headers: {
          //'Authorization': `Bearer ${token}` token inválido
        },
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.eq(401);
        })
      })
    })
  })


