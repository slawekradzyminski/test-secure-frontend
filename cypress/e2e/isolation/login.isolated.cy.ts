/// <reference types="cypress" />

import LoginPage from "../../pages/LoginPage"
import { getRandomUser } from "../../utils/user"

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
        LoginPage.attemptLogin(user.username, user.password)

        // then
        cy.get('h1').should('contain.text', user.firstName)
    })

})
