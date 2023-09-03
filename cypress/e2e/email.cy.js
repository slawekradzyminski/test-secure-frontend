/// <reference types="cypress" />

import { generateRandomString } from "../utils/random"

describe('Home page tests', () => {
    beforeEach(() => {
        cy.login('admin', 'admin')
        cy.visit('http://localhost:8081')
        cy.get('li').contains('Gosia Radzyminska').find('.email').click()
    })

    it('should successfully send an email', () => {
        cy.get('[name=subject]').type(generateRandomString())
        cy.get('[name=message]').type(generateRandomString())
        cy.get('.btn-primary').click()
        cy.get('.alert-success').should('have.text', 'Email was scheduled to be send')
    })

})
