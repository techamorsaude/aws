// Comando de login - gera o token inicial
Cypress.Commands.add('login', () => {
  return cy.request({
    method: 'POST',
    url: '/api/v1/security/login',
    body: {
      email: 'ivan.santos+1@amorsaude.com',
      password: 'Iv@n198529'
    }
  }).then((response) => {
    // load date/time schedule helpers and commands
    try {
      require('./dataEHora')
      try { require('./agendamentos') } catch (e) {}
    } catch (e) {
      // ignore if file missing during partial edits
    }

    // Salva o token inicial globalmente
    Cypress.env('access_token', response.body.access_token)
    return response
  })
})

// Comando de login - gera o token inicial
Cypress.Commands.add('loginPedro', () => {
  return cy.request({
    method: 'POST',
    url: '/api/v1/security/login',
    body: {
      email: 'pedro.castelani+8@amorsaude.com',
      password: 'Amor@100'
    }
  }).then((response) => {
    // load date/time schedule helpers and commands
    try {
      require('./dataEHora')
      try { require('./agendamentos') } catch (e) {}
    } catch (e) {
      // ignore if file missing during partial edits
    }

    // Salva o token inicial globalmente
    Cypress.env('access_token', response.body.access_token)
    return response
  })
})

// Comando de refresh token - atualiza o token
Cypress.Commands.add('refreshToken', () => {
  const token = Cypress.env('access_token')

  return cy.request({
    method: 'POST',
    url: '/api/v1/security/refresh-token?clinicId=483',
    headers: {
      'Authorization': `Bearer ${token}`
    },
    body: {
      automated_test: 'automated_test'
    }
  }).then((response) => {
    // Atualiza o token com o novo token do refresh
    Cypress.env('access_token', response.body.access_token)
    return response
  })
})

// Gerador de CNPJ válido
Cypress.Commands.add('GeradorCnpj', () => {
  function gerarCnpj() {
    const rand = () => Math.floor(Math.random() * 10);
    const n = [rand(), rand(), rand(), rand(), rand(), rand(), rand(), rand(), 0, 0, 0, 1];

    const calcDv = (base, multiplicadores) => {
      const soma = base.reduce((acc, val, i) => acc + val * multiplicadores[i], 0);
      const resto = soma % 11;
      return resto < 2 ? 0 : 11 - resto;
    };

    const dv1 = calcDv(n, [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]);
    const dv2 = calcDv([...n, dv1], [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]);

    return n.join('') + dv1 + dv2;
  }

  return cy.wrap(gerarCnpj());
});

// Comando de login - gera o token inicial - Exlcusivo para o módulo Versão API
Cypress.Commands.add('loginAsPaulo', () => {
  return cy.request({
    method: 'POST',
    url: '/api/v1/security/login',
    body: {
      email: 'paulo.rick+1@amorsaude.com',
      password: 'Amor@100'
    }
  }).then((response) => {
    // Salva o token do Paulo separadamente
    Cypress.env('access_token_paulo', response.body.access_token)
    return response
  })
})

// Comando de refresh token - atualiza o token - Exlcusivo para o módulo Versão API
Cypress.Commands.add('refreshTokenAsPaulo', () => {
  const token = Cypress.env('access_token_paulo')

  return cy.request({
    method: 'POST',
    url: '/api/v1/security/refresh-token?clinicId=483',
    headers: {
      'Authorization': `Bearer ${token}`
    },
    body: {
      automated_test: 'automated_test'
    }
  }).then((response) => {
    // Atualiza o token do Paulo
    Cypress.env('access_token_paulo', response.body.access_token)
    return response
  })
})

Cypress.Commands.add('gerarCpfValido', () => {

  // Função simples para gerar CPF válido
  const numeros = Array.from({ length: 9 }, () => Math.floor(Math.random() * 10));

  // Calcula primeiro dígito
  let soma = 0;
  for (let i = 0; i < 9; i++) {
    soma += numeros[i] * (10 - i);
  }
  let resto = (soma * 10) % 11;
  const digito1 = resto === 10 ? 0 : resto;

  // Calcula segundo dígito
  soma = 0;
  for (let i = 0; i < 9; i++) {
    soma += numeros[i] * (11 - i);
  }
  soma += digito1 * 2;
  resto = (soma * 10) % 11;
  const digito2 = resto === 10 ? 0 : resto;

  // Monta o CPF completo
  const cpf = numeros.join('') + digito1 + digito2;
  return cy.wrap(cpf);
}
)
