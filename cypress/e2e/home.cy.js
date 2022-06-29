/// <reference types="cypress" />

describe('login page', () => {
    beforeEach(() => {
        cy.visit('http://localhost:8081')
        cy.login('admin', 'admin')
    })

    it('should display at least one user', () => {
        cy.get('ul li').should('have.length.at.least', 1)
    })

})
