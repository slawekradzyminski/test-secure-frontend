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


})
