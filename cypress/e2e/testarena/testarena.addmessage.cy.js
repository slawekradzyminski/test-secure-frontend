/// <reference types="cypress" />

import { generateRandomString } from "../../utils/random"

describe('TestArena add messages page tests', () => {
    beforeEach(() => {
        cy.loginToTestArena(Cypress.env('testarena_email'), Cypress.env('testarena_password'))
        cy.visit('http://demo.testarena.pl/moje_wiadomosci')
    })

    it('should post new message', () => {
        const message = generateRandomString(15)

        cy.get('#j_msgContent').type(message)
        cy.get('#j_msgResponse-193').click()

        cy.get('.message_content_text').last().should('contain.text', message)
    })

})
