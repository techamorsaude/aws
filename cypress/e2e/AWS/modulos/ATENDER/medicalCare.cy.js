/// <reference types= "cypress" /> 

describe('Módulo - Medical Care', () => {

    beforeEach(() => {
        cy.login()
        cy.refreshToken()
    });

    // GET
    describe('Modulo - Medical Care - /api/v1/medical-care/infos/{appointmentId}', () => {

        it('Validar retorno 200 - /api/v1/medical-care/infos/{appointmentId}', () => {

            const token = Cypress.env('access_token');

            const appointmentId = 17962672

            cy.api({
                method: 'GET',
                url: `/api/v1/medical-care/infos/${appointmentId}`,
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
        })

        it('Validar retorno 404 - /api/v1/medical-care/infos/{appointmentId}', () => {

            const token = Cypress.env('access_token');

            const appointmentId = 1201 // passar um id inexistente

            cy.api({
                method: 'GET',
                url: `/api/v1/medical-care/infos/${appointmentId}`,
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(404)

            })

        });

        it('Validar retorno 401 - /api/v1/medical-care/infos/{appointmentId}', () => {

            const token = Cypress.env('access_tokenn'); // passar um token invalido

            const appointmentId = 12345 // passar um id inexistente

            cy.api({
                method: 'GET',
                url: `/api/v1/medical-care/infos/${appointmentId}`,
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(401)

            })

        });

    });

    describe('Modulo - Medical Care - /api/v1/medical-care/exams/pdf/{examId}', () => {

        it('Validar retorno 200 - /api/v1/medical-care/exams/pdf/{examId}', () => {

            const token = Cypress.env('access_token');

            const examId = 35359550// passar o id correto

            cy.api({
                method: 'GET',
                url: `prescriptionId/api/v1/medical-care/exams/pdf/${examId}`,
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(200)

            })

        });

        it('Validar retorno 404 - /api/v1/medical-care/exams/pdf/{examId}', () => {

            const token = Cypress.env('access_token');

            const examId = 123// passar o id correto

            cy.api({
                method: 'GET',
                url: `/api/v1/medical-care/exams/pdf/${examId}`,
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(404)

            })

        });

        it('Validar retorno 401 - /api/v1/medical-care/exams/pdf/{examId}', () => {

            const token = Cypress.env('access_tokenn');

            const examId = 123// passar o id correto

            cy.api({
                method: 'GET',
                url: `/api/v1/medical-care/exams/pdf/${examId}`,
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(401)

            })

        });

    });

    describe('Modulo - Medical Care - /api/v1/medical-care/prescription-memed/pdf/{prescriptionId}', () => {

        it('Validar retorno 200 - /api/v1/medical-care/prescription-memed/pdf/{prescriptionId}', () => {

            const token = Cypress.env('access_token');

            const prescriptionId = 7295736// passar o id correto

            cy.api({
                method: 'GET',
                url: `/api/v1/medical-care/prescription-memed/pdf/${prescriptionId}`,
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(200)

            })

        });

        it('Validar retorno 404 - /api/v1/medical-care/prescription-memed/pdf/{prescriptionId}', () => {

            const token = Cypress.env('access_token');

            const prescriptionId = 8 // passar o id correto

            cy.api({
                method: 'GET',
                url: `/api/v1/medical-care/prescription-memed/pdf/${prescriptionId}`,
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(404)

            })

        });

        it('Validar retorno 401 - /api/v1/medical-care/prescription-memed/pdf/{prescriptionId}', () => {

            const token = Cypress.env('access_tokenn');

            const prescriptionId = 123 // passar o id correto

            cy.api({
                method: 'GET',
                url: `/api/v1/medical-care/prescription-memed/pdf/${prescriptionId}`,
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(401)

            })

        });

    });

    describe('Modulo - Medical Care - /api/v1/medical-care/prescription-ophthalmological/pdf/{prescriptionId}', () => {

        it('Validar retorno 200 - /api/v1/medical-care/medical-certification/pdf/{medicalCertificateId}', () => {

            const token = Cypress.env('access_token');

            const prescriptionId = 123// passar o id correto

            cy.api({
                method: 'GET',
                url: `/api/v1/medical-care/prescription-ophthalmological/pdf/${prescriptionId}`,
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(200)

            })

        });

        it('Validar retorno 404 - /api/v1/medical-care/medical-certification/pdf/{medicalCertificateId}', () => {

            const token = Cypress.env('access_token');

            const prescriptionId = 9// passar o id correto

            cy.api({
                method: 'GET',
                url: `/api/v1/medical-care/prescription-ophthalmological/pdf/${prescriptionId}`,
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(404)

            })

        });

        it('Validar retorno 401 - /api/v1/medical-care/medical-certification/pdf/{medicalCertificateId}', () => {

            const token = Cypress.env('access_tokenn');

            const prescriptionId = 123// passar o id correto

            cy.api({
                method: 'GET',
                url: `/api/v1/medical-care/prescription-ophthalmological/pdf/${prescriptionId}`,
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(401)

            })

        });

    });

    describe('Modulo - Medical Care - /api/v1/medical-care/medical-certification/pdf/{medicalCertificateId}', () => {

        it('Validar retorno 200 - /api/v1/medical-care/medical-certification/pdf/{medicalCertificateId}', () => {

            const token = Cypress.env('access_token');

            const medicalCertificateId = 888// passar o id correto

            cy.api({
                method: 'GET',
                url: `/api/v1/medical-care/medical-certification/pdf/${medicalCertificateId}`,
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(200)

            })

        });

        it('Validar retorno 404 - /api/v1/medical-care/medical-certification/pdf/{medicalCertificateId}', () => {

            const token = Cypress.env('access_token');

            const medicalCertificateId = 888999999991// passar o id correto

            cy.api({
                method: 'GET',
                url: `/api/v1/medical-care/medical-certification/pdf/${medicalCertificateId}`,
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(404)

            })

        });

        it('Validar retorno 401 - /api/v1/medical-care/medical-certification/pdf/{medicalCertificateId}', () => {

            const token = Cypress.env('access_tokenn');

            const medicalCertificateId = 123// passar o id correto

            cy.api({
                method: 'GET',
                url: `/api/v1/medical-care/medical-certification/pdf/${medicalCertificateId}`,
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(401)

            })

        });

    });

    describe('Modulo - Medical Care - /api/v1/medical-care/exams/patient/{patientId}', () => {

        it('Validar retorno 200 - /api/v1/medical-care/exams/patient/{patientId}', () => {

            const token = Cypress.env('access_token');

            const patientId = 17962672

            cy.api({
                method: 'GET',
                url: `/api/v1/medical-care/infos/${patientId}`,
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

        it('Validar retorno 400 - /api/v1/medical-care/exams/patient/{patientId}', () => {


            const token = Cypress.env('access_token');

            const patientId = 17962672

            cy.api({
                method: 'GET',
                url: `/api/v1/medical-care/infos/${patientId}`,
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

        it('Validar retorno 401 - /api/v1/medical-care/exams/patient/{patientId}', () => {


            const token = Cypress.env('access_token');

            const patientId = 17962672

            cy.api({
                method: 'GET',
                url: `/api/v1/medical-care/infos/${patientId}`,
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

    describe.only('Modulo - Medical Care - /api/v1/medical-care/prescription/patient/{patientId}', () => {

        it('Validar retorno 200 - /api/v1/medical-care/prescription/patient/{patientId}', () => {


            const token = Cypress.env('access_token');

            const patientId = 17962672

            cy.api({
                method: 'GET',
                url: `/api/v1/medical-care/infos/${patientId}`,
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

        it('Validar retorno 400 - /api/v1/medical-care/prescription/patient/{patientId}', () => {


            const token = Cypress.env('access_token');

            const patientId = 17962672

            cy.api({
                method: 'GET',
                url: `/api/v1/medical-care/infos/${patientId}`,
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

        it('Validar retorno 401 - /api/v1/medical-care/prescription/patient/{patientId}', () => {


            const token = Cypress.env('access_token');

            const patientId = 17962672

            cy.api({
                method: 'GET',
                url: `/api/v1/medical-care/infos/${patientId}`,
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

    describe('Modulo - Medical Care - /api/v1/medical-care/medical-certification/patient/{patientId}', () => {

        it('Validar retorno 200 - /api/v1/medical-care/medical-certification/patient/{patientId}', () => {


            const token = Cypress.env('access_token');

            const patientId = 17962672

            cy.api({
                method: 'GET',
                url: `/api/v1/medical-care/infos/${patientId}`,
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

        it('Validar retorno 400 - /api/v1/medical-care/medical-certification/patient/{patientId}', () => {


            const token = Cypress.env('access_token');

            const patientId = 17962672

            cy.api({
                method: 'GET',
                url: `/api/v1/medical-care/infos/${patientId}`,
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

        it('Validar retorno 401 - /api/v1/medical-care/medical-certification/patient/{patientId}', () => {


            const token = Cypress.env('access_token');

            const patientId = 17962672

            cy.api({
                method: 'GET',
                url: `/api/v1/medical-care/infos/${patientId}`,
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

