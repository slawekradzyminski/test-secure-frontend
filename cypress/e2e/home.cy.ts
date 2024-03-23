/// <reference types="cypress" />

import { getRandomUser } from "../generators/userGenerator"

describe('Home page tests', () => {
    beforeEach(() => {
        const user = getRandomUser()
        cy.register(user)
        cy.login(user.username, user.password)
    })

    it('should display at least one user', () => {
        cy.get('li').should('have.length.at.least', 1)
    })

    it('should logout', () => {
        cy.get('#logout').click()
        cy.url().should('contain', '/login')
    })

    it('should add more users', () => {
        cy.get('#addmore').click()
        cy.url().should('contain', '/add-user')
    })

})
