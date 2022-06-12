/// <reference types="cypress" />

import { loginRequestAlias, mockDelayedLoginResponse, mockFailedLogin, mockSuccessfulLogin } from "../../mocks/loginMocks"
import LoginPage from "../../pages/LoginPage"
import { getAliasedRequest } from "../../util/alias"
import { HttpMethod } from "../../util/httpMethods"
import { getRandomUser } from "../../util/user"

const loginPage = new LoginPage()

describe('login page in isolation', () => {
    beforeEach(() => {
        cy.visit('http://localhost:8081')
    })

    it('should successfully login', () => {
        // given
        const user = getRandomUser()
        mockSuccessfulLogin(user)

        // when
        loginPage.attemptLogin(user.username, user.password)

        // then
        cy.get('h1').should('contain.text', user.firstName)
        cy.wait(getAliasedRequest(loginRequestAlias)).its('request.body').should('deep.equal', {
            username: user.username,
            password: user.password
        })
    })

    it('should fail to login', () => {
        // given
        const message = "Invalid username/password supplied"
        mockFailedLogin(message)

        // when
        loginPage.attemptLogin('wrong', 'wrong')

        // then
        cy.get('.alert').should('contain.text', message)
    })

    it('should fail to login', () => {
        // given
        mockDelayedLoginResponse()

        // when
        loginPage.attemptLogin('wrong', 'wrong')

        // then
        cy.get('.btn-primary .spinner-border').should('be.visible')
    })

})
