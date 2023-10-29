/// <reference types="cypress" />

import { getRandomUser } from "../generator/user"

describe('Home page tests', () => {
    let user

    beforeEach(() => {
        user = getRandomUser()
        cy.register(user)
        cy.login(user.username, user.password)
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
        homePage.clickSendEmailToUser(user)

        // then
        cy.get('h2').should('contain.text', 'Email user')
    })

})
