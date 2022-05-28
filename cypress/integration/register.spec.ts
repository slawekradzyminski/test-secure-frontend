/// <reference types="cypress" />

import { getRandomUser } from "../util/user"

describe('register', () => {
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

        cy.get('[name=username]').type(user.username)
        cy.get('[name=password]').type(user.password)
        cy.get('[name=firstName]').type(user.firstName)
        cy.get('[name=lastName]').type(user.lastName)
        cy.get('[name=email]').type(user.email)
        cy.get('.btn-primary').click()

        cy.get('.alert').should('contain.text', 'successful')
            .and('have.class', 'alert-success')
    })


    it('should fail to register register', () => {
        const user = getRandomUser()
        cy.intercept('POST', '**/users/signup', {
            statusCode: 422,
            body: {
                error: "Unprocessable Entity",
                message: "Username is already in use",
                path: "/users/signup",
                status: 422,
                timestamp: "2022-05-28T12:13:53.758+00:00"
            }
        })

        cy.get('[name=username]').type(user.username)
        cy.get('[name=password]').type(user.password)
        cy.get('[name=firstName]').type(user.firstName)
        cy.get('[name=lastName]').type(user.lastName)
        cy.get('[name=email]').type(user.email)
        cy.get('.btn-primary').click()

        cy.get('.alert').should('contain.text', 'Username is already in use')
            .and('have.class', 'alert-danger')
    })

})
