/// <reference types="cypress"/>

describe('Módulo - Atendimento Subjetiva', () => {
    beforeEach(() => {
        cy.login();
        cy.refreshToken();
    })

    describe('Módulo - Atendimento Subjetiva - Dados da anamnese registrados pelo profissional', () => {

        it('Validar retorno 201 - /api/v1/attendance/subjective/anamnesis', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/attendance/subjective/anamnesis',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: {
                    "attendanceId": 1,
                    "anamnesisText": "Dados",
                    "anamnesisModelId": 1
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(201);
            })
        })

        it('Validar retorno 400 - /api/v1/attendance/subjective/anamnesis', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/attendance/subjective/anamnesis',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(400);
            })
        })

        it('Validar retorno 401 - /api/v1/attendance/subjective/anamnesis', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/attendance/subjective/anamnesis',
                headers: {
                    //'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(401);
            })
        })
    })

    describe('Módulo - Atendimento Subjetiva - Lista de anamnse', () => {

        it('Validar retorno 200 - /api/v1/attendance/subjective/anamnesis', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/attendance/subjective/anamnesis',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(200);
            })
        })

        it('Validar retorno 400 - /api/v1/attendance/subjective/anamnesis', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/attendance/subjective/anamnesis',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(400);
            })
        })

        it('Validar retorno 200 - /api/v1/attendance/subjective/anamnesis', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/attendance/subjective/anamnesis',
                headers: {
                    //'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(401);
            })
        })
    })

    describe('Módulo - Atendimento Subjetiva - Adicionar motivo/problema na anamnse', () => {

        it('Validar retorno 201 - /api/v1/attendance/subjective/anamnesis-problem', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/attendance/subjective/anamnesis-problem',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(201);
            })
        })

        it('Validar retorno 400 - /api/v1/attendance/subjective/anamnesis-problem', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/attendance/subjective/anamnesis-problem',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(400);
            })
        })

        it('Validar retorno 401 - /api/v1/attendance/subjective/anamnesis-problem', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/attendance/subjective/anamnesis-problem',
                headers: {
                    //'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(401);
            })
        })
    })

    describe('Módulo - Atendimento Subjetiva - removes alergia.', () => {

        it('Validar retorno 200 - /api/v1/attendance/subjective/anamnesis-problem', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'DELETE',
                url: '/api/v1/attendance/subjective/anamnesis-problem',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(200);
            })
        })

        it('Validar retorno 400 - /api/v1/attendance/subjective/anamnesis-problem', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'DELETE',
                url: '/api/v1/attendance/subjective/anamnesis-problem',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(400);
            })
        })

        it('Validar retorno 401 - /api/v1/attendance/subjective/anamnesis-problem', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'DELETE',
                url: '/api/v1/attendance/subjective/anamnesis-problem',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(401);
            })
        })
    })

    describe('Módulo - Atendimento Subjetiva - Adicionar motivo/problema na anamnse', () => {

        it('Validar retorno 201 - /api/v1/attendance/subjective/anamnesis-problem-favorite', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/attendance/subjective/anamnesis-problem-favorite',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(201);
            })
        })

        it('Validar retorno 400 - /api/v1/attendance/subjective/anamnesis-problem-favorite', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/attendance/subjective/anamnesis-problem-favorite',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(400);
            })
        })

        it('Validar retorno 401 - /api/v1/attendance/subjective/anamnesis-problem-favorite', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/attendance/subjective/anamnesis-problem-favorite',
                headers: {
                    //'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(401);
            })
        })
    })

    describe('Módulo - Atendimento Subjetiva - remove motivo/problema na anamnse', () => {

        it('Validar retorno 200 - /api/v1/attendance/subjective/anamnesis-problem-favorite', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'DELETE',
                url: '/api/v1/attendance/subjective/anamnesis-problem-favorite',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(200);
            })
        })

        it('Validar retorno 400 - /api/v1/attendance/subjective/anamnesis-problem-favorite', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'DELETE',
                url: '/api/v1/attendance/subjective/anamnesis-problem-favorite',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(400);
            })
        })

        it('Validar retorno 401 - /api/v1/attendance/subjective/anamnesis-problem-favorite', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'DELETE',
                url: '/api/v1/attendance/subjective/anamnesis-problem-favorite',
                headers: {
                    //'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(401);
            })
        })
    })

    describe('Módulo - Atendimento Subjetiva - Cadastrar alergia', () => {

        it('Validar retorno 200 - /api/v1/attendance/subjective/allergy', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/attendance/subjective/allergy',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(200);
            })
        })

        it('Validar retorno 400 - /api/v1/attendance/subjective/allergy', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/attendance/subjective/allergy',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(400);
            })
        })

        it('Validar retorno 401 - /api/v1/attendance/subjective/allergy', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/attendance/subjective/allergy',
                headers: {
                    //'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(401);
            })
        })
    })

    describe('Módulo - Atendimento Subjetiva - atualizar alergia', () => {

        it('Validar retorno 200 - /api/v1/attendance/subjective/allergy', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'PATCH',
                url: '/api/v1/attendance/subjective/allergy',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(200);
            })
        })

        it('Validar retorno 400 - /api/v1/attendance/subjective/allergy', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'PATCH',
                url: '/api/v1/attendance/subjective/allergy',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(400);
            })
        })

        it('Validar retorno 401 - /api/v1/attendance/subjective/allergy', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'PATCH',
                url: '/api/v1/attendance/subjective/allergy',
                headers: {
                    //'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(401);
            })
        })
    })

    describe('Módulo - Atendimento Subjetiva - removes alergia', () => {

        it('Validar retorno 200 - /api/v1/attendance/subjective/allergy', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'DELETE',
                url: '/api/v1/attendance/subjective/allergy',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(200);
            })
        })

        it('Validar retorno 400 - /api/v1/attendance/subjective/allergy', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'DELETE',
                url: '/api/v1/attendance/subjective/allergy',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(400);
            })
        })

        it('Validar retorno 401 - /api/v1/attendance/subjective/allergy', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'DELETE',
                url: '/api/v1/attendance/subjective/allergy',
                headers: {
                    //'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(401);
            })
        })
    })

    describe('Módulo - Atendimento Subjetiva - Lista de tipo de alergias', () => {

        it('Validar retorno 200 - /api/v1/attendance/subjective/type-allergies', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/attendance/subjective/type-allergies?allergyId=171&allergy=tomate',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(200);
                cy.log('Retorna vazio', JSON.stringify(response.body));
            })
        })

        it('Validar retorno 401 - /api/v1/attendance/subjective/type-allergies', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/attendance/subjective/type-allergies',
                headers: {
                    //'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(401);
                cy.log(JSON.stringify(response.body));
            })
        })
    })

    describe('Módulo - Atendimento Subjetiva - Lista de alergias', () => {

        it('Validar retorno 200 - /api/v1/attendance/subjective/allergies', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/attendance/subjective/allergies?attendanceId=445&page=1&limit=1',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(200);
                cy.log(JSON.stringify(response.body));
                expect(response.body).to.have.property('items').to.be.an('array');
                expect(response.body).to.have.property('meta').to.include.all.keys(
                    'itemCount',
                    'totalItems',
                    'itemsPerPage',
                    'currentPage',
                    'totalPages'
                )
            })
        })

        it('Validar retorno 401 - /api/v1/attendance/subjective/allergies', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/attendance/subjective/allergies',
                headers: {
                    //'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(401);
                cy.log(JSON.stringify(response.body));
            })
        })
    })

    describe('Módulo - Atendimento Subjetiva - Cadastrar Antecedentes pessoais', () => {

        it('Validar retorno 201 - /api/v1/attendance/subjective/antecedente', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/attendance/subjective/antecedente',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(201);
            })
        })

        it('Validar retorno 400 - /api/v1/attendance/subjective/antecedente', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/attendance/subjective/antecedente',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(400);
            })
        })

        it('Validar retorno 401 - /api/v1/attendance/subjective/antecedente', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/attendance/subjective/antecedente',
                headers: {
                    //'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(401);
            })
        })
    })

    describe('Módulo - Atendimento Subjetiva - atualizar Antecedentes pessoais', () => {

        it('Validar retorno 200 - /api/v1/attendance/subjective/antecedente', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'PATCH',
                url: '/api/v1/attendance/subjective/antecedente',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(200);
            })
        })

        it('Validar retorno 400 - /api/v1/attendance/subjective/antecedente', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'PATCH',
                url: '/api/v1/attendance/subjective/antecedente',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(400);
            })
        })

        it('Validar retorno 401 - /api/v1/attendance/subjective/antecedente', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'PATCH',
                url: '/api/v1/attendance/subjective/antecedente',
                headers: {
                    //'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(401);
            })
        })
    })

    describe('Módulo - Atendimento Subjetiva - removes Antecedentes pessoais', () => {

        it('Validar retorno 200 - /api/v1/attendance/subjective/antecedente', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'DELETE',
                url: '/api/v1/attendance/subjective/antecedente',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(200);
            })
        })

        it('Validar retorno 400 - /api/v1/attendance/subjective/antecedente', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'DELETE',
                url: '/api/v1/attendance/subjective/antecedente',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(400);
            })
        })

        it('Validar retorno 401 - /api/v1/attendance/subjective/antecedente', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'DELETE',
                url: '/api/v1/attendance/subjective/antecedente',
                headers: {
                    //'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(401);
            })
        })
    })

    describe('Módulo - Atendimento Subjetiva - Lista de Antecedentes pessoais', () => {

        it('Validar retorno 200 - /api/v1/attendance/subjective/antecedentes', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/attendance/subjective/antecedents?attendanceId=201&page=1&limit=1',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(200);
                cy.log(JSON.stringify(response.body));
                expect(response.body).to.have.property('items').to.be.an('array');
                expect(response.body).to.have.property('meta').to.include.all.keys(
                    'itemCount',
                    'totalItems',
                    'itemsPerPage',
                    'currentPage',
                    'totalPages'
                )
            })
        })

        it('Validar retorno 404 - /api/v1/attendance/subjective/antecedentes', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/attendance/subjective/antecedentes',
                headers: {
                    //'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(404);
                cy.log(JSON.stringify(response.body));
            })
        })
    })

    describe('Módulo - Atendimento Subjetiva - Cadastrar Antecedentes famliares', () => {

        it('Validar retorno 201 - /api/v1/attendance/subjective/antecedent-family', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/attendance/subjective/antecedent-family',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(201);
            })
        })

        it('Validar retorno 400 - /api/v1/attendance/subjective/antecedent-family', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/attendance/subjective/antecedent-family',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(400);
            })
        })

        it('Validar retorno 401 - /api/v1/attendance/subjective/antecedent-family', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/attendance/subjective/antecedent-family',
                headers: {
                    //'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(401);
            })
        })
    })

    describe('Módulo - Atendimento Subjetiva - atualizar antecedentes famliares', () => {

        it('Validar retorno 200 - /api/v1/attendance/subjective/antecedent-family', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'PATCH',
                url: '/api/v1/attendance/subjective/antecedent-family',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(200);
            })
        })

        it('Validar retorno 400 - /api/v1/attendance/subjective/antecedent-family', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'PATCH',
                url: '/api/v1/attendance/subjective/antecedent-family',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(400);
            })
        })

        it('Validar retorno 401 - /api/v1/attendance/subjective/antecedent-family', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'PATCH',
                url: '/api/v1/attendance/subjective/antecedent-family',
                headers: {
                    //'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(401);
            })
        })
    })

    describe('Módulo - Atendimento Subjetiva - removes antecedentes famliares', () => {

        it('Validar retorno 200 - /api/v1/attendance/subjective/antecedent-family', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'DELETE',
                url: '/api/v1/attendance/subjective/antecedent-family',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(200);
            })
        })

        it('Validar retorno 400 - /api/v1/attendance/subjective/antecedent-family', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'DELETE',
                url: '/api/v1/attendance/subjective/antecedent-family',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(400);
            })
        })

        it('Validar retorno 401 - /api/v1/attendance/subjective/antecedent-family', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'DELETE',
                url: '/api/v1/attendance/subjective/antecedent-family',
                headers: {
                    //'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(401);
            })
        })
    })

    describe('Módulo - Atendimento Subjetiva - Lista de antecedentes famliares', () => {

        it('Validar retorno 200 - /api/v1/attendance/subjective/antecedents-family', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/attendance/subjective/antecedents-family?attendanceId=201&page=1&limit=1',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(200);
                cy.log(JSON.stringify(response.body))
                expect(response.body).to.have.property('items').to.be.an('array');
                expect(response.body).to.have.property('meta').to.include.all.keys(
                    'itemCount',
                    'totalItems',
                    'itemsPerPage',
                    'currentPage',
                    'totalPages'
                )
            })
        })

        it('Validar retorno 401 - /api/v1/attendance/subjective/antecedents-family', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/attendance/subjective/antecedents-family',
                headers: {
                    //'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(401);
                cy.log(JSON.stringify(response.body))
            })
        })
    })

    describe('Módulo - Atendimento Subjetiva - Concluir etapa Subjetiva', () => {

        it('Validar retorno 201 - /api/v1/attendance/subjective/complete', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/attendance/subjective/complete',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(201);
            })
        })

        it('Validar retorno 400 - /api/v1/attendance/subjective/complete', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/attendance/subjective/complete',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(400);
            })
        })

        it('Validar retorno 401 - /api/v1/attendance/subjective/complete', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/attendance/subjective/complete',
                headers: {
                    //'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(401);
            })
        })
    })

    describe('Módulo - Atendimento Subjetiva - Lista de parentes', () => {

        it('Validar retorno 200 - /api/v1/attendance/subjective/relatives', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/attendance/subjective/relatives',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(200);
                cy.log(JSON.stringify(response.body))
                expect(response.body).to.be.an('array');
                response.body.forEach((itens) => {
                    expect(itens).to.have.property('id');
                    expect(itens).to.have.property('parentesco');
                })
            })
        })

        it('Validar retorno 401 - /api/v1/attendance/subjective/relatives', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/attendance/subjective/relatives',
                headers: {
                    //'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(401);
                cy.log(JSON.stringify(response.body))
            })
        })
    })

    describe('Módulo - Atendimento Subjetiva - Dados da anamnese registrados pelo profissional', () => {

        it('Validar retorno 201 - /api/v1/attendance/subjective/conduct', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/attendance/subjective/conduct',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(201);
            })
        })

        it('Validar retorno 400 - /api/v1/attendance/subjective/conduct', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/attendance/subjective/conduct',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(400);
            })
        })

        it('Validar retorno 401 - /api/v1/attendance/subjective/conduct', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/attendance/subjective/conduct',
                headers: {
                    //'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(401);
            })
        })
    })

    describe('Módulo - Atendimento Subjetiva - Lista de conduta', () => {

        it('Validar retorno 200 - /api/v1/attendance/subjective/conduct', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/attendance/subjective/conduct?attendanceId=1327',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(200);
                cy.log(JSON.stringify(response.body));
                expect(response.body).to.have.property('attendanceId');
                expect(response.body).to.have.property('conduct');
            })
        })

        it('Validar retorno 401 - /api/v1/attendance/subjective/conduct', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/attendance/subjective/conduct',
                headers: {
                    //'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(401);
                cy.log(JSON.stringify(response.body));
            })
        })
    })
})