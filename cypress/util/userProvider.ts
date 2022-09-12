import { getRandomEmail, getRandomString } from "./random"

enum Roles {
    ROLE_ADMIN = 'ROLE_ADMIN',
    ROLE_CLIENT = 'ROLE_CLIENT'
}

type User = {
    email: string,
    lastName: string,
    password: string,
    firstName: string,
    roles: Roles[],
    username: string
}

export const getRandomUser = (): User => {
    return {
        email: getRandomEmail(),
        firstName: getRandomString(),
        lastName: getRandomString(),
        username: getRandomString(),
        roles: [Roles.ROLE_ADMIN, Roles.ROLE_CLIENT],
        password: getRandomString()
    }
}