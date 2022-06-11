import { getRandomEmail, getRandomString } from "./random"
import { Roles } from "./roles"

export type User = {
    firstName: string,
    lastName: string,
    username: string,
    password: string,
    email: string,
    roles: Roles[]
}

export const getRandomUser = (): User => {
    return {
        firstName: getRandomString(),
        lastName: getRandomString(),
        username: getRandomString(),
        password: getRandomString(),
        email: getRandomEmail(),
        roles: [Roles.ROLE_ADMIN, Roles.ROLE_CLIENT]
    }
}