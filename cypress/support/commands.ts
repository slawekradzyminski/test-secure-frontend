Cypress.Commands.add('login', (username, password) => {
  // 1 - Najpierw musimy wysłać request o logowanie
  // 2 - Jak przyjdzie odpowiedź to musimy ją ustawić w localStorage

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
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      password: user.password,
      email: user.email,
      roles: user.roles
    },
  }).then(resp => {
    expect(resp.status).to.eq(201)
  })
})

Cypress.Commands.add('deleteUser', (username, token) => {
  cy.request({
    method: 'DELETE',
    url: `http://localhost:4001/users/${username}`,
    headers: {
      Authorization: `Bearer ${token}`
    }
  }).then(resp => {
    expect(resp.status).to.eq(204)
  })
})