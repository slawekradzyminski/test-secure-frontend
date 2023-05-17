/// <reference types="cypress" />

import { generateRandomEmail, generateRandomString } from "../utils/random"

describe('Register page', () => {
    beforeEach(() => {
      cy.visit('http://localhost:8081/register')
    })
  
    it('should Register', () => {
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
 
  
  })
  