export const getRandomString = () => {
    return Math.random().toString(36).substring(7)
}

export const getRandomEmail = () => {
    return `${getRandomString()}@ocado.com`
}
