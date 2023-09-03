/// <reference types="cypress" />

import RegisterPage from "../pages/RegisterPage"
import { generateRandomEmail, generateRandomString } from "../utils/random"
import { getRandomUser } from "./domain/user"

describe('Register page tests', () => {
    beforeEach(() => {
      cy.visit('http://localhost:8081/register')
    })
  
    it("should successfully register new user", () => {
        // given
        const user = getRandomUser()
        cy.intercept('POST', '**/users/signup', {
            statusCode: 201,
            body: {
                token: generateRandomString(30)
            }
        })

        // when
        RegisterPage.attemptRegister(user)

        // then
        cy.get(".alert-success").should("contain.text", "Registration successful")
        cy.url().should('contain', '/login')
    })

  })
  