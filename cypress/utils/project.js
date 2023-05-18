import { generateRandomString } from "./random";

export const getRandomProject = () => {
    return {
        name: generateRandomString(10),
        prefix: generateRandomString(5),
        message: generateRandomString(40),
    };
};
