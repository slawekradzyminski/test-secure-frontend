/// <reference types="cypress" />

import { getRandomUser } from "../util/user"

describe('Home page', () => {
    let user
    let token

    beforeEach(() => {
        user = getRandomUser()
        cy.register(user)
        cy.login(user.username, user.password)
        cy.visit('http://localhost:8081')
        cy.getCookie('token').then((cookie) => token = cookie.value)
    })

    afterEach(() => {
        cy.deleteUser(user.username, token)
    })

    it('should display at least one user', () => {
        cy.get('li').should('have.length.gte', 1)
    })

    it('should open edit page', () => {
        cy.get('li').contains(`${user.firstName} ${user.lastName}`).find('.edit').click()
    })

    it('should delete user via UI', () => {
        // given
        const userToDelete = getRandomUser()
        cy.register(userToDelete)
        cy.reload()

        // when
        cy.get('li')
            .contains(`${userToDelete.firstName} ${userToDelete.lastName}`)
            .find('.delete')
            .click()

        // then
        cy.get('li')
            .contains(`${userToDelete.firstName} ${userToDelete.lastName}`)
            .should('have.length', 0)
    })

    it('should cancel user deletion', () => {
        // given
        Cypress.on('window:confirm', (confirmationText) => {
            expect(confirmationText).to.eq('Are you sure you wish to delete this item?')
            return false
        })
        const userToDelete = getRandomUser()
        cy.register(userToDelete)
        cy.reload()

        // when
        cy.get('li')
            .contains(`${userToDelete.firstName} ${userToDelete.lastName}`)
            .find('.delete')
            .click()

        // then
        cy.get('li')
            .contains(`${userToDelete.firstName} ${userToDelete.lastName}`)
            .should('have.length', 1)
    })

    it('should open add more users page', () => {
        cy.get('#addmore').click();
        cy.url().should('contain', '/add-user');
    });

    it('should log out', () => {

        cy.get('#logout').click();
        cy.url().should('contain', '/login');
    });

})
