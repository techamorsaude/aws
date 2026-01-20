/// <reference types= "cypress" />

describe('Refresh Token', () => {

  beforeEach(() => {
    cy.login()
  });

  it('Validar retorno 201 - /api/v1/security/refresh-token', () => {

    const token = Cypress.env('access_token')
    
    return cy.request({
      method: 'POST',
      url: '/api/v1/security/refresh-token?clinicId=483',
      headers: {
        'Authorization': `Bearer ${token}`
      },
      body: {
        automated_test: 'Automated_test'
      },
      failOnStatusCode: false // normalmente esse cod refere-se a uma api pra nao dar erro de false
    }).then((response) => {
      expect(response.status).to.eq(201)
      //expect(response.body).to.have.property('access_token')
    })
  });

  it('Validar retorno 400 - /api/v1/security/refresh-token', () => {

    const token = Cypress.env('access_token')
    return cy.request({
      method: 'POST',
      url: '/api/v1/security/refresh-token?clinicId=483/787',
      headers: {
        'Authorization': `Bearer ${token}`
      },
      body: {
        automated_test: 'Automated_test'
      },
      failOnStatusCode: false // normalmente esse cod refere-se a uma api pra nao dar erro de false
    }).then((response) => {
      expect(response.status).to.eq(400)
    })
  });

  it('Validar retorno 401 - /api/v1/security/refresh-token', () => {

    const token = Cypress.env('')
    return cy.request({
      method: 'POST',
      url: '/api/v1/security/refresh-token?clinicId=483',
      headers: {
        'Authorization': `Bearer ${token}`
      },
      body: {
        automated_test: 'Automated_test'
      },
      failOnStatusCode: false // normalmente esse cod refere-se a uma api pra nao dar erro de false
    }).then((response) => {
      expect(response.status).to.eq(401)
    })
  });
})