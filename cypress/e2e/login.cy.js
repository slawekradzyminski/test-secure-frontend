/// <reference types="cypress" />

describe('login page', () => {
    beforeEach(() => {
        cy.visit('http://localhost:8081')
    })

    it('should successfully login', () => {
        cy.get('[data-id=username]').type('admin')
        cy.get('[data-id=password]').type('admin')
        cy.get('.btn-primary').click()

        cy.get('h1').should('contain.text', 'Slawomir')
    })

    it('should fail to login', () => {
        cy.get('[data-id=username]').type('wrong')
        cy.get('[data-id=password]').type('wrong')
        cy.get('.btn-primary').click()

        cy.get('.alert').should('contain.text', 'Invalid username/password')
            .and('have.class', 'alert-danger')
    })

    it('register button should redirect to register page', () => {
        cy.get('.btn-link').click()
        cy.url().should('contain', '/register')
    })

    it.only('empty fields should trigger frontend validation', () => {
        cy.get('.btn-primary').click()
        cy.get('.invalid-feedback').should('have.length', 2)
        cy.get('.invalid-feedback').eq(0).should('have.text', 'Required field length is 4 or more')
        cy.get('.invalid-feedback').eq(1).should('have.text', 'Required field length is 4 or more')
        cy.get('[data-id=username]').should('have.class', 'is-invalid')
        cy.get('[data-id=password]').should('have.class', 'is-invalid')
    })

})
