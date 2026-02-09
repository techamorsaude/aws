const { defineConfig } = require('cypress');

const ENV = process.env.CYPRESS_ENV || 'homolog';

const baseUrls = {
  homolog: 'https://stg-amei.amorsaude.tech',
};

module.exports = defineConfig({
  userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36',
  
  e2e: {
    baseUrl: baseUrls[ENV],
    failOnStatusCode: false,
    video: false,
    setupNodeEvents(on, config) {
      //Allure
      require('@mmisty/cypress-allure-adapter/plugins')
        .configureAllureAdapterPlugins(on, config);

      //User-Agent para não bloquear no WAF
      config.userAgent =
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) ' +
        'AppleWebKit/537.36 (KHTML, like Gecko) ' +
        'Chrome/144.0.0.0 Safari/537.36';

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