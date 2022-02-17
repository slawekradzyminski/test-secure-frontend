/// <reference types="cypress" />

import HomePageAssertions from "../assertions/homePageAssertions"
import LoginPageAssertions from "../assertions/loginPageAssertions"
import LoginPage from "../pages/loginPage"
import { getUser } from "../util/userProvider"

const loginPage = new LoginPage()
const loginPageAssertions = new LoginPageAssertions()
const homePageAssertions = new HomePageAssertions()

describe('Login page', () => {
    beforeEach(() => {
        cy.visit('')
    })

    it('should successfully login', () => {
        const user = getUser()
        cy.register(user)
        loginPage.login(user.username, user.password)
        homePageAssertions.verifyHeader(user.firstName)
    })

    it('should fail to login', () => {
        loginPage.usernameField().type('wrong')
        loginPage.passwordField().type('wrong')
        loginPage.loginButton().click()
        loginPage.alert()
            .should('have.text', 'Invalid username/password supplied')
            .should('have.class', 'alert-danger')
    })

    it('should validate empty fields', () => {
        loginPage.clickLogin()
        loginPageAssertions.verifyFrontendValidation()
    })

    it('should redirect to register', () => {
        loginPage.clickRegister()
        cy.url().should('contain', '/register')
    })

})
