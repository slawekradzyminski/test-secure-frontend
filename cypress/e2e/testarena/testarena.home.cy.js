/// <reference types="cypress" />
describe('Home page', () => {
    beforeEach(() => {
        cy.visit('http://demo.testarena.pl/zaloguj')
        const email = 'administrator@testarena.pl'
        cy.get('#email').type(email)
        cy.get('#password').type('sumXQQ72$L')
        cy.get('#login').click()
    })

    it('should open my messages', () => {
        cy.get('.icon_mail').click()

        cy.url().should('contain', 'moje_wiadomosci')
        cy.get('#j_msgSingleThreadSubject').should('be.visible')
    })

})
