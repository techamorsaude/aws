/// <reference types="cypress"/>

///<<<<<<<<<<<<<<<<<<<<<EM PRODUÇÃO<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
describe('Módulo - Documentos', () => {
    beforeEach(() => {
        cy.login();
        cy.refreshToken();
    })

    describe.only('Módulo - Documentos - Upload', () => {
        
        it('Validar retorno 201 - /api/v1/appointment/upload', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/appointment/upload',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: {
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(201);
                cy.log(JSON.stringify(response.body));
            })
        })

        it('Validar retorno 400 - /api/v1/appointment/upload', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/appointment/upload',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: {
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(400);
                cy.log(JSON.stringify(response.body));
            })
        })

        it('Validar retorno 401 - /api/v1/appointment/upload', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/appointment/upload',
                headers: {
                    //'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: {
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(401);
                cy.log(JSON.stringify(response.body));
            })
        })
    })

    describe('Módulo - Documentos - Upload ID', () => {
        
        it('Validar retorno 201 - /api/v1/appointment/upload/{id}', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'PATCH',
                url: '/api/v1/appointment/upload/{id}',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: {
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(201);
                cy.log(JSON.stringify(response.body));
            })
        })
    })

    describe('Módulo - Documentos - ID', () => {
        
        it('Validar retorno 201 - /api/v1/download/{id}', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/download/{id}',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: {
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(201);
                cy.log(JSON.stringify(response.body));
            })
        })
    })

    describe('Módulo - Documentos - Download url', () => {
        
        it('Validar retorno 201 - /api/v1/download-url/{id}', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/download-url/{id}',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: {
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(201);
                cy.log(JSON.stringify(response.body));
            })
        })
    })

    describe('Módulo - Documentos - Lista de arquivos', () => {
        
        it('Validar retorno 201 - /api/v1/files', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/files',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: {
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(201);
                cy.log(JSON.stringify(response.body));
            })
        })
    })

    describe('Módulo - Documentos - Remove arquivos', () => {
        
        it('Validar retorno 201 - /api/v1/file', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'DELETE',
                url: '/api/v1/file',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: {
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(201);
                cy.log(JSON.stringify(response.body));
            })
        })
    })
})