import { User } from "../domain/user";

const postUserSignupUrl = '**/users/signup'

export const postUserSignup = {
    mockSuccess: (message: string) => {
        cy.intercept('POST', postUserSignupUrl, {
            statusCode: 201,
            body: {
                token: 'fakeToken'
            }
        })
    },

}
