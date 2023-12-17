/// <reference types="cypress" />

import { getLoginResponseFrom } from "../../domain/api/login"
import { getRandomUser } from "../../generator/userGenerator"

describe('Login page tests in isolation', () => {
    beforeEach(() => {
        cy.visit('')
    })

    it('clicking on Register button should correctly redirect', () => {
        cy.get('.btn-link').click()
        cy.url().should('contain', 'register')
    })

    it('should successfully login', () => {
        // given
        const user = getRandomUser()
        cy.intercept('POST', '/users/signin', {
            statusCode: 200,
            body: getLoginResponseFrom(user)
        }).as('loginRequest')
        cy.intercept('GET', '**/users', { fixture: 'users.json' })

        // when
        cy.get('[name=username]').type(user.username)
        cy.get('[name=password]').type(user.password)
        cy.get('.btn-primary').click()

        // then
        cy.get('h1').contains(user.firstName)
        cy.get('@loginRequest').its('request.body').should('deep.equal', {
            username: user.username,
            password: user.password
        })
    })

    it('should fail to login if credentials are wrong', () => {
        // given
        const errorMessage = "Invalid username/password supplied"
        const user = getRandomUser()
        cy.intercept('POST', '/users/signin', {
            statusCode: 422,
            body: {
                timestamp: "2023-12-17T09:42:41.140+00:00",
                status: 422,
                error: "Unprocessable Entity",
                message: errorMessage,
                path: "/users/signin"
            }
        })

        // when
        cy.get('[name=username]').type(user.username)
        cy.get('[name=password]').type(user.password)
        cy.get('.btn-primary').click()

        // then
        cy.get('.alert-danger').should('have.text', errorMessage)
        cy.url().should('contain', '/login')
    })

    it('should trigger frontend validation', () => {
        // when
        cy.get('.btn-primary').click()

        // then
        cy.get('.invalid-feedback').should('have.length', 2)
        cy.get('.invalid-feedback').each(($validationErrorMessage): void => {
            cy.wrap($validationErrorMessage).should('have.text', 'Required field length is 4 or more')
        })
        cy.get('input').each(($input): void => {
            cy.wrap($input).should('have.class', 'is-invalid')
        })
    })

})
