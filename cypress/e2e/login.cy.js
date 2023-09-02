/// <reference types="cypress" />

describe('Login page tests', () => {
    beforeEach(() => {
      cy.visit('http://localhost:8081')
    })
  
    it('should successfully login', () => {
        // podajemy username
        cy.get('input[name=username]').type('admin')
        // podajemy password
        cy.get('input[type=password]').type('admin')
        // klikamy przycisk login
        cy.get('.btn-primary').click()
        // weryfikacja (asercje)
        cy.get('h1').should('contain.text', 'Slawomir')
    })

    it('should fail to login', () => {
        cy.get('input[name=username]').type('wrong')
        cy.get('input[type=password]').type('wrong')
        cy.get('.btn-primary').click()
        cy.get('.alert').should('contain.text', 'Invalid username/password')
    })

    it('should trigger frontend validation', () => {
        cy.get('.btn-primary').click()

        cy.get('.invalid-feedback').should('have.length', 2)
        cy.get('.invalid-feedback').eq(0).should('have.text', 'Required field length is 4 or more')
        cy.get('.invalid-feedback').eq(1).should('have.text', 'Required field length is 4 or more')
        cy.get('.is-invalid').should('have.length', 2)
    })

    it('should open register page', () => {
        cy.get('.btn-link').click()
        cy.get('h2').should('contain.text', 'Register')
        cy.url().should('contain', '/register')
    })

  })
  