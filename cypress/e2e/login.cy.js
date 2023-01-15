/// <reference types="cypress" />

import LoginScreen from "../pages/LoginScreen"
import RegisterScreen from "../pages/RegisterScreen"
import { getRandomUser } from "../util/user"

describe('Login page tests', () => {
    beforeEach(() => {
        cy.visit('http://localhost:8081')
    })

    it('should successfully login', () => {
        // given
        const user = getRandomUser()
        cy.register(user)

        // when
        LoginScreen.attempLogin(user.username, user.password)

        // then
        cy.get('h1', { timeout: 6000 }).should('contain.text', user.firstName)
    })

    it('should fail to login', () => {
        // when
        LoginScreen.attempLogin('wrong', 'wrong')

        // then
        cy.get('.alert').should('have.text', 'Invalid username/password supplied')
    })

    it('should open register page', () => {
        // when
        LoginScreen.getRegisterButton().click()

        // then
        RegisterScreen.getHeader().should('contain.text', 'Register')
        cy.url().should('contain', '/register')
    })

    it('should check FE validation', () => {
        // when
        LoginScreen.getLoginButton().click()

        // then
        cy.get('.invalid-feedback')
            .should('have.length', 2)
            .each(($errorMessage) => {
                cy.wrap($errorMessage).should('contain.text', 'Required field length')
            })
        cy.get('input.form-control').each(($input) => {
            cy.wrap($input).should('have.class', 'is-invalid')
        })
    });

})
