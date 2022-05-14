/// <reference types="cypress" />

import { getRandomUser, User } from "../util/user"

describe('edit page', () => {
    let token: string
    let user: User

    beforeEach(() => {
        user = getRandomUser()
        cy.register(user)
        cy.login(user.username, user.password).then(jwtToken => token = jwtToken)
        cy.visit('')
        cy.get('ul li').contains(`${user.firstName} ${user.lastName}`).find('.edit').click()
    })

    afterEach(() => {
        cy.deleteUser(user.username, token)
    })

    it('should autofill user data', () => {
        cy.get('[name=username]').should('have.value' ,user.username)
        cy.get('[name=firstName]').should('have.value', user.firstName)
        cy.get('[name=lastName]').should('have.value', user.lastName)
        cy.get('[name=roles]').should('have.value', user.roles.join(','))
        cy.get('[name=email]').should('have.value', user.email)
    })

    

})
