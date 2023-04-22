/// <reference types="cypress" />

describe('Login tests', () => {
    beforeEach(() => {
        cy.visit('http://demo.testarena.pl/zaloguj')
    })

    it('should successfully login', () => {
        cy.get('#email').type('administrator@testarena.pl')
        cy.get('#password').type('sumXQQ72$L')
        cy.get('#login').click()

        cy.get('.user-info > small').should('have.text', 'administrator@testarena.pl')
    })

})
