/// <reference types="cypress" />

import { homePage } from "../pages/homePage"
import { getRandomUser } from "./domain/user"

describe('Home page tests', () => {
    beforeEach(() => {
        const user = getRandomUser()
        cy.register(user)
        cy.login(user.username, user.password)
        cy.visit('http://localhost:8081')
    })

    it('should display at least one user', () => {
        // then
        cy.get('li').should('have.length.above', 0)
    })

    it('should logout', () => {
        // when
        homePage.clickLogout()

        // then
        cy.url().should('contain', '/login')
    })

    it('should open add more users page', () => {
        // when
        homePage.clickAddMoreUser()

        // then
        cy.url().should('contain', '/add-user')
    })

})
