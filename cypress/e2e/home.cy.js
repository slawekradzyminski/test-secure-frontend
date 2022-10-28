/// <reference types="cypress" />

describe('Home page tests', () => {
    beforeEach(() => {
        cy.login('admin', 'admin')

        // 4
        cy.visit(Cypress.env('url'))
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
