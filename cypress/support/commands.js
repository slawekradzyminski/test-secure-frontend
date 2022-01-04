/// <reference types="cypress" />

// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
Cypress.Commands.add("login", (username, password) => {
  cy.request({
    method: "POST",
    url: "http://localhost:4000/users/signin",
    body: { username, password },
  }).then((resp) => {
    expect(resp.status).to.eq(200);
    localStorage.setItem("user", JSON.stringify(resp.body));
    return resp.body.token;
  });
});

Cypress.Commands.add("login", (username, password) => {
  cy.request({
    method: "POST",
    url: "http://localhost:4000/users/signin",
    body: { username, password },
  }).then((resp) => {
    expect(resp.status).to.eq(200);
    localStorage.setItem("user", JSON.stringify(resp.body));
    return resp.body.token;
  });
});

Cypress.Commands.add(
  "register",
  (username, password, firstName, lastName, email) => {
    cy.request({
      method: "POST",
      url: "http://localhost:4000/users/signup",
      body: {
        username,
        password,
        firstName,
        lastName,
        email,
        roles: ["ROLE_ADMIN"],
      },
    }).then((resp) => {
      expect(resp.status).to.eq(201);
    });
  }
);
//
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
