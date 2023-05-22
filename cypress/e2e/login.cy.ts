/// <reference types="cypress" />

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
    cy.get('[name=username]').type(user.username)
    cy.get('[name=password]').type(user.password)
    cy.get('.btn-primary').click()

    // then
    cy.get('h1').should('contain.text', user.firstName)
  })
})