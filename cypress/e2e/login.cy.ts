/// <reference types="cypress" />

import { getRandomUser } from "../domain/user"

describe('example to-do app', () => {
    beforeEach(() => {
        cy.visit('http://localhost:8081')
    })

    it('should successfully login', () => {
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

        cy.intercept('GET', '**/users', { fixture: 'users.json' })

        cy.get('[name=username]').type(user.username)
        cy.get('[name=password]').type(user.password)
        cy.get('.btn-primary').click()

        cy.get('h1').should('contain.text', user.firstName)
    })


})
