/// <reference types="cypress" />

import { Method } from "../../util/httpMethods"
import { Roles } from "../../util/roles"
import users from "../../fixtures/users.json"
import { getAliasedRequest } from "../../util/alias"
import HomePage from "../../pages/HomePage"

const homePage = new HomePage()

describe('home page', () => {

    beforeEach(() => {
        const user = { roles: [Roles.ROLE_ADMIN] }
        localStorage.setItem('user', JSON.stringify(user))
        cy.intercept(Method.GET, '**/users', { fixture: 'users.json' })
        cy.visit('')
    })

    it('should display all users', () => {
        // then
        cy.get('ul li').should('have.length', users.length)
        cy.get('ul li').each(($el, i) => {
            cy.wrap($el).contains(`${users[i].firstName} ${users[i].lastName}`).should('be.visible')
        })
    })

    it('should handle user delete error', () => {
        // given
        const deleteRequest = 'deleteRequest'
        cy.intercept(Method.DELETE, `**/users/${users[0].username}`, { statusCode: 500 }).as(deleteRequest)

        // then
        homePage.attemptDelete(users[0].firstName, users[0].lastName)

        // then
        cy.wait(getAliasedRequest(deleteRequest))
        cy.get('ul li').contains(`${users[0].firstName} ${users[0].lastName}`).should('contain.text', 'Internal Server Error')
    })

})
