/// <reference types="cypress" />

import { getRandomUser } from "../domain/user"

describe('Login page tests', () => {
    beforeEach(() => {
        cy.visit('')
    })

    it('should successfully login', () => {
        const user = getRandomUser()
        cy.register(user)
        cy.get('form input[name="username"]').type(user.username);
        cy.get('form input[name="password"]').type(user.password);
        cy.get('.btn-primary').click();

        cy.get('h1').should('contain.text', user.firstName)
    })

    it('should fail to login and display alert', () => {
        cy.get('form input[name="username"]').type('admin');
        cy.get('form input[name="password"]').type('wrongPassword');
        cy.get('.btn-primary').click();

        cy.get('.alert-danger').should('have.text', 'Invalid username/password supplied')
    })

    it('should open register page', () => {
        cy.get('.btn-link', { timeout: 1000 }).click()

        cy.get('h2').should('have.text', 'Register')
        cy.url().should('contain', '/register')
    })

    it('should trigger frontend validation', () => {
        cy.get('.btn-primary').click()

        cy.get('.invalid-feedback').each(($el) => {
            cy.wrap($el).should('have.text', 'Required field length is 4 or more')
        })
        cy.get('form input').each(($el) => {
            cy.wrap($el).should('have.class', 'is-invalid')
        })

    })

})
