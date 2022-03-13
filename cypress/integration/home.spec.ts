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

  after(() => {
    cy.deleteUser(username, jwtToken)
  })

  beforeEach(() => {
    cy.login(username, password).then(token => jwtToken = token);
    cy.visit('')
    cy.get('h1').should('contain.text', firstName)
  });

  it("C2124 should display users", () => {
    cy.get("ul li").should("have.length.at.least", 1);
  });

  it("C2125 should be able to make backend call with token", () => {
    cy.request({
      url: "http://localhost:4001/users",
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }).then((resp) => {
      expect(resp.status).to.eq(200);
    });
  });

  it("C2126 should logout", () => {
    cy.get("#logout").click();
    cy.url().should("contain", "login");
  });

  it("C2127 should add more users", () => {
    cy.get("#addmore").click();
    cy.url().should("contain", "add-user");
  });
  
});
