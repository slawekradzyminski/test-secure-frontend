/// <reference types="cypress" />

import { faker } from '@faker-js/faker';

describe('register page', () => {
    beforeEach(() => {
        cy.visit('http://localhost:8081/register')
    })

    it('should successfully register', () => {
        cy.get('[name=firstName]').type(faker.name.firstName())
        cy.get('[name=lastName]').type(faker.name.lastName())
        cy.get('[name=username]').type(faker.internet.userName())
        cy.get('[name=password]').type(faker.random.alphaNumeric(5))
        cy.get('[name=email]').type(faker.internet.email())

        cy.get('.btn-primary').click()

        cy.get('.alert')
            .should('have.text', 'Registration successful')
            .should('have.class', 'alert-success')
    })

})
