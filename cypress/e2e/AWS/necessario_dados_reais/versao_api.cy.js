/// <reference types="cypress" />

describe('Módulo - Versão API', () => {
    beforeEach(() => {
        cy.login();
        cy.refreshToken();
        //cy.loginAsPaulo();
        //cy.refreshTokenAsPaulo();
    })

    describe('Módulo - Versão API - Versioning Interface', () => {

        it('Validar retorno 200 - /api/v1/versioning-interface', () => {
            //const token = Cypress.env('access_token_paulo');
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/versioning-interface',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(200);

                // Verifica se o body começa com '<!doctype html>'
                expect(response.body.toLowerCase()).to.contain('<!doctype html>');

                // Verifica se contém a tag <html> e <head>, por exemplo
                expect(response.body).to.include('<html');
                expect(response.body).to.include('<head');
            })
        })

        it('Validar retorno 401 - /api/v1/versioning-interface', () => {
            //const token = Cypress.env('access_token_paulo');
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/versioning-interface',
                headers: {
                    //'Authorization': `Bearer ${token}`, token inválido
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(401);
            })
        })
    })

    describe('Módulo - Versão API - Observability Interface', () => {

        it('Validar retorno 200 - /api/v1/observability-interface', () => {
            //const token = Cypress.env('access_token_paulo');
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/observability-interface',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(200);

                // Verifica se o body começa com '<!doctype html>'
                expect(response.body.toLowerCase()).to.contain('<!doctype html>');

                // Verifica se contém a tag <html> e <head>, por exemplo
                expect(response.body).to.include('<html');
                expect(response.body).to.include('<head');
            })
        })

        it('Validar retorno 401 - /api/v1/observability-interface', () => {
            //const token = Cypress.env('access_token_paulo');
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/observability-interface',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(401);
            })
        })
    })

    describe('Módulo - Versão API - Endpoint Versioning config', () => {

        it('Validar retorno 200 - /api/v1/endpoint-versioning-config', () => {
            //const token = Cypress.env('access_token_paulo');
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/endpoint-versioning-config',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false, 
            }).then((response) => {
                expect(response.status).to.eq(200);
            })
        })

        it('Validar retorno 401 - /api/v1/endpoint-versioning-config', () => {
            //const token = Cypress.env('access_token_paulo');
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/endpoint-versioning-config',
                headers: {
                    //'Authorization': `Bearer ${token}`, token inválido
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false, 
            }).then((response) => {
                expect(response.status).to.eq(401);
            })
        })
    })

    describe('Módulo - Versão API - Endpoint Versioning config', () => {

        it('Validar retorno 200 - /api/v1/endpoint-versioning-config', () => {
            //const token = Cypress.env('access_token_paulo');
            const token = Cypress.env('access_token');
            
            cy.request({
                method: 'PUT',
                url: '/api/v1/endpoint-versioning-config',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: {},
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(200);
            })
        })

        it('Validar retorno 401 - /api/v1/endpoint-versioning-config', () => {
            //const token = Cypress.env('access_token_paulo');
            const token = Cypress.env('access_token');
            
            cy.request({
                method: 'PUT',
                url: '/api/v1/endpoint-versioning-config',
                headers: {
                    //'Authorization': `Bearer ${token}`, token inválido
                    'Content-Type': 'application/json'
                },
                body: {},
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(401);
            })
        })
    })

    describe('Módulo - Versão API - Observability Logs', () => {

        it('Validar retorno 200 - /api/v1/observability-logs', () => {
            //const token = Cypress.env('access_token_paulo');
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/observability-logs',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(200)
            })
        })

        it('Validar retorno 401 - /api/v1/observability-logs', () => {
            //const token = Cypress.env('access_token_paulo');
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/observability-logs',
                headers: {
                    //'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(401)
            })
        })
    })

    describe('Módulo - Versão API - Versao API', () => {
        it('Validar retorno 200 - /api/v1/versao-api', () => {
            const token = Cypress.env('access_token_paulo');

            cy.request({
                method: 'GET',
                url: '/api/v1/versao-api',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(200)
            })
        })

        it('Validar retorno 401 - /api/v1/versao-api', () => {
            const token = Cypress.env('access_token_paulo');

            cy.request({
                method: 'GET',
                url: '/api/v1/versao-api',
                headers: {
                    //'Authorization': `Bearer ${token}`, token inválido
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(401)
            })
        })
    })

    describe('Módulo - Versão API - Crash', () => {

        it('Validar retorno 201 - /api/v1/crash', () => {
            const token = Cypress.env('access_token_paulo');

            cy.request({
                method: 'POST',
                url: '/api/v1/crash',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(201);

                expect(response.body).to.have.property('status');
            })
        })

        it('Validar retorno 401 - /api/v1/crash', () => {
            const token = Cypress.env('access_token_paulo');

            cy.request({
                method: 'POST',
                url: '/api/v1/crash',
                headers: {
                    //'Authorization': `Bearer ${token}`, token inválido
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(201);
            })
        })
    })

    describe('Módulo - Versão API - Status', () => {

        it('Validar retorno 200 - /api/v1/status', () => {
            const token = Cypress.env('access_token_paulo');

            cy.request({
                method: 'GET',
                url: '/api/v1/status',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(200);
                expect(response.body).to.have.property('status');
            })
        })

        it('Validar retorno 401 - /api/v1/status', () => {
            const token = Cypress.env('access_token_paulo');

            cy.request({
                method: 'GET',
                url: '/api/v1/status',
                headers: {
                    //'Authorization': `Bearer ${token}`, token inválido
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(401);
            })
        })
    })
})