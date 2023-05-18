/// <reference types="cypress" />

import { generateRandomEmail, generateRandomString } from "../utils/random"

describe('Register page', () => {
    beforeEach(() => {
        cy.visit('http://localhost:8081/register')
    })

    it('should successful Register', () => {
        const username = generateRandomString(10)
        const email = generateRandomEmail(15, 'test.com')

        cy.get('[name=firstName]').type('Maria')
        cy.get('[name=lastName]').type(username)
        cy.get('[name=username]').type(username)
        cy.get('[name=password]').type(username)
        cy.get('[name=email]').type(email)

        cy.get('.btn.btn-primary').click()

        cy.get('.alert').should('contain.text', 'Registration successful')
    })

    it('should trigger frontend validation', () => {
        cy.get('.btn.btn-primary').click()

        cy.get('.invalid-feedback')
            .should('have.length', 5)
            .each(($el) => {
                cy.wrap($el).should('have.text', 'Required field length is 4 or more')
            })

        cy.get('input')
            .each(($el) => {
                cy.wrap($el).should('have.class', 'is-invalid')
            })
    })


})
