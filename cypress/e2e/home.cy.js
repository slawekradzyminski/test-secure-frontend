/// <reference types="cypress" />

describe('Home page', () => {
    beforeEach(() => {
        cy.login('admin', 'admin')
        cy.visit('http://localhost:8081')
    })

    it('should display at least one user', () => {
        cy.get('li').should('have.length.gte', 1)
    })

    it('should log out', () => {
        cy.get('#logout').click();
        cy.url().should('contain', '/login');
    });

    it('should open add more users page', () => {
        cy.get('#addmore').click();
        cy.url().should('contain', '/add-user');
    });

})
