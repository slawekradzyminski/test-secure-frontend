/// <reference types="cypress" />

import { getRandomUser } from "../utils/user"

describe('Home page tests', () => {
    beforeEach(() => {
        const user = getRandomUser()
        cy.register(user)
        cy.login(user.username, user.password)
        cy.visit('http://localhost:8081')
    })

    it('should display at least one user', () => {
        cy.get('ul li').should('have.length.gt', 0)
    })

    it('should logout', () => {
        cy.get('#logout').click()
        cy.url().should('contain', '/login')
    })

    it('should open add more users page', () => {
        cy.get('#addmore').click()
        cy.url().should('contain', '/add-user')
    })

})
