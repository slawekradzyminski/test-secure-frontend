/// <reference types="cypress" />

import { getRandomEmail, getRandomString } from "../util/random"

describe('Register page tests', () => {
    beforeEach(() => {
        cy.visit('http://localhost:8081/register')
    })

    it('should successfully register', () => {
        cy.get('[name=firstName]').type(getRandomString())
        cy.get('[name=lastName]').type(getRandomString())
        cy.get('[name=username]').type(getRandomString())
        cy.get('[name=password]').type(getRandomString())
        cy.get('[name=email]').type(getRandomEmail())
        cy.get('.btn-primary').click()

        cy.get('.alert-success').should('contain.text', 'Registration successful')
    })

    it.only('should trigger frontend validation', () => {
        cy.get('.btn-primary').click()

        cy.get('.invalid-feedback').should('have.length', 5)
        cy.get('.invalid-feedback').each(el => {
            expect(el.text()).to.eq('Required field length is 4 or more')
            // cy.wrap(el).should('have.text', 'Required field length is 4 or more')
        })
        cy.get('input.is-invalid').should('have.length', 5)
      })
})
