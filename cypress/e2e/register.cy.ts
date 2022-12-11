/// <reference types="cypress" />

import { getRandomUser } from '../utils/user';

describe('Register page tests', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8081/register')
  })

  it('should successfully register', () => {
    const user = getRandomUser()

    cy.get('[name=firstName]').type(user.firstName)
    cy.get('[name=lastName]').type(user.lastName)
    cy.get('[name=username]').type(user.username)
    cy.get('[name=password]').type(user.password)
    cy.get('[name=email]').type(user.email)
    cy.get('.btn-primary').click()

    cy.get('.alert-success').should('contain.text', 'Registration successful')

    // Chcę odpytać endpoint /users/{user.username}
    // Muszę przekazać token JWT jako nagłówek
    cy.login(user.username, user.password).then(() => {
      cy.request({
        method: 'GET',
        url: `http://localhost:4001/users/${user.username}`,
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem('user')!).token}`
        }
      }).then((resp) => {
        expect(resp.body.username).to.eq(user.username)
      })
    })
    
  })

  it('should fail to register if username already exists', () => {
    const user = getRandomUser()

    cy.get('[name=firstName]').type(user.firstName)
    cy.get('[name=lastName]').type(user.lastName)
    cy.get('[name=username]').type('admin')
    cy.get('[name=password]').type(user.password)
    cy.get('[name=email]').type(user.email)
    cy.get('.btn-primary').click()

    cy.get('.alert')
      .should('contain.text', 'already in use')
      .and('have.class', 'alert-danger')
  })

})
