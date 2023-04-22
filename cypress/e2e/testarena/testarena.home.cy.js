/// <reference types="cypress" />

describe('Test Arena home page tests', () => {
    beforeEach(() => {
        cy.visit('http://demo.testarena.pl/zaloguj')
        cy.get('#email').type('administrator@testarena.pl')
        cy.get('#password').type('sumXQQ72$L')
        cy.get('#login').click()
    })


    it('should open wiadomosci', () => {
        cy.get('.icon_mail').click()


        cy.get('.message-create-button').should('exist')
        cy.get('#j_msgSingleThreadList').should('contain.text', 'Anonim')
        cy.url().should('contain', '/moje_wiadomosci')
    })


    it('should open administartor', () => {
        cy.get('.icon_tools').click()
        cy.url().should('contain', '/administration/projects')
    })


    it('should logout', () => {
        cy.get('.icons-switch').click()
        cy.url().should('contain', '/zaloguj')
    })




})
