Cypress.Commands.add("login", (username, password) => {
  cy.get("[name=username]").type(username);
  cy.get("[name=password]").type(password);
  cy.get(".btn-primary").click();
});

Cypress.Commands.add("apiLogin", (username, password) => {
    cy.request({
        method: 'POST',
        url: 'http://localhost:4000/users/signin',
        body: { username, password }
    }).then(resp => {
        expect(resp.status).to.eq(200)
        localStorage.setItem('user', JSON.stringify(resp.body))
        return resp.body.token
    })
  });

Cypress.Commands.add("register", (username, password, firstName, lastName, email) => {
    cy.get("[name=username]").type(username);
    cy.get("[name=password]").type(password);
    cy.get("[name=firstName]").type(firstName);
    cy.get("[name=lastName]").type(lastName);
    cy.get('[name=email').type(email)
    cy.get(".btn-primary").click();
  });
