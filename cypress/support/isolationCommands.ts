import { getRandomUser } from "../util/user"

Cypress.Commands.add('setUserInLocalStorage', () => {
    const user = getRandomUser()
    const userEntry = {
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        roles: user.roles,
        token: "fakeToken",
        username: user.username
    }
    localStorage.setItem('user', JSON.stringify(userEntry))
})
