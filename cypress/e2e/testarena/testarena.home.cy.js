/// <reference types="cypress" />

describe('TestArena home page tests', () => {
    beforeEach(() => {
        cy.loginToTestArena(Cypress.env('testarena_email'), Cypress.env('testarena_password'))
    })

    it('should open add projects page', () => {
        cy.get('.icon_tools').click()
        cy.get('.button_link').contains('Dodaj projekt').click()
        
        cy.url().should('contain', '/add_project')
    })


})
