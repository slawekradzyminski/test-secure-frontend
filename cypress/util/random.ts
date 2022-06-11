export const getRandomString = () => {
    return 'cypress' + Math.random().toString(36).substring(3)
}

export const getRandomEmail = () => {
    return 'cypress' + Math.random().toString(36).substring(3) + '@cantest.it'
}