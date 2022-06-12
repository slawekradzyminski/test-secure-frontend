/// <reference types="cypress" />

import users from '../../fixtures/users.json'
import { mockUsers } from '../../mocks/getAllUsersMocks'

describe('login page', () => {

    beforeEach(() => {
        cy.setUserInLocalStorage()
        mockUsers()
        cy.visit('')
    })

    it('should display all users', () => {
        // then
        cy.get('ul li').should('have.length', users.length)
        cy.get('ul li').each(($user, i) => {
            cy.wrap($user).contains(`${users[i].firstName} ${users[i].lastName}`).should('be.visible')
        })
    })
})
