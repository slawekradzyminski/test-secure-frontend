/// <reference types="cypress" />

import { buildLoginResponse } from "../../utils/login"
import { getUser } from "../../utils/user"

describe('[ISOLATION] Login page tests', () => {
    beforeEach(() => {
        cy.visit('http://localhost:8081')
    })

    it('should successfully login', () => {
        // given
        const user = getUser()
        cy.intercept('POST', '**/users/signin', {
            statusCode: 200,
            body: buildLoginResponse(user)
        })
        cy.intercept('GET', '**/users', { fixture: 'users.json' })

        // when
        cy.get('[name=username]').type(user.username)
        cy.get('[name=password]').type(user.password)
        cy.get('.btn-primary').click()

        // then
        cy.get('h1').should('contain.text', user.firstName)
    })


    it('should fail to login if wrong username and password provided', () => {
        // given
        const errorMessage = "Invalid username/password supplied"
        cy.intercept('POST', '**/users/signin', {
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
        cy.get('[name=username]').type('wrong')
        cy.get('[name=password]').type('wrong')
        cy.get('.btn-primary').click()

        // then
        cy.get('.alert').should('have.text', errorMessage)
    })

})
