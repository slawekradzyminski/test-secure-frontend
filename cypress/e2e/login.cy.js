/// <reference types="cypress" />

describe('login page tests', () => {
    beforeEach(() => {
        cy.visit('http://localhost:8081')
    })

    it('should successfully login', () => {
        cy.get("[name='username']").type('admin')
        cy.get("[name='password']").type('admin')
        cy.get('button.btn-primary').click()

        cy.get('h1').should('contain.text', 'Slawomir')

    })

    it('should fail to login', () => {
        cy.get("[name='username']").type('wrong')
        cy.get("[name='password']").type('password')
        cy.get('button.btn-primary').click()

        cy.get('.alert-danger').should('have.text', 'Invalid username/password supplied')
    })

    it.only('should open register page', () => {
        cy.get(".btn-link").click()

        cy.get('h2').should('contain.text', 'Register')
        cy.url().should('contain', '/register')
    })

})
