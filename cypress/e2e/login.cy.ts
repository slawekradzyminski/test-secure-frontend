/// <reference types="cypress" />

import { getRandomUser } from "../utils/user"

describe('Login page tests', () => {
    beforeEach(() => {
      cy.visit('http://localhost:8081')
    })
  
    it('should successfully login', () => {
        // Rejestracja uzytkownika przez API
        const user = getRandomUser()
        cy.register(user)

        // Logowanie na tego uzytkownika
        cy.get("input[name='username']").type(user.username)
        cy.get("input[name='password']").type(user.password)
        cy.get('.btn-primary').click()

        cy.get('h1').should('contain.text', user.firstName)
    })
  
    it('should fail to login with wrong credentials', () => {
        cy.get("input[name='username']").type('wrong')
        cy.get("input[name='password']").type('wrong')
        cy.get('.btn-primary').click()

        cy.get('.alert-danger').should('contain.text', 'Invalid username/password supplied')
    })

    it('should open register page', () => {
        cy.get('.btn-link').click()

        cy.get('h2').should('have.text', 'Register')
        cy.url().should('contain', '/register')
    })

  })
  