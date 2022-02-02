/// <reference types="cypress" />

import { getRandomEmail, getRandomString } from "../../util/random";

describe("Login page with intercept", () => {
  beforeEach(() => {
    cy.visit("http://localhost:8080");
  });

  it("should successfully log in", () => {
    const username = getRandomString();
    const password = getRandomString();
    const firstName = "Slawek";

    cy.viewport("iphone-x");

    const users = require("../../fixtures/users.json");

    cy.intercept("POST", "**/users/signin", {
      statusCode: 200,
      body: {
        username: username,
        roles: ["ROLE_ADMIN", "ROLE_CLIENT"],
        firstName: firstName,
        lastName: getRandomString(),
        token: "fakeToken",
        email: getRandomEmail(),
      },
    }).as("loginRequest");

    cy.intercept("GET", "**/users", { fixture: "users.json" });

    cy.login(username, password);
    cy.get("h1").should("contain.text", `Hi ${firstName}`);

    cy.get("ul li").should("have.length", users.length);
    cy.get("ul li")
      .eq(0)
      .should("contain.text", `${users[0].firstName} ${users[0].lastName}`);
    cy.get("ul li")
      .eq(1)
      .should("contain.text", `${users[1].firstName} ${users[1].lastName}`);

    cy.wait("@loginRequest")
      .its("request.body")
      .should("deep.equal", { username, password });
  });

  it('should show error message', () => {
      const message = "Invalid username/password supplied"

      cy.intercept('POST', '**/users/signin', {
          statusCode: 422,
          body: {
            error: "Unprocessable Entity",
            message: message,
            path: "/users/signin",
            status: 422,
            timestamp: "2022-02-02T13:28:42.705+00:00",
          }
      })

      cy.login(getRandomString(), getRandomString());
      cy.get('.alert').should('have.text', message)
  })

  it('should display loading spinner', () => {
    cy.intercept('POST', '**/users/signin', { delay: 2000 })

    cy.login(getRandomString(), getRandomString());
    cy.get('span.spinner-border').should('be.visible')
})

it('should handle backend error', () => {
    cy.intercept('POST', '**/users/signin', { statusCode: 500 })
    cy.login(getRandomString(), getRandomString());

})

});
