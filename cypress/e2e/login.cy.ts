/// <reference types="cypress" />

import { getRandomUser } from "../domain/user"
import LoginPage from "../pages/LoginPage"

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
        cy.get('h1', { timeout: 5000 }).should('contain.text', user.firstName)
    })

    it('should fail to login', () => {
        // when
        LoginPage.attemptLogin('wrong', 'wrong')

        // then
        cy.get('.alert-danger').should('have.text', 'Invalid username/password supplied')
    })

    it('should trigger frontend validation', () => {
        // when
        LoginPage.clickLogin()

        // then
        cy.get('form input')
            .should('have.length', 2)
            .each(($input) => {
                cy.wrap($input).should('have.class', 'is-invalid')
            })
        cy.get('.form-group div')
            .should('have.length', 2)
            .each(($error) => {
                cy.wrap($error).should('have.text', 'Required field length is 4 or more')
            })
    })

})
