import './commands'

beforeEach(() => {
    if (Cypress.env('isMobile')) {
        cy.viewport('iphone-x')
    }
})