/// <reference types="cypress" />

import { Roles } from "../../util/roles"
import users from "../../fixtures/users.json"

describe('home page with mocks', () => {
    beforeEach(() => {
        const user = {
            roles: [Roles.ROLE_ADMIN]
        }
        localStorage.setItem('user', JSON.stringify(user))
        cy.intercept('GET', '**/users', { body: users })
        cy.visit('http://localhost:8081')
        cy.viewport('macbook-16')
    })

    it('should display all users', () => {
        cy.get('ul li').should('have.length', users.length)

        for (let i = 0; i < users.length; i++) {
            cy.get('ul li').eq(i).should('contain.text', `${users[i].firstName} ${users[i].lastName}`)
        }

        // Alternatywnie to samo co wyzej w petli for
        cy.get('ul li').each(($el, index) => {
        cy.wrap($el).should('contain.text', `${users[index].firstName} ${users[index].lastName}`)
        })
    })


})
