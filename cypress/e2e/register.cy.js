/// <reference types="cypress" />

import { generateRandomEmail, generateRandomString } from "../utils/random"

describe('Register page tests', () => {
    beforeEach(() => {
      cy.visit('http://localhost:8081/register')
    })
  
    it.only("should successfully register new user", () => {
        cy.get("[name=username]").type(generateRandomString())
        cy.get("[name=firstName]").type(generateRandomString())
        cy.get("[name=lastName]").type(generateRandomString())
        cy.get("[name=password]").type(generateRandomString())
        cy.get("[name=email]").type(generateRandomEmail())
        cy.get(".btn-primary").click()
        cy.get(".alert-success").should("contain.text", "Registration successful")
    })

    it('should open login page', () => {
        cy.get('.btn-link').click()
        cy.get('h2').should('contain.text', 'Login')
        cy.url().should('contain', '/login')
    })

    it('should trigger frontend validation', () => {
        cy.get('.btn-primary').click()

        cy.get('.invalid-feedback').should('have.length', 5)
        cy.get('.invalid-feedback').eq(0).should('have.text', 'Required field length is 4 or more')
        cy.get('.is-invalid').should('have.length', 5)
    })

  })
  