import { Method } from "../util/httpMethods"

const registerUrl = '**/users/signup'

export const mockRegisterDelay = () => {
    cy.intercept(Method.POST, registerUrl, {
        delay: 2000
    })
}

export const mockRegisterNetworkError = () => {
    cy.intercept(Method.POST, registerUrl, {
        forceNetworkError: true
    })
}

export const mockRegisterFailure = (message: string) => {
    cy.intercept(Method.POST, registerUrl, {
        statusCode: 422,
        body: {
            error: "Unprocessable Entity",
            message: message,
            path: "/users/signup",
            status: 422,
            timestamp: "2022-05-15T06:26:29.700+00:00"
        }
    })
}

export const mockRegisterSuccess = () => {
    cy.intercept(Method.POST, registerUrl, {
        statusCode: 201,
        body: {
            token: 'fakeJwtToken'
        }
    })
}