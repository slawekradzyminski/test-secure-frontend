import { User } from "../util/user";

Cypress.Commands.add('register', (user: User) => { 
    cy.request({
        method: 'POST',
        url: 'http://localhost:4001/users/signup',
        body: {
            firstName: user.firstName,
            lastName: user.lastName,
            username: user.username,
            password: user.password,
            email: user.email,
            roles: user.roles
        }
    }).then(resp => {
        expect(resp.status).to.eq(201)
    })
 })