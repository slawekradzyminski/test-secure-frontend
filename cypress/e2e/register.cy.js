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

        cy.get('.alert').should('have.text', 'Registration successful')
            .and('have.class', 'alert-success')
            .and('not.have.class', 'alert-danger')

        cy.get('h2').should('contain.text', 'Login')
        cy.url().should('contain', '/login')
    })

})
