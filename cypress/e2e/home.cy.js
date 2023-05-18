/// <reference types="cypress" />

import { generateUser } from "../utils/user"

describe('Home page', () => {
    beforeEach(() => {
      cy.visit('http://localhost:8081')
      const user = generateUser()
      cy.registerViaAPI(user)
      cy.login(user.username, user.password)
    })
  
    it('should successfully logout', () => {
        cy.get('#logout').click()
        cy.url().should('contain', 'login')
    })
  
  })
  