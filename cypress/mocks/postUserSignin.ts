import { Roles } from "../domain/roles";
import { User } from "../domain/user";

const postUserSigninUrl = '**/users/signin'

export const postUserSignin = {
    mockSuccess: (user: User) => {
        cy.intercept('POST', postUserSigninUrl, {
            statusCode: 200,
            body: buildLoginResponse(user)
        })
    },

    mockFailure: () => {
        cy.intercept('POST', postUserSigninUrl, {
            statusCode: 422,
            fixture: 'failedLogin.json'
        })
    }
}

const buildLoginResponse = (user: User): LoginResponse => {
    // Usunięcie klucza password z obiektu
    const { password, ...userWithoutPassword } = user

    // Dodanie klucza token do obiektu
    return {
        ...userWithoutPassword,
        token: 'fakeToken'
    }
}

export interface LoginResponse {
    firstName: string,
    lastName: string,
    email: string,
    username: string,
    token: string,
    roles: Roles[]
}