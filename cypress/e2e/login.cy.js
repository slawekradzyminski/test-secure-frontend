/// <reference types="cypress" />

describe('Login page tests', () => {
    beforeEach(() => {
        cy.visit('http://localhost:8081')
    })

    it('should successfully login', () => {
        cy.get('input[name=username]').type('admin')
        cy.get('input[name=password]').type('admin')
        cy.get('.btn-primary').click()

        cy.get('h1').should('contain.text', 'Slawomir')
    })

    it('should fail to login', () => {
        cy.get('input[name=username]').type('wrong')
        cy.get('input[name=password]').type('credentials')
        cy.get('.btn-primary').click()

        cy.get('.alert').should('have.text', 'Invalid username/password supplied')
        cy.url().should('contain', '/login')
    })
    
    it('should open register page', () => {
        cy.get('.btn-link').click()

        cy.get('h2').should('contain.text', 'Register')
        cy.url().should('contain', '/register')
    })

})
