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

    mockFailure: (message: string) => {
        cy.intercept('POST', postUserSigninUrl, {
            statusCode: 422,
            body: {
                timestamp: "2023-03-01T09:33:08.127+00:00",
                status: 422,
                error: "Unprocessable Entity",
                message: message,
                path: "/users/signin"
            }
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