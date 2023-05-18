/// <reference types="cypress" />

import { generateRandomEmail, generateRandomString } from "../utils/random"

describe('Login page', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8081')
  })

  it('should §successfully login', () => {
    const username = generateRandomString(6)
    const password = generateRandomString(6)
    const firstName = generateRandomString(8)
    const lastName = generateRandomString(8)
    const email = generateRandomEmail(8)

    cy.request({
      method: 'POST',
      url: 'http://localhost:4001/users/signup',
      body: {
        firstName: firstName,
        lastName: lastName,
        username: username,
        password: password,
        roles: [ "ROLE_CLIENT" ],
        email: email
      },
    })

    cy.login(username, password)

    cy.get('h1').should('contain.text', firstName)
  })

  it('should fail to login', () => {
    cy.login('wrong', 'wrong')

    cy.get('.alert').should('contain.text', 'Invalid username/password supplied')
  })

  it('should open Register page', () => {
    cy.get('.btn.btn-link').click()

    // Asercje w Cypressie
    cy.get('h2').should('have.text', 'Register')
    cy.url().should('contain', 'register')
  })

})
