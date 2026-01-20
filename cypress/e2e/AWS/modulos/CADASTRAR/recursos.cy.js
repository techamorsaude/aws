/// <reference types= "cypress" /> 

describe('Módulo - Recursos - Retorna uma lista de todos os recursos de um perfil', () => {

  beforeEach(() => {
    cy.login()
    cy.refreshToken()
  });

  describe('Módulo - Recursos', () => {

    it('Validar retorno 200 - /api/v1/recursos', () => {

      const token = Cypress.env('access_token')
      cy.request({
        method: 'GET',
        url: '/api/v1/recursos', // URL do seu endpoint
        headers: {
          'Authorization': `Bearer ${token}`
        },
      }).then((response) => {
        // Verificar se o status é 200
        expect(response.status).to.eq(200);
        cy.log(JSON.stringify(response.body));

        expect(response.body).to.be.an('array')

        response.body.forEach(modulo => {
          expect(modulo).to.have.all.keys(
            'id',
            'descricaoLogico',
            'descricaoFisico',
            'grrPermiteRestringe',
            'subModulos'
          )

          expect(modulo.subModulos).to.be.an('array')

          modulo.subModulos.forEach(subModulo => {
            expect(subModulo).to.have.all.keys(
              'id',
              'descricaoLogico',
              'descricaoFisico',
              'grrPermiteRestringe',
              'acoes'
            )

            expect(subModulo.acoes).to.be.an('array')

            subModulo.acoes.forEach(acao => {
              expect(acao).to.have.all.keys(
                'id',
                'descricaoLogico',
                'descricaoFisico',
                'grrPermiteRestringe'
              )
            })
          })
        })
      })
    })

    it('Validar retorno 401 - /api/v1/recursos', () => {
      cy.request({
        method: 'GET',
        url: '/api/v1/recursos', // URL do seu endpoint
        headers: {
          'Content-Type': 'application/json',
          // Não adicione um token de autenticação ou remova-o para forçar um 401
        },
        failOnStatusCode: false // Não fazer falhar o teste automaticamente em status 4xx ou 5xx
      }).then((response) => {
        // Verificar se o status é 401
        expect(response.status).to.eq(401);
        cy.log(JSON.stringify(response.body));
      })
    })
  })
})


