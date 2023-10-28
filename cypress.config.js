const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    includeShadowDom: true,
    env: {
      isMobile: false,
      testarena_email: "administrator@testarena.pl",
      testarena_password: "sumXQQ72$L",
    },
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
