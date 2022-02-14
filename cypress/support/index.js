Cypress.on('uncaught:exception', (err, runnable) => {
    return false
})

import './commands.ts'
import '@cypress/code-coverage/support'
