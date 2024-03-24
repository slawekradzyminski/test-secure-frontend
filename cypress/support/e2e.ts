import './commands'

beforeEach(() => {
    cy.log('This will run before each test')
    if (Cypress.env('isMobile')) {
        cy.viewport('iphone-8')
    }
})