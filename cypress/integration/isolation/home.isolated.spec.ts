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

    it('should delete user', () => {
        // given
        const lastUser = users[users.length - 1]
        cy.intercept('DELETE', `**/users/${lastUser.username}`, { statusCode: 204}).as('deleteRequest')
        cy.percySnapshot('beforeDeletion')

        // when
        cy.get('ul li').contains(`${lastUser.firstName}`).find('.delete').click()

        // then
        cy.wait('@deleteRequest')
        cy.get('ul li').contains(`${lastUser.firstName}`).should('not.exist')
        cy.get('ul li').should('have.length', users.length - 1)
        cy.percySnapshot('afterDeletion')
    })


})
