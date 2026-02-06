/// <reference types="cypress"/>

describe('Módulo - Conselho Profissional', () => {
    beforeEach(() => {
        cy.login();
        cy.refreshToken()
    })

    describe('Módulo - Conselho Profissional - Cria um conselho profissional', () => {

        it('Validar retorno 200 - /api/v1/conselho-profissional', () => {
            const token = Cypress.env('access_token');
            const numeros = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
            const numeroSorteado = numeros[Math.floor(Math.random() * numeros.length)];
            const nomeContador = `QA${numeroSorteado}`

            cy.request({
                method: 'POST',
                url: '/api/v1/conselho-profissional',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: {
                    sigla: nomeContador,
                    descricao: "TESTE"
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(201)
                expect(response.body).to.have.property('sigla');
                expect(response.body).to.have.property('descricao');
                expect(response.body).to.have.property('id');
            })
        })

        it('Validar retorno 400 - /api/v1/conselho-profissional', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/conselho-profissional',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: { // sem parâmetro
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(400)
            });
        })

        it('Validar retorno 401 - /api/v1/conselho-profissional', () => {
            const token = Cypress.env('access_token');
            const numeros = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
            const numeroSorteado = numeros[Math.floor(Math.random() * numeros.length)];
            const nomeContador = `QA${numeroSorteado}`

            cy.request({
                method: 'POST',
                url: '/api/v1/conselho-profissional',
                headers: {
                    //'Authorization': `Bearer ${token}`, Token inválido
                    'Content-Type': 'application/json'
                },
                body: {
                    sigla: nomeContador,
                    descricao: "TESTE"
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(401)
            })
        })
    })

    describe('Módulo - Conselho Profissional - Retorna uma lista de conselhos profissionais', () => {

        it('Validar retorno 200 - /api/v1/conselho-profissional', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/conselho-profissional',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(200)
                const body = response.body;
                body.forEach((item) => {
                    expect(item).to.have.property('id');
                    expect(item).to.have.property('sigla');
                    expect(item).to.have.property('descricao');
                })
            })
        })

        it('Validar retorno 401 - /api/v1/conselho-profissional', () => {
            const token = Cypress.env('access_token');
            
            cy.request({
                method: 'GET',
                url: '/api/v1/conselho-profissional',
                headers: {
                    //'Authorization': `Bearer ${token}`, Token inválido
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(401)
            })
        })
    })
})