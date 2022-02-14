/// <reference types="cypress" />

describe('Home page', () => {
    beforeEach(() => {
        cy.visit('')
        cy.get('[name=username]').type('admin')
        cy.get('[name=password]').type('admin')
        cy.get('.btn-primary').click()
    })

    it('should display at least one user', () => {
        
    })

})
