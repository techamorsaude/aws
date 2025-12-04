/// <reference types="cypress" />

describe('Módulo -Propostas'), () => {
    beforeEach(() => {
        cy.login()
        cy.refreshToken()
    })

    describe('Módulo - Propostas - Retorna lista de propostas'), () => {

        it('Validar retorno 200 - /api/v1/propostas', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/propostas',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(200)
            })
        })
    }
}

//Estrutura principal do JSON
const body = response.body;
expect(body).to.have.property('items').to.be.an('array')

// ---------- Campos obrigatórios ----------
expect(item).to.have.property("id");
expect(item).to.have.property("dataValidade");
expect(item).to.have.property("valorTotal");
expect(item).to.have.property("createdAt");
expect(item).to.have.property("valorTotalClinica");
expect(item).to.have.property("itens");
expect(item).to.have.property("status");
expect(item).to.have.property("paciente");

// ---------- Tipos ----------
expect(item.id).to.be.a("number");
expect(item.valorTotal).to.be.a("number");
expect(item.valorTotalClinica).to.be.a("number");
expect(item.dataValidade).to.be.a("string");
expect(item.createdAt).to.be.a("string");

// ---------- Itens / Procedimentos ----------
expect(item.itens).to.be.an("array").and.not.be.empty;

const proc = item.itens[0];

expect(proc).to.have.property("id");
expect(proc).to.have.property("procedimento");
expect(proc.procedimento).to.have.property("id");
expect(proc.procedimento).to.have.property("nome");
expect(proc.procedimento.nome).to.be.a("string").and.not.be.empty;

// ---------- Status ----------
expect(item.status).to.have.property("id");
expect(item.status).to.have.property("descricao");

// ---------- Paciente ----------
expect(item.paciente).to.have.property("id");
expect(item.paciente).to.have.property("nome");
expect(item.paciente).to.have.property("sobrenome");

// ---------- Regras adicionais ----------
expect(item.valorTotalClinica).to.equal(item.valorTotal);

const validade = new Date(item.dataValidade);
expect(validade.getTime()).to.be.greaterThan(Date.now());

item.itens.forEach((i) => {
    expect(i.procedimento.nome).to.be.a("string").and.not.be.empty;
});


it('Validar retorno 401 - /api/v1/propostas', () => {
    const token = Cypress.env('access_token');

    cy.request({
        method: 'GET',
        url: '/api/v1/propostas',
        headers: {
            //'Authorization': `Bearer ${token}`, token inválido
            'Content-Type': 'application/json'
        },
        failOnStatusCode: false,
    }).then((response) => {
        expect(response.status).to.eq(401)
    })
})
