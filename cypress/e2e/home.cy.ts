/// <reference types="cypress" />

import { getUser } from "../utils/user"

describe('Home page tests', () => {
    beforeEach(() => {
        const user = getUser()
        cy.register(user)
        cy.login(user.username, user.password)
        cy.visit('http://localhost:8081')
    })

    it('should display at least one user', () => {
        cy.get('li').should('have.length.at.least', 1)
    })


    it('should logout', () => {
        cy.get('#logout').click()
        
        cy.url().should('contain', '/login')
    })
})
