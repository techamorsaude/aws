const { defineConfig } = require('cypress');
const { configureAllureAdapterPlugins } = require('@mmisty/cypress-allure-adapter/plugins');

const ENV = process.env.CYPRESS_ENV || 'homolog';

// const baseUrlsAntiga = {
//   homolog: 'https://amei-homolog.amorsaude.com.br',
//   staging: 'https://amei-staging.amorsaude.com.br',
//   prod: 'https://amei.amorsaude.com.br'
// };

// const baseUrls = {
//   dev: 'https://dev-amei.amorsaude.tech/',
//   stg: 'https://stg-amei.amorsaude.tech',
//   prd: 'https://amei.amorsaude.com.br'
// };

const baseUrls = {
//homolog: 'http://localhost:3011',
homolog: 'https://dev-amei.amorsaude.tech'
};

module.exports = defineConfig({
  e2e: {
    baseUrl: baseUrls[ENV],
    failOnStatusCode: false,
    video: false,
    setupNodeEvents(on, config) {
      require('@mmisty/cypress-allure-adapter/plugins').configureAllureAdapterPlugins(on, config);
      return config;
    },
    supportFile: 'cypress/support/e2e.js', // ajuste se estiver em outro caminho ou use false se não tiver suporte
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}', // padrão de arquivos de teste
  },
  env: {
    allure: true,
    allureResultsPath: 'allure-results',
    allureReportLanguage: 'pt-BR',
  },
});




/*module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      configureAllureAdapterPlugins(on, config)
      return config
    },
    env: {
      allure: true,
      allureResultsPath: 'allure-results',
      allureReportLanguage: 'pt-BR'
    },
    baseUrl: process.env.CYPRESS_BASE_URL || 'https://amei-staging.amorsaude.com.br',
    failOnStatusCode: false,
    video: false,
  },
})*/