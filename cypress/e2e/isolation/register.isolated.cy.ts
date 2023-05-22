/// <reference types="cypress" />

import { getUser } from "../../utils/user"

describe('[ISOLATION] Register page tests', () => {
    beforeEach(() => {
        cy.visit('http://localhost:8081/register')
    })

    it('should successfully register', () => {
        // given
        const user = getUser()
        cy.intercept('POST', '**/users/signup', {
            statusCode: 201,
            body: {
                token: 'fakeToken'
            }
        })

        // when
        cy.get('[name=username]').type(user.username)
        cy.get('[name=firstName]').type(user.firstName)
        cy.get('[name=lastName]').type(user.lastName)
        cy.get('[name=password]').type(user.password)
        cy.get('[name=email]').type(user.email)
        cy.get('.btn-primary').click()

        // then
        cy.get('.alert').should('have.text', 'Registration successful')
        cy.url().should('contain', '/login')
    })

    it('should fail to register if username already in use', () => {
        // given
        const errorMessage = 'Username is already in use'
        const user = getUser()
        cy.intercept('POST', '**/users/signup', {
            statusCode: 422,
            body: {
                timestamp: "2023-05-22T13:36:58.058+00:00",
                status: 422,
                error: "Unprocessable Entity",
                message: errorMessage,
                path: "/users/signin"
            }
        })

        // when
        cy.get('[name=username]').type(user.username)
        cy.get('[name=firstName]').type(user.firstName)
        cy.get('[name=lastName]').type(user.lastName)
        cy.get('[name=password]').type(user.password)
        cy.get('[name=email]').type(user.email)
        cy.get('.btn-primary').click()

        // then
        cy.get('.alert').should('have.text', errorMessage)
    })


})
