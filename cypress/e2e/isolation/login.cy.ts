/// <reference types="cypress" />

import { signinMocks } from "../../mocks/signinMocks"
import { usersMocks } from "../../mocks/usersMocks"
import { loginPage } from "../../pages/loginPage"

describe('Login page', () => {
    beforeEach(() => {
        cy.visit('http://localhost:8081')
    })

    it('should successfully login', () => {
        // given
        cy.percySnapshot('Login Page')
        signinMocks.successfulLogin()
        usersMocks.testUsers()

        // when
        loginPage.attemptLogin('admin', 'admin')

        // then
        cy.get('h2,h1').should('contain.text', 'Slawomir')
        cy.wait('@loginRequest').its('request.body').should('deep.equal', {
            username: 'admin',
            password: 'admin'
        })
        cy.percySnapshot('Home Page')
    })

    it('should fail to login', () => {
        // given
        const message = 'Invalid username/password supplied'
        signinMocks.failedLogin(message)

        // when
        loginPage.attemptLogin('admin', 'admin')

        // then
        cy.get('.alert').should('have.text', message)
    })

    it('should open register page', () => {
        // when
        loginPage.clickRegister()

        // then
        cy.url().should('contain', 'register')
    })

    it('should trigger frontend validation', () => {
        // when
        loginPage.selectors.loginButton().click()

        // then
    })

    it('should trigger frontend validation', () => {
         // given
         signinMocks.delayedLogin()
 
         // when
         loginPage.attemptLogin('admin', 'admin')

         // then
         cy.get('.spinner-border').should('be.visible')
    })

})
