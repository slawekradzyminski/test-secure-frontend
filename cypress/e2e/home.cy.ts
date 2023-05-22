/// <reference types="cypress" />

import { User, getUser } from "../utils/user"

describe('Home page tests', () => {
    let user: User

    beforeEach(() => {
        user = getUser()
        cy.register(user)
        cy.login(user.username, user.password)
        cy.visit('http://localhost:8081')
    })

    afterEach(() => {
        cy.getCookie('token').then(token => {
            cy.request({
                url: `http://localhost:4001/users/${user.username}`,
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token?.value}`
                }
            })
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
