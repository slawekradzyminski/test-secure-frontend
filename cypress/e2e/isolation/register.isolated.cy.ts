/// <reference types="cypress" />

import { getRandomUser } from "../../util/userProvider"

describe('Register tests', () => {

    const testUser = getRandomUser()

    beforeEach(() => {
        cy.visit('http://localhost:8081/register')
    })

    it('should successfully register', () => {
        cy.intercept('POST', '**/users/signup', {
            statusCode: 201,
            body: {
                token: 'fakeToken'
            }
        })

        cy.get('[name=firstName]').type(testUser.firstName)
        cy.get('[name=lastName]').type(testUser.lastName)
        cy.get('[name=username]').type(testUser.username)
        cy.get('[name=password]').type(testUser.password)
        cy.get('[name=email]').type(testUser.email)
        cy.get('.btn-primary').click()

        cy.get('.alert-success').should('contain.text', 'Registration successful')
    })

    it('should fail to register and display user already in use', () => {
        const message = 'Username is already in use'

        cy.intercept('POST', '**/users/signup', {
            statusCode: 422,
            body: {
                error: "Unprocessable Entity",
                message: message,
                path: "/users/signup",
                status: 422,
                timestamp: "2022-09-12T12:29:14.127+00:00"
            }
        })

        cy.get('[name=firstName]').type(testUser.firstName)
        cy.get('[name=lastName]').type(testUser.lastName)
        cy.get('[name=username]').type(testUser.username)
        cy.get('[name=password]').type(testUser.password)
        cy.get('[name=email]').type(testUser.email)
        cy.get('.btn-primary').click()

        cy.get('.alert-danger').should('contain.text', message)
    })

    it('should handle 500', () => {
        cy.intercept('POST', '**/users/signup', {
            statusCode: 500
        })

        cy.get('[name=firstName]').type(testUser.firstName)
        cy.get('[name=lastName]').type(testUser.lastName)
        cy.get('[name=username]').type(testUser.username)
        cy.get('[name=password]').type(testUser.password)
        cy.get('[name=email]').type(testUser.email)
        cy.get('.btn-primary').click()

        cy.get('.alert-danger').should('contain.text', '')
    })

    it('should handle network error', () => {
        cy.intercept('POST', '**/users/signup', {
            forceNetworkError: true
        })

        cy.get('[name=firstName]').type(testUser.firstName)
        cy.get('[name=lastName]').type(testUser.lastName)
        cy.get('[name=username]').type(testUser.username)
        cy.get('[name=password]').type(testUser.password)
        cy.get('[name=email]').type(testUser.email)
        cy.get('.btn-primary').click()

        cy.get('.alert-danger').should('contain.text', '')
    })

    it('should show loading indicator', () => {
        cy.intercept('POST', '**/users/signup', {
            delay: 1000
        })

        cy.get('[name=firstName]').type(testUser.firstName)
        cy.get('[name=lastName]').type(testUser.lastName)
        cy.get('[name=username]').type(testUser.username)
        cy.get('[name=password]').type(testUser.password)
        cy.get('[name=email]').type(testUser.email)
        cy.get('.btn-primary').click()

        cy.get('.btn-primary .spinner-border').should('be.visible')
    })
})
