
Cypress.Commands.add('login', (username, password) => { 
    cy.request({
        method: 'POST',
        url: 'http://localhost:4000/users/signin',
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
        },
      }).then(resp => {
          expect(resp.status).to.eq(201)
      })
 })

//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
