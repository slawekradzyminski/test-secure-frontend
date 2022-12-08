/// <reference types="cypress" />

describe('Login page tests', () => {
    beforeEach(() => {
      cy.visit('http://localhost:8081')
    })
  
    it('should successfully login', () => {
        cy.get("input[name='username']").type('admin')
        cy.get("input[name='password']").type('admin')
        cy.get('.btn-primary').click()

        cy.get('h1').should('contain.text', 'Slawomir')
    })
  
    it('should fail to login with wrong credentials', () => {
        cy.get("input[name='username']").type('wrong')
        cy.get("input[name='password']").type('wrong')
        cy.get('.btn-primary').click()

        cy.get('.alert-danger').should('contain.text', 'Invalid username/password supplied')
    })

  })
  