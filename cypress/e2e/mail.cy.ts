/// <reference types="cypress" />

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
        cy.get('li').contains(`${user.firstName} ${user.lastName}`).find('.email').click()
    })

    afterEach(() => {
        cy.deleteUser(user.username, token)
    })

    it('should correctly send an email', () => {
        // given
        const email = getRandomEmail()

        // when
        cy.get('[name=subject]').type(email.subject)
        cy.get('[name=message]').type(email.body)
        cy.get('.btn-primary').click()

        // then
        cy.get('.alert').should('have.text', 'Email was scheduled to be send')
    })

})
