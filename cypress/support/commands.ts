Cypress.Commands.add('login', (username, password) => {
    cy.request({
        method: 'POST',
        url: 'http://localhost:4001/users/signin',
        body: {
            username: username,
            password: password
        }
    }).then(response => {
        expect(response.status).to.eq(200)
        localStorage.setItem('user', JSON.stringify(response.body))
        return response.body.token
    })
})

Cypress.Commands.add('register', (user) => {
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
    }).then(response => {
        expect(response.status).to.eq(201)
    })
})

Cypress.Commands.add('delete', (username, token) => {
    cy.request({
        method: 'DELETE',
        url: `http://localhost:4001/users/${username}`,
        headers:{
            Authorization: `Bearer ${token}`
        }
    }).then(response => {
        expect(response.status).to.eq(204)
    })
})
