/// <reference types="cypress" />

describe('Home page tests', () => {
    beforeEach(() => {
        cy.login('admin', 'admin')
        cy.visit('http://localhost:8081')
    })

    it('should display at least one user', () => {
        cy.get('li').should('have.length.at.least', 1)
    })

    it('should have logged out', () => {
        cy.get('#logout').click()
        cy.get('h2').should('have.text', 'Login')
        cy.url().should('contain', 'login')
    })

    it('should open register page', () => {
        cy.get('#addmore').click()
        cy.url().should('contain', 'add-user')
    })
})
