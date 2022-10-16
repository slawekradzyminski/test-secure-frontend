const { defineConfig } = require("cypress");

module.exports = defineConfig({
  env: {
    backendUrl: 'http://localhost:4001',
    adminUserUsername: 'admin',
    adminUserPassword: 'password'
  },
  e2e: {
    baseUrl: 'http://localhost:8081',
    videoUploadOnPasses: false,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
