/// <reference types="cypress" />

import Alert from "../components/Alert"
import { getRandomUser } from "../domain/user"
import LoginPage from "../pages/LoginPage"
import { getRandomString } from "../util/random"

describe('Login page tests', () => {
    beforeEach(() => {
        cy.visit('')
    })

    it('should successfully login', () => {
        const user = getRandomUser()
        cy.register(user)

        LoginPage.getUsernameInput().type(user.username)
        LoginPage.getPasswordInput().type(user.password)
        LoginPage.getLoginButton().click()

        cy.get('h1').should('contain.text', user.firstName)
    })

    it('should fail to login', () => {
        LoginPage.getUsernameInput().type(getRandomString())
        LoginPage.getPasswordInput().type(getRandomString())
        LoginPage.getLoginButton().click()

        Alert.getAlertFailed().should('have.text', 'Invalid username/password supplied')
        cy.url().should('contain', '/login')
    })
    
    it('should open register page', () => {
        LoginPage.getRegisterButton().click()

        cy.get('h2').should('contain.text', 'Register')
        cy.url().should('contain', '/register')
    })

    it('should trigger frontend validation', () => {
        LoginPage.getLoginButton().click()

        LoginPage.getValidationError().should('have.length', 2)
        LoginPage.getValidationError().each(($el) => {
            cy.wrap($el).should('have.text', 'Required field length is 4 or more')
        })

        LoginPage.getExclamationMark().should('have.length', 2)
        cy.get('input').each(($el) => {
            cy.wrap($el).should('have.class', 'is-invalid')
        })
    })

})
