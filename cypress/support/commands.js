Cypress.Commands.add('login', (username, password) => {
    cy.get('[name=username]').type(username)
    cy.get('[name=password]').type(password)
    cy.get('button').contains('Login').click()
})

Cypress.Commands.add('registerViaAPI', (user) => {
    cy.request({
        method: 'POST',
        url: 'http://localhost:4001/users/signup',
        body: user
      })
})
