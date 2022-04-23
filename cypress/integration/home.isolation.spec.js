/// <reference types="cypress" />

import users from '../fixtures/users.json'

describe('login page', () => {
    beforeEach(() => {
        const user = {
            roles: ["ROLE_ADMIN",],
            token: "fakeToken"
        }
        localStorage.setItem('user', JSON.stringify(user))
        cy.intercept('GET', '**/users', { fixture: 'users.json' })
        cy.visit('')
    })

    it('should display homepage', () => {
        // then
        cy.get('ul li').should('have.length', users.length)
        cy.get('ul li').eq(0).should('contain.text', `${users[0].firstName} ${users[0].lastName}`)
    })

    it('should delete last user', () => {
        // given
        cy.intercept('DELETE', `http://localhost:4001/users/${users[users.length - 1].username}`, { statusCode: 204 })
            .as('deleteRequest')

        // when
        cy.get('ul li').last().find('.delete').click()

        // then
        cy.wait('@deleteRequest')
        cy.get('ul li').should('have.length', users.length - 1)
        cy.get('ul li').contains(`${users[users.length - 1].firstName}`).should('not.exist')
    })

    it.only('should not delete last user if deletion cancelled', () => {
        // given
        Cypress.on('window:confirm', confirmationText => {
            expect(confirmationText).to.eq('Are you sure you wish to delete this item?')
            return false
        })

        // when
        cy.get('ul li').last().find('.delete').click()

        // then
        cy.get('ul li').should('have.length', users.length)
        cy.get('ul li').contains(`${users[users.length - 1].firstName}`).should('be.visible')
    })

})
