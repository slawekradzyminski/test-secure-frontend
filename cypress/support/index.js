Cypress.on('uncaught:exception', (err, runnable) => {
    return false
})

import './commands.ts'
import '@cypress/code-coverage/support'
import '@shelex/cypress-allure-plugin'
require('cypress-grep')()
import '@percy/cypress'
