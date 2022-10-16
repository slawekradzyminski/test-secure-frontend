/// <reference types="cypress" />

import { Roles } from '../../domain/roles';
import { getRandomUser } from '../../domain/user';
import { getRandomEmail, getRandomString } from '../../util/random';

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
        }).as('registerRequest')

        const user = getRandomUser()

        cy.get('[name=firstName]').type(user.firstName)
        cy.get('[name=lastName]').type(user.lastName)
        cy.get('[name=username]').type(user.username)
        cy.get('[name=password]').type(user.password)
        cy.get('[name=email]').type(user.email)
        cy.get('.btn-primary').click()

        cy.get('.alert').should('contain.text', 'Registration successful')
        cy.url().should('contain', '/login')

        cy.wait('@registerRequest').its('request.body').should('deep.equal', {
            ...user,
            roles: [Roles.ROLE_CLIENT]
        })
    })

    it('should fail to register if username already exists', () => {
        const message = "Username is already in use"

        cy.intercept('POST', '**/users/signup', {
            statusCode: 422,
            body: {
                "timestamp": "2022-10-16T08:30:18.123+00:00",
                "status": 422,
                "error": "Unprocessable Entity",
                "message": message,
                "path": "/users/signup"
            }
        })

        cy.get('[name=firstName]').type(getRandomString())
        cy.get('[name=lastName]').type(getRandomString())
        cy.get('[name=username]').type(getRandomString())
        cy.get('[name=password]').type(getRandomString())
        cy.get('[name=email]').type(getRandomEmail())
        cy.get('.btn-primary').click()

        cy.get('.alert').should('contain.text', message)
        cy.url().should('contain', '/register')
    })

})
