/// <reference types="cypress" />

Cypress.Commands.add('login', (username, password) => {
  cy.request({
    method: 'POST',
    url: 'http://localhost:4000/users/signin',
    body: {
      username: username,
      password: password,
    },
  }).then(resp => {
    if (resp.status !== 200) {
      Cypress.log({
        name: 'Login',
        message: 'failed'
      })
    }
    expect(resp.status).to.eq(200)
    localStorage.setItem('user', JSON.stringify(resp.body))
    return resp.body.token
  })
})

Cypress.Commands.add('register', (user) => {
  cy.request({
    method: 'POST',
    url: 'http://localhost:4000/users/signup',
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

Cypress.Commands.add('visitWithNoMarketing', (user, url) => {
  cy.intercept('GET', '**/users', { fixture: 'users.json' })
  cy.intercept('POST', '**/users/signin', {
    statusCode: 200,
    body: {
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      roles: user.roles,
      token: "fakeToken",
      username: user.username
    }
  })
  cy.visit(url)
})

Cypress.Commands.add('deleteUser', (username, token) => {
  cy.request({
    method: 'DELETE',
    url: `http://localhost:4000/users/${username}`,
    headers: {
      Authorization: `Bearer ${token}`
    }
  }).then(resp => {
    expect(resp.status).to.eq(204)
  })
})

