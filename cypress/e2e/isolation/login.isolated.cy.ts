/// <reference types="cypress" />

import Alert from "../../component/Alert"
import LoginMock from "../../mocks/LoginMock"
import UsersMock from "../../mocks/UsersMock"
import HomePage from "../../pages/HomePage"
import { loginPage } from "../../pages/logginPage"
import { registerPage } from "../../pages/registerPage"
import { getRandomUser, User } from "../../utils/user"

describe('login tests in isolation', () => {
    beforeEach(() => {
        cy.visit('/')
    })

    it('should successfully login', () => {
        // given
        const user = getRandomUser()
        LoginMock.mockSuccess(user)
        UsersMock.mockUsers()

        // when
        loginPage.attemptLogin(user.username, user.password)

        // then
        HomePage.getHeader().should('contain.text', user.firstName)
        verifyLoginRequestBody(user)
    })

    it('should fail to login', () => {
        // given
        const message = "Invalid username/password supplied"
        LoginMock.mockFailure(message)

        // when
        loginPage.attemptLogin('wrong', 'wrong')

        // then
        Alert.getFailureAlert().should('have.text', message)
    })

    it('should open register page', () => {
        // when
        loginPage.clickRegister()

        // then
        cy.get(registerPage.selectors.header).should('have.text', 'Register')
    })

})

const verifyLoginRequestBody= (user: User) => {
    cy.wait('@loginRequest').its('request.body').should('deep.equal', {
        username: user.username,
        password: user.password
    })
}

