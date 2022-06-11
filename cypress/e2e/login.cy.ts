/// <reference types="cypress" />

import LoginPage from "../pages/LoginPage"
import { getRandomUser } from "../util/user"

const loginPage = new LoginPage()

describe('login page', () => {
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

    it('should open register page', () => {
        // when
        loginPage.clickRegister()

        // then
        cy.get('h2').should('contain.text', 'Register')
    })

    it('should fail to login', () => {
        // when
        loginPage.attemptLogin('wrong', 'wrong')
        
        // then
        cy.get('.alert').should('contain.text', 'Invalid username/password')
    })

    it('should trigger frontend validation', () => {
        // when
        loginPage.clickLogin()

        // then
        cy.get('.invalid-feedback').eq(0).should('contain.text', 'Required field length')
        cy.get('.invalid-feedback').eq(1).should('contain.text', 'Required field length')
        cy.get('[name=username]').should('have.class', 'is-invalid')
        cy.get('[name=password]').should('have.class', 'is-invalid')
    })

})
