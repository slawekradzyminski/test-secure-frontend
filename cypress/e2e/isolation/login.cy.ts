/// <reference types="cypress" />

describe('Login page tests in isolation', () => {
    beforeEach(() => {
        cy.visit('')
    })

    it('should open register page', () => {
        cy.get('.btn-link').click()
        cy.url().should('contain', 'register')
    })

})
