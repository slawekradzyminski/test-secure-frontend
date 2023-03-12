/// <reference types="cypress" />

import { buildLoginResponseBody } from "../../helpers/loginResponse"
import LoginPage from "../../pages/LoginPage"
import { getRandomUser, User } from "../../utils/user"

describe('Login page tests', () => {
    beforeEach(() => {
        cy.visit('http://localhost:8081')
    })

    it('should successfully login', () => {
        // given
        const user = getRandomUser()
        cy.intercept('POST', '**/users/signin', {
            statusCode: 200,
            body: buildLoginResponseBody(user)
        })
        cy.intercept('GET', '**/users', { fixture: 'users.json' })

        // when
        LoginPage.attemptLogin(user.username, user.password)

        // then
        cy.get('h1').should('contain.text', user.firstName)
    })

    it('should fail to login', () => {
        // given
        const user = getRandomUser()
        const message = "Invalid username/password supplied"
        cy.intercept('POST', '**/users/signin', {
            statusCode: 422,
            body: {
                timestamp: "2023-03-12T13:26:26.206+00:00",
                status: 422,
                error: "Unprocessable Entity",
                message: message,
                path: "/users/signin"
            }
        })

        // when
        LoginPage.attemptLogin(user.username, user.password)

        // then
        cy.get('.alert').should('have.text', message)
    })

})
