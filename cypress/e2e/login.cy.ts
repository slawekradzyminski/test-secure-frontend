/// <reference types="cypress" />

describe('Login page tests', () => {
    beforeEach(() => {
      cy.visit('http://localhost:8081')
    })
  
    it('should successfully login', () => {
        cy.get('[name=username]').type(Cypress.env('username'))
        cy.get('[name=password]').type(Cypress.env('password'))
        cy.get('.btn-primary').click()

        cy.get('h1').should('contain.text', 'Slawomir')
    })
  })