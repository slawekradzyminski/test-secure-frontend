/// <reference types="cypress" />

describe('Home page tests', () => {
    beforeEach(() => {
        cy.visit('http://demo.testarena.pl/zaloguj');
        cy.get('#email').clear().type('administrator@testarena.pl');
        cy.get('#password').clear().type('sumXQQ72$L');
        cy.get('#login').click();
    });
 
    it('should open messages page', () => {
        // when
        cy.get('.top_messages').click()

        // then
        cy.url().should('contain', 'moje_wiadomosci')
    });
});
