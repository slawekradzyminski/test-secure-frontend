/// <reference types="cypress" />

import LoginPage from "../pages/LoginPage"
import { getRandomUser } from "../utils/user"

describe('Login page tests', () => {
    beforeEach(() => {
        cy.visit('http://localhost:8081')
    })

    it('should successfully login', () => {
        // given
        const user = getRandomUser()
        cy.register(user)

        // when
        LoginPage.attemptLogin(user.username, user.password)

        // then
        cy.get('h1').should('contain.text', user.firstName)
    })

    it('should show error message on failed login', () => {
        // when
        LoginPage.attemptLogin('wrong', 'wrong')

        // then
        cy.get('.alert').should('contain.text', 'Invalid username/password')
    })

    it('should trigger frontend validation', () => {
        // when
        LoginPage.clickLogin()

        // then
        cy.get('.invalid-feedback')
            .should('have.length', 2)
            .each(($el) => {
                cy.wrap($el).should('have.text', 'Required field length is 4 or more')
            })

        cy.get('input')
            .should('have.length', 2)
            .each(($el) => {
                cy.wrap($el).should('have.class', 'is-invalid')
            })
    })

    it('should click register and open register page', () => {
        // when
        LoginPage.clickRegister()

        // then
        cy.get('h2').should('have.text', 'Register')
        cy.url().should('contain', '/register')
    })
})
