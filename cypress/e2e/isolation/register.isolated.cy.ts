/// <reference types="cypress" />

import { getRandomUser } from '../../utils/user';

describe('Register page tests', () => {
    beforeEach(() => {
        cy.visit('http://localhost:8081/register')
    })

    it('should successfully register', () => {
        const user = getRandomUser()
 
        cy.intercept('POST', '**/users/signup', {
            statusCode: 201,
            body: {
                token: 'fakeToken'
            }
        }).as('signupRequest')
 
        cy.get('[name=firstName]').type(user.firstName)
        cy.get('[name=lastName]').type(user.lastName)
        cy.get('[name=username]').type(user.username)
        cy.get('[name=password]').type(user.password)
        cy.get('[name=email]').type(user.email)
        cy.get('.btn-primary').click()
 
        cy.get('.alert-success').should('contain.text', 'Registration successful')
 
        cy.wait('@signupRequest').its('request.body').should('deep.equal', {
            firstName: user.firstName,
            lastName: user.lastName,
            username: user.username,
            password: user.password,
            roles: [
                "ROLE_CLIENT"
            ],
            email: user.email
        })
 
    })

})

