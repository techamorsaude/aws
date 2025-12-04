/// <reference types="cypress" />

describe('Módulo - Propostas - POST /api/v1/propostas', () => {

    beforeEach(() => {
        cy.login();
        cy.refreshToken();
    });

    const payload = {
        pacienteId: 1,
        parceiroId: 1,
        cdtMatricula: "0001",
        dataProposta: "20221225",
        dataValidade: "20231230",
        profissionalId: 1,
        especialidadeId: 1,
        status: 1,
        valorTotal: 1,
        valorTotalClinica: 1,
        procedimentos: [
            {
                procedimentoId: 1,
                executanteId: 1,
                pagamentoParcial: "1",
                executado: "1",
                quantidade: 5,
                valorUnitario: 12,
                valorTotal: 60,
                valorTotalClinica: 60
            }
        ],
        parcela: {
            dataVencimento: "20230130",
            observacao: "Lorem ipsum...",
            valor: 10
        },
        appointmentId: 500456,
        profissionalExterno: "nome profissional",
        profissaoExternoId: 1,
        codigoExterno: "1234",
        cashback: 20.56,
        campaignId: 757,
        optin: {
            healthData: true
        }
    };

    it('Validar retorno 200 e estrutura principal do JSON - POST /api/v1/propostas', () => {
        const token = Cypress.env('access_token');

        cy.request({
            method: 'POST',
            url: '/api/v1/propostas',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: payload,
            failOnStatusCode: false
        }).then((response) => {

            expect(response.status).to.eq(200);

            const item = response.body;

            // ---------- Campos obrigatórios ----------
            expect(item).to.have.property("pacienteId");
            expect(item).to.have.property("parceiroId");
            expect(item).to.have.property("cdtMatricula");
            expect(item).to.have.property("dataProposta");
            expect(item).to.have.property("dataValidade");
            expect(item).to.have.property("profissionalId");
            expect(item).to.have.property("especialidadeId");
            expect(item).to.have.property("status");
            expect(item).to.have.property("valorTotal");
            expect(item).to.have.property("valorTotalClinica");
            expect(item).to.have.property("procedimentos");
            expect(item).to.have.property("parcela");
            expect(item).to.have.property("appointmentId");
            expect(item).to.have.property("profissionalExterno");
            expect(item).to.have.property("profissaoExternoId");
            expect(item).to.have.property("codigoExterno");
            expect(item).to.have.property("cashback");
            expect(item).to.have.property("campaignId");
            expect(item).to.have.property("optin");

            // ---------- Tipos ----------
            expect(item.pacienteId).to.be.a("number");
            expect(item.parceiroId).to.be.a("number");
            expect(item.cdtMatricula).to.be.a("string");
            expect(item.dataProposta).to.be.a("string");
            expect(item.dataValidade).to.be.a("string");
            expect(item.profissionalId).to.be.a("number");
            expect(item.especialidadeId).to.be.a("number");
            expect(item.status).to.be.a("number");
            expect(item.valorTotal).to.be.a("number");
            expect(item.valorTotalClinica).to.be.a("number");
            expect(item.appointmentId).to.be.a("number");
            expect(item.profissionalExterno).to.be.a("string");
            expect(item.profissaoExternoId).to.be.a("number");
            expect(item.codigoExterno).to.be.a("string");
            expect(item.cashback).to.be.a("number");
            expect(item.campaignId).to.be.a("number");

            // ---------- Regras adicionais ----------
            expect(item.valorTotalClinica).to.equal(item.valorTotal);

            const validade = new Date(item.dataValidade);
            const proposta = new Date(item.dataProposta);

            expect(validade.getTime()).to.be.greaterThan(proposta.getTime());

            // ---------- Opt-in ----------
            expect(item.optin).to.have.property("healthData");
            expect(item.optin.healthData).to.be.a("boolean");

            // ---------- Parcela ----------
            const parcela = item.parcela;
            expect(parcela).to.have.property("dataVencimento");
            expect(parcela).to.have.property("observacao");
            expect(parcela).to.have.property("valor");

            expect(parcela.dataVencimento).to.be.a("string");
            expect(parcela.observacao).to.be.a("string");
            expect(parcela.valor).to.be.a("number");
            expect(parcela.valor).to.be.greaterThan(0);

            // ---------- Procedimentos ----------
            expect(item.procedimentos).to.be.an("array").and.not.be.empty;

            item.procedimentos.forEach((proc) => {
                expect(proc).to.have.property("procedimentoId");
                expect(proc).to.have.property("executanteId");
                expect(proc).to.have.property("pagamentoParcial");
                expect(proc).to.have.property("executado");
                expect(proc).to.have.property("quantidade");
                expect(proc).to.have.property("valorUnitario");
                expect(proc).to.have.property("valorTotal");
                expect(proc).to.have.property("valorTotalClinica");

                expect(proc.procedimentoId).to.be.a("number");
                expect(proc.executanteId).to.be.a("number");
                expect(proc.pagamentoParcial).to.be.a("string");
                expect(proc.executado).to.be.a("string");
                expect(proc.quantidade).to.be.a("number");
                expect(proc.valorUnitario).to.be.a("number");
                expect(proc.valorTotal).to.be.a("number");
                expect(proc.valorTotalClinica).to.be.a("number");

                // Valida cálculo
                expect(proc.valorTotal).to.equal(proc.quantidade * proc.valorUnitario);
                expect(proc.valorTotalClinica).to.equal(proc.valorTotal);
            });
        });
    });

    it('Validar retorno 401 - POST /api/v1/propostas sem token', () => {
        cy.request({
            method: 'POST',
            url: '/api/v1/propostas',
            headers: {
                'Content-Type': 'application/json'
            },
            body: payload,
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(401);
        });
    });

});
