// https://stackoverflow.com/questions/1349404/generate-random-string-characters-in-javascript
export const getRandomString = () => Math.random().toString(36).substring(7)

export const getRandomEmail = () => `${getRandomString()}@cantest.it`