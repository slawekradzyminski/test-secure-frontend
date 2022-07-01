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
    })
}