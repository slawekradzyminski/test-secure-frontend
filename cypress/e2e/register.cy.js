/// <reference types="cypress" />

import { faker } from '@faker-js/faker';

describe('Register page tests', () => {
    beforeEach(() => {
        cy.visit('http://localhost:8081/register')
    })

    it('should click cancel and open login page', () => {
        cy.get('.btn-link')
            .should('have.text', 'Cancel')
            .click()

        cy.get('h2').should('have.text', 'Login')
        cy.url().should('contain', '/login')
    })

    it('should successfully register', () => {
        cy.get('[name=firstName]').type(faker.name.firstName())
        cy.get('[name=lastName]').type(faker.name.lastName())
        cy.get('[name=username]').type(faker.internet.userName())
        cy.get('[name=password]').type(faker.internet.password())
        cy.get('[name=email]').type(faker.internet.email())
        cy.get('.btn-primary').click()

        cy.get('.alert').should('have.text', 'Registration successful')
        cy.url().should('contain', '/login')
    })

    it.only('should fail to register', () => {
        cy.get('[name=firstName]').type(faker.name.firstName())
        cy.get('[name=lastName]').type(faker.name.lastName())
        cy.get('[name=username]').type('admin')
        cy.get('[name=password]').type(faker.internet.password())
        cy.get('[name=email]').type(faker.internet.email())
        cy.get('.btn-primary').click()

        cy.get('.alert').should('have.text', 'Username is already in use')
    })

})
