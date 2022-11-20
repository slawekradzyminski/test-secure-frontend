import { User } from "../utils/user"

export default class LoginMock {

    static mockSuccess = (user: User) => {
        cy.intercept('POST', '**/users/signin', {
            statusCode: 200,
            body: {
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                roles: user.roles,
                username: user.username,
                token: 'fakeToken'
            }
        }).as('loginRequest')
    }

    static mockFailure = (message: string) => {
        cy.intercept('POST', '**/users/signin', {
            statusCode: 422,
            body: {
                timestamp: "2022-11-19T14:26:08.639+00:00",
                status: 422,
                error: "Unprocessable Entity",
                message: message,
                path: "/users/signin"
            }
        })
    }

}