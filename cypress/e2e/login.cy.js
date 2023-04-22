/// <reference types="cypress" />

describe('Login tests', () => {
    beforeEach(() => {
        cy.visit('http://localhost:8081')
    })

    //it.only() zeby odpalil się tylko jeden test

    it('should successfully login', () => {
        cy.get('[name=username]').type('admin')
        cy.get('[name=password]').type('admin')
        cy.get('.btn-primary').click()

        cy.get('h1').should('contain.text', 'Slawomir')
    })

    it('should fail to login', () => {
        cy.get('[name=username]').type('admin')
        cy.get('[name=password]').type('adminss')
        cy.get('.btn-primary').click()

        cy.get('.alert').should('contain.text', 'Invalid username/password supplied')
    })

    it('should open register page', () => {
        cy.get('.btn-link').click()

        cy.get('h2').should('have.text', 'Register')
        cy.url().should('contain', '/register')
    })

})
