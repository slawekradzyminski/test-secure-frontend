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
        // given
        const user = getRandomUser()
        cy.register(user)

        // when
        LoginPage.attemptLogin(user.username, user.password)

        // then
        cy.get('h1').should('contain.text', user.firstName)
    })

    it('should fail to login', () => {
        // when
        LoginPage.attemptLogin(getRandomString(), getRandomString())

        // then
        Alert.getAlertFailed().should('have.text', 'Invalid username/password supplied')
        cy.url().should('contain', '/login')
    })
    
    it('should open register page', () => {
        // when
        LoginPage.clickRegister()

        // then
        cy.get('h2').should('contain.text', 'Register')
        cy.url().should('contain', '/register')
    })

    it('should trigger frontend validation', () => {
        // when
        LoginPage.clickLogin()
        
        // then
        LoginPage.checkValidationErrors()
    })

})
