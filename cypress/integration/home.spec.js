/// <reference types="cypress" />

describe('home page', () => {
    beforeEach(() => {
        cy.login('admin', 'admin')
        cy.visit('http://localhost:8081')
    })

    it('should display list of users', () => {
        cy.get('ul li').should('have.length.at.least', 1)
    })
})
