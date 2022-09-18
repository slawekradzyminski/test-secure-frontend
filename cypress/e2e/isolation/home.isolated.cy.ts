/// <reference types="cypress" />

import MockGetUsers from "../../stubs/MockGetUsers"
import users from "../../fixtures/users.json"

describe('Home page isolated tests', () => {
    beforeEach(() => {
        cy.setFakeLocalStorage()
        MockGetUsers.mockUsers()
        cy.visit('http://localhost:8081')
    })

    it('should display all users', () => {
        // then
        cy.get('li').should('have.length', users.length)
        cy.get('li').each(($el, i) => {
            expect($el.text()).to.contain(`${users[i].firstName} ${users[i].lastName}`)
        })
    })

    it('should successfully delete an user', () => {
        // given
        const user = users[0]
        cy.intercept('DELETE', `**/users/${user.username}`, { statusCode: 204 }).as('deleteRequest')

        // when
        cy.get('li').contains(`${user.firstName} ${user.lastName}`).find('.delete').click()

        // then
        cy.get('li').contains(`${user.firstName} ${user.lastName}`).should('not.exist')
        cy.wait('@deleteRequest')
    })

    it.only('should display error message on failed delete', () => {
        // given
        const user = users[0]
        cy.intercept('DELETE', `**/users/${user.username}`, { statusCode: 500 }).as('deleteRequest')

        // when
        cy.get('li').contains(`${user.firstName} ${user.lastName}`).find('.delete').click()

        // then
        cy.get('li').contains(`${user.firstName} ${user.lastName}`).should('be.visible').and('contain.text', 'Internal Server Error')
    })
})
