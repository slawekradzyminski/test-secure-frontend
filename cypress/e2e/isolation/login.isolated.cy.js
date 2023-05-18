/// <reference types="cypress" />

import { generateUser } from "../../utils/user"

describe('[ISOLATION] Login page', () => {
    beforeEach(() => {
        cy.visit('http://localhost:8081')
    })

    it('should successfully login', () => {
        // given
        const user = generateUser()
        cy.intercept('POST', '**/users/signin', {
            statusCode: 200,
            body: {
                username: user.username,
                roles: user.roles,
                firstName: user.firstName,
                lastName: user.lastName,
                token: "CypressTestToken",
                email: user.email
            }
        })
        cy.intercept('GET', '**/users', { fixture: 'users.json' })

        // when
        cy.login(user.username, user.password)

        // 
        cy.get('h1').should('contain.text', user.firstName)
    })

    it.only('should not login', () => {
        // given
        const user = generateUser()
        const message = "Invalid username/password supplied"
        cy.intercept('POST', '**/users/signin', {
            statusCode: 422,
            body: {
                error: "Unprocessable Entity",
                message: message,
                path: "/users/signin",
                status: 422,
                timestamp: "2023-05-18T12:55:42.025+00:00"
            }
        })

        // when
        cy.login(user.username, user.password)

        //
        cy.get('.alert').should('have.text', message)
    })


})
