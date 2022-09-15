/// <reference types="cypress" />

describe('Login page tests', () => {
    beforeEach(() => {
      cy.visit('http://localhost:8081/')
    })
  
    it('should successfully login', () => {
      cy.get('input[name=username]').type('admin')
      cy.get('input[name=password]').type('admin')
      cy.get('.btn-primary').click()

      cy.get('h1').should('contain.text', 'Slawomir')
    })

    it('should fail to login', () => {
        cy.get('input[name=username]').type('admin')
        cy.get('input[name=password]').type('wrongPassword')
        cy.get('.btn-primary').click()
  
        cy.get('.alert-danger').should('have.text', 'Invalid username/password supplied')
      })

      it('should open register page', () => {
        cy.get('.btn-link').click()
  
        cy.url().should('contain', '/register')
        cy.get('h2').should('have.text', 'Register')
      })
  })
  