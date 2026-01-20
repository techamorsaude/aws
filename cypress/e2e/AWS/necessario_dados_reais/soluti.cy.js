/// <reference types="cypress" />

describe('Módulo - Soluti - Assinatura Digital', () => {

    beforeEach(() => {
        cy.login()
        cy.refreshToken()
    });

    // Precisa de dados reais do Amei
    describe('Módulo - Soluti - Assinar documento', () => {

        it.only('Validar retorno 200 - /api/v1/soluti/sign-doc', () => {
            const token = Cypress.env('access_token')

            cy.api({
                method: 'POST',
                url: '/api/v1/soluti/sign-doc',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: {
                    "attendanceId": 1,
                    "patientId": 1,
                    "pdf64Base": "data:application/pdf;base64,",
                    "wasUnauthorized": 1,
                    "cpf": "94883911039",
                    "pass": "1",
                    "type": "Atestado",
                    "typeId": 256,
                    "attendanceDate": "1",
                    "token": "Bearer as789187szdx"
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(200)
            })
        })

        it('Validar retorno 400 - /api/v1/soluti/sign-doc', () => {
            const token = Cypress.env('access_token')

            cy.api({
                method: 'POST',
                url: '/api/v1/soluti/sign-doc',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: {
                    "attendanceId": 1,
                    "patientId": 1,
                    "pdf64Base": "data:application/pdf;base64,",
                    "wasUnauthorized": 1,
                    "cpf": "94883911039",
                    "pass": "1",
                    "type": "Atestado",
                    "typeId": 256,
                    "attendanceDate": "1",
                    "token": "Bearer as789187szdx"
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(400)
                cy.log('Status:', response.status)
                cy.log('Response body:', JSON.stringify(response.body))
            })
        });

        it('Validar retorno 401 - /api/v1/soluti/sign-doc', () => {

            cy.api({
                method: 'POST',
                url: '/api/v1/soluti/sign-doc',
                headers: {
                    'Content-Type': 'application/json'
                    // SEM Authorization header
                },
                body: {
                    "attendanceId": 1,
                    "patientId": 1,
                    "pdf64Base": "data:application/pdf;base64,",
                    "wasUnauthorized": 1,
                    "cpf": "94883911039",
                    "pass": "1",
                    "type": "Atestado",
                    "typeId": 256,
                    "attendanceDate": "1",
                    "token": "Bearer as789187szdx"
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(401)
                cy.log('✅ 401 sem token:', response.status)
                cy.log('Response body:', JSON.stringify(response.body))
            })
        });

    });

    // Precisa de dados reais do Amei
    describe('Módulo - Soluti - Autenticação no Soluti', () => {

        it('Validar retorno 200 - /api/v1/soluti/auth', () => {
            const token = Cypress.env('access_token');

            cy.api({
                method: 'POST',
                url: '/api/v1/soluti/auth',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: {
                    "professionalId": 10075,
                    "cpf": "94883911039",
                    "otp": "1"
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(200);
            })
        })

        it('Validar retorno 400 - /api/v1/soluti/auth', () => {
            const token = Cypress.env('access_token');

            cy.api({
                method: 'POST',
                url: '/api/v1/soluti/auth',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: {
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(400);
            })
        })

        it('Validar retorno 401 - /api/v1/soluti/auth', () => {
            const token = Cypress.env('access_token');

            cy.api({
                method: 'POST',
                url: '/api/v1/soluti/auth',
                headers: {
                    //'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: {
                    "professionalId": 10075,
                    "cpf": "94883911039",
                    "otp": "1"
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(401);
            })
        })
    })
})