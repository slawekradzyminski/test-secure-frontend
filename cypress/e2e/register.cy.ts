/// <reference types="cypress" />

import { getRandomUser } from "../domain/user"
import { getRandomEmail, getRandomString } from "../util/random"

describe('Register page tests', () => {

    beforeEach(() => {
        cy.visit('/register')
        cy.viewport(428, 928)
    })

    it('should successfully register', () => {
        cy.get('[name=username]').type(getRandomString())
        cy.get('[name=firstName]').type(getRandomString())
        cy.get('[name=lastName]').type(getRandomString())
        cy.get('[name=email]').type(getRandomEmail())
        cy.get('[name=password]').type(getRandomString())
        cy.get('.btn-primary').click();

        cy.get('.alert-success').should('have.text', 'Registration successful')
        cy.url().should('contain', '/login')
    })

    it('should fail to register if user exists', () => {
        const user = getRandomUser()
        cy.register(user)

        cy.get('[name=firstName]').type(getRandomString());
        cy.get('[name=lastName]').type(getRandomString());
        cy.get('[name=username]').type(user.username);
        cy.get('[name=password]').type(getRandomString());
        cy.get('[name=email]').type(getRandomEmail());
  
        cy.get('.btn-primary').click()
  
        cy.get('.alert-danger').should('have.text', 'Username is already in use') 
    })

    it('should go back to login page', () => {
        cy.get('.btn-link').click()

        cy.get('h2').should('have.text', 'Login')
        cy.url().should('contain', '/login')
    })

    it('should trigger frontend validation', () => {
        cy.get('.btn-primary').click()

        cy.get('.invalid-feedback').each(($el) => {
            cy.wrap($el).should('have.text', 'Required field length is 4 or more')
        })
        cy.get('form input').each(($el) => {
            cy.wrap($el).should('have.class', 'is-invalid')
        })
    })

})
