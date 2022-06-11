/// <reference types="cypress" />

import { getRandomString, getRandomEmail } from "../util/random"

describe('register page', () => {
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
    })
 
    it('should not successfully register', () => {
        const existingUsername = getRandomString()
        cy.register(existingUsername, getRandomString(), getRandomString(), getRandomString(), getRandomEmail())

        cy.get('[name=firstName]').type(getRandomString())
        cy.get('[name=lastName]').type(getRandomString())
        cy.get('[name=username]').type(existingUsername)
        cy.get('[name=password]').type(getRandomString())
        cy.get('[name=email]').type(getRandomEmail())
        cy.get('.btn-primary').click()
        cy.get('.alert').should('contain.text', 'Username is already in use')
    })
 
    it('should cancel', () => {
        cy.get('.btn-link').click()
        cy.url().should('contain', '/login')
        cy.get('h2').should('contain.text', 'Login')
    })
 
    it('should validate username', () => {
        cy.get('[name=firstName]').type(getRandomString())
        cy.get('[name=lastName]').type(getRandomString())        
        cy.get('[name=password]').type(getRandomString())
        cy.get('[name=email]').type(getRandomEmail())
        cy.get('.btn-primary').click()
        cy.get('.invalid-feedback').should('contain.text', 'Required field length is 4 or more')
        cy.get('[name=username]').should('have.class', 'is-invalid')
    })
})
  