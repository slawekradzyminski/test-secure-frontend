/// <reference types="cypress" />

import LoginPage from "../pages/LoginPage"
import { getUser } from "../utils/user"

describe('Login page tests', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8081')
  })

  it('should successfully login', () => {
    // given
    const user = getUser()
    cy.register(user)

    // when
    LoginPage.attemptLogin('wrong', 'wrong')
    
    // then
    cy.get('h1').should('contain.text', user.firstName)
  })

})