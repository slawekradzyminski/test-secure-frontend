/// <reference types="cypress" />

import { getRandomUser } from '../util/user';

describe('register page', () => {
    beforeEach(() => {
        cy.visit('http://localhost:8081/register')
    })

    it('should successfully register', () => {
        const user = getRandomUser()

        cy.get('[name=username]').type(user.username)
        cy.get('[name=firstName]').type(user.firstName)
        cy.get('[name=lastName]').type(user.lastName)
        cy.get('[name=password]').type(user.password)
        cy.get('[name=email]').type(user.email)
        cy.get('.btn-primary').click()

        cy.get('.alert')
            .should('have.text', 'Registration successful')
            .and('have.class', 'alert-success')
    })

    it('should fail to register', () => {
        const existingUser = getRandomUser()
        cy.register(existingUser)

        const user = getRandomUser()
        cy.get('[name=username]').type(existingUser.username)
        cy.get('[name=firstName]').type(user.firstName)
        cy.get('[name=lastName]').type(user.lastName)
        cy.get('[name=password]').type(user.password)
        cy.get('[name=email]').type(user.email)
        cy.get('.btn-primary').click()

        cy.get('.alert')
            .should('have.text', 'Username is already in use')
            .and('have.class', 'alert-danger')
    })

})
