const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    env: {
      username: 'admin',
      password: 'admin'
    },
    baseUrl: 'http://localhost:8081',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
