/// <reference types="cypress" />

import { getRandomUser, User } from "../domain/user"

describe('Home page tests', () => {
    let user: User
    let token: string

    beforeEach(() => {
        user = getRandomUser()
        cy.register(user)
        cy.login(user.username, user.password).then((jwtToken) => {
            cy.setCookie('token', jwtToken)
            token = jwtToken
        })
        cy.visit('')
    })

    afterEach(() => {
        cy.deleteUser(user.username, token)
    })

    it('should display at least one user', () => {
        cy.get('li').should('have.length.at.least', 1)
    })

    it('should logout', () => {
        cy.get('#logout').click()

        cy.get('h2').should('have.text', 'Login')
        cy.url().should('contain', '/login')
    })

    it('should open add more page', () => {
        cy.get('#addmore').click()

        cy.get('h2').should('have.text', 'Register')
        cy.url().should('contain', '/add-user')
    })

    it('should open edit page for current user', () => {
        cy.get('li').contains(`${user.firstName} ${user.lastName}`).find('.edit').click()

        cy.get('h2').should('contain.text', 'Edit')
    })

    it('should delete all users except the current one', () => {
        cy.get('li').each(($el) => {
            if (!$el.text().includes(`${user.firstName} ${user.lastName}`)) {
                cy.wrap($el).find('.delete').click()
            }
        })
    })

})
