import { getRandomEmail, getRandomString } from "../util/random"
import { Roles } from "./roles"

export type User = {
    username: string,
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    roles: Roles[]
}

export const getRandomUser = (): User => {
    return {
        username: getRandomString(),
        password: getRandomString(),
        firstName: getRandomString(),
        lastName: getRandomString(),
        email: getRandomEmail(),
        roles: [Roles.ROLE_ADMIN, Roles.ROLE_CLIENT]
    }
}