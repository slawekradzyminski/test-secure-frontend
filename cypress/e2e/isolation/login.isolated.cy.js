/// <reference types="cypress" />

import { actionAlert } from "../../components/alert"
import { getRandomUser } from "../../generator/user"
import { loginPage } from "../../pages/loginPage"
import users from "../../fixtures/users.json"

describe('Login page tests', () => {
    beforeEach(() => {
        cy.visit('http://localhost:8081')
    })

    it('should successfully login', () => {
        // given
        const user = getRandomUser()
        cy.intercept('POST', '**/users/signin', {
            statusCode: 200,
            body: {
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                username: user.username,
                roles: user.roles,
                token: 'fakeToken'
            },
        })
        cy.intercept('GET', '**/users', { fixture: 'users.json' })

        // when
        loginPage.attemptLogin(user.username, user.password)

        // then
        cy.get('h1').should('contain.text', user.firstName)
        cy.get('li').should('have.length', users.length)
        cy.get('li').each(($row, i) => {
            cy.wrap($row).should('contain.text', `${users[i].firstName} ${users[i].lastName}`)
        })
    })

    it('should fail to login', () => {
        // given
        const errorMessage = "Invalid username/password supplied"
        cy.intercept('POST', '**/users/signin', {
            statusCode: 422,
            body: {
                timestamp: "2023-10-29T14:24:06.248+00:00",
                status: 422,
                error: "Unprocessable Entity",
                message: errorMessage,
                path: "/users/signin"
            },
        })

        // when
        loginPage.attemptLogin('wrong', 'wrong')

        // then
        actionAlert.verifyFailure(errorMessage)
    })

})

