/// <reference types="cypress" />

import users from '../fixtures/users.json'

describe('home page', () => {
    beforeEach(() => {
        const user = {
            roles: ['ROLE_ADMIN'],
            token: 'fakeToken',
        }
        window.localStorage.setItem('user', JSON.stringify(user))
        cy.intercept('GET', '**/users', { fixture: 'users.json' })
        cy.visit('')
    })

    it('should display users', () => {
        // then
        cy.get('ul li').should('have.length', users.length)

        cy.get('ul li').each((el, index) => {
            cy.wrap(el).should('contain.text', `${users[index].firstName} ${users[index].lastName}`)
        })
    })

    it('should delete user', () => {
        // given
        cy.intercept('DELETE', `/users/${users[0].username}`, { statusCode: 204 }).as('deleteRequest')
        
        // when
        cy.get('ul li').contains(`${users[0].firstName}`).find('.delete').click()

        // then
        cy.wait('@deleteRequest')
        cy.get('ul li').contains(`${users[0].firstName}`).should('not.exist')
        cy.get('ul li').should('have.length', users.length - 1)
    })

    it('should not delete user when confirmation cancelled', () => {
        // given
        Cypress.on('window:confirm', text => {
            expect(text).to.eq('Are you sure you wish to delete this item?')
            return false
        })

        // then
        cy.get('ul li').contains(`${users[0].firstName}`).find('.delete').click()

        // then
        cy.get('ul li').contains(`${users[0].firstName}`).should('be.visible')
        cy.get('ul li').should('have.length', users.length)
    })

    

})
