/// <reference types="cypress" />

import { mockRegisterDelay, mockRegisterFailure, mockRegisterNetworkError, mockRegisterSuccess } from '../../mocks/registerMocks';
import { getRandomUser } from '../../util/user';

describe('register page with mocks', () => {
    beforeEach(() => {
        cy.visit('http://localhost:8081/register')
    })

    it('should successfully register', () => {
        const user = getRandomUser()

       mockRegisterSuccess()

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
        const message = "Username is already in use"

        mockRegisterFailure(message)

        const user = getRandomUser()
        cy.get('[name=username]').type(user.username)
        cy.get('[name=firstName]').type(user.firstName)
        cy.get('[name=lastName]').type(user.lastName)
        cy.get('[name=password]').type(user.password)
        cy.get('[name=email]').type(user.email)
        cy.get('.btn-primary').click()

        cy.get('.alert')
            .should('have.text', message)
            .and('have.class', 'alert-danger')
    })

    it('should not crash when there is network error', () => {
        mockRegisterNetworkError()

        const user = getRandomUser()
        cy.get('[name=username]').type(user.username)
        cy.get('[name=firstName]').type(user.firstName)
        cy.get('[name=lastName]').type(user.lastName)
        cy.get('[name=password]').type(user.password)
        cy.get('[name=email]').type(user.email)
        cy.get('.btn-primary').click()

        cy.url().should('contain', '/register')
    })

    it('should show loading indicater after clicking register', () => {
        mockRegisterDelay()

        const user = getRandomUser()
        cy.get('[name=username]').type(user.username)
        cy.get('[name=firstName]').type(user.firstName)
        cy.get('[name=lastName]').type(user.lastName)
        cy.get('[name=password]').type(user.password)
        cy.get('[name=email]').type(user.email)
        cy.get('.btn-primary').click()

        cy.get('.btn-primary .spinner-border').should('be.visible')
    })

})
