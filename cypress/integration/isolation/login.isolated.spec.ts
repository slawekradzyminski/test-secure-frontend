/// <reference types="cypress" />

import LoginPage from "../../pages/LoginPage"
import { getRandomUser } from "../../util/user"

const loginPage = new LoginPage()

describe('login page', () => {
    beforeEach(() => {
        cy.visit('http://localhost:8081')
    })

    it('should successfully login', () => {
        const user = getRandomUser()

        cy.intercept('POST', '**/users/signin', {
            statusCode: 200,
            body: {
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                roles: user.roles,
                token: 'fakeJwtToken',
                username: user.username
            }
        })

        loginPage.attemptLogin(user.username, user.password)

        cy.get('h1').should('contain.text', user.firstName)
    })

    it('should fail to login', () => {
        const message = 'Invalid username/password supplied'

        cy.intercept('POST', '**/users/signin', {
            statusCode: 422,
            body: {
                error: "Unprocessable Entity",
                message: message,
                path: "/users/signin",
                status: 422,
                timestamp: "2022-05-14T13:46:33.767+00:00"
            }
        })

        loginPage.attemptLogin('wrong', 'wrong')

        cy.get('.alert')
            .should('have.text', message)
            .and('have.class', 'alert-danger')

    })

    it('should show loading indicator', () => {
        cy.intercept('POST', '**/users/signin', {
            delay: 2000
        })

        loginPage.attemptLogin('username', 'password')
    })

})
