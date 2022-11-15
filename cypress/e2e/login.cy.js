/// <reference types="cypress" />

describe('Login tests', () => {
    beforeEach(() => {
      cy.visit('http://demo.testarena.pl/zaloguj')
    })
  
    it('should successfully login', () => {
        cy.get('#email').type('administrator@testarena.pl')
        cy.get('#password').type('sumXQQ72$L')
        cy.get('#login').click()

        cy.get('.user-info').should('contain.text', 'Gall Anonim')
    })

    it('should open forgot my password page', () => {
        cy.get("a[href='http://demo.testarena.pl/odzyskaj_haslo']").click()
        cy.get('h1').should('contain.text', 'Odzyskaj hasło')
    })

  })
  