/// <reference types="cypress" />

describe('TestArena login page tests', () => {
    beforeEach(() => {
        cy.visit('http://demo.testarena.pl/zaloguj')
    })

    it('should successfully login', () => {
        const email = 'administrator@testarena.pl'
        cy.get('#email').type(email)
        cy.get('#password').type('sumXQQ72$L')    
        cy.get('#login').click()
        
        cy.get('#header_logo').should('be.visible')
        cy.get('.user-info > small').should('have.text', email)
    })


})
