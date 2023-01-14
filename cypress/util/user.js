import { getRandomEmail, getRandomString } from "./random"

export const getRandomUser = () => {
    return {
        username: getRandomString(),
        password: getRandomString(),
        firstName: getRandomString(),
        lastName: getRandomString(),
        email: getRandomEmail(),
        roles: ['ROLE_ADMIN', 'ROLE_CLIENT']
    }
}