/// <reference types="cypress" />

describe('Módulo - Municípios/Estados', () => {
    beforeEach(() => {
        cy.login()
        cy.refreshToken()
    })

    describe('Módulo - Municípios/Estados - Retorna uma lista de municipios', () => {
        const token = Cypress.env('access_token')

        beforeEach(() => {
            // Configurações que podem ser necessárias antes de cada teste
            cy.intercept('GET', '/api/v1/municipios*').as('getMunicipios')
        })

        it('Validar retorno 200 - api/v1/municipios', () => {

            const token = Cypress.env('access_token')
            cy.request({
                method: 'GET',
                url: '/api/v1/municipios',
                headers: {
                    'Authorization': `Bearer ${token}`
                }, failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(200)
                expect(response.body).to.be.an('array')

                if (response.body.length > 0) {
                    const municipio = response.body[0]

                    // Verifica se tem os 4 campos obrigatórios
                    expect(municipio).to.have.property('id');
                    expect(municipio).to.have.property('municipio');
                    expect(municipio).to.have.property('flagAtivo');
                    expect(municipio).to.have.property('ipClient');
                    expect(municipio).to.have.property('createdAt');
                    expect(municipio).to.have.property('updatedAt');
                }
            })
        })

        it('Validar retorno 401 - api/v1/municipios', () => {

            cy.request({
                method: 'GET',
                url: '/api/v1/municipios',
                headers: {
                    'Authorization': `Bearer ${token}`
                }, failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(401)
            })
        })
    })

    describe('Módulo - Municípios/Estados - Retorna uma lista de estados', () => {
        const token = Cypress.env('access_token')

        beforeEach(() => {
            // Configurações que podem ser necessárias antes de cada teste
            cy.intercept('GET', '/api/v1/estados*').as('getEstados')
        })

        it('Validar retorno 200 - api/v1/estados', () => {
            const token = Cypress.env('access_token')
            cy.request({
                method: 'GET',
                url: '/api/v1/estados',
                headers: {
                    'Authorization': `Bearer ${token}`
                }, failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(200)
                expect(response.body).to.be.an('array')

                if (response.body.length > 0) {
                    const estado = response.body[0]

                    // Verifica se tem os campos obrigatórios
                    expect(estado).to.have.property('id')
                    expect(estado).to.have.property('uf')
                }
            })
        })

        it('Validar retorno 401 - api/v1/estados', () => {
            cy.request({
                method: 'GET',
                url: '/api/v1/estados',
                headers: {
                    'Authorization': `Bearer token_invalido`
                }, failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(401)
            })
        })
    })

    describe('Módulo - Municípios/Estados - Consulta cep', () => {

        it('Validar retorno 200 - /api/v1/search-cep/{cep}', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/search-cep/14015-080',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(200);

                expect(response.body).to.have.property('cep');
                expect(response.body).to.have.property('logradouro')
                expect(response.body).to.have.property('complemento')
                expect(response.body).to.have.property('bairro')
                expect(response.body).to.have.property('localidade')
                expect(response.body).to.have.property('uf')
            })
        })

        it('Validar retorno 401 - /api/v1/search-cep/{cep}', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/search-cep/14015-080',
                headers: {
                    //'Authorization': `Bearer ${token}`, Token inválido
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(401);
            })
        })
    })
})