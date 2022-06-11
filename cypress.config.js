const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    video: false,
    setupNodeEvents(on, config) {
      require('@cypress/code-coverage/task')(on, config)
      return config
    },
  },
});
