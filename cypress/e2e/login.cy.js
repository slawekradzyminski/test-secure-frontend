/// <reference types="cypress" />

import LoginPage from "../pages/LoginPage"
import { getRandomUser } from "./domain/user"

describe('Login page tests', () => {
    beforeEach(() => {
      cy.visit('http://localhost:8081')
    })
  
    it('should successfully login', () => {
        // given
        const user = getRandomUser()
        cy.register(user)

        // when
        LoginPage.attemptLogin(user.username, user.password)

        // then
        cy.get('h1').should('contain.text', user.firstName)
    })

    it('should fail to login', () => {
        // when
        LoginPage.attemptLogin('wrong', 'wrong')

        // then
        cy.get('.alert').should('contain.text', 'Invalid username/password')
    })

    it('should trigger frontend validation', () => {
        // when
        LoginPage.clickLogin()

        // then
        const errorMessage = 'Required field length is 4 or more'
        cy.get('.invalid-feedback').should('have.length', 2)
        cy.get('.invalid-feedback').eq(0).should('have.text', errorMessage)
        cy.get('.invalid-feedback').eq(1).should('have.text', errorMessage)
        cy.get('.is-invalid').should('have.length', 2)
    })

    it('should open register page', () => {
        // when
        LoginPage.clickRegister()

        // then
        cy.get('h2').should('contain.text', 'Register')
        cy.url().should('contain', '/register')
    })

  })
  