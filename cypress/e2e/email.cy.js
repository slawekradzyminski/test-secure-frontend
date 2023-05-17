/// <reference types="cypress" />
describe('Email page', () => {
    beforeEach(() => {
      cy.visit('http://localhost:8081')
      cy.login('admin', 'admin')
    })
  
    it('should successfully logout', () => {
        cy.get('#logout').click()
        cy.url().should('contain', 'login')
    })
  
  })
  