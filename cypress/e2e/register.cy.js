/// <reference types="cypress" />

describe('Register tests', () => {
    beforeEach(() => {
        cy.visit('http://localhost:8081/register')
    })

    it('should open login page', () => {
        cy.get('.btn-link').click()

        cy.get('h2').should('have.text', 'Login')
        cy.url().should('contain', '/login')
    })

})
