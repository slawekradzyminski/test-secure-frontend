import { getLoginResponseFrom } from "../domain/api/login"
import { User } from "../domain/user"

const endpoint = '/users/signin'

export const loginMocks = {
    mockSuccessfulLogin: (user: User) => {
        cy.intercept('POST', endpoint, {
            statusCode: 200,
            body: getLoginResponseFrom(user)
        }).as('loginRequest')
    },

    mockInvalidCredentials: (errorMessage: string) => {
        cy.intercept('POST', endpoint, {
            statusCode: 422,
            body: {
                timestamp: "2023-12-17T09:42:41.140+00:00",
                status: 422,
                error: "Unprocessable Entity",
                message: errorMessage,
                path: "/users/signin"
            }
        })
    }
}