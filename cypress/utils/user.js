import { generateRandomEmail, generateRandomString } from "./random"

export const generateUser = () => {
    return {
        firstName: generateRandomString(8),
        lastName: generateRandomString(8),
        username: generateRandomString(8),
        password: generateRandomString(8),
        roles: ["ROLE_CLIENT"],
        email: generateRandomEmail(8)
    }
}