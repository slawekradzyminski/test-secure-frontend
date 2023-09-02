/// <reference types="cypress" />

describe("Test Arena my messages tests", () => {
    beforeEach(() => {
        cy.visit('http://demo.testarena.pl/zaloguj');
        cy.loginToTestArena('administrator@testarena.pl', 'sumXQQ72$L')
    });

    it('should successfully add new message', () => {

    })
});