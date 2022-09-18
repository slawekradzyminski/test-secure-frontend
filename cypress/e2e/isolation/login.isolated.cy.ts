/// <reference types="cypress" />

import { getRandomString } from "../../util/random"
import { getRandomUser } from "../../util/userProvider"

describe('Login page isolated tests', () => {
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
        cy.get('input[name=username]').type(user.username)
        cy.get('input[name=password]').type(user.password)
        cy.get('.btn-primary').click()

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
        cy.get('input[name=username]').type(getRandomString())
        cy.get('input[name=password]').type(getRandomString())
        cy.get('.btn-primary').click()

        // then
        cy.get('.alert-danger').should('have.text', message)
    })

})
