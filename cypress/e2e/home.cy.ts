/// <reference types="cypress" />

describe('Home page tests', () => {
    beforeEach(() => {
        cy.login('admin', 'admin')
        cy.visit('')
        cy.getCookie('token').its('value').should('not.be.empty')
    })

    it('should display at least one user', () => {
        cy.get('li').should('have.length.at.least', 1)
    })

    it('should logout', () => {
        cy.get('#logout').click()
        cy.url().should('contain', '/login')
    })

    it('should open add more users page', () => {
        cy.get('#addmore').click()
        cy.url().should('contain', '/add-user')
    })

})
