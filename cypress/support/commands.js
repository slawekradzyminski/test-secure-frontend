Cypress.Commands.add('getById', id => {
    return cy.get(`[data-id=${id}]`)
})

Cypress.Commands.add('login', (username, password) => {
    cy.getById('username').type(username)
    cy.getById('password').type(password)
    cy.get('.btn-primary').click()
})