/// <reference types="cypress" />

import { getRandomUser } from "../util/user"

describe('login page', () => {
    beforeEach(() => {
        cy.visit('http://localhost:8081')
    })

    it('should successfully login', () => {
        const user = getRandomUser()
        cy.register(user)
        cy.getById('username').type(user.username)
        cy.getById('password').type(user.password)
        cy.get('.btn-primary').click()

        cy.get('h1').should('contain.text', user.firstName)
    })

    it('should fail to login', () => {
        cy.getById('username').type('wrong')
        cy.getById('password').type('wrong')
        cy.get('.btn-primary').click()

        cy.get('.alert').should('contain.text', 'Invalid username/password')
            .and('have.class', 'alert-danger')
    })

    it('register button should redirect to register page', () => {
        cy.get('.btn-link').click()
        cy.url().should('contain', '/register')
    })

    it('empty fields should trigger frontend validation', () => {
        cy.get('.btn-primary').click()
        cy.get('.invalid-feedback').should('have.length', 2)
        cy.get('.invalid-feedback').eq(0).should('have.text', 'Required field length is 4 or more')
        cy.get('.invalid-feedback').eq(1).should('have.text', 'Required field length is 4 or more')
        cy.getById('username').should('have.class', 'is-invalid')
        cy.getById('username').should('have.class', 'is-invalid')
    })

})
