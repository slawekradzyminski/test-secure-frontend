/// <reference types="cypress" />

import { getRandomUser, User } from "../util/userProvider"

describe('Edit page tests', () => {

    let user: User
    let token: string

    beforeEach(() => {
        user = getRandomUser()
        cy.register(user)
        cy.login(user.username, user.password).then(returnedToken => token = returnedToken)
        cy.visit('http://localhost:8081')
    })

    afterEach(() => {
        cy.deleteUser(user.username, token)
    })

    it('should correctly autofill data', () => {
        cy.get('li').contains(`${user.firstName} ${user.lastName}`).find('.edit').click()

        cy.get('[name=username]').should('have.value', user.username)
        cy.get('[name=firstName]').should('have.value', user.firstName)
        cy.get('[name=lastName]').should('have.value', user.lastName)
        cy.get('[name=email]').should('have.value', user.email)
        cy.get('[name=roles]').should('have.value', user.roles.join())
    })

})
