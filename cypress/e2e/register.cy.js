/// <reference types="cypress" />
import { faker } from '@faker-js/faker';

describe('Register tests', () => {
    beforeEach(() => {
        cy.visit('http://localhost:8081/register')
    })

    it.only('should successfully register', () => {
        cy.get('[name=username]').type(faker.internet.userName())
        cy.get('[name=password]').type(faker.internet.password())
        cy.get('[name=firstName]').type(faker.name.firstName())
        cy.get('[name=lastName]').type(faker.name.lastName())
        cy.get('[name=email]').type(faker.internet.email())
        cy.get('.btn-primary').click()

        cy.get('.alert').should('contain.text', 'Registration successful')
    })

    it('should open login page', () => {
        cy.get('.btn-link').click()

        cy.get('h2').should('have.text', 'Login')
        cy.url().should('contain', '/login')
    })

})
