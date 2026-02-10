/// <reference types= "cypress" /> 

describe('Módulo - Parcerias', () => {
  beforeEach(() => {
    cy.login()
    cy.refreshToken()
  });

  describe('Módulo - Parcerias - All - Retorna uma lista de parceiros', () => {

    it('Validar retorno 200 - /api/v1/parcerias/all', () => {

      const token = Cypress.env('access_token')
      cy.request({
        method: 'GET',
        url: '/api/v1/parcerias/all',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
      }).then((response) => {
        expect(response.status).to.eq(200);

        const data = response.body.data;

        data.forEach((item, index) => {
          expect(item).to.have.property('id');
          expect(item).to.have.property('descricao');
          expect(item).to.have.property('default');
          expect(item).to.have.property('validacao');
        })
      })
    })

    it('Validar retorno 401 - /api/v1/parcerias/all', () => {

      const token = Cypress.env('access_token')
      cy.request({
        method: 'GET',
        url: '/api/v1/parcerias/all',
        headers: {
          //'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
      }).then((response) => {
        expect(response.status).to.eq(401);
      })
    })
  })

  describe('Módulo - Parcerias - Parceiros - Retorna uma lista de parceiros', () => {

    it('Validar retorno 200 - /api/v1/parcerias/parceiros', () => {

      const token = Cypress.env('access_token')
      cy.api({
        method: 'GET',
        url: '/api/v1/parcerias/parceiros',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.eq(200);

        //Valida a estrutura dos dados
        const data = response.body.data;

        data.forEach((item, index) => {
          expect(item).to.have.property('id');
          expect(item).to.have.property('tipoId');
          expect(item).to.have.property('nome');
          expect(item).to.have.property('tabelaId');
          expect(item).to.have.property('abrangenciaId');
          expect(item).to.have.property('tipoCobrancaId');
          expect(item).to.have.property('prazoFaturamento');
          expect(item).to.have.property('dataBase');
          expect(item).to.have.property('flagAtivo');
          expect(item).to.have.property('createdAt');
          expect(item).to.have.property('updatedAt');
          expect(item).to.have.property('cnpj');
          expect(item).to.have.property('razaoSocial');
          expect(item).to.have.property('telefone');
          expect(item).to.have.property('email');
          expect(item).to.have.property('cep');
          expect(item).to.have.property('endereco');
          expect(item).to.have.property('numero');
          expect(item).to.have.property('bairro');
          expect(item).to.have.property('cidade');
          expect(item).to.have.property('estado');
          expect(item).to.have.property('nomeFantasia');
          expect(item).to.have.property('telefoneSecundario');
          expect(item).to.have.property('regiaoZona');
          expect(item).to.have.property('emailAlternativo');
          expect(item).to.have.property('complemento');
          expect(item).to.have.property('urlParceiro');
        })
      })
    })

    it('Validar retorno 401 - /api/v1/parcerias/parceiros', () => {

      const token = Cypress.env('access_token')
      cy.api({
        method: 'GET',
        url: '/api/v1/parcerias/parceiros',
        headers: {
          //'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
      }).then((response) => {
        expect(response.status).to.eq(401);
      })
    })
  })
})

