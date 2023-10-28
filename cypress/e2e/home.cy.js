/// <reference types="cypress" />

describe('Home page tests', () => {
    beforeEach(() => {
        cy.login('admin', 'admin')
    })

    it('should display at least one user', () => {
        cy.get('li').should('have.length.at.least', 1)
    })

    it('should open edit user page', () => {
        cy.get('li').contains('Gosia Radzyminska').find('.edit').click()

        cy.get('h2').should('contain.text', 'Edit user')
    })

    it('should open email page', () => {
        cy.get('li').contains('Gosia Radzyminska').find('.email').click()

        cy.get('h2').should('contain.text', 'Email user')
    })

})
