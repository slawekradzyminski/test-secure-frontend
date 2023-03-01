import { LoginResponse } from "../domain/login";
import { User } from "../domain/user";

export const postUserSignin = {
    mockSuccess: (user: User) => {
        cy.intercept('POST', '**/users/signin', {
            statusCode: 200,
            body: buildLoginResponse(user)
        })
    },

    mockFailure: () => {

    }
}

const buildLoginResponse = (user: User): LoginResponse => {
    const { password, ...objectWithoutPassword } = user
    return {
        ...objectWithoutPassword,
        token: 'fakeToken'
    }
}