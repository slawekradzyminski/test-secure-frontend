/// <reference types="cypress" />

describe('Home page tests', () => {
    beforeEach(() => {
        cy.visit('http://localhost:8081')
        cy.get("input[name='username']").type('admin')
        cy.get("input[name='password']").type('admin')
        cy.get('.btn-primary').click()
    })

    it('should display at least one user', () => {
        cy.get('ul li').should('exist')
    })

    it('should logout', () => {
        cy.get('#logout').click()

        cy.get('h2').should('contain.text', 'Login')
    })

    it('should add more users', () => {
        cy.get('#addmore').click()

        cy.url().should('contain', '/add-user')
    })


})
