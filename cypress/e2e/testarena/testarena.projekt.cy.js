/// <reference types="cypress" />
describe('Projekty', () => {
    beforeEach(() => {
        cy.loginToTestArena('administrator@testarena.pl', 'sumXQQ72$L')
        cy.visit('http://demo.testarena.pl/administration/projects')
    })

    it('Add new project', () => {
        cy.get('.button_link').contains('Dodaj projekt').click();
        cy.get('.content_title').should('have.text', 'Dodaj projekt')
        cy.get('#description').should('be.visible')
    })

})


