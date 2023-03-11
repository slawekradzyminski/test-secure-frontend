/// <reference types="cypress" />

import { getRandomUser } from "../utils/user"

describe('Login page tests', () => {
    beforeEach(() => {
        cy.visit('http://localhost:8081')
    })

    it('should successfully login', () => {
        // given
        const user = getRandomUser()
        cy.register(user)

        // when
        cy.get('[name=username]').type(user.username)
        cy.get('[name=password]').type(user.password)
        cy.get('.btn-primary').click()

        // then
        cy.get('h1').should('contain.text', user.firstName)
    })

    it('should show error message on failed login', () => {
        cy.get('[name=username]').type('wrong')
        cy.get('[name=password]').type('wrong')
        cy.get('.btn-primary').click()

        cy.get('.alert').should('contain.text', 'Invalid username/password')
    })

    it('should trigger frontend validation', () => {
        cy.get('.btn-primary').click()

        cy.get('.invalid-feedback')
            .should('have.length', 2)
            .each(($el) => {
                cy.wrap($el).should('have.text', 'Required field length is 4 or more')
            })

        cy.get('input')
            .should('have.length', 2)
            .each(($el) => {
                cy.wrap($el).should('have.class', 'is-invalid')
            })
    })

    it('should click register and open register page', () => {
        cy.get('.btn-link')
            .should('have.text', 'Register')
            .click()

        cy.get('h2').should('have.text', 'Register')
        cy.url().should('contain', '/register')
    })
})
