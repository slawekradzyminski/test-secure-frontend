/// <reference types="cypress" />

import { getRandomEmail, getRandomString } from "../util/random"

describe('Register page', () => {
    beforeEach(() => {
        cy.visit('http://localhost:8081/register')
    })

    it('should fail to register if user already exists', () => {
        cy.get('[name=firstName]').type('admin')
        cy.get('[name=lastName]').type('admin')
        cy.get('[name=username]').type('admin')
        cy.get('[name=password]').type('admin')
        cy.get('[name=email]').type('admin@test.com')
        cy.get('.btn-primary').click()

        cy.get('.alert').should('have.text', 'Username is already in use')
    })

    it('should register successfully register', () => {
        cy.get('[name=firstName').type(getRandomString())
        cy.get('[name=lastName').type(getRandomString())
        cy.get('[name=username').type(getRandomString())
        cy.get('[name=password]').type(getRandomString())
        cy.get('[name=email]').type(getRandomEmail())
        cy.get('.btn-primary').click()
        cy.get('.alert').should('have.text', 'Registration successful')
    })

    it('should check FE validation', () => {
        cy.get('.btn-primary').click()
        cy.get('.invalid-feedback')
            .should('have.length', 5)
            .each(($errorMessage) => {
                cy.wrap($errorMessage).should('contain.text', 'Required field length')
            })
        cy.get('input.form-control').each(($input) => {
            cy.wrap($input).should('have.class', 'is-invalid')
        })
    });

})
