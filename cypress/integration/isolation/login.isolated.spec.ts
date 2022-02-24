/// <reference types="cypress" />

import LoginPage from "../../pages/LoginPage"
import { getRandomEmail, getRandomString } from "../../util/random"
import { Roles } from "../../util/roles"

const loginPage = new LoginPage()

describe('Login page', () => {
    beforeEach(() => {
        cy.visit('')
    })

    it('should successfully login', () => {
        const username = getRandomString()
        const firstName = getRandomString()

        cy.intercept('GET', '**/users', { fixture: 'users.json' })
        cy.intercept('POST', '**/users/signin', {
            statusCode: 200,
            body: {
                email: getRandomEmail(),
                firstName: firstName,
                lastName: getRandomString(),
                roles: [Roles.ROLE_CLIENT],
                token: "fakeToken",
                username: username
            }
        })
        loginPage.attemptLogin(username, getRandomString())
        cy.get('h1').should('contain.text', firstName)
    })

    it('should display loading indicator while waiting for login response', () => {
        cy.intercept('POST', '**/users/signin', {
            delay: 2000
        })
        loginPage.attemptLogin('wrong', 'wrong')
        cy.get('.btn-primary .spinner-border').should('be.visible')
    })

})
