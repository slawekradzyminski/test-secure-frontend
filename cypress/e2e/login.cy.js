/// <reference types="cypress" />

describe('login', () => {
    beforeEach(() => {
      cy.visit('/')
    })
  
    it('should successfully login', () => {
      cy.get('[name=username]').type('admin')
      cy.get('[name=password]').type('admin')
      cy.get('.btn-primary').click()

    })

  })
  