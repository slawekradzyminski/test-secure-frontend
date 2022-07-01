import { User } from "../util/user";

export const mockSuccessfulLogin = (user: User) => {
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
    }).as('loginRequest')
}

export const mockFailedLogin = () => {
    cy.intercept('POST', '**/users/signin', {
        statusCode: 422,
        body: {
            error: "Unprocessable Entity",
            message: "Invalid username/password supplied",
            path: "/users/signin",
            status: 422,
            timestamp: "2022-06-30T13:48:09.648+00:00"
        }
    })
}