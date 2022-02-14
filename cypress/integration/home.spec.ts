/// <reference types="cypress" />

describe('Home page', () => {
    beforeEach(() => {
        cy.visit('')
        cy.login('admin', 'admin')
    })

    it('should display at least one user', () => {
        cy.get('ul li').should('have.length.at.least', 1)
    })

    it('should logout', () => {
        cy.get('#logout').click()
        cy.url().should('contain', '/login')
    })

    it('should redirect to add-user page', () => {
        cy.get('#addmore').click()
        cy.url().should('contain', '/add-user')
    })

})
