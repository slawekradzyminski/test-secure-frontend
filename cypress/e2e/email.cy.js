/// <reference types="cypress" />

import { getRandomEmail } from "../generator/email"
import { getRandomUser } from "../generator/user"

describe('Email page tests', () => {
    let token

    beforeEach(() => {
        // 1 Rejestrujemy nowego uzytkownika przez API
        const user = getRandomUser()
        cy.register(user)

        // 2 Logujemy sie na nowego uzytkownika
        cy.login(user.username, user.password)
        cy.getCookie('token').then((cookie) => {
            token = cookie.value
        })

        // 3 Klikamy wyslij email to nowego uzytkownika
        cy.get('li').contains(`${user.firstName} ${user.lastName}`).find('.email').click()
    })

    afterEach(() => {
        cy.deleteUser(user.username, token)
    })

    it('should successfully send an email', () => {
        const email = getRandomEmail()
        cy.get('[name=subject]').type(email.subject)
        cy.get('[name=message]').type(email.message)
        cy.get('.btn-primary').click()

        cy.get('.alert-success').should('contain.text', 'Email was scheduled to be send')
    })

})
