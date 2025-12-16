const { defineConfig } = require('cypress');

const ENV = process.env.CYPRESS_ENV || 'homolog';

const baseUrls = {
  homolog: 'https://dev-amei.amorsaude.tech'  // ambiente esta sendo apontando para AWS
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
});