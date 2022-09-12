import { getRandomUser } from "../util/userProvider"

Cypress.Commands.add('visitHomePageAsLoggedInUser', () => { 
    const testUser = getRandomUser()

    const localStorageUserEntry = {
        username: testUser.username,
        firstName: testUser.firstName,
        lastName: testUser.lastName,
        email: testUser.email,
        roles: testUser.roles,
        token: 'fakeToken'
    }

    localStorage.setItem('user', JSON.stringify(localStorageUserEntry))
    cy.visit('http://localhost:8081')
 })