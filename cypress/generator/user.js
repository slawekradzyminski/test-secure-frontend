import { generateRandomString } from "../utils/random"

export const getRandomUser = () => {
    return {
        firstName: generateRandomString(6),
        lastName: generateRandomString(6),
        email: getRandomEmail(),
        password: generateRandomString(6),
        username: generateRandomString(6),
        roles: [ 'ROLE_ADMIN', 'ROLE_CLIENT' ]
    }
}

const getRandomEmail = () => `${generateRandomString(10)}@cantest.it`