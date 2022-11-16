/// <reference types="cypress" />

import { email, password } from "../util/credentials"

describe('Project page tests', () => {
    beforeEach(() => {
        cy.visit('http://demo.testarena.pl/zaloguj')
        cy.get('#email').type(email)
        cy.get('#password').type(password)
        cy.get('#login').click()
        cy.get('.user-info').click()
    })

    it('should display correct email', () => {
        cy.get('.content_label').first().should('have.text', email)
    })

})
