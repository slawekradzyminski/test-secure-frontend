import './commands'
import './apiCommands'

beforeEach(() => {
    cy.log('This is global beforeEach configured in e2e.ts file')

    if (Cypress.env('isMobile')) {
        cy.viewport(380, 720)
    }
})