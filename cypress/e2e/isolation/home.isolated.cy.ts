/// <reference types="cypress" />

import { Roles } from "../../util/roles"
import users from "../../fixtures/users.json"

describe('home page in isolation', () => {

    beforeEach(() => {
        const localStorageEntry = {
            email: "client@email.com",
            firstName: "Gosia",
            lastName: "Radzyminska",
            roles: [Roles.ROLE_ADMIN, Roles.ROLE_CLIENT],
            token: "fakeToken",
            username: "client"
        }
        localStorage.setItem('user', JSON.stringify(localStorageEntry))
        cy.intercept('GET', '**/users', { fixture: 'users.json' })
        cy.visit('http://localhost:8081')
    })

    it('should display at least one user', () => {
        // then
        cy.get('ul li').should('have.length', users.length)
        cy.get('ul li').each(($el, i) => {
            cy.wrap($el).contains(`${users[i].firstName} ${users[i].lastName}`).should('be.visible')
        })
    })

})
