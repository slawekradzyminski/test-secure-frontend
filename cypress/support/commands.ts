Cypress.Commands.add('register', (user) => {
    cy.request({
        method: 'POST',
        url: 'http://localhost:4001/users/signup',
        body: user
    })
})

Cypress.Commands.add('login', (username, password) => {
    cy.request({
        method: 'POST',
        url: 'http://localhost:4001/users/signin',
        body: {
            username: username,
            password: password
        }
    }).then(resp => {
        localStorage.setItem('user', JSON.stringify(resp.body))
        cy.setCookie('token', resp.body.token)
    })
})

Cypress.Commands.add('deleteUser', (username, token) => {
    cy.request({
        url: `http://localhost:4001/users/${username}`,
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
})