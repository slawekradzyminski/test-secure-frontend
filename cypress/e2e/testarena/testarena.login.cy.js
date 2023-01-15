/// <reference types="cypress" />

describe('Login page tests', () => {
    beforeEach(() => {
        cy.visit('http://demo.testarena.pl/zaloguj');
    });
 
    it('should successfully login', () => {
        const username = 'administrator@testarena.pl';
        const password = 'sumXQQ72$L';
 
        cy.get('#email').clear().type(username);
        cy.get('#password').clear().type(password);
        cy.get('#login').click();
 
        cy.url().should('equal', 'http://demo.testarena.pl/');
    });
});
