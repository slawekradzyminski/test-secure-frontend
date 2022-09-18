/// <reference types="cypress" />

import LoginPage from "../../pages/LoginPage"
import MockGetUsers from "../../stubs/MockGetUsers"
import MockLogin from "../../stubs/MockLogin"
import { getRandomString } from "../../util/random"
import { getRandomUser } from "../../util/userProvider"

describe('Login page isolated tests', () => {
    const loginPage = new LoginPage()

    beforeEach(() => {
        cy.visit('http://localhost:8081')
    })

    it('should successfully login', () => {
        // given
        const user = getRandomUser()
        MockLogin.mockSuccessfulLogin(user)
        MockGetUsers.mockUsers()

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
        MockLogin.mockFailedLogin(message)

        // when
        loginPage.attemptLogin(getRandomString(), getRandomString())

        // then
        cy.get('.alert-danger').should('have.text', message)
    })

    it('should display loading indicator', () => {
        // given
        cy.viewport(390, 844)
        MockLogin.mockDelayedLogin()

        // when
        loginPage.attemptLogin(getRandomString(), getRandomString())

        // then
        cy.get('.btn-primary .spinner-border').should('be.visible')
    })

})
