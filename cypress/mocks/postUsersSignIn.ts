import { buildLoginResponse } from "../utils/login"
import { User } from "../utils/user"

const urlPattern = '**/users/signin'

export const postUserSignInMocks = {

    mockSuccess: (user: User) => {
        cy.intercept('POST', urlPattern, {
            statusCode: 200,
            body: buildLoginResponse(user)
        })
    },

    mockFailure: (errorMessage: string) => {
        cy.intercept('POST', urlPattern, {
            statusCode: 422,
            body: {
                timestamp: "2023-05-22T13:36:58.058+00:00",
                status: 422,
                error: "Unprocessable Entity",
                message: errorMessage,
                path: "/users/signin"
            }
        })

    }

}