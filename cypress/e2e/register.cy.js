/// <reference types="cypress" />

describe('Register page tests', () => {
    beforeEach(() => {
        cy.visit('http://localhost:8081/register')
    })

    it('should click cancel and open login page', () => {
        cy.get('.btn-link')
            .should('have.text', 'Cancel')
            .click()

        cy.get('h2').should('have.text', 'Login')
        cy.url().should('contain', '/login')
    })

})
