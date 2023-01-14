/// <reference types="cypress" />

import { getRandomEmail, getRandomString } from "../util/random"

describe('Login page tests', () => {
    beforeEach(() => {
        cy.visit('http://localhost:8081')
    })

    it('should successfully login', () => {
        const username = getRandomString()
        const password = getRandomString()
        const firstName = getRandomString()

        cy.request({
            method: 'POST',
            url: 'http://localhost:4001/users/signup',
            body: {
                email: getRandomEmail(),
                firstName: firstName,
                username: username,
                password: password,
                lastName: getRandomString(),
                roles: [ 'ROLE_ADMIN', 'ROLE_CLIENT' ]
            }
        })

        cy.get('[name=username]').type(username)
        cy.get('[name=password]').type(password)
        cy.get('.btn-primary').click()

        cy.get('h1', {
            timeout: 6000
        }).should('contain.text', firstName)
    })

    it('should fail to login', () => {
        cy.get('[name=username]').type('wrong')
        cy.get('[name=password]').type('wrong')
        cy.get('.btn-primary').click()

        cy.get('.alert').should('have.text', 'Invalid username/password supplied')
    })

    it('should open register page', () => {
        cy.get('.btn-link').click()
        cy.get('h2').should('contain.text', 'Register')
        cy.url().should('contain', '/register')
    })

    it('should check FE validation', () => {
        cy.get('.btn-primary').click()
        cy.get('.invalid-feedback')
            .should('have.length', 2)
            .each(($errorMessage) => {
                cy.wrap($errorMessage).should('contain.text', 'Required field length')
            })
        cy.get('input.form-control').each(($input) => {
            cy.wrap($input).should('have.class', 'is-invalid')
        })
    });

})
