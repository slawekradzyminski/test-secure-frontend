/// <reference types="cypress" />

import HomePage from "../../pages/HomePage"
import LoginPage from "../../pages/LoginPage"

import { getRandomEmail, getRandomString } from "../../util/random"

const loginPage = new LoginPage()
const homePage = new HomePage()

describe('Login page', () => {
    const firstName = getRandomString()

    beforeEach(() => {
      cy.visit('')

      cy.intercept('POST', '**/users/signin', {
          statusCode: 200,
          body: {
              username: getRandomString(),
              token: 'fakeToken',
              firstName,
              lastName: getRandomString(),
              email: getRandomEmail(),
              roles: ['ROLE_CLIENT']
          },
      }).as('loginRequest')
    })
  
    it('should successfully login', () => {
        const username = getRandomString()
        const password = getRandomString()
        loginPage.login(username, password)
        homePage.verifyWelcomeMessageContains(firstName)

        cy.wait('@loginRequest').its('request.body').should('deep.equal', {username, password})
    })


    it('should assert loading state', () => {
        loginPage.login(getRandomString(), getRandomString())

        cy.intercept('POST', '**/users/signin', {
            delay: 1000
        })
        cy.get('.btn-primary').click()
        cy.get('.spinner-border').should('be.visible')
        
    })
  })
  