/// <reference types="cypress" />

import { getRandomString } from "../../util/random";

describe('Test Arena messages page tests', () => {
    beforeEach(() => {
        cy.visit('http://demo.testarena.pl/zaloguj');
        cy.get('#email').clear().type('administrator@testarena.pl');
        cy.get('#password').clear().type('sumXQQ72$L');
        cy.get('#login').click();
        cy.visit('http://demo.testarena.pl/moje_wiadomosci')
    });
 
    it('should open messages page', () => {
        // given
        const message = getRandomString()

        // when
        cy.get('#j_msgContent').type(message)
        cy.get('#j_msgResponse-193').click()

        // then
        cy.get('.message_content_text').contains(message).should('exist')
    });
});
