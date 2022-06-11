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
        cy.get('h2').should('contain.text', 'Login')
    })
 
    it('should add more users', () => {
        cy.get('#addmore').click()
        cy.url().should('contain', '/add-user')
        cy.get('h2').should('contain.text', 'Register')
    })
})
