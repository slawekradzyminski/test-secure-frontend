/// <reference types="cypress" />
 
describe('Login page tests', () => {
    beforeEach(() => {
      cy.visit('http://demo.testarena.pl/zaloguj')
    })
  
    it('should successfully login', () => {
        cy.get("#email").type('administrator@testarena.pl')
        cy.get("#password").type('sumXQQ72$L')
        cy.get('#save').click()
  
        cy.get('.user-info').should('contain.text', 'Gall Anonim ')
    })
  
  })
 