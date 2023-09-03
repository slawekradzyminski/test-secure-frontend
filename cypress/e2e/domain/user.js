import { generateRandomEmail, generateRandomString } from "../../utils/random"

export const getRandomUser = () => {
    return {
        firstName: generateRandomString(),
        lastName: generateRandomString(),
        username: generateRandomString(),
        password: generateRandomString(),
        roles: [ 'ROLE_ADMIN', 'ROLE_CLIENT' ],
        email: generateRandomEmail()
    }
}