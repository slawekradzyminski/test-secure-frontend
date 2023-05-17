/// <reference types="cypress" />
describe('Home page', () => {

    const email = 'administrator@testarena.pl'

    beforeEach(() => {
        cy.loginToTestArena(email, 'sumXQQ72$L')
    })

    it('should open my messages', () => {
        cy.get('.icon_mail').click()
        
        cy.url().should('contain', 'moje_wiadomosci')
        cy.get('#j_msgSingleThreadSubject').should('be.visible')
    })

    it('should open administration page', () => {
        cy.get('.icon_tools').click()

        cy.url().should('contain', 'administration')
        cy.get('.content_title').should('have.text', 'Projekty')
     })

     it('should open user profile', () => {
        cy.get('.top_avatar_header').click()

        cy.url().should('contain', 'profil')
        cy.get('.content_title').should('have.text', 'Profil')
     })

     it('should logout', () => {
        cy.get('.icons-switch').click()

        cy.url().should('contain', 'zaloguj')
        cy.get('#email').should('be.visible')
     })
 
})
