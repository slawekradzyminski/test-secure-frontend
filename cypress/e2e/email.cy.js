/// <reference types="cypress" />

import { getRandomEmail } from "../utils/email"
import { generateUser } from "../utils/user"

describe('Email page', () => {
    beforeEach(() => {
      const user = generateUser()
      cy.registerViaAPI(user)
      cy.loginViaAPI(user)  
      cy.visit('http://localhost:8081')
      cy.get('li').contains(`${user.firstName} ${user.lastName}`).find('.email').click()
    })
  
    it('should successfully send email', () => {
        const randomEmail = getRandomEmail()

        cy.get('[name="subject"]').type(randomEmail.subject)
        cy.get('[name="message"]').type(randomEmail.message)
        cy.get('.btn-primary').click();

        cy.get('.alert-success').should('have.text', 'Email was scheduled to be send')
    })

  
  })
  