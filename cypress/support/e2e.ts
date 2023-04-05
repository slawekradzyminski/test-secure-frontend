import './commands'
import './apiCommands'
import '@shelex/cypress-allure-plugin';

beforeEach(() => {
    cy.log('This is global beforeEach configured in e2e.ts file')

    if (Cypress.env('isMobile')) {
        cy.viewport(380, 720)
    }
})