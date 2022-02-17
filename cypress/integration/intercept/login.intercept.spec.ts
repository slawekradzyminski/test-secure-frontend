/// <reference types="cypress" />

import HomePageAssertions from "../../assertions/homePageAssertions"
import LoginPage from "../../pages/loginPage"
import { getUser } from "../../util/userProvider"

const loginPage = new LoginPage()
const homePageAssertions = new HomePageAssertions()

const user = getUser()

describe('Login page with mocks', () => {
    const users = require("../../fixtures/users.json")

    beforeEach(() => {
        cy.visitWithUsers('')
    })

    it('should successfully login', () => {
        const firstName = 'Slawomir'

        cy.intercept('POST', '**/users/signin', {
            statusCode: 200,
            body: {
                email: user.email,
                firstName: firstName,
                lastName: user.lastName,
                roles: user.roles,
                token: "fakeToken",
                username: user.username
            }
        })

        loginPage.login(user.username, user.password)
        homePageAssertions.verifyHeader(firstName)
        cy.get('ul li').should('have.length', users.length)
        cy.get('ul li').first().should('contain.text', `${users[0].firstName} ${users[0].lastName}`)

        cy.percySnapshot()
    })

    it('should fail to login', () => {
        const message = "Invalid username/password supplied"

        cy.intercept('POST', '**/users/signin', {
            statusCode: 422,
            body: {
                error: "Unprocessable Entity",
                message: message,
                path: "/users/signin",
                status: 422,
                timestamp: "2022-02-17T10:17:34.135+00:00"
            }
        })

        loginPage.login('wrong', 'wrong')
        loginPage.alert()
            .should('have.text', message)
            .should('have.class', 'alert-danger')
    })

})
