import { generateRandomString } from "../utils/random"

export const getRandomEmail = () => {
    return {
        subject: generateRandomString(10),
        message: generateRandomString(20)
    }
}