/// <reference types="cypress" />

describe('Login page', () => {
    beforeEach(() => {
      cy.visit('http://localhost:8080')
    })
  
    it('should successfully log in', () => {
        cy.login('admin', 'admin')
        cy.get('h1').should('contain.text', 'Hi')
    })

    it('should show login failed alert', () => {
        cy.login('wrong', 'wrong')
        cy.get('.alert').should('contain.text', 'Invalid username/password')
    })

   
  
  })
  