/// <reference types="cypress" />

describe('Login page', () => {
    beforeEach(() => {
        cy.visit('')
    })

    it('should successfully login', () => {
        cy.get('[name=username]').type('admin')
        cy.get('[name=password]').type('admin')
        cy.get('.btn-primary').click()
        cy.get('h1').should('contain.text', 'Hi Slawomir')
    })

    it('should fail to login', () => {
        cy.get('[name=username]').type('wrong')
        cy.get('[name=password]').type('wrong')
        cy.get('.btn-primary').click()
        cy.get('.alert').should('have.text', 'Invalid username/password supplied')
            .should('have.class', 'alert-danger')
    })

    it.only('should validate empty fields', () => {
        cy.get('.btn-primary').click()
        cy.get('.invalid-feedback').eq(0).should('have.text', 'Required field length is 4 or more')
        cy.get('.invalid-feedback').eq(1).should('have.text', 'Required field length is 4 or more')
        cy.get('[name=username]').should('have.class', 'is-invalid')
        cy.get('[name=password]').should('have.class', 'is-invalid')
    })

})
