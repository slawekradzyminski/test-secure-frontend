/// <reference types="cypress" />

import { getRandomEmail } from "../utils/email"

describe('Email page', () => {
    beforeEach(() => {
      cy.visit('http://localhost:8081')
      cy.login('admin', 'admin')
      cy.get('li').contains('Slawomir Radzyminski').find('.email').click()
    })
  
    it.only('should successfully send email', () => {
        const randomEmail = getRandomEmail()

        cy.get('[name="subject"]').type(randomEmail.subject)
        cy.get('[name="message"]').type(randomEmail.message)
        cy.get('.btn-primary').click();

        cy.get('.alert-success').should('have.text', 'Email was scheduled to be send')
    })

  
  })
  