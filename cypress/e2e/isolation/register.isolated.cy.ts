/// <reference types="cypress" />

import { Roles } from "../../domain/roles"
import { getRandomUser } from "../../utils/user"

describe('register tests in isolation', () => {
    beforeEach(() => {
        cy.visit('/register')
    })

    it('should successfully register', () => {
        const user = getRandomUser()

        cy.intercept('POST', '**/users/signup', {
            statusCode: 201,
            body: {
                token: 'fakeToken'
            }
        }).as('registerRequest')

        cy.get('[name=username]').type(user.username)
        cy.get('[name=password]').type(user.password)
        cy.get('[name=firstName]').type(user.firstName)
        cy.get('[name=lastName]').type(user.lastName)
        cy.get('[name=email]').type(user.email)
        cy.get('.btn-primary').click()

        cy.url().should('contain', 'login')
        cy.wait('@registerRequest').its('request.body').should('deep.equal', {
            username: user.username,
            password: user.password,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            roles: [Roles.ROLE_CLIENT]
        })
 
    })

    it('should fail to register', () => {
        const user = getRandomUser()
        const message = "Username is already in use"

        cy.intercept('POST', '**/users/signup', {
            statusCode: 422,
            body: {
                timestamp: "2022-11-19T14:26:08.639+00:00",
                status: 422,
                error: "Unprocessable Entity",
                message: message,
                path: "/users/signin"
            }
        })

        cy.get('[name=username]').type(user.username)
        cy.get('[name=password]').type(user.password)
        cy.get('[name=firstName]').type(user.firstName)
        cy.get('[name=lastName]').type(user.lastName)
        cy.get('[name=email]').type(user.email)
        cy.get('.btn-primary').click()

        cy.get('.alert-danger').should('have.text', message)
    })

})
