/// <reference types="cypress" />

import LoginScreen from "../../pages/LoginScreen"
import { getRandomUser } from "../../util/user"

describe('Login page tests', () => {
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
                roles: user.roles,
                firstName: user.firstName,
                lastName: user.lastName,
                token: 'fakeToken',
                email: user.email
            }
        })
        cy.intercept('GET', '**/users', { fixture: 'users.json' })

        // when
        LoginScreen.attemptLogin(user.username, user.password)

        // then
        cy.get('h1').should('contain.text', user.firstName)
    })

    it('should fail to login', () => {
        // given
        const message = "Invalid username/password supplied"
        cy.intercept('POST', '**/users/signin', {
            statusCode: 422,
            body: {
                timestamp: "2023-01-15T11:40:41.590+00:00",
                status: 422,
                error: "Unprocessable Entity",
                message: message,
                path: "/users/signin"
            }
        })

        // when
        LoginScreen.attemptLogin('wrong', 'wrong')
       
        // then
        cy.get('.alert').should('have.text', message)
    })

})
