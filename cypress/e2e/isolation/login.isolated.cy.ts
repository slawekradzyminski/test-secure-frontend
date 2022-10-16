/// <reference types="cypress" />

import { getRandomUser } from "../../domain/user"
import { getRandomString } from "../../util/random"

describe('Login page tests in isolation', () => {
    beforeEach(() => {
        cy.visit('')
    })

    it('should show loading indicator', () => {
        cy.intercept('POST', '**/users/signin', {
            delay: 2000
        })
        cy.get('input[name=username]').type(getRandomString())
        cy.get('input[name=password]').type(getRandomString())
        cy.get('.btn-primary').click()

        cy.get('.btn-primary .spinner-border').should('be.visible')
    })

    it('should successfully login', () => {
        const user = getRandomUser()

        cy.intercept('POST', '**/users/signin', {
            statusCode: 200,
            body: {
                "username": user.username,
                "roles": user.roles,
                "firstName": user.firstName,
                "lastName": user.lastName,
                "token": "fakeToken",
                "email": user.email
            }
        })

        cy.intercept('GET', '**/users', {
            statusCode: 200,
            fixture: 'users.json'
        })

        cy.get('input[name=username]').type(user.username)
        cy.get('input[name=password]').type(user.password)
        cy.get('.btn-primary').click()

        cy.get('h1').should('contain.text', user.firstName)
    })

    it('should fail to login', () => {
        const message = 'Invalid username/password supplied'

        cy.intercept('POST', '**/users/signin', {
            statusCode: 422,
            body: {
                "timestamp": "2022-10-16T09:09:12.036+00:00",
                "status": 422,
                "error": "Unprocessable Entity",
                "message": message,
                "path": "/users/signin"
            }
        })
        cy.get('input[name=username]').type(getRandomString())
        cy.get('input[name=password]').type(getRandomString())
        cy.get('.btn-primary').click()

        cy.get('.alert').should('have.text', message)
        cy.url().should('contain', '/login')
    })

})
