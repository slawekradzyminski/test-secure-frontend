import { User } from "../utils/user";

Cypress.Commands.add('register', (user: User) => {
    cy.request({
        method: 'POST',
        url: 'http://localhost:4001/users/signup',
        body: user
    })
})
