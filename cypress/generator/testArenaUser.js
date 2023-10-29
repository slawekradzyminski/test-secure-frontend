import { generateRandomLetters, generateRandomNumber, generateRandomString } from "../utils/random"

export const getTestArenaUser = () => {
    return {
        firstname: generateRandomLetters(6),
        lastname: generateRandomLetters(6),
        email: getRandomEmail(),
        organization: generateRandomString(6),
        department: generateRandomString(6),
        phoneNumber: generateRandomNumber(9)
    }
}

export const getRandomEmail = () => `${generateRandomString(10)}@cantest.it`
