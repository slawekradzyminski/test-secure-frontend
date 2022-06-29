/// <reference types="cypress" />

import { getRandomEmail, getRandomString } from "../util/random"

describe('register page', () => {
    beforeEach(() => {
        cy.visit('http://localhost:8081/register')
    })

    it('should successfully register', () => {
        cy.get('[data-id=firstName]').type(getRandomString())
        cy.get('[data-id=lastName]').type(getRandomString())
        cy.get('[data-id=username]').type(getRandomString())
        cy.get('[data-id=password]').type(getRandomString())
        cy.get('[data-id=email]').type(getRandomEmail())
        cy.get('.btn-primary').click()

        cy.get('.alert').should('contain.text', 'Registration successful')
    })

})
