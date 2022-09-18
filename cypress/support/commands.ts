import { getRandomUser } from "../util/userProvider"

Cypress.Commands.add('setFakeLocalStorage', () => {
    const user = getRandomUser()
    const fakeLoginResponse = {
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        token: 'fakeToken',
        roles: user.roles
    }
    localStorage.setItem('user', JSON.stringify(fakeLoginResponse))
})
