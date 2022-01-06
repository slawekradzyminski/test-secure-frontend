import { getRandomString, getRandomEmail } from "./random";

export interface User {
    username: string,
    token: string,
    firstName: string,
    lastName: string,
    email: string,
    roles: string[]
}

export const getUser = (firstName: string): User => ({
    username: getRandomString(),
    token: 'fakeToken',
    firstName: firstName,
    lastName: getRandomString(),
    email: getRandomEmail(),
    roles: ['ROLE_CLIENT']
})

