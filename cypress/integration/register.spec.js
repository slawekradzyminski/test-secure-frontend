/// <reference types="cypress" />

import { getRandomEmail, getRandomString } from "../util/random"

describe('Register page', () => {
    beforeEach(() => {
      cy.visit('/register')
    })
  
    it('should successfully log in', () => {
        const firstName = getRandomString()
        cy.register(getRandomString(), getRandomString(), getRandomString(), getRandomString(), getRandomEmail())
        cy.get('.alert').should('contain.text', 'Registration successful')
    })

    it('should show login failed alert', () => {
        cy.register('admin', getRandomString(), getRandomEmail(), getRandomString(), getRandomEmail())
        cy.get('.alert').should('contain.text', 'Username is already in use')
    })
  
  })
  