/// <reference types="cypress" />

import { getRandomUser } from '../../util/user';

describe('login page', () => {
    beforeEach(() => {
        cy.visit('http://localhost:8081')
    })

    it('should successfully login', () => {
        const user = getRandomUser()

        cy.intercept('POST', '**/users/signin', {
            statusCode: 200,
            body: {
                firstName: user.firstName,
                lastName: user.lastName,
                username: user.username,
                token: 'fakeJwtToken',
                email: user.email,
                roles: user.roles
            }
        })

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
                error: "Unprocessable Entity",
                message: message,
                path: "/users/signin",
                status: 422,
                timestamp: "2022-05-12T13:28:20.286+00:00"
            }
        })

        cy.get('[name=username]').type('wrong')
        cy.get('[name=password]').type('wrong')
        cy.get('.btn-primary').click()

        cy.get('.alert')
            .should('contain.text', message)
            .should('have.class', 'alert-danger')
    })


})
