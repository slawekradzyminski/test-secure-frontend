Cypress.Commands.add('getById', id => {
    return cy.get(`[data-id=${id}]`)
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