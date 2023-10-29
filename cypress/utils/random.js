export const generateRandomString = (length) => {
    return generateRandomChars(length, 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789')
};

export const generateRandomLetters = (length) => {
    return generateRandomChars(length, 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz')
};

export const generateRandomNumber = (length) => {
    return generateRandomChars(length, '0123456789')
};

const generateRandomChars = (length, charset) => {
    let result = '';
    const charactersLength = charset.length;
    for (let i = 1; i <= length; i++) {
        result += charset.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}