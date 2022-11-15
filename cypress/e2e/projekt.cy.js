/// <reference types="cypress" />

import { email, password } from "../util/credentials"

describe('Project page tests', () => {
    beforeEach(() => {
        cy.visit('http://demo.testarena.pl/zaloguj')
        cy.get('#email').type(email)
        cy.get('#password').type(password)
        cy.get('#login').click()
        cy.get('.header_admin').click()
    })

    it('should find Kopernik project', () => {
        cy.get('#search').type('Kopernik')
        cy.get('#j_searchButton').click()
        cy.get('tbody tr td:nth-of-type(1)').should('have.text', 'KOPERNIK')
    })

})
