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

Cypress.Commands.add('register', (username, password, firstName, lastName, email) => {
    cy.request({
        method: 'POST',
        url: 'http://localhost:4000/users/signup',
        body: {
            email: email,
            firstName: firstName,
            lastName: lastName,
            password: password,
            roles: ["ROLE_CLIENT"],
            username: username
        }
    }).then(resp => {
        expect(resp.status).to.eq(201)
    })
})

