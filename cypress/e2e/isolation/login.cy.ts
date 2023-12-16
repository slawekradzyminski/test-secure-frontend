/// <reference types="cypress" />

import { getLoginResponseFrom } from "../../domain/api/login"
import { getRandomUser } from "../../generator/userGenerator"

describe('Login page tests in isolation', () => {
    beforeEach(() => {
        cy.visit('')
    })

    it('should open register page', () => {
        cy.get('.btn-link').click()
        cy.url().should('contain', 'register')
    })

    it('should successfully login', () => {
        // given
        const user = getRandomUser()
        cy.intercept('POST', '/users/signin', {
            statusCode: 200,
            body: getLoginResponseFrom(user)
        })
        cy.intercept('GET', '**/users', { fixture: 'users.json' })

        // when
        cy.get('[name=username]').type(user.username)
        cy.get('[name=password]').type(user.password)
        cy.get('.btn-primary').click()

        // then
        cy.get('h1').contains(user.firstName)
    })

})
