/// <reference types= "cypress" /> 

describe('Módulo - Historic Medical Care', () => {

    beforeEach(() => {
        cy.login()
        cy.refreshToken()
    });

    describe.only('Modulo - Historic Medical Care - /api/v1/medical-care/history/patient/{patientId}', () => {

        it('Validar retorno 200 - /api/v1/medical-care/history/patient/{patientId}', () => {

            const token = Cypress.env('access_token');

            const patientId = 280080

            cy.api({
                method: 'GET',
                url: `/api/v1/medical-care/history/patient/${patientId}`,
                failOnStatusCode: false,
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
            }).then((response) => {
                expect(response.status).to.eq(200)
            })

        });

        it.only('Validar retorno 400 - /api/v1/medical-care/history/patient/{patientId}', () => {


            const token = Cypress.env('access_token');

            const patientId = 1278

            cy.api({
                method: 'GET',
                url: `/api/v1/medical-care/history/patient/${patientId}`,
                failOnStatusCode: false,
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
            }).then((response) => {
                expect(response.status).to.eq(404)
            })
        });

        it('Validar retorno 401 - /api/v1/medical-care/history/patient/{patientId}', () => {


            const token = Cypress.env('access_tokenn');

            const patientId = 17962672

            cy.api({
                method: 'GET',
                url: `/api/v1/medical-care/history/patient/${patientId}`,
                failOnStatusCode: false,
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
            }).then((response) => {
                expect(response.status).to.eq(401)

            })
        });

    });

        describe('Modulo - Historic Medical Care - /api/v1/medical-care/history/appointment/{appointmentId}', () => {

        it('Validar retorno 200 - /api/v1/medical-care/history/appointment/{appointmentId}', () => {

            const token = Cypress.env('access_token');

            const patientId = 17962672

            cy.api({
                method: 'GET',
                url: `/api/v1/medical-care/infos/${patientId}`,
                failOnStatusCode: false,
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
            }).then((response) => {
                expect(response.status).to.eq(200)

                // Validações do corpo principal
                expect(response.body).to.have.property('typeForm', 1)
                expect(response.body).to.have.property('partnerId', 41)
                expect(response.body).to.have.property('partner', 'Cartão de TODOS')

                expect(response.body).to.have.property('flagRecurrence', '0')
                expect(response.body).to.have.property('firstMedicalCare', true)
                expect(response.body).to.have.property('flagAmorCirurgias', false)

            })

        });

        it('Validar retorno 400 - /api/v1/medical-care/history/appointment/{appointmentId}', () => {


            const token = Cypress.env('access_token');

            const patientId = 17962672

            cy.api({
                method: 'GET',
                url: `/api/v1/medical-care/infos/${patientId}`,
                failOnStatusCode: false,
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
            }).then((response) => {
                expect(response.status).to.eq(200)

                // Validações do corpo principal
                expect(response.body).to.have.property('typeForm', 1)
                expect(response.body).to.have.property('partnerId', 41)
                expect(response.body).to.have.property('partner', 'Cartão de TODOS')

                expect(response.body).to.have.property('flagRecurrence', '0')
                expect(response.body).to.have.property('firstMedicalCare', true)
                expect(response.body).to.have.property('flagAmorCirurgias', false)

            })
        });

        it('Validar retorno 401 - /api/v1/medical-care/history/appointment/{appointmentId}', () => {


            const token = Cypress.env('access_token');

            const patientId = 17962672

            cy.api({
                method: 'GET',
                url: `/api/v1/medical-care/infos/${patientId}`,
                failOnStatusCode: false,
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
            }).then((response) => {
                expect(response.status).to.eq(200)

                // Validações do corpo principal
                expect(response.body).to.have.property('typeForm', 1)
                expect(response.body).to.have.property('partnerId', 41)
                expect(response.body).to.have.property('partner', 'Cartão de TODOS')

                expect(response.body).to.have.property('flagRecurrence', '0')
                expect(response.body).to.have.property('firstMedicalCare', true)
                expect(response.body).to.have.property('flagAmorCirurgias', false)

            })
        });

    });

});

