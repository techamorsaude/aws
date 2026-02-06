/// <reference types="cypress" />

describe('Módulo - Propostas', () => {
    beforeEach(() => {
        cy.login();
        cy.refreshToken()
    })

    describe('Módulo - Propostas - Retorna lista de propostas', () => {

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
                expect(response.status).to.eq(200);
                cy.log(JSON.stringify(response.body));

                const data = response.body.items[0];

                // Validações principais do primeiro items
                expect(data).to.have.property('id');
                expect(data).to.have.property('dataValidade');
                expect(data).to.have.property('valorTotal');
                expect(data).to.have.property('createdAt');
                expect(data).to.have.property('valorTotalClinica');

                // Validar array de itens
                expect(data.itens).to.be.an('array').and.to.have.length.greaterThan(0);
                const subItem = data.itens[0]
                expect(subItem).to.have.all.keys('id', 'procedimento');
                expect(subItem.procedimento).to.have.all.keys('id', 'nome');

                // Validar status e paciente
                expect(data.status).to.have.all.keys('id', 'descricao')
                expect(data.paciente).to.have.all.keys('id', 'nome', 'sobrenome')

                // Validar meta
                expect(response.body).to.have.property('meta')
                expect(response.body.meta).to.have.all.keys(
                    'totalItems',
                    'currentPage',
                    'itemCount',
                    'itemsPerPage',
                    'totalPages'
                )
            })
        })

        it('Validar retorno 400 - /api/v1/propostas', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST', // método divergente
                url: '/api/v1/propostas',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(400);
                cy.log(JSON.stringify(response.body));

            })
        })

        it('Validar retorno 401 - /api/v1/propostas', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/propostas',
                headers: {
                    // 'Authorization': `Bearer ${token}`, token inválido
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(401);
                cy.log(JSON.stringify(response.body));

            })
        })
    })

    // Precisa de dados reais do Amei
    describe.only('Módulo - Propostas - Cadastrar uma proposta', () => {

        it('Validar retorno 201 - /api/v1/propostas', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/propostas',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: {
                    pacienteId: 245352,
                    parceiroId: 41,
                    cdtMatricula: "SP103094455",
                    dataProposta: "20250825",
                    dataValidade: "20251024",
                    profissionalId: 3601,
                    especialidadeId: 611,
                    status: 1,
                    valorTotal: 70,
                    valorTotalClinica: 70,
                    procedimentos: [
                        {
                            procedimentoId: 20715,
                            executanteId: 420,
                            executado: "0",
                            pagamentoParcial: "0",
                            quantidade: 1,
                            valorUnitario: 70,
                            valorTotal: 70,
                            valorTotalClinica: 70
                        }
                    ],
                    parcela: {
                        id: 1,
                        dataVencimento: "20251024",
                        dataRecebimento: "20251024",
                        observacao: ".",
                        valor: 70,
                        valorRecebido: 0,
                        numeroParcela: 1,
                        vencimento: "20251024"
                    },
                    profissaoExternoId: null,
                    profissionalExterno: "",
                    codigoExterno: "",
                    cashback: 0,
                    optin: {
                        healthData: true
                    }
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(201);
                cy.log(JSON.stringify(response.body));

                const objeto = response.body;
                expect(objeto).to.have.property('proposal').to.include.all.keys(
                    'id',
                    'cdtMatricula',
                    'dataProposta',
                    'dataValidade',
                    'fkUnidade',
                    'valorTotal',
                    'quantidadeParcela',
                    'tipoIntervalo',
                    'quantidadeIntervalo',
                    'flagAtivo',
                    'ipClient',
                    'createdAt',
                    'updatedAt',
                    'lastUser',
                    'origem',
                    'parceiroId',
                    'origemId',
                    'valorTotalClinica',
                    'fkStatusProposta',
                    'fkEspecialidade',
                    'fkProfissional',
                    'fkProfissionalExterno',
                    'campaignId',
                    'patientId',
                    'paymentIdFiserv',
                )
                // Variável que recebe o id proposta
                const propostaId = objeto.proposal.id;
                // Salva o ID para uso posterior
                Cypress.env('propostaId', propostaId);
                cy.log('ID salvo:', propostaId);


                expect(objeto.proposal).to.have.property('itens').to.be.an('array');
                expect(objeto.proposal.itens[0]).to.include.all.keys(
                    'id',
                    'executanteId',
                    'executado',
                    'quantidade',
                    'valorUnitario',
                    'valorTotal',
                    'flagAtivo',
                    'ipClient',
                    'createdAt',
                    'updatedAt',
                    'createdBy',
                    'lastUser',
                    'lastExecutantId',
                    'valorTotalClinica',
                    'pagamentoParcial',
                    'fkProposta',
                    'fkProcedimento'
                )

                expect(objeto.proposal).to.have.property('parcela').to.include.all.keys(
                    'id',
                    'fkProposta',
                    'numeroParcela',
                    'dataVencimento',
                    'dataRecebimento',
                    'observacao',
                    'valor',
                    'valorRecebido',
                    'flagAtivo',
                    'ipClient',
                    'createdAt',
                    'updatedAt',
                    'createdBy',
                    'lastUser',
                    'formaLiquidacao'
                )

                expect(objeto).to.have.property('webHookPayload');
                expect(objeto.webHookPayload).to.have.property('unique_code');

                expect(objeto.webHookPayload).to.have.property('procedures').to.be.an('array');
                expect(objeto.webHookPayload.procedures[0]).to.includes.all.keys(
                    'item',
                    'name',
                    'price_particular_partner',
                    'price_card'
                )

                expect(objeto.webHookPayload).to.have.property('summary').to.includes.all.keys(
                    'subtotal',
                    'economy',
                    'total',
                    'provider',
                    'amorsaude',
                    'cashback'
                )

                expect(objeto.webHookPayload).to.have.property('metadata').to.includes.all.keys(
                    'user_id',
                    'cashier_id',
                    'unit_id',
                    'timestamp'
                )
            })
        })

        it('Validar retorno 400 - /api/v1/propostas', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/propostas',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: { //Sem parâmetro
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(400);
                cy.log(JSON.stringify(response.body));
            })
        })

        it('Validar retorno 401 - /api/v1/propostas', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/propostas',
                headers: {
                    //'Authorization': `Bearer ${token}`, Token inválido
                    'Content-Type': 'application/json'
                },
                body: {
                    pacienteId: 245352,
                    parceiroId: 41,
                    cdtMatricula: "SP103094455",
                    dataProposta: "20250825",
                    dataValidade: "20251024",
                    profissionalId: 3601,
                    especialidadeId: 611,
                    status: 1,
                    valorTotal: 70,
                    valorTotalClinica: 70,
                    procedimentos: [
                        {
                            procedimentoId: 20715,
                            executanteId: 420,
                            executado: "0",
                            pagamentoParcial: "0",
                            quantidade: 1,
                            valorUnitario: 70,
                            valorTotal: 70,
                            valorTotalClinica: 70
                        }
                    ],
                    parcela: {
                        id: 1,
                        dataVencimento: "20251024",
                        dataRecebimento: "20251024",
                        observacao: ".",
                        valor: 70,
                        valorRecebido: 0,
                        numeroParcela: 1,
                        vencimento: "20251024"
                    },
                    profissaoExternoId: null,
                    profissionalExterno: "",
                    codigoExterno: "",
                    cashback: 0,
                    optin: {
                        healthData: true
                    }
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(401);
                cy.log(JSON.stringify(response.body));
            })
        })
    })

    // Precisa de dados reais do Amei
    describe('Módulo - Propostas - Retorna uma proposta por id', () => {

        it('Validar retorno 200 - /api/v1/propostas/{id}', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/propostas/392',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(200);

                const objeto = response.body;

                // Verifica os campos principais da proposta
                expect(objeto).to.have.property('id');
                expect(objeto).to.have.property('cdtMatricula');
                expect(objeto).to.have.property('dataProposta');
                expect(objeto).to.have.property('dataValidade');
                expect(objeto).to.have.property('fkUnidade');
                expect(objeto).to.have.property('valorTotal');
                expect(objeto).to.have.property('quantidadeParcela');
                expect(objeto).to.have.property('tipoIntervalo');
                expect(objeto).to.have.property('quantidadeIntervalo');
                expect(objeto).to.have.property('flagAtivo');
                expect(objeto).to.have.property('ipClient');
                expect(objeto).to.have.property('createdAt');
                expect(objeto).to.have.property('updatedAt');
                expect(objeto).to.have.property('lastUser');
                expect(objeto).to.have.property('origem');
                expect(objeto).to.have.property('parceiroId');
                expect(objeto).to.have.property('origemId');
                expect(objeto).to.have.property('valorTotalClinica');
                expect(objeto).to.have.property('fkStatusProposta');
                expect(objeto).to.have.property('fkEspecialidade');
                expect(objeto).to.have.property('fkProfissional');
                expect(objeto).to.have.property('fkProfissionalExterno');
                expect(objeto).to.have.property('patientId');
                expect(objeto).to.have.property('paymentIdFiserv');

                // Verifica os campos do objeto paciente
                expect(objeto).to.have.property('paciente');
                expect(objeto.paciente).to.have.property('id');
                expect(objeto.paciente).to.have.property('obito');
                expect(objeto.paciente).to.have.property('prontuario');
                expect(objeto.paciente).to.have.property('tipoPaciente');
                expect(objeto.paciente).to.have.property('cpf');
                expect(objeto.paciente).to.have.property('docIdentificacao');
                expect(objeto.paciente).to.have.property('nome');
                expect(objeto.paciente).to.have.property('sobrenome');
                expect(objeto.paciente).to.have.property('nomeCompleto');
                expect(objeto.paciente).to.have.property('nomeSocial');
                expect(objeto.paciente).to.have.property('rg');
                expect(objeto.paciente).to.have.property('dataNascimento');
                expect(objeto.paciente).to.have.property('nomeMae');
                expect(objeto.paciente).to.have.property('naturalidade');
                expect(objeto.paciente).to.have.property('nacionalidade');
                expect(objeto.paciente).to.have.property('profissao');
                expect(objeto.paciente).to.have.property('restricoesTratamentoMedico');
                expect(objeto.paciente).to.have.property('codigoDDI');
                expect(objeto.paciente).to.have.property('telefone');
                expect(objeto.paciente).to.have.property('celular');
                expect(objeto.paciente).to.have.property('celularAlternativo');
                expect(objeto.paciente).to.have.property('email');
                expect(objeto.paciente).to.have.property('residenciaTipo');
                expect(objeto.paciente).to.have.property('cep');
                expect(objeto.paciente).to.have.property('endereco');
                expect(objeto.paciente).to.have.property('numero');
                expect(objeto.paciente).to.have.property('complemento');
                expect(objeto.paciente).to.have.property('bairro');
                expect(objeto.paciente).to.have.property('cidade');
                expect(objeto.paciente).to.have.property('estado');
                expect(objeto.paciente).to.have.property('foto');
                expect(objeto.paciente).to.have.property('observacoes');
                expect(objeto.paciente).to.have.property('cns');
                expect(objeto.paciente).to.have.property('sexoId');
                expect(objeto.paciente).to.have.property('origemId');
                expect(objeto.paciente).to.have.property('createdAt');
                expect(objeto.paciente).to.have.property('updatedAt');
                expect(objeto.paciente).to.have.property('primeiraConsulta');
                expect(objeto.paciente).to.have.property('optin');

                // Verifica os campos do objeto paciente.optin                
                expect(objeto.paciente.optin).to.have.property('personalData');
                expect(objeto.paciente.optin).to.have.property('healthData');
                expect(objeto.paciente.optin).to.have.property('appointmentData');

                // Verifica se items é um array  
                expect(objeto).to.have.property('itens').to.be.an('array')

                // Verifica os campos do objeto status
                expect(objeto).to.have.property('status');
                expect(objeto.status).to.have.property('id');
                expect(objeto.status).to.have.property('descricao');
                expect(objeto.status).to.have.property('flagAtivo');

                // Verifica os campos do objeto unidade
                expect(objeto).to.have.property('unidade');
                expect(objeto.unidade).to.have.property('id');
                expect(objeto.unidade).to.have.property('descricao');
                expect(objeto.unidade).to.have.property('endereco');
                expect(objeto.unidade).to.have.property('flgCentral');
                expect(objeto.unidade).to.have.property('feegowClinicId');
                expect(objeto.unidade).to.have.property('flgTelemedicina');
                expect(objeto.unidade).to.have.property('flgAmorCirurgias');
                expect(objeto.unidade).to.have.property('regiaoId');
                expect(objeto.unidade).to.have.property('flgAtivo');
                expect(objeto.unidade).to.have.property('flgAtivarTef');
                expect(objeto.unidade).to.have.property('razaoSocial');
                expect(objeto.unidade).to.have.property('cnpj');
                expect(objeto.unidade).to.have.property('cnes');
                expect(objeto.unidade).to.have.property('fkRegimeTributario');
                expect(objeto.unidade).to.have.property('fkUnidadeStatus');
                expect(objeto.unidade).to.have.property('consultor');
                expect(objeto.unidade).to.have.property('telefonePrincipal');
                expect(objeto.unidade).to.have.property('telefoneSecundario');
                expect(objeto.unidade).to.have.property('emailPrincipal');
                expect(objeto.unidade).to.have.property('emailSecundario');
                expect(objeto.unidade).to.have.property('cep');
                expect(objeto.unidade).to.have.property('numero');
                expect(objeto.unidade).to.have.property('complemento');
                expect(objeto.unidade).to.have.property('bairro');
                expect(objeto.unidade).to.have.property('regiaoZona');
                expect(objeto.unidade).to.have.property('observacao');
                expect(objeto.unidade).to.have.property('sigla');
                expect(objeto.unidade).to.have.property('fkFusoHorario');
                expect(objeto.unidade).to.have.property('fkTipoUnidade');
                expect(objeto.unidade).to.have.property('flgAgendaOnline');
                expect(objeto.unidade).to.have.property('sellerId');
                expect(objeto.unidade).to.have.property('flgAtivarSplit');
                expect(objeto.unidade).to.have.property('fkParceiroInstitucional');
                expect(objeto.unidade).to.have.property('dataInauguracao');
                expect(objeto.unidade).to.have.property('fkTipoSegmento');
                expect(objeto.unidade).to.have.property('status');
                expect(objeto.unidade).to.have.property('mcc');
                expect(objeto.unidade).to.have.property('latitude');
                expect(objeto.unidade).to.have.property('longitude');

                // Verifica os campos do objeto profissional
                expect(objeto).to.have.property('profissional');
                expect(objeto.profissional).to.have.property('id');
                expect(objeto.profissional).to.have.property('tratamento');
                expect(objeto.profissional).to.have.property('nome');
                expect(objeto.profissional).to.have.property('sobrenome');
                expect(objeto.profissional).to.have.property('cpf');
                expect(objeto.profissional).to.have.property('rg');
                expect(objeto.profissional).to.have.property('flagMemedPdf');
                expect(objeto.profissional).to.have.property('titulo');
                expect(objeto.profissional).to.have.property('dataNascimento');
                expect(objeto.profissional).to.have.property('email');
                expect(objeto.profissional).to.have.property('telefone1');
                expect(objeto.profissional).to.have.property('telefone2');
                expect(objeto.profissional).to.have.property('cep');
                expect(objeto.profissional).to.have.property('endereco');
                expect(objeto.profissional).to.have.property('numero');
                expect(objeto.profissional).to.have.property('complemento');
                expect(objeto.profissional).to.have.property('bairro');
                expect(objeto.profissional).to.have.property('cidade');
                expect(objeto.profissional).to.have.property('estadoEndereco');
                expect(objeto.profissional).to.have.property('observacaoPublica');
                expect(objeto.profissional).to.have.property('convenios');
                expect(objeto.profissional).to.have.property('exibirNaAgenda');
                expect(objeto.profissional).to.have.property('responsavelTecnicoClinica');
                expect(objeto.profissional).to.have.property('mensagemAgenda');
                expect(objeto.profissional).to.have.property('ativo');
                expect(objeto.profissional).to.have.property('fotografia');
                expect(objeto.profissional).to.have.property('tokenMemed');
                expect(objeto.profissional).to.have.property('criadoPor');
                expect(objeto.profissional).to.have.property('birdIdToken');
                expect(objeto.profissional).to.have.property('birdIdExpiration');
                expect(objeto.profissional).to.have.property('observacaoPrivada');
                expect(objeto.profissional).to.have.property('cnpj');
                expect(objeto.profissional).to.have.property('fkUsuario');
                expect(objeto.profissional).to.have.property('memedUpdateAt');

                // Verifica campo profissionaisExterno
                expect(objeto).to.have.property('profissionaisExterno');

                // Verifica campos do objeto especialidade
                expect(objeto).to.have.property('especialidade');
                expect(objeto.especialidade).to.have.property('id');
                expect(objeto.especialidade).to.have.property('descricao');
                expect(objeto.especialidade).to.have.property('rqe');
                expect(objeto.especialidade).to.have.property('ativo');
                expect(objeto.especialidade).to.have.property('flgTelemedicina');
                expect(objeto.especialidade).to.have.property('memedId');
                expect(objeto.especialidade).to.have.property('flgAmorCirurgias');

                // Verifica campo parceiro
                expect(objeto).to.have.property('parceiro')

                // Verifica array de parcelas
                expect(objeto).to.have.property('parcelas').to.be.an('array');
                expect(objeto.parcelas[0]).to.have.property('id');
                expect(objeto.parcelas[0]).to.have.property('fkProposta');
                expect(objeto.parcelas[0]).to.have.property('numeroParcela');
                expect(objeto.parcelas[0]).to.have.property('dataVencimento');
                expect(objeto.parcelas[0]).to.have.property('dataRecebimento');
                expect(objeto.parcelas[0]).to.have.property('observacao');
                expect(objeto.parcelas[0]).to.have.property('valor');
                expect(objeto.parcelas[0]).to.have.property('valorRecebido');
                expect(objeto.parcelas[0]).to.have.property('flagAtivo');
                expect(objeto.parcelas[0]).to.have.property('ipClient');
                expect(objeto.parcelas[0]).to.have.property('createdAt');
                expect(objeto.parcelas[0]).to.have.property('updatedAt');
                expect(objeto.parcelas[0]).to.have.property('createdBy');
                expect(objeto.parcelas[0]).to.have.property('lastUser');
                expect(objeto.parcelas[0]).to.have.property('formaLiquidacao');
                expect(objeto.parcelas[0]).to.have.property('recebimentos');

                // Verifica campos adicionais
                expect(objeto).to.have.property('createdBy');
                expect(objeto.createdBy).to.have.property('id');
                expect(objeto.createdBy).to.have.property('firstName');
                expect(objeto.createdBy).to.have.property('lastName');
                expect(objeto.createdBy).to.have.property('fullName');
                expect(objeto.createdBy).to.have.property('cpf');
                expect(objeto.createdBy).to.have.property('isAdmin');
                expect(objeto.createdBy).to.have.property('email');
                expect(objeto.createdBy).to.have.property('tratamento');
                expect(objeto.createdBy).to.have.property('sexo');
                expect(objeto.createdBy).to.have.property('dataNascimento');
                expect(objeto.createdBy).to.have.property('celular');
                expect(objeto.createdBy).to.have.property('funcao');
                expect(objeto.createdBy).to.have.property('profissao');
                expect(objeto.createdBy).to.have.property('crm');
                expect(objeto.createdBy).to.have.property('uf');
                expect(objeto.createdBy).to.have.property('cidade');
                expect(objeto.createdBy).to.have.property('password');
                expect(objeto.createdBy).to.have.property('role');
                expect(objeto.createdBy).to.have.property('isActive');
                expect(objeto.createdBy).to.have.property('loginTimes');
                expect(objeto.createdBy).to.have.property('passwordIsInvalidCount');
                expect(objeto.createdBy).to.have.property('hashNewPassword');
                expect(objeto.createdBy).to.have.property('flgMaisTodos');
                expect(objeto.createdBy).to.have.property('createdAt');
                expect(objeto.createdBy).to.have.property('updatedAt');

                expect(objeto).to.have.property('campaign');
                expect(objeto).to.have.property('recebimentoPendente');
                expect(objeto).to.have.property('hasFilaColetaExames');
            })
        })

        it('Validar retorno 400 - /api/v1/propostas/{id}', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/propostas/{id}', // Sem parâmetro no body
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(400);
            })
        })

        it('Validar retorno 401 - /api/v1/propostas/{id}', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/propostas/392',
                headers: {
                    //'Authorization': `Bearer ${token}`, Token inválido
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(401);
            })
        })
    })

    // Precisa de dados reais do Amei
    describe('Módulo - Propostas - Atualiza uma proposta por id', () => {

        it('Validar retorno 200 - /api/v1/propostas/{id}', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'PUT',
                url: 'api/v1/propostas/21693',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: {
                    pacienteId: 245352,
                    parceiroId: 41,
                    cdtMatricula: "SP103094455",
                    dataProposta: "20250826",
                    dataValidade: "20251024",
                    profissionalId: 1821,
                    especialidadeId: 611,
                    status: 1,
                    valorTotal: 75,
                    valorTotalClinica: 75,
                    procedimentos: [
                        {
                            id: 21694,
                            procedimentoId: 20715,
                            executanteId: 420,
                            executado: "0",
                            pagamentoParcial: "0",
                            quantidade: 1,
                            valorUnitario: 70,
                            valorTotal: 70,
                            valorTotalClinica: 70
                        },
                        {
                            id: null,
                            procedimentoId: 20357,
                            executanteId: 420,
                            executado: "0",
                            pagamentoParcial: "0",
                            quantidade: 1,
                            valorUnitario: 5,
                            valorTotal: 5,
                            valorTotalClinica: 5
                        }
                    ],
                    parcela: {
                        id: 18095,
                        dataVencimento: "19700101",
                        dataRecebimento: "19700101",
                        observacao: ".",
                        valor: 0,
                        vencimento: "19700101"
                    },
                    profissaoExternoId: null,
                    profissionalExterno: "",
                    codigoExterno: "",
                    campaignId: null,
                    cashback: 0
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(200);

                const objeto = response.body;

                // Validação de campos principais
                expect(objeto).to.have.property('flagDeError');
                expect(objeto).to.have.property('codigo');
                expect(objeto).to.have.property('mensagem');
                expect(objeto).to.have.property('webHookPayload');

                // Validação do webHookPayload
                const payload = objeto.webHookPayload;
                expect(payload).to.have.property('unique_code');
                expect(payload).to.have.property('procedures').to.be.an('array');

                // Validação dos procedimentos
                expect(payload.procedures[0]).to.include.all.keys(
                    'item',
                    'name',
                    'price_particular_partner',
                    'price_card'
                )
                // Validação do summary
                expect(payload).to.have.property('summary').to.include.all.keys(
                    'subtotal',
                    'economy',
                    'total',
                    'provider',
                    'amorsaude',
                    'cashback'
                )
                // Validação do metadata
                expect(payload).to.have.property('metadata').to.include.all.keys(
                    'user_id',
                    'cashier_id',
                    'unit_id',
                    'timestamp'
                )
            })
        })

        it('Validar retorno 400 - /api/v1/propostas/{id}', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'PUT',
                url: 'api/v1/propostas/21693',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: { //Sem parâmetro no body
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(400);
            })
        })

        it('Validar retorno 401 - /api/v1/propostas/{id}', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'PUT',
                url: 'api/v1/propostas/21693',
                headers: {
                    //'Authorization': `Bearer ${token}`, Token inválido
                    'Content-Type': 'application/json'
                },
                body: {
                    pacienteId: 245352,
                    parceiroId: 41,
                    cdtMatricula: "SP103094455",
                    dataProposta: "20250826",
                    dataValidade: "20251024",
                    profissionalId: 1821,
                    especialidadeId: 611,
                    status: 1,
                    valorTotal: 75,
                    valorTotalClinica: 75,
                    procedimentos: [
                        {
                            id: 21694,
                            procedimentoId: 20715,
                            executanteId: 420,
                            executado: "0",
                            pagamentoParcial: "0",
                            quantidade: 1,
                            valorUnitario: 70,
                            valorTotal: 70,
                            valorTotalClinica: 70
                        },
                        {
                            id: null,
                            procedimentoId: 20357,
                            executanteId: 420,
                            executado: "0",
                            pagamentoParcial: "0",
                            quantidade: 1,
                            valorUnitario: 5,
                            valorTotal: 5,
                            valorTotalClinica: 5
                        }
                    ],
                    parcela: {
                        id: 18095,
                        dataVencimento: "19700101",
                        dataRecebimento: "19700101",
                        observacao: ".",
                        valor: 0,
                        vencimento: "19700101"
                    },
                    profissaoExternoId: null,
                    profissionalExterno: "",
                    codigoExterno: "",
                    campaignId: null,
                    cashback: 0
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(401);
            })
        })
    })

    describe('Módulo - Propostas - Excluir uma proposta por id', () => {

        it('Validar retorno 200 - /api/v1/propostas/{id}', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'DELETE',
                url: '/api/v1/propostas/21593',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(200);

                expect(response.body).to.have.property('codigo');
                expect(response.body).to.have.property('flagDeError');
                expect(response.body).to.have.property('mensagem');
            })
        })

        it('Validar retorno 400 - /api/v1/propostas/{id}', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'DELETE',
                url: '/api/v1/propostas/{id}', // Sem parâmetro
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(400);
            })
        })

        it('Validar retorno 401 - /api/v1/propostas/{id}', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'DELETE',
                url: '/api/v1/propostas/21593',
                headers: {
                    //'Authorization': `Bearer ${token}`, Token inválido
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(401);
            })
        })
    })

    describe('Módulo - Propostas - Retorna uns procedimentos pagos', () => {

        it('Validar retorno 200 - /api/v1/propostas/procedimentos/pagas', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/propostas/procedimentos/pagas?paciente=1&page=1&limit=10',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(200)

                const item = response.body;
                expect(item).to.have.property('items').to.be.an('array');
                expect(item).to.have.property('meta').to.includes.all.keys(
                    'totalItems',
                    'currentPage',
                    'itemCount',
                    'itemsPerPage',
                    'totalPages'
                )
            })
        })

        it('Validar retorno 401 - /api/v1/propostas/procedimentos/pagas', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/propostas/procedimentos/pagas',
                headers: {
                    //'Authorization': `Bearer ${token}`, Token inválido
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(401)
            })
        })
    })

    describe('Módulo - Propostas - Atualiza uma parcela da proposta por id', () => {

        it('Validar retorno 200 - /api/v1/propostas/parcela/{id}', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'PUT',
                url: '/api/v1/propostas/parcela/21595',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: {
                    propostaItemId: 1,
                    executado: "1",
                    id: 1
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(200);
                expect(response.body).to.have.property('codigo');
                expect(response.body).to.have.property('flagDeError');
                expect(response.body).to.have.property('mensagem');
            })
        })

        it('Validar retorno 401 - /api/v1/propostas/parcela/{id}', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'PUT',
                url: '/api/v1/propostas/parcela/21595',
                headers: {
                    //'Authorization': `Bearer ${token}`, Token inválido
                    'Content-Type': 'application/json'
                },
                body: {
                    propostaItemId: 1,
                    executado: "1",
                    id: 1
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(401);
            })
        })
    })

    // Precisa de dados reais do Amei
    describe('Módulo - Propostas - Atualiza o status da proposta', () => {

        it('Validar retorno 200 - /api/v1/propostas/status/{id}', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'PUT',
                url: '/api/v1/propostas/status/21595',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: {
                    status: 1
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(200);
                expect(response.body).to.have.property('codigo');
                expect(response.body).to.have.property('flagDeError');
                expect(response.body).to.have.property('mensagem');
            })
        })

        it('Validar retorno 400 - /api/v1/propostas/status/{id}', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'PUT',
                url: '/api/v1/propostas/status/21595',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: { // Sem parâmetro no body
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(400);

            })
        })

        it('Validar retorno 401 - /api/v1/propostas/status/{id}', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'PUT',
                url: '/api/v1/propostas/status/21595',
                headers: {
                    //'Authorization': `Bearer ${token}`, Token inválido
                    'Content-Type': 'application/json'
                },
                body: {
                    status: 1
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(401);
            })
        })
    })

    // Precisa de dados reais do Amei
    describe('Módulo - Propostas - Cancela uma proposta', () => {

        it('Validar retorno 200 - api/v1/propostas/cancel/{id}', () => {
            const token = Cypress.env('access_token');
            // Variável que vai reutilizar a proposta recém criada
            const propostaId = Cypress.env('propostaId');


            cy.request({
                method: 'DELETE',
                url: `/api/v1/propostas/cancel/${propostaId}`,
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(200);

                expect(response.body).to.have.property('newCancelStatus');
                expect(response.body).to.have.property('message')
            })
        })

        it('Validar retorno 400 - api/v1/propostas/cancel/{id}', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'DELETE',
                url: 'api/v1/propostas/cancel/{id}}',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(400);
            })
        })

        it('Validar retorno 401 - api/v1/propostas/cancel/{id}', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'DELETE',
                url: '/api/v1/propostas/cancel/{id}',
                headers: {
                    //'Authorization': `Bearer ${token}`, Token inválido
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(401);
            })
        })
    })

    describe('Módulo - Propostas - Retorna lista de eventos de uma proposta', () => {

        it('Validar retorno 200 - /api/v1/propostas/executantes/list', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/propostas/executantes/list',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(200);

                const items = response.body;
                items.forEach((item) => {
                    expect(item).to.have.property('id');
                    expect(item).to.have.property('razaoSocial');
                    expect(item).to.have.property('nomeFantasia');
                })
            })
        })

        it('Validar retorno 401 - /api/v1/propostas/executantes/list', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/propostas/executantes/list',
                headers: {
                    // 'Authorization': `Bearer ${token}`, Token inválido
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(401);
            })
        })
    })

    // Precisa de dados reais do Amei
    describe('Módulo - Propostas - Receber parcela de uma proposta', () => {

        it('Validar retorno 201 - /api/v1/propostas/parcela/recebimento', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/propostas/parcela/recebimento',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: {
                    propostaId: 22528,
                    dataRecebimento: "20250903",
                    valorRecebido: 22.25,
                    contaCorrenteId: 154,
                    formaLiquidacaoId: 8,
                    parcelas: 3,
                    transacaoId: "1"
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(201);

                /*const body = response.body;
                expect(body).to.include.all.keys(
                    'id',
                    'cdtMatricula',
                    'dataProposta',
                    'dataValidade',
                    'fkUnidade',
                    'valorTotal',
                    'quantidadeParcela',
                    'tipoIntervalo',
                    'quantidadeIntervalo',
                    'flagAtivo',
                    'ipClient',
                    'createdAt',
                    'updatedAt',
                    'lastUser',
                    'origem',
                    'parceiroId',
                    'origemId',
                    'valorTotalClinica',
                    'fkStatusProposta',
                    'fkEspecialidade',
                    'fkProfissional',
                    'fkProfissionalExterno',
                    'patientId',
                    'paymentIdFiserv'
                )*/
            })
        })

        it('Validar retorno 400 - /api/v1/propostas/parcela/recebimento', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/propostas/parcela/recebimento',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: { // Sem parâmetro
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(400);
            })
        })

        it('Validar retorno 401 - /api/v1/propostas/parcela/recebimento', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/propostas/parcela/recebimento',
                headers: {
                    //'Authorization': `Bearer ${token}`, token inválido
                    'Content-Type': 'application/json'
                },
                body: {
                    propostaId: 22528,
                    dataRecebimento: "20250903",
                    valorRecebido: 22.25,
                    contaCorrenteId: 154,
                    formaLiquidacaoId: 8,
                    parcelas: 3,
                    transacaoId: "1"
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(401);
            })
        })
    })

    // Precisa de dados reais do Amei
    describe('Módulo - Propostas - Pagamento de uma proposta por cartão', () => {

        it('Validar retorno 201 - /api/v1/propostas/parcela/recebimento/cartao', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/propostas/parcela/recebimento/cartao',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: {
                    unidadeId: 483,
                    propostaId: 21370,
                    parcelaId: 1,
                    valor: 100,
                    dataPagamento: "20250829",
                    quantidadeParcelas: 2,
                    flagUseFiserv: true
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(201);
            })
        })

        it('Validar retorno 400 - /api/v1/propostas/parcela/recebimento/cartao', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/propostas/parcela/recebimento/cartao',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: { // Sem parâmetro
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(400);
            })
        })

        it('Validar retorno 401 - /api/v1/propostas/parcela/recebimento/cartao', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/propostas/parcela/recebimento/cartao',
                headers: {
                    //'Authorization': `Bearer ${token}`, token inválido
                    'Content-Type': 'application/json'
                },
                body: {
                    unidadeId: 483,
                    propostaId: 21370,
                    parcelaId: 1,
                    valor: 100,
                    dataPagamento: "20250829",
                    quantidadeParcelas: 2,
                    flagUseFiserv: true
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(401);
            })
        })
    })

    // Precisa de dados reais do Amei
    describe('Módulo - Propostas - Atualiza o evento do recebimento em cartão pela adquirente FiServ', () => {

        it('Validar retorno 201 - /api/v1/propostas/parcela/recebimento/resposta-cartao-fiserv', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/propostas/parcela/recebimento/resposta-cartao-fiserv',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: {
                    "evento": "transaction.succeeded",
                    "hashZoop": 1,
                    "transacaoId": "efda277e38ae4ffa96605ddf44220d99",
                    "taxaCartao": "1.12",
                    "contaCorrenteId": 123,
                    "formaLiquidacao": 8,
                    "parcelaId": 8,
                    "propostaId": 1,
                    "nomeTitular": "João Marques",
                    "codBandeira": "20003",
                    "autorizacao": "1231241"
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(200);
            })

        })

        it('Validar retorno 400 - /api/v1/propostas/parcela/recebimento/resposta-cartao-fiserv', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/propostas/parcela/recebimento/resposta-cartao-fiserv',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: {
                    // sem parÂmetro no body
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(400);
            })

        })

        it('Validar retorno 401 - /api/v1/propostas/parcela/recebimento/resposta-cartao-fiserv', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/propostas/parcela/recebimento/resposta-cartao-fiserv',
                headers: {
                    //'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: {
                    "evento": "transaction.succeeded",
                    "hashZoop": 1,
                    "transacaoId": "efda277e38ae4ffa96605ddf44220d99",
                    "taxaCartao": "1.12",
                    "contaCorrenteId": 123,
                    "formaLiquidacao": 8,
                    "parcelaId": 8,
                    "propostaId": 1,
                    "nomeTitular": "João Marques",
                    "codBandeira": "20003",
                    "autorizacao": "1231241"
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(401);
            })

        })
    })

    // Precisa de dados reais do Amei
    describe('Módulo - Prospostas - Cancela o recebimento de uma proposta', () => {

        it('Validar retorno 200 - /api/v1/propostas/parcela/recebimento/{parcelaRecebimentoId}', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'DELETE',
                url: '/api/v1/propostas/parcela/recebimento/{parcelaRecebimentoId}',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(200);
            })
        })

        it('Validar retorno 401 - /api/v1/propostas/parcela/recebimento/{parcelaRecebimentoId}', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'DELETE',
                url: '/api/v1/propostas/parcela/recebimento/{parcelaRecebimentoId}',
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

    // Precisa de dados reais do Amei
    describe('Módulo - Prospostas - Gerar recibo pelo Id da parcela', () => {

        it('Validar retorno 200 - /api/v1/propostas/{propostaId}/recibo', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/propostas/{propostaId}/recibo',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(200);
            })
        })

        it('Validar retorno 400 - /api/v1/propostas/{propostaId}/recibo', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/propostas/{propostaId}/recibo',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(400);
            })
        })

        it('Validar retorno 401 - /api/v1/propostas/{propostaId}/recibo', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/propostas/{propostaId}/recibo',
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

    // Precisa de dados reais do Amei
    describe('Módulo - Prospostas - Retorna lista de eventos de uma proposta', () => {

        it('Validar retorno 200 - /api/v1/propostas/{id}/historico', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/propostas/{id}/historico',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(200);
            })

        })

        it('Validar retorno 400 - /api/v1/propostas/{id}/historico', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/propostas/{id}/historico',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(400);
            })

        })

        it('Validar retorno 401 - /api/v1/propostas/{id}/historico', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/propostas/{id}/historico',
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

    // Precisa de dados reais do Amei
    describe('Módulo - Prospostas - Proposal Schedule', () => {

        it('Validar retorno 200 - /api/v1/propostas/schedule/link-proposal-schedule-id', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'PUT',
                url: '/api/v1/propostas/schedule/link-proposal-schedule-id?proposalId=21328',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: {
                    scheduleId: 21328
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(200)
                expect(response.body).to.have.property('message');
            })
        })

        it('Validar retorno 400 - /api/v1/propostas/schedule/link-proposal-schedule-id', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'PUT',
                url: '/api/v1/propostas/schedule/link-proposal-schedule-id?proposalId=21328',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: {

                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(400)
            })
        })

        it('Validar retorno 401 - /api/v1/propostas/schedule/link-proposal-schedule-id', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'PUT',
                url: '/api/v1/propostas/schedule/link-proposal-schedule-id?proposalId=21328',
                headers: {
                    //'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: {
                    scheduleId: 21328
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(401)
            })
        })
    })

    // Precisa de dados reais do Amei
    describe('Módulo - Prospostas - Retorna lista de propostas paga por procedimentos', () => {

        it('Validar retorno 200 - /api/v1/propostas/paid/procedures', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/propostas/paid/procedures',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(200);
            })

        })

        it('Validar retorno 400 - /api/v1/propostas/paid/procedures', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/propostas/paid/procedures',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(400);
            })

        })

        it('Validar retorno 401 - /api/v1/propostas/paid/procedures', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/propostas/paid/procedures',
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

    // Precisa de dados reais do Amei
    describe('Módulo - Prospostas - Receber parcela de uma proposta faturada', () => {

        it('Validar retorno 200 - /api/v1/propostas/parcela/recebimento/faturado', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/propostas/parcela/recebimento/faturado',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: {
                    "proposalId": 1,
                    "receiptData": "20241125",
                    "valueReceived": 10,
                    "settlementFormId": 1,
                    "installment": 2
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(200);
            })
        })

        it('Validar retorno 400 - /api/v1/propostas/parcela/recebimento/faturado', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/propostas/parcela/recebimento/faturado',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(400);
            })
        })

        it('Validar retorno 401 - /api/v1/propostas/parcela/recebimento/faturado', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/propostas/parcela/recebimento/faturado',
                headers: {
                    //'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: {
                    "proposalId": 1,
                    "receiptData": "20241125",
                    "valueReceived": 10,
                    "settlementFormId": 1,
                    "installment": 2
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(401);
            })
        })
    })
})



