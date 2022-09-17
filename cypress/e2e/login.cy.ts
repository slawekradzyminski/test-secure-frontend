/// <reference types="cypress" />

import { getRandomUser } from "../util/userProvider"

describe('Login page tests', () => {
    beforeEach(() => {
      cy.visit('http://localhost:8081/')
    })
  
    it.only('should successfully login', () => {
      const user = getRandomUser()

      cy.request({
        method: 'POST',
        url: 'http://localhost:4001/users/signup', 
        body: {
          username: user.username,
          firstName: user.firstName,
          lastName: user.lastName,
          password: user.password,
          email: user.email,
          roles: user.roles
        },
      }).then(resp => {
        expect(resp.status).to.eq(201)
      })

      cy.get('input[name=username]').type(user.username)
      cy.get('input[name=password]').type(user.password)
      cy.get('.btn-primary').click()

      cy.get('h1').should('contain.text', user.firstName)
    })

    it('should fail to login', () => {
        cy.get('input[name=username]').type('admin')
        cy.get('input[name=password]').type('wrongPassword')
        cy.get('.btn-primary').click()
  
        cy.get('.alert-danger').should('have.text', 'Invalid username/password supplied')
      })

      it('should open register page', () => {
        cy.get('.btn-link').click()
  
        cy.url().should('contain', '/register')
        cy.get('h2').should('have.text', 'Register')
      })

      it('should trigger frontend validation', () => {
        cy.get('.btn-primary').click()

        cy.get('.invalid-feedback').should('have.length', 2)
        cy.get('.invalid-feedback').each(el => {
            expect(el.text()).to.eq('Required field length is 4 or more')
            // cy.wrap(el).should('have.text', 'Required field length is 4 or more')
        })
        cy.get('input.is-invalid').should('have.length', 2)
      })
  })
  