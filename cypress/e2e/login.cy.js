/// <reference types="cypress" />

describe('Login page tests', () => {
    beforeEach(() => {
      cy.visit('http://localhost:8081')
    })

    it('should successfully login', () => {
      cy.get('[name=username]').type('admin')
      cy.get('[name=password]').type('admin')
      cy.get('.btn-primary').click()

      cy.get('h1', { timeout: 5000 }).should('contain.text', 'Slawomir')
    })

    it('should fail to login', () => {
        cy.get('[name=username]').type('wrong')
        cy.get('[name=password]').type('wrong')
        cy.get('.btn-primary').click()

        cy.get('.alert-danger').should('have.text', 'Invalid username/password supplied')

    })

  })
  