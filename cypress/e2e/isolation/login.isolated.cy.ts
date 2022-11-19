/// <reference types="cypress" />

import { getRandomUser } from "../../utils/user"

describe('login tests in isolation', () => {
    beforeEach(() => {
        cy.visit('/')
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
                username: user.username,
                token: 'fakeToken'
            }
        })
        cy.intercept('GET', '**/users', { statusCode: 200, fixture: 'users.json' })

        cy.get('[name=username]').type(user.username)
        cy.get('[name=password]').type(user.password)
        cy.get('.btn-primary').click()

        cy.get('h1').should('contain.text', user.firstName)
    })

    it('should fail to login', () => {
        const message = "Invalid username/password supplied"

        cy.intercept('POST', '**/users/signin', {
            statusCode: 422,
            body: {
                timestamp: "2022-11-19T14:26:08.639+00:00",
                status: 422,
                error: "Unprocessable Entity",
                message: message,
                path: "/users/signin"
            }
        })

        cy.get('[name=username]').type('wrong')
        cy.get('[name=password]').type('wrong')
        cy.get('.btn-primary').click()

        cy.get('.alert-danger').should('have.text', message)
    })

})
