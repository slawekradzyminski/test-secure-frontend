/// <reference types="cypress" />

import { getRandomUser, User } from "../util/user"

describe('home page', () => {
    let token: string
    let user: User

    beforeEach(() => {
        user = getRandomUser()
        cy.register(user)
        cy.login(user.username, user.password).then(jwtToken => token = jwtToken)
        cy.visit('')
    })

    afterEach(() => {
        cy.deleteUser(user.username, token)
    })

    it('should display at least one user', () => {
        cy.get('ul li').should('have.length.at.least', 1)
    })

    it('should delete all users except myself', () => {
        cy.get('ul li').each($el => {
            if (!$el.text().includes(`${user.firstName} ${user.lastName}`)) {
                cy.wrap($el).find('.delete').click()
            }
        })
    })

    it('should cancel to delete a user', () => {
        Cypress.on('window:confirm', confirmationText => {
            expect(confirmationText).to.eq('Are you sure you wish to delete this item?')
            return false
        })

        cy.get('ul li').contains(`${user.firstName} ${user.lastName}`).find('.delete').click()

        cy.get('ul li').contains(`${user.firstName} ${user.lastName}`).should('be.visible')
    })

})
