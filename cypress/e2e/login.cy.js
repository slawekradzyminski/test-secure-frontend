/// <reference types="cypress" />

import { getRandomUser } from "../generator/user"

describe('Login page tests', () => {
    beforeEach(() => {
        cy.visit('http://localhost:8081')
    })

    it('should successfully login', () => {
        const user = getRandomUser()
        cy.register(user)

        cy.get('[name=username]').type(user.username)
        cy.get('[name=password]').type(user.password)
        cy.get('.btn-primary').click()

        cy.get('h1').should('contain.text', user.firstName)
    })

    it('should fail to login', () => {
        cy.get('[name=username]').type('wrong')
        cy.get('[name=password]').type('wrong')
        cy.get('.btn-primary').click()

        cy.get('.alert').should('have.text', 'Invalid username/password supplied')
    })

    it('should open register page', () => {
        cy.get('.btn-link').click()

        cy.get('h2').should('have.text', 'Register')
        cy.url().should('contain', '/register')
    })

    it('should trigger frontend validation', () => {
        cy.get('.btn-primary').click()
        cy.get('.invalid-feedback').eq(0).should('have.text', 'Required field length is 4 or more')
        cy.get('.invalid-feedback').eq(1).should('have.text', 'Required field length is 4 or more')
        cy.get('[name=username]').should('have.class', 'is-invalid')
        cy.get('[name=password]').should('have.class', 'is-invalid')
    })

})
