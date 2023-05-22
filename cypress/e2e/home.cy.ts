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
        cy.request({
            url: `http://localhost:4001/users/${user.username}`,
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
    })

    it('should display at least one user', () => {
        cy.get('li').should('have.length.at.least', 1)
    })


    it('should logout', () => {
        cy.get('#logout').click()

        cy.url().should('contain', '/login')
    })
})
