/// <reference types="cypress" />

import AlertsValidator from "../components/AlertsValidator"
import RegisterPage from "../pages/RegisterPage"
import { getAlias } from "../util/requestUtil"
import { Roles } from "../util/roles"
import { getRandomUser, User } from "../util/user"

const registerPage = new RegisterPage()
const alertsValidator = new AlertsValidator()
const registerRequest = 'registerRequest'

const mockSuccessfulRegister = () => {
    cy.intercept('POST', '**/users/signup', {
        statusCode: 201,
        body: {
            token: 'fakeToken'
        }
    }).as(registerRequest)
}

const mockFailedRegister = (errorMessage: string) => {
    cy.intercept('POST', '**/users/signup', {
        statusCode: 422,
        body: {
            error: "Unprocessable Entity",
            message: errorMessage,
            path: "/users/signup",
            status: 422,
            timestamp: "2022-05-28T12:13:53.758+00:00"
        }
    })
}

const verifyRequestBody = (user: User) => {
    cy.wait(getAlias(registerRequest)).its('request.body').should('deep.equal', {
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        password: user.password,
        roles: [Roles.ROLE_CLIENT]
    })
}

describe('register', () => {
    let user: User

    beforeEach(() => {
        cy.visit('http://localhost:8081/register')
        user = getRandomUser()
    })

    it('should successfully register', () => {
        // given
        mockSuccessfulRegister()

        // when
        registerPage.attemptRegister(user)

        // then
        verifyRequestBody(user)
        alertsValidator.checkSuccess('successful')
    })


    it('should fail to register register', () => {
        // given
        const errorMessage = "Username is already in use"
        mockFailedRegister(errorMessage)

        // when
        registerPage.attemptRegister(user)

        // then
        alertsValidator.checkFailure(errorMessage)
    })

})
