/// <reference types="cypress" />
describe('login page', () => {
    beforeEach(() => {
      cy.visit('http://localhost:8081')
    })
  
    it('should successfully login', () => {
        cy.get('[name=username]').type('admin')
        cy.get('[name=password]').type('admin')
        cy.get('.btn-primary').click()

        cy.get('h1').should('contain.text', 'Slawomir')
    })

    it('should open register page', () => {
        cy.get('.btn-link').click()
        cy.get('h2').should('contain.text', 'Register')
    })

    it('should fail to login', () => {
        cy.get('[name=username]').type('wrong')
        cy.get('[name=password]').type('wrong')
        cy.get('.btn-primary').click()

        cy.get('.alert').should('contain.text', 'Invalid username/password')
    })

    it('should trigger frontend validation', () => {
        cy.get('.btn-primary').click()

        cy.get('.invalid-feedback').eq(0).should('contain.text', 'Required field length')
        cy.get('.invalid-feedback').eq(1).should('contain.text', 'Required field length')
    })
  
  })
  