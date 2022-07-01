import { Roles } from "../util/roles"

Cypress.Commands.add('getById', id => {
    return cy.get(`[data-id=${id}]`)
})

Cypress.Commands.add('setUserInLocalStorage', () => {
    const localStorageEntry = {
        email: "client@email.com",
        firstName: "Gosia",
        lastName: "Radzyminska",
        roles: [Roles.ROLE_ADMIN, Roles.ROLE_CLIENT],
        token: "fakeToken",
        username: "client"
    }
    localStorage.setItem('user', JSON.stringify(localStorageEntry))
})

Cypress.Commands.add('login', (username, password) => {
    cy.request({
        method: 'POST',
        url: 'http://localhost:4001/users/signin',
        body: {
          username: username,
          password: password,
        },
      }).then(resp => {
        expect(resp.status).to.eq(200)
        localStorage.setItem('user', JSON.stringify(resp.body))
        return resp.body.token
    })
})

Cypress.Commands.add('register', user => {
    cy.request({
        method: 'POST',
        url: 'http://localhost:4001/users/signup',
        body: {
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            password: user.password,
            roles: user.roles,
            username: user.username
        }
    }).then(resp => {
        expect(resp.status).to.eq(201)
    })
})

Cypress.Commands.add('deleteUser', (user, token) => {
    cy.request({
        method: 'DELETE',
        url: `http://localhost:4001/users/${user.username}`,
        headers: {
            Authorization: `Bearer ${token}`
        }
    }).then(resp => {
        expect(resp.status).to.eq(204)
    })
})