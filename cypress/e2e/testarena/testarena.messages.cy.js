/// <reference types="cypress" />

import { generateRandomString } from "../../utils/random";

describe("Test Arena my messages tests", () => {
    beforeEach(() => {
        cy.visit('http://demo.testarena.pl/zaloguj');
        cy.loginToTestArena('administrator@testarena.pl', 'sumXQQ72$L')
    });

    it('should successfully add new message', () => {
        const randomMessage = generateRandomString(20)
        cy.get('.icon_mail').click()
        cy.get('#j_msgContent', { timeout: 10000 }).type(randomMessage)
        cy.get('#j_msgResponse-193').click()
        cy.get('.message_content_text').last().should('contain.text', randomMessage)
    })
});