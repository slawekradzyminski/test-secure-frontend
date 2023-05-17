import { generateRandomString } from "./random";

export const getRandomEmail = () => {
    return {
        subject: generateRandomString(5),  
        message: generateRandomString(10)  
    };
};
