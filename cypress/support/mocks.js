Cypress.Commands.add("mockLogin", (user) => {
    cy.intercept('POST', '**/users/signin', {
        statusCode: 200,
        body: user,
    }).as('loginRequest')
});