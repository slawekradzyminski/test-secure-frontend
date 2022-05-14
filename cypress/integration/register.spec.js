/// <reference types="cypress" />

import { faker } from '@faker-js/faker';

describe('register page', () => {
    beforeEach(() => {
        cy.visit('http://localhost:8081/register')
    })

    it('should successfully register', () => {
        cy.get('[name=username]').type(faker.internet.userName())
        cy.get('[name=firstName]').type(faker.name.firstName())
        cy.get('[name=lastName]').type(faker.name.lastName())
        cy.get('[name=password]').type(faker.internet.password())
        cy.get('[name=email]').type(faker.internet.email())
        cy.get('.btn-primary').click()

        cy.get('.alert')
            .should('have.text', 'Registration successful')
            .and('have.class', 'alert-success')
    })

    it('should fail to register', () => {
        cy.get('[name=username]').type('admin')
        cy.get('[name=firstName]').type(faker.name.firstName())
        cy.get('[name=lastName]').type(faker.name.lastName())
        cy.get('[name=password]').type(faker.internet.password())
        cy.get('[name=email]').type(faker.internet.email())
        cy.get('.btn-primary').click()

        cy.get('.alert')
            .should('have.text', 'Username is already in use')
            .and('have.class', 'alert-danger')
    })

})
