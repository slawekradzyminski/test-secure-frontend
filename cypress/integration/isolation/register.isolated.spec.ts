/// <reference types="cypress" />

import { getRandomUser } from '../../util/user';

describe('register page with mocks', () => {
    beforeEach(() => {
        cy.visit('http://localhost:8081/register')
    })

    it('should successfully register', () => {
        const user = getRandomUser()

        cy.intercept('POST', '**/users/signup', {
            statusCode: 201,
            body: {
                token: 'fakeJwtToken'
            }
        })

        cy.get('[name=username]').type(user.username)
        cy.get('[name=firstName]').type(user.firstName)
        cy.get('[name=lastName]').type(user.lastName)
        cy.get('[name=password]').type(user.password)
        cy.get('[name=email]').type(user.email)
        cy.get('.btn-primary').click()

        cy.get('.alert')
            .should('have.text', 'Registration successful')
            .and('have.class', 'alert-success')
    })

    it('should fail to register', () => {
        const message = "Username is already in use"

        cy.intercept('POST', '**/users/signup', {
            statusCode: 422,
            body: {
                error: "Unprocessable Entity",
                message: message,
                path: "/users/signup",
                status: 422,
                timestamp: "2022-05-15T06:26:29.700+00:00"
            }
        })

        const user = getRandomUser()
        cy.get('[name=username]').type(user.username)
        cy.get('[name=firstName]').type(user.firstName)
        cy.get('[name=lastName]').type(user.lastName)
        cy.get('[name=password]').type(user.password)
        cy.get('[name=email]').type(user.email)
        cy.get('.btn-primary').click()

        cy.get('.alert')
            .should('have.text', message)
            .and('have.class', 'alert-danger')
    })

    it('should not crash when there is network error', () => {
        cy.intercept('POST', '**/users/signup', {
            forceNetworkError: true
        })

        const user = getRandomUser()
        cy.get('[name=username]').type(user.username)
        cy.get('[name=firstName]').type(user.firstName)
        cy.get('[name=lastName]').type(user.lastName)
        cy.get('[name=password]').type(user.password)
        cy.get('[name=email]').type(user.email)
        cy.get('.btn-primary').click()

        cy.url().should('contain', '/register')
    })

    it('should show loading indicater after clicking register', () => {
        cy.intercept('POST', '**/users/signup', {
            delay: 2000
        })

        const user = getRandomUser()
        cy.get('[name=username]').type(user.username)
        cy.get('[name=firstName]').type(user.firstName)
        cy.get('[name=lastName]').type(user.lastName)
        cy.get('[name=password]').type(user.password)
        cy.get('[name=email]').type(user.email)
        cy.get('.btn-primary').click()

        cy.get('.btn-primary .spinner-border').should('be.visible')
    })

})
