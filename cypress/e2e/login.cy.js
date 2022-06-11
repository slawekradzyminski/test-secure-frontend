/// <reference types="cypress" />

import { getRandomEmail, getRandomString } from "../util/random"

describe('login page', () => {
    beforeEach(() => {
        cy.visit('http://localhost:8081')
    })

    it('should successfully login', () => {
        const username = getRandomString()
        const password = getRandomString()
        const firstName = getRandomString()

        cy.register(username, password, firstName, getRandomString(), getRandomEmail())

        cy.get('[name=username]').type(username)
        cy.get('[name=password]').type(password)
        cy.get('.btn-primary').click()

        cy.get('h1').should('contain.text', firstName)
    })

    it('should open register page', () => {
        cy.get('.btn-link').click()
        cy.get('h2').should('contain.text', 'Register')
    })

    it('should fail to login', () => {
        cy.get('[name=username]').type('wrong')
        cy.get('[name=password]').type('wrong')
        cy.get('.btn-primary').click()

        cy.get('.alert').should('contain.text', 'Invalid username/password')
    })

    it('should trigger frontend validation', () => {
        cy.get('.btn-primary').click()

        cy.get('.invalid-feedback').eq(0).should('contain.text', 'Required field length')
        cy.get('.invalid-feedback').eq(1).should('contain.text', 'Required field length')
    })

})
