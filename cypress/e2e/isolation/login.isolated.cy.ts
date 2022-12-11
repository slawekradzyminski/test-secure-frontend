/// <reference types="cypress" />

import { getRandomUser } from "../../utils/user"

describe('Login page tests is isolation', () => {
    beforeEach(() => {
        cy.visit('http://localhost:8081')
    })

    it('should successfully login', () => {
        const user = getRandomUser()

        cy.intercept('POST', '**/users/signin', {
            statusCode: 200,
            body: {
                username: user.username,
                roles: user.roles,
                firstName: user.firstName,
                lastName: user.lastName,
                token: 'fakeToken',
                email: user.email
            }
        })

        cy.get("input[name='username']").type(user.username)
        cy.get("input[name='password']").type(user.password)
        cy.get('.btn-primary').click()

        cy.get('h1').should('contain.text', user.firstName)
    })

})
