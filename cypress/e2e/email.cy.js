/// <reference types="cypress" />

import { emailPage } from "../pages/emailPage"
import { homePage } from "../pages/homePage"
import { generateRandomString } from "../utils/random"
import { getRandomUser } from "./domain/user"

describe('Email page tests', () => {
    beforeEach(() => {
        const user = getRandomUser()
        cy.register(user)
        cy.login(user.username, user.password)
        cy.visit('http://localhost:8081')
        homePage.clickEmailUser(user)
    })

    it('should successfully send an email', () => {
        // given
        const subject = generateRandomString()
        const message = generateRandomString()

        // when
        emailPage.attemptSendingEmail(subject, message)

        // then
        cy.get('.alert-success').should('have.text', 'Email was scheduled to be send')
    })

})
