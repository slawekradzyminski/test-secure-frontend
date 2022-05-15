/// <reference types="cypress" />

import { Method } from "../../util/httpMethods"
import { Roles } from "../../util/roles"
import users from "../../fixtures/users.json"
import HomePage from "../../pages/HomePage"

const homePage = new HomePage()

describe('home page', () => {

    const firstUser = users[0]

    beforeEach(() => {
        const user = { roles: [Roles.ROLE_ADMIN] }
        localStorage.setItem('user', JSON.stringify(user))
        cy.intercept(Method.GET, '**/users', { fixture: 'users.json' })
        cy.visit('')
        homePage.clickUserDetails(firstUser.firstName, firstUser.lastName)
    })

    it('should autofill user data', () => {
        // then
        cy.get('[name=username]').should('have.value' , firstUser.username)
        cy.get('[name=firstName]').should('have.value', firstUser.firstName)
        cy.get('[name=lastName]').should('have.value', firstUser.lastName)
        cy.get('[name=roles]').should('have.value', firstUser.roles.join(','))
        cy.get('[name=email]').should('have.value', firstUser.email)
    })

})
