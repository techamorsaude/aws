const { defineConfig } = require('cypress');

const ENV = process.env.CYPRESS_ENV || 'homolog';

const baseUrls = {
//homolog: 'http://localhost:3011/',
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
    supportFile: 'cypress/support/e2e.js',
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
  },
  env: {
    allure: false,
    allureResultsPath: 'allure-results',
    allureReportLanguage: 'pt-BR',
  },
});