/// <reference types="cypress" />

describe('Home page tests', () => {
  beforeEach(() => {
    cy.login('admin', 'admin')
    cy.visit('http://localhost:8081')
  })

  it('should display at least one user', () => {
    cy.get('ul li').should('exist')
  })

  it('should logout', () => {
    cy.get('#logout').click()

    cy.get('h2').should('contain.text', 'Login')
  })

  it('should add more users', () => {
    cy.get('#addmore').click()

    cy.url().should('contain', '/add-user')
  })


})
