/// <reference types="cypress" />

describe('Login page', () => {
    beforeEach(() => {
        cy.visit('http://localhost:8081')
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

})