Cypress.Commands.add('loginToTestArena', (email, password) => {
    cy.visit('http://demo.testarena.pl/zaloguj')
    cy.get('#email').type(email)
    cy.get('#password').type(password)
    cy.get('#login').click()
    cy.get('#header_logo').should('be.visible')
})

Cypress.Commands.add('login', (username, password) => {
    cy.visit('http://localhost:8081')
    cy.get('[name=username]').type(username)
    cy.get('[name=password]').type(password)
    cy.get('.btn-primary').click()
})
