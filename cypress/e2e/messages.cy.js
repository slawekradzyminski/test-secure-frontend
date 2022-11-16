/// <reference types="cypress" />

import { email, password } from "../util/credentials"
import { getRandomString } from "../util/random"

describe('Project page tests', () => {
    beforeEach(() => {
        cy.visit('http://demo.testarena.pl/zaloguj')
        cy.get('#email').type(email)
        cy.get('#password').type(password)
        cy.get('#login').click()
        cy.get('.icon_mail').click()
    })

    it('should respond to messages', () => {
        const randomText = getRandomString()
        cy.get('#j_msgContent').type(randomText)
        cy.get('#j_msgResponse-78').click()
        cy.get('.message_content_text').should('contain.text', randomText)
    })

})
