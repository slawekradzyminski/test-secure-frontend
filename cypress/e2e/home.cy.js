/// <reference types="cypress" />

describe('Home page', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8081')
    cy.get('[name="username"]').type('admin')
    cy.get('[name="password"]').type('admin')
    cy.get('.btn-primary').click()
  })

  it('displays two todo items by default', () => {
    cy.get('li').should('have.length.at.least', 1)
  })
})
