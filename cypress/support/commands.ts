import { getRandomUser } from "../domain/user"

Cypress.Commands.add('login', (username, password) => {
    cy.request({
        method: 'POST',
        url: `${Cypress.env('backendUrl')}/users/signin`,
        body: {
            username: username,
            password: password
        }
    }).then((resp) => {
        expect(resp.status).to.eq(200)
        localStorage.setItem('user', JSON.stringify(resp.body))
        return resp.body.token
    })
})

Cypress.Commands.add('register', (user) => {
    cy.request({
        method: 'POST',
        url: `${Cypress.env('backendUrl')}/users/signup`,
        body: user
    }).then((resp) => {
        expect(resp.status).to.eq(201)
    })
})

Cypress.Commands.add('deleteUser', (username, token) => {
    cy.request({
        method: 'DELETE',
        url: `${Cypress.env('backendUrl')}/users/${username}`,
        headers: {
            Authorization: `Bearer ${token}`
        }
    }).then((resp) => {
        expect(resp.status).to.eq(204)
    })
})

Cypress.Commands.add('visitHomePageAsLoggedInUser', () => {
    const fakeToken = 'fakeToken';
    const user = getRandomUser()
    const fakeLoginResponse = {
        "username": user.username,
        "roles": user.roles,
        "firstName": user.firstName,
        "lastName": user.lastName,
        "token": fakeToken,
        "email": user.email
    }
    localStorage.setItem('user', JSON.stringify(fakeLoginResponse))
    cy.setCookie('token', fakeToken)
    cy.intercept('GET', '**/users', {
        statusCode: 200,
        fixture: 'users.json'
    })
    cy.visit('')
})
