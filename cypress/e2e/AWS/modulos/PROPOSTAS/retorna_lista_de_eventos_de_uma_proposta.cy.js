/// <reference types="cypress" />

describe('Módulo - Propostas', () => {

    beforeEach(() => {
        cy.login();
        cy.refreshToken();
    });

    describe('Módulo - Propostas - Retorna lista de executantes', () => {

        it('Validar retorno 200 e estrutura da lista - GET /api/v1/propostas/executantes/list', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/propostas/executantes/list',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {

                expect(response.status).to.eq(200);

                const lista = response.body;

                // ---------- Lista ----------
                expect(lista).to.be.an('array');
                expect(lista.length).to.be.greaterThan(0);

                // ---------- Validação item por item ----------
                lista.forEach((item) => {
                    expect(item).to.have.property('id');
                    expect(item).to.have.property('razaoSocial');
                    expect(item).to.have.property('nomeFantasia');

                    // Tipos esperados
                    expect(item.id).to.be.a('number');
                    expect(item.razaoSocial).to.be.a('string');
                    expect(item.nomeFantasia).to.be.a('string');

                    // Conteúdo não pode ser vazio
                    expect(item.razaoSocial.trim()).to.not.equal('');
                    expect(item.nomeFantasia.trim()).to.not.equal('');
                });
            });
        });

        it('Validar retorno 401 - GET /api/v1/propostas/executantes/list sem token', () => {
            cy.request({
                method: 'GET',
                url: '/api/v1/propostas/executantes/list',
                headers: {
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(401);
            });
        });

    });

});
