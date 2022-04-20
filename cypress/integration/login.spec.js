/// <reference types="cypress" />

import { getRandomString } from "../util/random"

describe('login page', () => {
  beforeEach(() => {
    cy.visit('')
  })

  it('should successfully login', () => {
    const username = getRandomString()
    const password = getRandomString()
    const firstName = getRandomString()

    cy.intercept('POST', '**/users/signin', {
      statusCode: 200,
      body: {
        username: username,
        roles: ['ROLE_ADMIN'],
        firstName: firstName,
        lastName: 'Radzyminski',
        token: 'fakeToken',
        email: 'admin@email.com'
      }
    }).as('loginRequest')
    cy.intercept('GET', '**/users', { fixture: 'users.json' })

    cy.get('[name=username]').type(username)
    cy.get('[name=password]').type(password)
    cy.get('.btn-primary').click()

    cy.get('h1').should('contain.text', firstName)

    cy.wait('@loginRequest').its('request.body').should('deep.equal', { username, password })
  })

  it('should fail to login', () => {
    const message = 'Invalid username/password supplied'

    cy.intercept('POST', '**/users/signin', {
      statusCode: 422,
      body: {
        timestamp: '2022-04-20T09:36:10.744+00:00',
        status: 422,
        error: 'Unprocessable Entity',
        message: message,
        path: '/users/signin'
      }
    })
    cy.get('[name=username]').type(getRandomString())
    cy.get('[name=password]').type(getRandomString())
    cy.get('.btn-primary').click()

    cy.get('.alert').should('have.text', message)
  })

  it('should display loading indicator', () => {
    cy.intercept('POST', '**/users/signin', { delay: 1000 })
    cy.get('[name=username]').type(getRandomString())
    cy.get('[name=password]').type(getRandomString())
    cy.get('.btn-primary').click()

    cy.get('.btn-primary .spinner-border').should('be.visible')
  })
})
