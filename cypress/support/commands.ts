import { User } from "../util/user";

Cypress.Commands.add('login', (user: User) => { 
    cy.get('[name=username]').type(user.username)
    cy.get('[name=password]').type(user.password)
    cy.get('.btn-primary').click()
 })

