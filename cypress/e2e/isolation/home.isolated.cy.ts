/// <reference types="cypress" />

describe('Home page tests in isolation', () => {
    beforeEach(() => {
        cy.visitHomePageAsLoggedInUser()
    })

    it('should display all users', () => {
        cy.get('li').should('have.length', 2)
    })

})
