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

})
