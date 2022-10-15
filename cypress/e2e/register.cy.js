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

        cy.get('.alert').should('contain.text', 'Registration successful')
        cy.url().should('contain', '/login')
    })

    it('should fail to register if username already exists', () => {
        cy.get('[name=firstName]').type(getRandomString())
        cy.get('[name=lastName]').type(getRandomString())
        cy.get('[name=username]').type('admin')
        cy.get('[name=password]').type(getRandomString())
        cy.get('[name=email]').type(getRandomEmail())
        cy.get('.btn-primary').click()

        cy.get('.alert').should('contain.text', 'Username is already in use')
        cy.url().should('contain', '/register')
    })

})
