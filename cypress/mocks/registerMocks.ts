import { HttpMethod } from "../util/httpMethods";

const registerUrl = '**/users/signup'
export const registerRequestAlias = 'registerRequest'

export const mockRegister = () => {
    cy.intercept(HttpMethod.POST, registerUrl, {
        statusCode: 201,
        body: {
            "token": "fakeToken"
        }
    }).as(registerRequestAlias)
}

export const mockFailedRegister = () => {
    cy.intercept(HttpMethod.POST, registerUrl, {
        statusCode: 422,
        body: {
            timestamp: "2022-06-12T07:19:02.601+00:00",
            status: 422,
            error: "Unprocessable Entity",
            message: "Username is already in use",
            path: "/users/signup"
        }
    }).as(registerRequestAlias)
}

export const mockDelayedRegisterResponse = () => {
    cy.intercept(HttpMethod.POST, registerUrl, {
        delay: 2000
    })
}