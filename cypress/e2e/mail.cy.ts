/// <reference types="cypress" />

import { emailPage } from "../pages/emailPage"
import { homePage } from "../pages/homePage"
import { getRandomEmail } from "../utils/email"
import { getRandomUser, User } from "../utils/user"

describe('Mail page tests', () => {
    let user: User
    let token: string | undefined

    beforeEach(() => {
        user = getRandomUser()
        cy.register(user)
        cy.login(user.username, user.password)
        cy.visit('http://localhost:8081')
        cy.getCookie('token').then((cookie) => token = cookie?.value)
        homePage.clickEmailFor(user)
    })

    afterEach(() => {
        cy.deleteUser(user.username, token)
    })

    it('should correctly send an email', () => {
        // given
        const email = getRandomEmail()

        // when
        emailPage.sendEmail(email)

        // then
        cy.get('.alert').should('have.text', 'Email was scheduled to be send')
    })

    it('should trigger frontend validation', () => {
        // when
        emailPage.selectors.editButton().click()

        // then
        cy.get('.invalid-feedback')
            .should('have.length', 2)
            .each(($el) => {
                cy.wrap($el).should('have.text', 'Required field length is 4 or more')
            })
    })

})
