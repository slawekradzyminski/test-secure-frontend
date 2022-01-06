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

Cypress.Commands.add("deleteUser", (username, jwtToken) => {
  cy.request({
    method: "DELETE",
    url: `http://localhost:4000/users/${username}`,
    headers: {
      Authorization: `Bearer ${jwtToken}`,
    },
  }).then((resp) => {
    expect(resp.status).to.eq(204);
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
