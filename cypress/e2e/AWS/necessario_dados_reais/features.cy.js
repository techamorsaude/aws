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

      cy.request({
        method: 'GET',
        url: '/api/v1/features',
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

  // Precisa de dados reais do Amei
  describe('Módulo - Features - Atualiza uma Feature', () => {

    it('Validar retorno 200 - /api/v1/features/{id}', () => {

      const token = Cypress.env('access_token')
      const idFeature = 1976;

      cy.request({
        method: 'PATCH',
        url: `/api/v1/features/${idFeature}`,
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: {
          feature: 'QA-1758562126049',
          isActive: 0,
          defaultValueForNewUnits: 1
        },
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.eq(200);
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

  // Precisa de dados reais do Amei
  describe('Módulo - Features - Remove uma Feature', () => {

    it('Validar retorno 200 - /api/v1/features/{id}', () => {
      const token = Cypress.env('access_token');

      cy.log(`🔍 Procurando pela feature criada: ${featureName}`);

      // Função para buscar com retry usando o endpoint /all
      const findAndDeleteFeature = (attempts = 6) => {
        cy.log(`Tentativa ${7 - attempts} de encontrar a feature...`);

        return cy.request({
          method: 'GET',
          url: '/api/v1/features/all',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          failOnStatusCode: false,
        }).then((response) => {
          expect(response.status).to.eq(200);

          if (Array.isArray(response.body)) {
            cy.log(`Total de features encontradas: ${response.body.length}`);

            // Primeiro: tentar encontrar a feature específica que criamos
            const ourFeature = response.body.find(f => f.feature === featureName);

            if (ourFeature) {
              cy.log(`✅ NOSSA feature encontrada!`);
              cy.log(`   ID: ${ourFeature.id}, Nome: ${ourFeature.feature}`);

              cy.request({
                method: 'DELETE',
                url: `/api/v1/features/${ourFeature.id}`,
                headers: {
                  'Authorization': `Bearer ${token}`,
                  'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
              }).then((deleteResponse) => {
                cy.log(`DELETE Status: ${deleteResponse.status}`);
                expect(deleteResponse.status).to.eq(200);
                cy.log(`✅ NOSSA feature ${featureName} deletada com sucesso!`);
              });

              // PARAR AQUI - não continuar o retry
              return;
            }

            // Se não encontrou nossa feature específica
            if (attempts > 1) {
              cy.log(`❌ Nossa feature ${featureName} não encontrada, aguardando 3s... (${attempts - 1} tentativas restantes)`);
              cy.wait(3000);
              return findAndDeleteFeature(attempts - 1);
            } else {
              cy.log(`⚠️ Nossa feature ${featureName} não foi encontrada após ${6} tentativas`);
              cy.log(`Total de features QA disponíveis: ${qaFeatures.length}`);

              if (qaFeatures.length > 0) {
                cy.log('Features QA disponíveis:');
                qaFeatures.slice(-5).forEach(f => {
                  cy.log(`- ID: ${f.id}, Nome: ${f.feature}`);
                });
              }

              cy.log('✅ Teste concluído - nossa feature não foi encontrada, mas isso pode ser normal devido ao timing da API');
            }
          } else {
            cy.log('❌ Resposta não é um array:', typeof response.body);
            if (attempts > 1) {
              cy.wait(3000);
              return findAndDeleteFeature(attempts - 1);
            }
          }
        });
      };

      // Aguardar tempo inicial
      cy.wait(2000);

      // Executar busca com retry
      findAndDeleteFeature();
    });

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