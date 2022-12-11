/// <reference types="cypress" />

describe('Home page tests', () => {
  beforeEach(() => {
    cy.visit('http://demo.testarena.pl/zaloguj')
    cy.get("#email").type('administrator@testarena.pl')
    cy.get("#password").type('sumXQQ72$L')
    cy.get('#save').click()
  })

  it('should open administration page', () => {
    cy.get('.header_admin').click()
    cy.get('.content_title').should('contain.text', 'Projekty')
  })

  it('should open profile page', () => {
    cy.get('a.top_avatar_header').click()
    cy.get('#text').should('contain.text', 'Gall Anonim')
  })

})
