/// <reference types="cypress" />

import { getRandomUser } from '../../util/user';

describe('login page', () => {
    beforeEach(() => {
        cy.visit('http://localhost:8081/register')
    })

    it('should successfully register', () => {
        const user = getRandomUser()

        cy.intercept('POST', '**/users/signup', {
            statusCode: 201,
            body: {
                token: 'fakeToken'
            }
        })

        cy.get('[name=firstName]').type(user.firstName)
        cy.get('[name=lastName]').type(user.lastName)
        cy.get('[name=username]').type(user.username)
        cy.get('[name=password]').type(user.password)
        cy.get('[name=email]').type(user.email)

        cy.get('.btn-primary').click()

        cy.get('.alert')
            .should('have.text', 'Registration successful')
            .should('have.class', 'alert-success')
    })

    it('should fail to login', () => {
        const message = "Username is already in use"
        const user = getRandomUser()

        cy.intercept('POST', '**/users/signup', {
            statusCode: 422,
            body: {
                error: "Unprocessable Entity",
                message: message,
                path: "/users/signup",
                status: 422,
                timestamp: "2022-05-13T06:06:58.055+00:00"
            }
        })

        cy.get('[name=firstName]').type(user.firstName)
        cy.get('[name=lastName]').type(user.lastName)
        cy.get('[name=username]').type(user.username)
        cy.get('[name=password]').type(user.password)
        cy.get('[name=email]').type(user.email)

        cy.get('.btn-primary').click()

        cy.get('.alert')
            .should('have.text', message)
            .should('have.class', 'alert-danger')
    })

})
