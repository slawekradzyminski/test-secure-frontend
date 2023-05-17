/// <reference types="cypress" />

import { generateRandomString } from "../../utils/random"

describe('Home page', () => {

    const email = 'administrator@testarena.pl'

    beforeEach(() => {
        cy.loginToTestArena(email, 'sumXQQ72$L')
        cy.get('.icon_mail').click()
    })

    it('should add new message', () => {
        const randomText = generateRandomString(10)

        cy.get('#j_msgContent').type(randomText)
        cy.get('#j_msgResponse-193').click()
        cy.get('.message_content_text').last().should('contain.text', randomText)
    })
 
})
