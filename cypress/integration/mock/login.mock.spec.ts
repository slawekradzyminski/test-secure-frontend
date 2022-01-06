/// <reference types="cypress" />

import HomePage from "../../pages/HomePage"
import LoginPage from "../../pages/LoginPage"

import { getRandomString } from "../../util/random"
import { getUser } from "../../util/userProvider"

const loginPage = new LoginPage()
const homePage = new HomePage()

describe('Login page', () => {
    const firstName = getRandomString()

    beforeEach(() => {
      cy.visit('')
      cy.mockLogin(getUser(firstName))
    })
  
    it('should successfully login', () => {
        const username = getRandomString()
        const password = getRandomString()
        loginPage.login(username, password)
        homePage.verifyWelcomeMessageContains(firstName)

        cy.wait('@loginRequest').its('request.body').should('deep.equal', {username, password})
    })


    it('should assert loading state', () => {
        cy.intercept('POST', '**/users/signin', {
            delay: 1000
        })
        loginPage.login(getRandomString(), getRandomString())
        cy.get('.spinner-border').should('be.visible')
        
    })
  })
  