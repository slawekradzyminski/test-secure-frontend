/// <reference types="cypress" />

import { getRandomUser } from "../../util/user"

describe('login page is isolation', () => {
    beforeEach(() => {
        cy.visit('http://localhost:8081')
    })

    it('should successfully login', () => {
        // given
        const user = getRandomUser()

        cy.intercept('POST', '**/users/signin', {
            statusCode: 200,
            body: {
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                roles: user.roles,
                token: "fakeToken",
                username: user.username
            }
        })

        // when
        cy.getById('username').type(user.username)
        cy.getById('password').type(user.password)
        cy.get('.btn-primary').click()

        // then
        cy.get('h1').should('contain.text', user.firstName)
    })

    it('should fail to login', () => {
        // given
        cy.intercept('POST', '**/users/signin', {
            statusCode: 422,
            body: {
                error: "Unprocessable Entity",
                message: "Invalid username/password supplied",
                path: "/users/signin",
                status: 422,
                timestamp: "2022-06-30T13:48:09.648+00:00"
            }
        })
 
        // when
        cy.getById('username').type('wrong')
        cy.getById('password').type('wrong')
        cy.get('.btn-primary').click()

        // then
        cy.get('.alert').should('contain.text', 'Invalid username/password')
            .and('have.class', 'alert-danger')
    })

    it('should handle network error', () => {
        // given
        cy.intercept('POST', '**/users/signin', {
            delay: 2000
        })
 
        // when
        cy.getById('username').type('wrong')
        cy.getById('password').type('wrong')
        cy.get('.btn-primary').click()

        // then
        cy.get('.btn-primary .spinner-border').should('be.visible')
    })

})
