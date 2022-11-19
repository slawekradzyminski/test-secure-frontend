/// <reference types="cypress" />

import { getRandomUser } from "../utils/user"

describe('login', () => {
    beforeEach(() => {
      cy.visit('/')
    })
  
    it('should successfully login', () => {
      const user = getRandomUser()
      cy.register(user)

      cy.get('[name=username]').type(user.username)
      cy.get('[name=password]').type(user.password)
      cy.get('.btn-primary').click()

    })

  })
  