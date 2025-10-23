const { defineConfig } = require('cypress');
const createBundler = require('@bahmutov/cypress-esbuild-preprocessor');
const { addCucumberPreprocessorPlugin } = require('@badeball/cypress-cucumber-preprocessor');
const { createEsbuildPlugin } = require('@badeball/cypress-cucumber-preprocessor/esbuild');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://react-redux.realworld.io',
    specPattern: ['cypress/e2e/**/*.cy.js', 'cypress/e2e/**/*.feature'],
    supportFile: 'cypress/support/e2e.js',
    defaultCommandTimeout: 10000,
    env: {
      apiBaseUrl: 'https://api.realworld.io/api'
    },
    async setupNodeEvents(on, config) {
      // mochawesome reporter
      require('cypress-mochawesome-reporter/plugin')(on);
      // cucumber preprocessor
      await addCucumberPreprocessorPlugin(on, config);
      on('file:preprocessor', createBundler({
        plugins: [createEsbuildPlugin(config)],
      }));
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
