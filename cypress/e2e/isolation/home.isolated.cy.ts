/// <reference types="cypress" />

import users from "../../fixtures/users.json"

describe('home page in isolation', () => {

    beforeEach(() => {
        cy.setUserInLocalStorage()
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

    it('should delete a user', () => {
        // given
        const firstUser = users[0]
        cy.intercept('DELETE', `**/users/${firstUser.username}`, { statusCode: 204 }).as('deleteRequest')

        // when
        cy.get('ul li').contains(`${firstUser.firstName} ${firstUser.lastName}`).find('.delete').click()

        // then
        cy.get('ul li').should('have.length', users.length - 1)
        cy.get('ul li').contains(`${firstUser.firstName} ${firstUser.lastName}`).should('not.exist')
        cy.wait('@deleteRequest')
    })

    it('should cancel user deletion', () => {
        // given
        const firstUser = users[0]
        Cypress.on('window:confirm', confirmationText => {
            expect(confirmationText).to.eq('Are you sure you wish to delete this item?')
            return false
        })

        // when
        cy.get('ul li').contains(`${firstUser.firstName} ${firstUser.lastName}`).find('.delete').click()

        // then
        cy.get('ul li').should('have.length', users.length)
        cy.get('ul li').contains(`${firstUser.firstName} ${firstUser.lastName}`).should('be.visible')
    })

})
