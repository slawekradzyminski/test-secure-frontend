import { getRandomEmail, getRandomString } from "./random"
import { Roles } from "./roles"

export type User = {
    username: string,
    firstName: string,
    lastName: string,
    password: string,
    email: string,
    roles: Roles[]
}

export const getRandomUser = (): User => {
    return {
        username: getRandomString(),
        firstName: getRandomString(),
        lastName: getRandomString(),
        password: getRandomString(),
        email: getRandomEmail(),
        roles: [Roles.ROLE_ADMIN, Roles.ROLE_CLIENT]
    }
}