/// <reference types="cypress" />

import { getRandomUser } from "../../util/userProvider"

describe('Login page isolated tests', () => {
    beforeEach(() => {
        cy.visit('http://localhost:8081')
    })

    it('should successfully login', () => {
        // given
        const user = getRandomUser()
        cy.intercept('POST', '**/users/signin', {
            statusCode: 200,
            body: {
                username: user.username,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                token: 'fakeToken',
                roles: user.roles
            }
        })
        cy.intercept('GET', '**/users', { fixture: 'users.json' })

        // when
        cy.get('input[name=username]').type(user.username)
        cy.get('input[name=password]').type(user.password)
        cy.get('.btn-primary').click()

        // then
        cy.get('h1').should('contain.text', user.firstName)
    })

    // it('should show user already in use error message', () => {
    // })

})
