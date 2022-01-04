
/// <reference types="cypress" />

import { getRandomEmail, getRandomString } from "../util/random"

describe('Login page', () => {
    const username = getRandomString()
    const password = getRandomString()
    const firstName = getRandomString()

    beforeEach(() => {
      cy.visit('')
      cy.register(username, password, firstName, getRandomString(), getRandomEmail())
    })
  
    it('should successfully login', () => {
        cy.get('[name=username]').type(username)
        cy.get('[name=password]').type(password)
        cy.get('.btn-primary').click()
        cy.get('h1').should('contain.text', firstName)
    })
  })
  