/// <reference types="cypress" />

import { registerPage } from "../pages/registerPage"
import { generateRandomEmail, generateRandomString } from "../utils/random"

describe('Register page', () => {
    beforeEach(() => {
        cy.visit('http://localhost:8081/register')
    })

    it('should successful Register', () => {
        const username = generateRandomString(10)
        const email = generateRandomEmail(15, 'test.com')

        registerPage.selectors.firstNameInput().type('Maria')
        registerPage.selectors.lastNameInput().type(username)
        registerPage.selectors.usernameField().type(username)
        registerPage.selectors.passwordInput().type(username)
        registerPage.selectors.emailInput().type(email)
        registerPage.selectors.registerButton().click()

        registerPage.selectors.alertMessage().should('contain.text', 'Registration successful')
    })

    it('should trigger frontend validation', () => {
        registerPage.triggerValidation()

        registerPage.selectors.invalidFeedbackMessages()
            .should('have.length', 5)
            .each(($el) => {
                cy.wrap($el).should('have.text', 'Required field length is 4 or more')
            })

        registerPage.selectors.listOfInputs()
            .each(($el) => {
                cy.wrap($el).should('have.class', 'is-invalid')
            })
    })



})
