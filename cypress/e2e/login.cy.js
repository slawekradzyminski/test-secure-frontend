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

    it('should trigger frontend validation', () => {
        cy.get('.btn-primary').click()
        cy.get('form input')
            .should('have.length', 2)
            .each(($input) => {
                cy.wrap($input).should('have.class', 'is-invalid')
            })
        cy.get('.form-group div')
            .should('have.length', 2)
            .each(($error) => {
                cy.wrap($error).should('have.text', 'Required field length is 4 or more')
            })
    })

})
