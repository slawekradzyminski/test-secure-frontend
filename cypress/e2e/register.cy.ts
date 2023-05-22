/// <reference types="cypress" />

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
    cy.get('[name=username]').type(user.username)
    cy.get('[name=firstName]').type(user.firstName)
    cy.get('[name=lastName]').type(user.lastName)
    cy.get('[name=password]').type(user.password)
    cy.get('[name=email]').type(user.email)
    cy.get('.btn-primary').click()

    // then
    cy.get('.alert').should('have.text', 'Username is already in use')
  })

})