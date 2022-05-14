/// <reference types="cypress" />

describe('home page', () => {
    beforeEach(() => {
        cy.login('admin', 'admin')
        cy.visit('')
    })

    it('should display at least one user', () => {
        cy.get('ul li').should('have.length.at.least', 1)
    })

})
