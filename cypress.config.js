const { defineConfig } = require("cypress");

module.exports = defineConfig({
  env: {
    isMobile: false
  },
  e2e: {
    baseUrl: 'http://localhost:8081',
    video: false,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
