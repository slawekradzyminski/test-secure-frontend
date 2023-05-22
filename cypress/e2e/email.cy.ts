/// <reference types="cypress" />

import { getEmail } from "../utils/email"
import { User, getUser } from "../utils/user"

describe('Email page tests', () => {
    let user: User
    let token: string | undefined

    beforeEach(() => {
        user = getUser()
        cy.register(user)
        cy.login(user.username, user.password)
        cy.visit('http://localhost:8081')
        cy.getCookie('token').then(cookie => {
            token = cookie?.value
        })
        cy.get('li').contains(`${user.firstName} ${user.lastName}`).find('.email').click()
    })

    afterEach(() => {
        cy.deleteUser(user.username, token)
    })

    it('should successfully send an email', () => {
        // given
        const email = getEmail()

        // when
        cy.get('[name=subject]').type(email.subject)
        cy.get('[name=message]').type(email.message)
        cy.get('.btn-primary').click()

        // then
        cy.get('.alert').should('contain.text', 'Email was scheduled to be send')
    })

})
