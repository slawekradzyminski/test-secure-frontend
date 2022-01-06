/// <reference types="cypress" />

import { getRandomEmail, getRandomString } from "../util/random";

describe("Home page", () => {
  let jwtToken: string;
  const username = getRandomString()
  const password = getRandomString()
  const firstName = getRandomString()

  before(() => {
    cy.register(username, password, firstName, getRandomString(), getRandomEmail())
  })

  beforeEach(() => {
    cy.login(username, password).then(token => jwtToken = token);
    cy.visit('')
    cy.get('h1').should('contain.text', firstName)
  });

  it("should display users", () => {
    cy.get("ul li").should("have.length.at.least", 1);
  });

  it("should be able to make backend call with token", () => {
    cy.request({
      url: "http://localhost:4000/users",
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }).then((resp) => {
      expect(resp.status).to.eq(200);
    });
  });

  it("should logout", () => {
    cy.get("#logout").click();
    cy.url().should("contain", "login");
  });

  it("should add more users", () => {
    cy.get("#addmore").click();
    cy.url().should("contain", "add-user");
  });
  
});
