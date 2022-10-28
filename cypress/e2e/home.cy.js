/// <reference types="cypress" />

describe('Home page tests', () => {
    beforeEach(() => {
        cy.visit('http://localhost:8081')
        cy.get("[name='username']").type('admin')
        cy.get("[name='password']").type('admin')
        cy.get('button.btn-primary').click()
    })

    it('should display at least one user', () => {
        cy.get('li').should('have.length.gte', 1)
    })

    it('should logout', () => {
        cy.get('#logout').click()

        cy.url().should('contain', '/login')
    })

    it('should open add more page', () => {
        cy.get('#addmore').click()

        cy.url().should('contain', '/add-user')
    })

})
