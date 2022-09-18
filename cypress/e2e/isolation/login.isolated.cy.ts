/// <reference types="cypress" />

import LoginPage from "../../pages/LoginPage"
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
        cy.intercept('POST', '**/users/signin', {
            statusCode: 200,
            body: {
                username: user.username,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                token: 'fakeToken',
                roles: user.roles
            }
        })
        cy.intercept('GET', '**/users', { fixture: 'users.json' })

        // when
        loginPage.attemptLogin(user.username, user.password)

        // then
        cy.get('h1').should('contain.text', user.firstName)
    })

    it('should fail to login', () => {
        // given
        const message = "Invalid username/password supplied"

        cy.intercept('POST', '**/users/signin', {
            statusCode: 422,
            body: {
                error: "Unprocessable Entity",
                message: message,
                path: "/users/signin",
                status: 422,
                timestamp: "2022-09-18T08:16:48.746+00:00"
            }
        })

        // when
        loginPage.attemptLogin(getRandomString(), getRandomString())

        // then
        cy.get('.alert-danger').should('have.text', message)
    })

    it('should display loading indicator', () => {
        // given
        cy.viewport(390, 844)
        cy.intercept('POST', '**/users/signin', {
            delay: 1000
        })

        // when
        loginPage.attemptLogin(getRandomString(), getRandomString())

        // then
        cy.get('.btn-primary .spinner-border').should('be.visible')
    })

})
