/// <reference types="cypress" />

import { getRandomUser, User } from "../utils/user"

describe('Edit page tests', () => {
    let user: User

    beforeEach(() => {
        user = getRandomUser()
        cy.register(user)
        cy.login(user.username, user.password)
        cy.visit('http://localhost:8081')
        cy.get('li').contains(`${user.firstName} ${user.lastName}`).find('.edit').click()
    })

    it('should correctly autofill data', () => {
        // then
        cy.get("[name=firstName]").should("have.value", `${user.firstName}`);
        cy.get("[name=lastName]").should("have.value", `${user.lastName}`);
        cy.get("[name=email]").should("have.value", `${user.email}`);
        cy.get("[name=username]").should("have.value", `${user.username}`);
        cy.get("[name=roles]").should("have.value", `${user.roles}`);
    })

    it('should successfully edit user data', () => {
        // given
        const newUser = getRandomUser()

        // when
        cy.get("[name=firstName]").clear().type(newUser.firstName)
        cy.get("[name=lastName]").clear().type(newUser.lastName)
        cy.get("[name=email]").clear().type(newUser.email)
        cy.get('.btn-primary').click()

        // then
        cy.get('.alert').should('have.text', 'Updating user successful')
        cy.get('li').contains(`${newUser.firstName} ${newUser.lastName}`).should('exist')
        cy.get('li').contains(`${user.firstName} ${user.lastName}`).should('not.exist')
    })

})
