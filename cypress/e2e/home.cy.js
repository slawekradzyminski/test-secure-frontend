/// <reference types="cypress" />

describe('Home page tests', () => {
    beforeEach(() => {
        cy.visit('http://localhost:8081')
        cy.login('admin', 'admin')
    })

    it('should display at least one user', () => {
        cy.get('li').should('have.length.above', 0)
    })

})
