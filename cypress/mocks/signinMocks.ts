import { getLoginResponse } from "../domain/login"

const signinEndpoint = '**/signin'

export const signinMocks = {
    successfulLogin: () => {
        cy.intercept('POST', signinEndpoint, {
            statusCode: 200,
            body: getLoginResponse()
        }).as('loginRequest')
    },

    failedLogin: (message: string) => {
        cy.intercept('POST', signinEndpoint, {
            statusCode: 422,
            body: {
                error: 'Unprocessable Entity',
                message: message,
            }
        })
    },

    delayedLogin: () => {
        cy.intercept('POST', signinEndpoint, {
            statusCode: 200,
            body: getLoginResponse(),
            delay: 2000
        }).as('loginRequest')
    }
}