/// <reference types="cypress" />

describe('login page', () => {
    beforeEach(() => {
        cy.login('admin', 'admin')
        cy.visit('http://localhost:8081')
    })

    it('should display at least one user', () => {
        cy.get('ul li').should('have.length.at.least', 1)
    })

    it('should logout', () => {
        cy.get('#logout').click()
        cy.url().should('contain', '/login')
    })

    it('should redirect to adduser page', () => {
        cy.get('#addmore').click()
        cy.url().should('contain', '/add-user')
    })

})
