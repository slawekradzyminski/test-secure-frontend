/// <reference types="cypress" />

import { getRandomUser, User } from "../domain/user"

describe('Home page tests', () => {
    let user: User
    let token: string

    beforeEach(() => {
        user = getRandomUser()
        cy.register(user)
        cy.login(user.username, user.password).then((returnedToken) => {
            cy.setCookie('token', returnedToken)
            token = returnedToken
        })
        cy.visit('')
        cy.getCookie('token').its('value').should('not.be.empty')
    })

    afterEach(() => {
        cy.request({
            method: 'DELETE',
            url: `http://localhost:4001/users/${user.username}`,
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((resp) => expect(resp.status).to.eq(204))
    })

    it('should display at least one user', () => {
        cy.get('li').should('have.length.at.least', 1)
    })

    it('should logout', () => {
        cy.get('#logout').click()
        cy.url().should('contain', '/login')
    })

    it('should open add more users page', () => {
        cy.get('#addmore').click()
        cy.url().should('contain', '/add-user')
    })

    it('should open edit user', () => {
        cy.get('li').contains(`${user.firstName} ${user.lastName}`).find('.edit').click()
        cy.get('h2').should('contain.text', 'Edit')
    })

    it('should delete all users except the active one', () => {
        cy.get('li').each(($el) => {
            if (!$el.text().includes(`${user.firstName} ${user.lastName}`)) {
                cy.wrap($el).find('.delete').click()
            }
        })
    })

})
