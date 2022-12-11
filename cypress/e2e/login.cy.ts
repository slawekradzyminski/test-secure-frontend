/// <reference types="cypress" />

import { getRandomUser } from "../utils/user"
import Alert from "../components/Alert"
import HomePage from "../pages/HomePage"
import { loginPage } from "../pages/LoginPage"
import RegisterPage from "../pages/RegisterPage"

describe('Login page tests', () => {

    beforeEach(() => {
      cy.visit('http://localhost:8081')
    })
  
    it('should successfully login', () => {
        // Rejestracja uzytkownika przez API
        // given
        const user = getRandomUser()
        cy.register(user)

        // when
        // Logowanie na tego uzytkownika
        loginPage.attemptLogin(user.username, user.password)

        // then
        HomePage.getHeader().should('contain.text', user.firstName)
    })
  
    it('should fail to login with wrong credentials', () => {
        // when
        loginPage.attemptLogin('wrong', 'wrong')

        // then
        Alert.getAlertFailure().should('contain.text', 'Invalid username/password supplied')
    })

    it('should open register page', () => {
        // when
        loginPage.getRegisterLink().click()

        // then
        RegisterPage.getHeader().should('have.text', 'Register')
        cy.url().should('contain', '/register')
    })

  })
  