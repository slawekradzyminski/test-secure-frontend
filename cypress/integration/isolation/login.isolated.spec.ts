/// <reference types="cypress" />

import AlertValidator from '../../pages/AlertValidator';
import LoginPage from '../../pages/LoginPage';
import { getRandomUser } from '../../util/user';

const loginPage = new LoginPage()
const alertValidator = new AlertValidator()

describe('login page', () => {
    beforeEach(() => {
        cy.visit('http://localhost:8081')
        cy.viewport('iphone-xr')
    })

    it('should successfully login', () => {
        // given
        const user = getRandomUser()
        cy.mockSuccessfulLogin(user)
        cy.intercept('GET', '**/users', { fixture: 'users.json' })

        // when
        loginPage.attemptLogin(user.username, user.password)

        // then
        cy.get('h1').should('contain.text', user.firstName)
        cy.wait('@loginRequest').its('request.body').should('deep.equal', {
            username: user.username,
            password: user.password
        })
    })

    it('should fail to login', () => {
        // given
        const message = "Invalid username/password supplied"
        cy.mockFailedLogin(message)

        // when
        loginPage.attemptLogin('wrong', 'wrong')

        // then
        alertValidator.verifyFailure(message)
    })

    it('should display loading indicator', () => {
        // given
        cy.mockLoginDelay()        

        // when
        loginPage.attemptLogin('wrong', 'wrong')

        // then
        cy.get('.btn-primary .spinner-border').should('be.visible')
    })

    it('should open register page', () => {
        // when
        loginPage.clickRegister()

        // then
        cy.get('h2').should('have.text', 'Register')
        cy.url().should('contain', '/register')
    })

})
