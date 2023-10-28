import './commands'

beforeEach(() => {
    if (Cypress.env('isMobile')) {
        cy.viewport(430, 932)
    }
})