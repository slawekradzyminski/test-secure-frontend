/// <reference types="cypress" />

import { getRandomUser } from "../generator/user"
import { homePage } from "../pages/homePage"

describe('Home page tests', () => {
    let user
    let token

    beforeEach(() => {
        user = getRandomUser()
        cy.register(user)
        cy.login(user.username, user.password)
        cy.getCookie('token').then((cookie) => {
            token = cookie.value
        })
    })

    afterEach(() => {
        cy.deleteUser(user.username, token)
    })

    it('should display at least one user', () => {
        // then
        cy.get('li').should('have.length.at.least', 1)
    })

    it('should open edit user page', () => {
        // when
        homePage.clickEditUser(user)

        // then
        cy.get('h2').should('contain.text', 'Edit user')
    })

    it('should open email page', () => {
        // when
        homePage.clickSendEmailTo(user)

        // then
        cy.get('h2').should('contain.text', 'Email user')
    })

})
