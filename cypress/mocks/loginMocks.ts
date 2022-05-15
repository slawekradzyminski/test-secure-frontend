import { Method } from "../util/httpMethods"
import { User } from "../util/user"

const loginUrl = '**/users/signin'

export const loginRequest = 'loginRequest'

export const mockLoginDelay = () => {
    cy.intercept(Method.POST, loginUrl, {
        delay: 2000
    })
}

export const mockLoginFailure = (message: string) => {
    cy.intercept(Method.POST, loginUrl, {
        statusCode: 422,
        body: {
            error: "Unprocessable Entity",
            message: message,
            path: "/users/signin",
            status: 422,
            timestamp: "2022-05-14T13:46:33.767+00:00"
        }
    })
}

export const mockLoginSuccess = (user: User) => {
    cy.intercept(Method.POST, loginUrl, {
        statusCode: 200,
        body: {
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            roles: user.roles,
            token: 'fakeJwtToken',
            username: user.username
        }
    }).as(loginRequest)
}