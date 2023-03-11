/// <reference types="cypress" />

describe('Testarena login tests', () => {
    beforeEach(() => {
        cy.visit('http://demo.testarena.pl/zaloguj')
    })

    it('should successfully login', () => {
        // given
        const username = Cypress.env('testarenalogin')
        const password = Cypress.env('testarenapassword')

        // when
        cy.get('#email').type(username)
        cy.get('#password').type(password)
        cy.get('#login').click()

        // then
        cy.get('.user-info').contains(username)
    })

})
