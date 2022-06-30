/// <reference types="cypress" />

import { getRandomEmail, getRandomString } from "../util/random"

describe('register page', () => {
    beforeEach(() => {
        cy.visit('http://localhost:8081/register')
    })

    it('should successfully register', () => {
        cy.getById('firstName').type(getRandomString())
        cy.getById('lastName').type(getRandomString())
        cy.getById('username').type(getRandomString())
        cy.getById('password').type(getRandomString())
        cy.getById('email').type(getRandomEmail())
        cy.get('.btn-primary').click()

        cy.get('.alert').should('contain.text', 'Registration successful')
        cy.url().should('contain', '/login')
    })

    it('should fail to register', () => {
        cy.getById('firstName').type(getRandomString())
        cy.getById('lastName').type(getRandomString())
        cy.getById('username').type('admin')
        cy.getById('password').type(getRandomString())
        cy.getById('email').type(getRandomEmail())
        cy.get('.btn-primary').click()

        cy.get('.alert').should('contain.text', 'Username is already in use')
        cy.url().should('contain', '/register')
    })

    it('should be login page', () => {
        cy.get('.btn-link').click()
        cy.url().should('contain', '/login')
    })

})
