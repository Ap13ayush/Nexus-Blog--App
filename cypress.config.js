const { defineConfig } = require('cypress');
const createEsbuildPlugin = require('@bahmutov/cypress-esbuild-preprocessor');
const cucumber = require('@badeball/cypress-cucumber-preprocessor');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://react-redux.realworld.io',
    specPattern: ['cypress/e2e/**/*.cy.js', 'cypress/e2e/**/*.feature'],
    supportFile: 'cypress/support/e2e.js',
    defaultCommandTimeout: 10000,
    env: {
      apiBaseUrl: 'https://api.realworld.io/api'
    },
    setupNodeEvents(on, config) {
      // mochawesome reporter
      require('cypress-mochawesome-reporter/plugin')(on);
      // cucumber preprocessor
      cucumber.addCucumberPreprocessorPlugin(on, config);
      on('file:preprocessor', createEsbuildPlugin());
      return config;
    }
  },
  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    reportDir: 'cypress/reports',
    charts: true,
    overwrite: false,
    html: true,
    json: true,
    reportFilename: 'report'
  },
  videosFolder: 'cypress/videos',
  screenshotsFolder: 'cypress/screenshots'
});
