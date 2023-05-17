/// <reference types="cypress" />
describe('Login page', () => {
    beforeEach(() => {
        cy.visit('http://demo.testarena.pl/zaloguj')
    })

    it('should successfully login', () => {
        const email = 'administrator@testarena.pl'
        cy.get('#email').type(email)
        cy.get('#password').type('sumXQQ72$L')
        cy.get('#login').click()

        cy.get('.user-info > small').should('have.text', email)
    })

})
