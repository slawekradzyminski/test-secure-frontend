/// <reference types="cypress" />

import { registerPage } from "../pages/registerPage"
import { getRandomUser } from "../utils/user"

describe('Register tests', () => {
    beforeEach(() => {
        cy.visit('http://localhost:8081/register')
    })

    it('should successfully register', () => {
        // given
        const user = getRandomUser()

        // when
        registerPage.attemptRegister(user)

        // then
        cy.get('.alert').should('contain.text', 'Registration successful')
        cy.login(user.username, user.password)
    })

    it('should open login page', () => {
        // when
        registerPage.selectors.getLoginButton().click()

        // then
        cy.get('h2').should('have.text', 'Login')
        cy.url().should('contain', '/login')
    })

    it('should trigger frontend validation', () => {
        // when
        registerPage.selectors.getRegisterButton().click()

        // then
        cy.get('.invalid-feedback').should('have.length', 5).each(($el) => {
            cy.wrap($el).should('have.text', 'Required field length is 4 or more')
        })
        cy.get('input.is-invalid').should('have.length', 5)
    })

})
