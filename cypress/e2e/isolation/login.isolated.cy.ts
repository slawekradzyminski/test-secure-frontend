/// <reference types="cypress" />

import { getRandomUser } from "../../utils/user"

describe('Login page tests is isolation', () => {
    beforeEach(() => {
        cy.visit('http://localhost:8081')
    })

    it.only('should successfully login', () => {
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
        }).as('loginRequest')

        cy.intercept('GET', '**/users', { fixture: 'users.json' })

        cy.get("input[name='username']").type(user.username)
        cy.get("input[name='password']").type(user.password)
        cy.get('.btn-primary').click()

        cy.get('h1').should('contain.text', user.firstName)
        cy.wait('@loginRequest').its('request.body').should('deep.equal', {
            username: user.username,
            password: user.password
        })
    })

    it('should fail to login with wrong credentials', () => {
        const errorMessage = "Invalid username/password supplied"

        cy.intercept('POST', '**/users/signin', {
            statusCode: 422,
            body: {
                error: "Unprocessable Entity",
                message: errorMessage,
                path: "/users/signin",
                status: 422,
                timestamp: "2022-12-11T11:19:58.380+00:00"
            }
        })

        cy.get("input[name='username']").type('wrong')
        cy.get("input[name='password']").type('wrong')
        cy.get('.btn-primary').click()

        cy.get('.alert-danger').should('contain.text', errorMessage)
    })


})
