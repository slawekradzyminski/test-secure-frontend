import { User } from "../domain/user";

export default class LoginMocks {

    static mockSuccessfulLogin(user: User) {
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

    static mockFailedLogin(message: string) {
        cy.intercept('POST', '**/users/signin', {
            statusCode: 422,
            body: {
                error: "Unprocessable Entity",
                message: message,
                path: "/users/signin",
                status: 422,
                timestamp: "2022-09-30T10:18:46.474+00:00"
            }
        })
    }

}