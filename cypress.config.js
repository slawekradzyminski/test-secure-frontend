const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    retries: 1,
    env: {
      url: 'http://testenv1.cantest.it'
    },
    video: false,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
