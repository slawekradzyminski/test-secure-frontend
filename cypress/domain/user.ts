import { getRandomEmail, getRandomString } from "../util/random"
import { Roles } from "./roles"

export type User = {
    username: string,
    lastName: string,
    firstName: string,
    email: string,
    password: string,
    roles: Roles[]
}

export const getRandomUser = (): User => {
    return {
        username: getRandomString(),
        lastName: getRandomString(),
        firstName: getRandomString(),
        email: getRandomEmail(),
        password: getRandomString(),
        roles: [Roles.ROLE_ADMIN, Roles.ROLE_CLIENT]
    }
}