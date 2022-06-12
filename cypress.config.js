const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    video: false,
    baseUrl: 'http://localhost:8081',
    setupNodeEvents(on, config) {
      require('@cypress/code-coverage/task')(on, config)
      return config
    },
  },
});
