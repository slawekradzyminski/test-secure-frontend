/// <reference types="cypress" />

import { faker } from '@faker-js/faker';

describe('login page', () => {
    beforeEach(() => {
        cy.visit('http://localhost:8081')
    })

    it('should successfully login', () => {
        const username = faker.internet.userName()
        const password = faker.random.alphaNumeric(6)
        const firstName = faker.name.firstName()

        cy.register(firstName, faker.name.lastName(), username, password, faker.internet.email())

        cy.get('[name=username]').type(username)
        cy.get('[name=password]').type(password)
        cy.get('.btn-primary').click()

        cy.get('h1').should('contain.text', firstName)
    })

    it('should fail to login', () => {
        cy.get('[name=username]').type('wrong')
        cy.get('[name=password]').type('wrong')
        cy.get('.btn-primary').click()

        cy.get('.alert')
            .should('contain.text', 'Invalid username/password')
            .should('have.class', 'alert-danger')
    })

    it('should trigger frontend validation', () => {
        cy.get('.btn-primary').click()

        cy.get('.invalid-feedback').should('have.length', 2)
        cy.get('.invalid-feedback').eq(0).should('have.text', 'Required field length is 4 or more')
        cy.get('.invalid-feedback').eq(1).should('have.text', 'Required field length is 4 or more')
        cy.get('[name=username]').should('have.class', 'is-invalid')
        cy.get('[name=password]').should('have.class', 'is-invalid')
    })

})
