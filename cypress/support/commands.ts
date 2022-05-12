Cypress.Commands.add('login', (username, password) => { 
    cy.request({
        method: 'POST',
        url: 'http://localhost:4001/users/signin',
        body: {
            username: username,
            password: password
        }
    }).then(resp => {
        expect(resp.status).to.eq(200)
        localStorage.setItem('user', JSON.stringify(resp.body))
    })
 })

 Cypress.Commands.add('register', (user) => { 
    cy.request({
        method: 'POST',
        url: 'http://localhost:4001/users/signup',
        body: {
            firstName: user.firstName,
            lastName: user.lastName,
            username: user.username,
            password: user.password,
            email: user.email,
            roles: user.roles
        }
    }).then(resp => {
        expect(resp.status).to.eq(201)
    })
 })

