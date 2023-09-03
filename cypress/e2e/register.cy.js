/// <reference types="cypress" />

import RegisterPage from "../pages/RegisterPage"
import { generateRandomEmail, generateRandomString } from "../utils/random"

describe('Register page tests', () => {
    beforeEach(() => {
      cy.visit('http://localhost:8081/register')
    })
  
    it("should successfully register new user", () => {
        cy.get("[name=username]").type(generateRandomString())
        cy.get("[name=firstName]").type(generateRandomString())
        cy.get("[name=lastName]").type(generateRandomString())
        cy.get("[name=password]").type(generateRandomString())
        cy.get("[name=email]").type(generateRandomEmail())
        cy.get(".btn-primary").click()

        cy.get(".alert-success").should("contain.text", "Registration successful")
        cy.url().should('contain', '/login')
    })

    it("should register error - Username is already in use", () => {
        cy.get("[name=username]").type('admin')
        cy.get("[name=firstName]").type(generateRandomString())
        cy.get("[name=lastName]").type(generateRandomString())
        cy.get("[name=password]").type(generateRandomString())
        cy.get("[name=email]").type(generateRandomEmail())
        cy.get(".btn-primary").click()

        cy.get('.alert-danger').should("contain.text", "Username is already in use")
    })

    it('should open login page', () => {
        // when
        RegisterPage.clickCancel()

        // then
        cy.get('h2').should('contain.text', 'Login')
        cy.url().should('contain', '/login')
    })

    it('should trigger frontend validation', () => {
        RegisterPage.clickRegister()

        // then
        cy.get('.invalid-feedback').should('have.length', 5)
        cy.get('.invalid-feedback').eq(0).should('have.text', 'Required field length is 4 or more')
        cy.get('.is-invalid').should('have.length', 5)
    })

  })
  