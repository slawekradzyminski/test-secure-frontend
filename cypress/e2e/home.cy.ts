/// <reference types="cypress" />

import { getRandomUser, User } from "../util/userProvider"

describe('Home page tests', () => {

    let user: User

    beforeEach(() => {
        user = getRandomUser()
        cy.register(user)
        cy.login(user.username, user.password)
        cy.visit('http://localhost:8081')
    })

    it('should display at least one user', () => {
        cy.get('li').should('have.length.at.least', 1)
        cy.get('li').contains(`${user.firstName} ${user.lastName}`).should('be.visible')
    })

    it('should have logged out', () => {
        cy.get('#logout').click()
        cy.get('h2').should('have.text', 'Login')
        cy.url().should('contain', 'login')
    })

    it('should open register page', () => {
        cy.get('#addmore').click()
        cy.url().should('contain', 'add-user')
    })
})
