/// <reference types="cypress" />

import { homePage } from "../pages/homePage"
import { loginPage } from "../pages/loginPage"
import { email, password } from "../util/credentials"

describe('Login tests', () => {
    beforeEach(() => {
      cy.visit('http://demo.testarena.pl/zaloguj')
    })
  
    it('should successfully login', () => {
        loginPage.attemptLogin(email, password)
        cy.get(homePage.selectors.userInfo).should('contain.text', 'Gall Anonim')
    })

    it('should open forgot my password page', () => {
        cy.get("a[href='http://demo.testarena.pl/odzyskaj_haslo']").click()
        cy.get('h1').should('contain.text', 'Odzyskaj hasło')
    })

  })
  