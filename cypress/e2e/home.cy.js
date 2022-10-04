/// <reference types="cypress" />

describe('Home page tests', () => {
    beforeEach(() => {
        cy.visit('http://localhost:8081')
        cy.get('form input[name="username"]').type('admin');
        cy.get('form input[name="password"]').type('admin');
        cy.get('.btn-primary').click();
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
