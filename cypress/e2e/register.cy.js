/// <reference types="cypress" />

import { getRandomEmail, getRandomString } from "../util/random"

describe('Register page tests', () => {

    beforeEach(() => {
        cy.visit('http://localhost:8081/register')
    })

    it('should successfully register', () => {
        cy.get('[name=username]').type(getRandomString())
        cy.get('[name=firstName]').type(getRandomString())
        cy.get('[name=lastName]').type(getRandomString())
        cy.get('[name=email]').type(getRandomEmail())
        cy.get('[name=password]').type(getRandomString())
        cy.get('.btn-primary').click();

        cy.get('.alert-success').should('have.text', 'Registration successful')
        cy.url().should('contain', '/login')
    })

    it('should fail to register if user exists', () => {
        cy.get('[name=firstName]').type(getRandomString());
        cy.get('[name=lastName]').type(getRandomString());
        cy.get('[name=username]').type('admin');
        cy.get('[name=password]').type(getRandomString());
        cy.get('[name=email]').type(getRandomEmail());
  
        cy.get('.btn-primary').click()
  
        cy.get('.alert-danger').should('have.text', 'Username is already in use') 
    })

    it('should go back to login page', () => {
        cy.get('.btn-link').click()

        cy.get('h2').should('have.text', 'Login')
        cy.url().should('contain', '/login')
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
