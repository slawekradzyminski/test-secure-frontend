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
