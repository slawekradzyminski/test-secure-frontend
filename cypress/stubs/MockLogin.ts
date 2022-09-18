
import { User } from "../util/userProvider";

export default class MockLogin {

    private static url = 'users/signin'

    static mockSuccessfulLogin(user: User) {
        cy.intercept('POST', `**/${this.url}`, {
            statusCode: 200,
            body: {
                username: user.username,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                token: 'fakeToken',
                roles: user.roles
            }
        }).as('loginRequest')
    }

    static mockFailedLogin(message: string) {
        cy.intercept('POST', `**/${this.url}`, {
            statusCode: 422,
            body: {
                error: "Unprocessable Entity",
                message: message,
                path: this.url,
                status: 422,
                timestamp: "2022-09-18T08:16:48.746+00:00"
            }
        })
    }

    static mockDelayedLogin() {
        cy.intercept('POST', `**/${this.url}`, {
            delay: 1000
        })
    }
}
