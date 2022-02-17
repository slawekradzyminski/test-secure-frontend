/// <reference types="@shelex/cypress-allure-plugin" />
/// <reference types="cypress" />
/**
 * @type {Cypress.PluginConfig}
 */
// eslint-disable-next-line no-unused-vars
module.exports = (on, config) => {
  require('@cypress/code-coverage/task')(on, config)
  require('@shelex/cypress-allure-plugin/writer')(on, config);
  require('cypress-grep/src/plugin')(config)
  require('cypress-testrail-simple/src/plugin')(on, config)
  return config
}
