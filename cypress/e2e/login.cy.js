/// <reference types="cypress" />

import { actionAlert } from "../components/alert"
import { getRandomUser } from "../generator/user"
import { loginPage } from "../pages/loginPage"

describe('Login page tests', () => {
    beforeEach(() => {
        cy.visit('http://localhost:8081')
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
        actionAlert.verifyFailure('Invalid username/password supplied')
    })

    it('should open register page', () => {
        // when
        loginPage.clickRegister()

        // then
        cy.get('h2').should('have.text', 'Register')
        cy.url().should('contain', '/register')
    })

    it('should trigger frontend validation', () => {
        // when
        loginPage.clickLogin()

        // then
        verifyFrontendValidation()
    })

})

const verifyFrontendValidation= () => {
    cy.get('.invalid-feedback').eq(0).should('have.text', 'Required field length is 4 or more')
    cy.get('.invalid-feedback').eq(1).should('have.text', 'Required field length is 4 or more')
    cy.get('[name=username]').should('have.class', 'is-invalid')
    cy.get('[name=password]').should('have.class', 'is-invalid')
}

