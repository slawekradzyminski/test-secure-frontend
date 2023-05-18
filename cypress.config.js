const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    videoCompression: 1,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
