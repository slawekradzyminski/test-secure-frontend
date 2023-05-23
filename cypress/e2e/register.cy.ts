/// <reference types="cypress" />

import RegisterPage from "../pages/RegisterPage"
import { getUser } from "../utils/user"

describe('Login page tests', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8081/register')
  })

  it('should fail to register if user already exists', () => {
    // given
    const user = getUser()
    cy.register(user)

    // when
    RegisterPage.attemptRegister(user)

    // then
    cy.get('.alert').should('have.text', 'Username is already in use')
  })

})