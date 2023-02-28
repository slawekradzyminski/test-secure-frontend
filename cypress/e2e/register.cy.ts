/// <reference types="cypress" />

import { getRandomUser } from "../domain/user"

describe('Register page tests', () => {
    beforeEach(() => {
      cy.visit('http://localhost:8081/register')
    })

    it('should register successfully', () => {
        const user = getRandomUser()
        cy.get('[name=username]').type(user.username)
        cy.get('[name=password]').type(user.password)
        cy.get('[name=firstName]').type(user.firstName)
        cy.get('[name=lastName]').type(user.lastName)
        cy.get('[name=email]').type(user.email)
        cy.get('.btn-primary').click()

        cy.get('.alert-success').should('have.text', 'Registration successful')
    })

    it('should fail to register', () => {
        cy.get('[name=username]').type('admin')
        cy.get('[name=password]').type('wrong')
        cy.get('[name=firstName]').type('wrong')
        cy.get('[name=lastName]').type('wrong')
        cy.get('[name=email]').type('email@stonex.com')
        cy.get('.btn-primary').click()

        cy.get('.alert-danger').should('have.text', 'Username is already in use')
    })

    it('should trigger frontend validation', () => {
        cy.get('.btn-primary').click()
        cy.get('form input')
            .should('have.length', 5)
            .each(($input) => {
                cy.wrap($input).should('have.class', 'is-invalid')
            })
        cy.get('.form-group div')
            .should('have.length', 5)
            .each(($error) => {
                cy.wrap($error).should('have.text', 'Required field length is 4 or more')
            })
    })

  })
  