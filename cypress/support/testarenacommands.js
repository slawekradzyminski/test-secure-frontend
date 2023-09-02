Cypress.Commands.add('loginToTestArena', (email, password) => {
    cy.get('#email').type(email)
    cy.get('#password').type(password);
    cy.get('#login').click()
})