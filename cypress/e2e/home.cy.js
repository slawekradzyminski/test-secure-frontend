/// <reference types="cypress" />

import { email, password } from "../util/credentials"

describe('Home tests', () => {
    beforeEach(() => {
      cy.visit('http://demo.testarena.pl/zaloguj')
      cy.get('#email').type(email)
      cy.get('#password').type(password)
      cy.get('#login').click()
    })
  
    it('should display 10 items in sidebar', () => {
        cy.get('.menu > li').should('have.length', 10)
    })

    it('should logout', () => {
        cy.get('.header_logout').click()
        cy.url().should('contain', 'zaloguj')
        cy.get('#login').should('exist')
    })

  })
  