import { getLoginResponseFor } from "../domain/http/login"
import { User } from "../domain/user"

export const loginMocks = {

    mockSuccessfulLogin: (user: User) => {
        cy.intercept('POST', '**/users/signin', {
            statusCode: 200,
            body: getLoginResponseFor(user)
        })
    },

    mockFailedLogin: (message: string) => {
        cy.intercept('POST', '**/users/signin', {
            statusCode: 422,
            body: {
                error: "Unprocessable Entity",
                message: message,
                path : "/users/signin",
                status: 422,
                timestamp : "2024-03-23T13:45:53.051+00:00"
            }
        })
    }

}