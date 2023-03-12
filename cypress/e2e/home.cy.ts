/// <reference types="cypress" />

import { homePage } from "../pages/homePage"
import { getRandomUser, User } from "../utils/user"

describe('Home page tests', () => {
    let user: User
    let token: string | undefined

    beforeEach(() => {
        user = getRandomUser()
        cy.register(user)
        cy.login(user.username, user.password)
        cy.visit('http://localhost:8081')
        cy.getCookie('token').then((cookie) => token = cookie?.value)
    })

    afterEach(() => {
        cy.deleteUser(user.username, token)
    })

    it('should display at least one user', () => {
        // then
        cy.get('ul li').should('have.length.gt', 0)
    })

    it('should logout', () => {
        // when
        homePage.clickLogout()

        // then
        cy.url().should('contain', '/login')
    })

    it('should open add more users page', () => {
        // when
        homePage.clickAddMore()

        // then
        cy.url().should('contain', '/add-user')
    })

})
