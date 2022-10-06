import './commands'
import '@cypress/code-coverage/support'

beforeEach(() => {
    cy.log('Globalny beforeEach z pliku cypress/support/e2e.ts')
})
