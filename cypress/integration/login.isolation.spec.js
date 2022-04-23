/// <reference types="cypress" />

import { getRandomString } from "../util/random"


describe('login page', () => {
    beforeEach(() => {
        cy.visit('')
    })

    it('should successfully login', () => {
        const username = getRandomString()
        const firstName = getRandomString()

        cy.intercept('POST', '**/users/signin', {
            statusCode: 200,
            body: {
                username: username,
                "roles": [
                    "ROLE_ADMIN",
                ],
                firstName: firstName,
                lastName: "Radzyminski",
                token: "fakeToken",
                email: "admin@email.com"
            }
        })

        cy.intercept('GET', '**/users', { fixture: 'users.json' })

        cy.get('[name=username]').type(username)
        cy.get('[name=password]').type(getRandomString())
        cy.get('.btn-primary').click()

        cy.get('h1').should('contain.text', firstName)
    })

    it('should fail to login', () => {
        // given
        const message = 'Invalid username/password supplied'
        const username = getRandomString()
        const password = getRandomString()

        cy.intercept('POST', '**/users/signin', {
            statusCode: 422,
            body: {
                timestamp: "2022-04-23T09:21:45.745+00:00",
                status: 422,
                error: "Unprocessable Entity",
                message: message,
                path: "/users/signin"
            }
        }).as('loginRequest')

        // when
        cy.get('[name=username]').type(username)
        cy.get('[name=password]').type(password)
        cy.get('.btn-primary').click()

        // then
        cy.get('.alert').should('have.text', message)
        cy.wait('@loginRequest').its('request.body').should('deep.equal', {
            username: username,
            password: password
        })
    })

    it('should display loading indicator after clicking signin', () => {
        // given
        cy.intercept('POST', '**/users/signin', { delay: 1000 }).as('loginRequest')

        // when
        cy.get('[name=username]').type(getRandomString())
        cy.get('[name=password]').type(getRandomString())
        cy.get('.btn-primary').click()

        // then
        cy.get('.btn-primary > .spinner-border').should('be.visible')
    })

})
