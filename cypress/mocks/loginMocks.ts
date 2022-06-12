import { HttpMethod } from "../util/httpMethods";
import { User } from "../util/user";

const loginUrl = '**/users/signin'
export const loginRequestAlias = 'loginRequest'

export const mockSuccessfulLogin = (user: User) => {
    cy.intercept(HttpMethod.POST, loginUrl, {
        statusCode: 200,
        body: {
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            roles: user.roles,
            token: "fakeToken",
            username: user.username
        }
    }).as(loginRequestAlias)
}

export const mockFailedLogin = (message: string) => {
    cy.intercept(HttpMethod.POST, loginUrl, {
        statusCode: 422,
        body: {
            error: "Unprocessable Entity",
            message: message,
            path: "/users/signin",
            status: 422,
            timestamp: "2022-06-12T05:57:11.895+00:00"
        }
    })
}

export const mockDelayedLoginResponse = () => {
    cy.intercept(HttpMethod.POST, loginUrl, {
        delay: 2000
    })
}