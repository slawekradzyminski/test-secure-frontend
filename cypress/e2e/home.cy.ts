/// <reference types="cypress" />

import { getRandomUser, User } from "../util/user"

describe('login page', () => {
    let user: User
    let token: string

    beforeEach(() => {
        user = getRandomUser()
        cy.register(user)
        cy.login(user.username, user.password).then(jwtToken => token = jwtToken)
        cy.visit('http://localhost:8081')
    })

    afterEach(() => {
        cy.delete(user.username, token)
    })

    it('should display at least one user', () => {
        cy.log(token)
        cy.get('ul li').should('have.length.at.least', 1)
    })

    it('should logout', () => {
        cy.get('#logout').click()
        cy.url().should('contain', '/login')
        cy.get('h2').should('contain.text', 'Login')
    })

    it('should add more users', () => {
        cy.get('#addmore').click()
        cy.url().should('contain', '/add-user')
        cy.get('h2').should('contain.text', 'Register')
    })

    it('should open edit user', () => {
        cy.get('ul li').contains(user.firstName).find('.edit').click()
        cy.get('h2').should('have.text', 'Edit user')
    })

    it('should delete all users except me', () => {
        cy.get('ul li').each($el => {
            if (!$el.text().includes(`${user.firstName} ${user.lastName}`)) {
                cy.wrap($el).find('.delete').click()
            }
        })
    })

    it('should delete user', () => {
        const newUser = getRandomUser()
        cy.register(newUser)
        cy.reload()

        cy.get('ul li').contains(`${newUser.firstName} ${newUser.lastName}`).find('.delete').click()
        cy.get('ul li').contains(`${newUser.firstName} ${newUser.lastName}`).should('not.exist')
    })


    it('should not delete user', () => {
        Cypress.on('window:confirm', confirmationText => {
            expect(confirmationText).to.eq('Are you sure you wish to delete this item?')
            return false
        })

        cy.get('ul li').contains(`${user.firstName} ${user.lastName}`).find('.delete').click()
        cy.get('ul li').contains(`${user.firstName} ${user.lastName}`).should('be.visible')
    })
})
