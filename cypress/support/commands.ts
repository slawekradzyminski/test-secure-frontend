Cypress.Commands.add('login', (username, password) => {
    cy.get('[name=username]').type('admin')
    cy.get('[name=password]').type('admin')
    cy.get('.btn-primary').click()
 })
