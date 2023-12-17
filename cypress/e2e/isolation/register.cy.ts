/// <reference types="cypress" />

import { Roles } from "../../domain/user"
import { getRandomUser } from "../../generator/userGenerator"
import { registerMocks } from "../../mocks/registerMocks"

describe('register page tests in isolation', () => {
    beforeEach(() => {
      cy.visit('/register')
    })
  
    it('should successfully register', () => {
        // given
        const user = getRandomUser()
        registerMocks.mockSuccessfulRegister()

        // when
        cy.get('[name=username]').type(user.username)
        cy.get('[name=password]').type(user.password)
        cy.get('[name=firstName]').type(user.firstName)
        cy.get('[name=lastName]').type(user.lastName)
        cy.get('[name=email]').type(user.email)
        cy.get('.btn-primary').click()

        // then
        cy.url().should('contain', '/login')
        cy.get('.alert-success').should('have.text', 'Registration successful')
        cy.get('@registerRequest').its('request.body').should('deep.equal', {
            ...user,
            roles: [Roles.ROLE_CLIENT]
        })
    })

  })
  