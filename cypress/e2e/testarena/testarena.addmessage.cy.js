/// <reference types="cypress" />

import { generateRandomString } from "../../utils/random"

describe('TestArena add messages page tests', () => {
    beforeEach(() => {
        cy.loginToTestArena(Cypress.env('testarena_email'), Cypress.env('testarena_password'))
        cy.visit('http://demo.testarena.pl/moje_wiadomosci')
    })

    it('should post new message', () => {
        const message = generateRandomString(15)

        // longer wait because we need to make sure gears disappeared
        cy.get('#j_msgContent', { timeout: 6000 }).type(message)
        cy.get('#j_msgResponse-193').click()

        cy.get('.message_content_text').last().should('contain.text', message)
    })

})
