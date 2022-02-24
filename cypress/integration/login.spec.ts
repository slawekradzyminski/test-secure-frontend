/// <reference types="cypress" />

import LoginPage from "../pages/LoginPage"

const loginPage = new LoginPage()

describe('Login page', () => {
    beforeEach(() => {
        cy.visit('http://localhost:8080')
    })

    it('should successfully login', () => {
        loginPage.attemptLogin('admin', 'admin')
        cy.get('h1').should('contain.text', 'Slawomir')
    })

    it('should fail to login', () => {
        loginPage.attemptLogin('wrong', 'wrong')
        loginPage.verifyLoginFailed()
    })

})
