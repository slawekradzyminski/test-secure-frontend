const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: "bpg9pb",
  e2e: {
    env: {
      isMobile: false,
    },
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
