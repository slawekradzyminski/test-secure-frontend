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
    })
})

Cypress.Commands.add('register', (username, password, firstName, lastName, email) => {
    cy.request({
        method: 'POST',
        url: 'http://localhost:4001/users/signup',
        body: {
            email: email,
            firstName: firstName,
            lastName: lastName,
            password: password,
            roles: ["ROLE_CLIENT"],
            username: username
        }
    }).then(response => {
        expect(response.status).to.eq(201)
    })
})