/// <reference types="cypress" />

import { getRandomEmail, getRandomString } from "../util/random"

describe('Register page', () => {
    beforeEach(() => {
        cy.visit('/register')
    })
  
    it('should successfully register & the login', () => {
        const username = getRandomString()
        const password = getRandomString()
        const firstName = getRandomString()

        cy.get('[name=username]').type(username)
        cy.get('[name=password]').type(password)
        cy.get('[name=firstName]').type(firstName)
        cy.get('[name=lastName]').type(getRandomString())
        cy.get('[name=email]').type(getRandomEmail())
        cy.get('.btn-primary').click()
        cy.get('.alert').should('contain.text', 'Registration successful')

        cy.get('[name=username]').type(username)
        cy.get('[name=password]').type(password)
        cy.get('.btn-primary').click()
        cy.get('h1').should('contain.text', `Hi ${firstName}`)
    })
  
 })
 