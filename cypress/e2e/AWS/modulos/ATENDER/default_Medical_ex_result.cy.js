/// <reference types="cypress" />

describe('Módulo - Exam Results', () => {
    beforeEach(() => {
        cy.login();
        cy.refreshToken();
    });

it.only('Validar retorno 201 - /api/v1/medical-care/exam-results/appointment/{appointmentId}', () => {
    const token = Cypress.env('access_token');
    const appointmentId = 17962672;

    cy.fixture('Amei.pdf', 'binary')
        .then((file) => Cypress.Blob.binaryStringToBlob(file, 'application/pdf'))
        .then((blob) => {
            const formData = new FormData();
            formData.append('file', blob, 'Amei.pdf');
            formData.append('dataSolicitacao', '2026-01-19');
            formData.append('dataRealizacao', '2026-01-19');

            cy.wrap(
                new Cypress.Promise((resolve) => {
                    const xhr = new XMLHttpRequest();
                    xhr.open('POST', `/api/v1/medical-care/exam-results/appointment/${appointmentId}`);
                    xhr.setRequestHeader('Authorization', `Bearer ${token}`);
                    xhr.onload = () => resolve(xhr);
                    xhr.send(formData);
                })
            ).then((xhr) => {
                expect(xhr.status).to.eq(201);
            });
        });
});

    it('Validar retorno 400 - /api/v1/medical-care/exam-results/appointment/{appointmentId}', () => {
        const token = Cypress.env('access_token');
        
        const appointmentId = 1201;

        cy.api({
            method: 'POST',
            url: `/api/v1/medical-care/exam-results/appointment/${appointmentId}`,
            failOnStatusCode: false,
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(400);
        });
    });

    it('Validar retorno 401 - /api/v1/medical-care/exam-results/appointment/{appointmentId}', () => {
        const token = Cypress.env('access_tokenn');
        const appointmentId = 12345;

        cy.api({
            method: 'POST',
            url: `/api/v1/medical-care/exam-results/appointment/${appointmentId}`,
            failOnStatusCode: false,
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(401);
        });
    });
});