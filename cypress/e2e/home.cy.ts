/// <reference types="cypress" />

import { User, getUser } from "../utils/user"

describe('Home page tests', () => {
    let user: User
    let token: string | undefined

    beforeEach(() => {
        user = getUser()
        cy.register(user)
        cy.login(user.username, user.password)
        cy.visit('http://localhost:8081')
        cy.getCookie('token').then(cookie => {
            token = cookie?.value
        })
    })

    afterEach(() => {
        cy.deleteUser(user.username, token)
    })

    it('should display at least one user', () => {
        cy.get('li').should('have.length.at.least', 1)
    })

    it('should logout', () => {
        cy.get('#logout').click()

        cy.url().should('contain', '/login')
    })

    it('should successfully delete an user', () => {
        // given
        const userToDelete = getUser()
        cy.register(userToDelete)
        cy.reload()

        // when
        cy.get('li').contains(`${userToDelete.firstName} ${userToDelete.lastName}`).find('.delete').click()

        // then
        cy.get('li').contains(`${userToDelete.firstName} ${userToDelete.lastName}`).should('not.exist')
        cy.request({
            method: 'DELETE',
            url: `http://localhost:4001/users/${userToDelete.username}`,
            headers: {
                Authorization: `Bearer ${token}`
            },
            failOnStatusCode: false
        }).then(resp => {
            expect(resp.status).to.eq(404)
        })
    })

    it('should open add user page', () => {
        // when
        cy.get('#addmore').click()

        // then
        cy.url().should('contain', '/add-user')
    })
})
