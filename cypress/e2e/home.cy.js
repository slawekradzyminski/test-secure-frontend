/// <reference types="cypress" />

describe('Home page tests', () => {
    beforeEach(() => {
        cy.visit('http://localhost:8081')
        cy.get('input[name=username]').type('admin')
        cy.get('input[type=password]').type('admin')
        cy.get('.btn-primary').click()
    })

    it('should display at least one user', () => {
        cy.get('li').should('not.be.empty')
    })

})
