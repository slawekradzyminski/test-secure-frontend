/// <reference types="cypress" />

import { Roles } from '../../util/roles';
import { getRandomUser } from '../../util/user';

describe('register page with mocks', () => {
    beforeEach(() => {
        cy.visit('http://localhost:8081/register')
    })

    it('should successfully register', () => {
        const user = getRandomUser()

        cy.mockSuccessfulRegister()

        cy.get('[name=firstName]').type(user.firstName)
        cy.get('[name=lastName]').type(user.lastName)
        cy.get('[name=username]').type(user.username)
        cy.get('[name=password]').type(user.password)
        cy.get('[name=email]').type(user.email)

        cy.get('.btn-primary').click()

        cy.get('.alert')
            .should('have.text', 'Registration successful')
            .should('have.class', 'alert-success')
        cy.wait('@registerRequest').its('request.body').should('deep.equal', {
            firstName: user.firstName,
            lastName: user.lastName,
            username: user.username,
            password: user.password,
            email: user.email,
            roles: [Roles.ROLE_CLIENT]
        })
    })

    it('should fail to register', () => {
        const message = "Username is already in use"
        const user = getRandomUser()

        cy.mockFailedRegister(message)

        cy.get('[name=firstName]').type(user.firstName)
        cy.get('[name=lastName]').type(user.lastName)
        cy.get('[name=username]').type(user.username)
        cy.get('[name=password]').type(user.password)
        cy.get('[name=email]').type(user.email)

        cy.get('.btn-primary').click()

        cy.get('.alert')
            .should('have.text', message)
            .should('have.class', 'alert-danger')
    })

    it('should display loading indicator', () => {
        const user = getRandomUser()
        cy.loadingIndicatorRegister()

        cy.get('[name=firstName]').type(user.firstName)
        cy.get('[name=lastName]').type(user.lastName)
        cy.get('[name=username]').type(user.username)
        cy.get('[name=password]').type(user.password)
        cy.get('[name=email]').type(user.email)
        cy.get('.btn-primary').click()

        cy.get('.btn-primary .spinner-border').should('be.visible')
    })

})
