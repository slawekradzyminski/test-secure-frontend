import { getRandomEmail, getRandomString } from "./random"
import { Roles } from "./roles"

export type User = {
    username: string,
    password: string,
    firstName: string,
    lastName: string,
    email: string,
    roles: Roles[]
}

export const getRandomUser = (): User => {
    return {
        username: getRandomString(),
        password: getRandomString(),
        firstName: getRandomString(),
        lastName: getRandomString(),
        email: getRandomEmail(),
        roles: [Roles.ROLE_CLIENT]
    }
}