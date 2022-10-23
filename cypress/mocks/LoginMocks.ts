import { User } from "../domain/user";

export default class LoginMocks {

    static mockSuccessfulLogin = (user: User) => {
        cy.intercept('POST', '**/users/signin', {
            statusCode: 200,
            body: {
                username: user.username,
                roles: user.roles,
                firstName: user.firstName,
                lastName: user.lastName,
                token: "fakeToken",
                email: user.email
            }
        }).as('loginRequest')
    }

    static mockDelayedLogin = () => {
        cy.intercept('POST', '**/users/signin', {
            delay: 2000
        })
    }

}