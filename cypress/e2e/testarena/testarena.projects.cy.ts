/// <reference types="cypress" />

describe('Home page tests', () => {
  beforeEach(() => {
    cy.visit('http://demo.testarena.pl/zaloguj')
    cy.get("#email").type('administrator@testarena.pl')
    cy.get("#password").type('sumXQQ72$L')
    cy.get('#save').click()
    cy.visit('http://demo.testarena.pl/administration/projects')
  })

  it('should find crucial project', () => {
    cy.get('#search').type('Kopernik')
    cy.get('#j_searchButton').click()
    cy.get('td').contains('KOPERNIK').should('exist')
  })

  it.only('should open add new project page', () => {
    cy.get('a.button_link').eq(0).click()
    cy.url().should('contain', 'add_project')
  })

})
