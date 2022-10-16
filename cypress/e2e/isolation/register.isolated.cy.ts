/// <reference types="cypress" />

import { getRandomUser } from '../../domain/user';

describe('Register page tests in isolation', () => {
    beforeEach(() => {
        cy.visit('/register')
    })

    it('should successfully register', () => {
        cy.intercept('POST', '**/users/signup', {
            statusCode: 201,
            body: {
                token: 'fakeToken'
            }
        })

        const user = getRandomUser()

        cy.get('[name=firstName]').type(user.firstName)
        cy.get('[name=lastName]').type(user.lastName)
        cy.get('[name=username]').type(user.username)
        cy.get('[name=password]').type(user.password)
        cy.get('[name=email]').type(user.email)
        cy.get('.btn-primary').click()

        cy.get('.alert').should('contain.text', 'Registration successful')
        cy.url().should('contain', '/login')
    })

})
