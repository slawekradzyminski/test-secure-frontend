import { generateRandomString } from "../utils/random"

export const getRandomProject = () => {
    return {
        prefix: generateRandomString(4),
        description: generateRandomString(20),
        name: generateRandomString(8)
    }
}