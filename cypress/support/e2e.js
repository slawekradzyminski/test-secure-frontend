import './commands'
import '@percy/cypress';

// Alternatively you can use CommonJS syntax:
// require('./commands')

beforeEach(() => {
    cy.log('This will run before each test in the project')
    if (Cypress.env('isMobile')) {
        cy.viewport('iphone-8')
    }
})