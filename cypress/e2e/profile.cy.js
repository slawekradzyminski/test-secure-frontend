/// <reference types="cypress" />

import { email, password } from "../util/credentials"

describe('Project page tests', () => {
    beforeEach(() => {
        cy.login(email, password)
        cy.visit('http://demo.testarena.pl')
        cy.get('.user-info').click()
    })

    it('should display correct email', () => {
        cy.get('.content_label').first().should('have.text', email)
    })

})
