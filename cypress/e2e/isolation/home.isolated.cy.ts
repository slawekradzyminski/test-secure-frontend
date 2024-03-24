/// <reference types="cypress" />

import { getLoginResponseFor } from "../../domain/http/login"
import { getRandomUser } from "../../generators/userGenerator"
import users from "../../fixtures/users.json"

describe('Home page tests', () => {
    beforeEach(() => {
        // 1. Zachowuje sobie odpowiedź w localStorage pod kluczem user
        // 2. Ustawia ciastko token ze zwróconym tokenem

        const user = getRandomUser()
        // 1
        localStorage.setItem('user', JSON.stringify(getLoginResponseFor(user)))
        // 2
        cy.setCookie('token', 'fakeToken')
        cy.intercept('GET', '**/users', { fixture: 'users.json' })
        cy.visit('http://localhost:8081')
    })

    it('should correctly display all users', () => {
        // then
        cy.get('li').should('have.length', users.length)
        cy.get('li').each(($el, i) => {
            expect($el).to.contain.text(`${users[i].firstName} ${users[i].lastName}`);
        })
        cy.percySnapshot()
    })

    it('should correctly delete an user', () => {
        // given
        const index = 1
        const userToDelete = users[index]
        cy.intercept('DELETE', `**/users/${userToDelete.username}`, { statusCode: 204 })

        // when
        cy.get('li').eq(index).find('.delete').click()

        // then
        cy.get('li').should('have.length', users.length - 1)
        cy.get('li').contains(`${userToDelete.firstName} ${userToDelete.lastName}`).should('not.exist')
    })

    it('should not delete an user if window confirm rejected', () => {
        // given
        Cypress.on('window:confirm', (confirmationText) => {
            expect(confirmationText).to.eq('Are you sure you wish to delete this item?')
            return false
        })
        const index = 1
        const userToDelete = users[index]
        cy.intercept('DELETE', `**/users/${userToDelete.username}`, { statusCode: 204 })

        // when
        cy.get('li').eq(index).find('.delete').click()

        // then
        cy.get('li').should('have.length', users.length)
        cy.get('li').contains(`${userToDelete.firstName} ${userToDelete.lastName}`).should('exist')
    })

})
