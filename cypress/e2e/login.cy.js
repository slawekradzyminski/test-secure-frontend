/// <reference types="cypress" />

import { loginPage } from "../pages/loginPage"
import { getRandomUser } from "../utils/user"

describe('Login tests', () => {
    beforeEach(() => {
        cy.visit('http://localhost:8081')
    })

    //it.only() zeby odpalil się tylko jeden test

    it('should trigger frontend validation', () => {
        // when
        loginPage.selectors.getLoginButton().click()

        // then
        cy.get('.invalid-feedback').should('have.length', 2)
        cy.get('.invalid-feedback').eq(0).should('have.text', 'Required field length is 4 or more')
        cy.get('.invalid-feedback').eq(1).should('have.text', 'Required field length is 4 or more')
        cy.get('input.is-invalid').should('have.length', 2)
    })

    it('should successfully login', () => {
        // given
        const user = getRandomUser()
        cy.register(user)
        
        // when
        loginPage.attemptLogin(user.username, user.password)

        // then
        cy.get('h1').should('contain.text', user.firstName)
    })

    it('should fail to login', () => {
        // when
        loginPage.attemptLogin('wrong', 'wrong')

        // then
        cy.get('.alert').should('contain.text', 'Invalid username/password supplied')
    })

    it('should open register page', () => {
        // when
        loginPage.selectors.getRegisterButton().click()

        // then
        cy.get('h2').should('have.text', 'Register')
        cy.url().should('contain', '/register')
    })

})
