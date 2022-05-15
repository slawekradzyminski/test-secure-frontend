/// <reference types="cypress" />

import AlertsValidator from "../../components/AlertsValidator"
import { mockLoginDelay, mockLoginFailure, mockLoginSuccess } from "../../mocks/loginMocks"
import LoginPage from "../../pages/LoginPage"
import { getRandomUser } from "../../util/user"

const loginPage = new LoginPage()
const alertsValidator = new AlertsValidator()

describe('login page', () => {
    beforeEach(() => {
        cy.visit('http://localhost:8081')
    })

    it('should successfully login', () => {
        // given
        const user = getRandomUser()
        mockLoginSuccess(user)

        // when
        loginPage.attemptLogin(user.username, user.password)

        // then
        cy.get('h1').should('contain.text', user.firstName)
    })

    it('should fail to login', () => {
        // given
        const message = 'Invalid username/password supplied'
        mockLoginFailure(message)

        // when
        loginPage.attemptLogin('wrong', 'wrong')

        // then
        alertsValidator.verifyFailure(message)

    })

    it('should show loading indicator', () => {
        // given
        mockLoginDelay()

        // when
        loginPage.attemptLogin('username', 'password')

        // then
        cy.get('.btn-primary .spinner-border').should('be.visible')
    })

})
