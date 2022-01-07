/// <reference types="cypress" />

import { getRandomEmail, getRandomString } from "../util/random"

describe('Login page', () => {
  let token: string;
  const username = getRandomString()
  const password = getRandomString()
  const firstName = getRandomString()

  before(() => {
    cy.register(username, password, firstName, getRandomString(), getRandomEmail())
  })

  after(() => {
    cy.deleteUser(username, token)
  })

  beforeEach(() => {
    cy.visit('')
  })

  it('C2118 should successfully login', () => {
    cy.intercept('POST', '**/users/signin',
      (req) => {
        expect(req.body).to.deep.eq({ username, password })
        req.on('response', (res) => {
          expect(res.body.token).not.to.be.null;
          token = res.body.token;
        })
      }
    )
    cy.get('[name=username]').type(username)
    cy.get('[name=password]').type(password)
    cy.get('.btn-primary').click()
    cy.get('h1').should('contain.text', firstName)
  })

  it('C2128 should fail to login', () => {
    cy.get('[name=username]').type('wrong')
    cy.get('[name=password]').type('wrong')
    cy.get('.btn-primary').click()
    cy.get('.alert').should('contain.text', 'Invalid username/password supplied')
  })

  it('C2129 should trigger frontend validation', () => {
    let count = 0
    cy.intercept('POST', '**/users/signin',() => {
      count += 1
    })
    cy.get('.btn-primary').click().then(() => {
      expect(count).to.eq(0)
    })
  })
})
