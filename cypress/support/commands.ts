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

 Cypress.Commands.add('register', (firstName, lastName, username, password, email) => { 
    cy.request({
        method: 'POST',
        url: 'http://localhost:4001/users/signup',
        body: {
            firstName: firstName,
            lastName: lastName,
            username: username,
            password: password,
            email: email,
            roles: ["ROLE_CLIENT"]
        }
    }).then(resp => {
        expect(resp.status).to.eq(201)
    })
 })

