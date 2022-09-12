/// <reference types="cypress" />

import { getRandomUser } from "../../util/userProvider"

describe('Register tests', () => {

    const testUser = getRandomUser()

    beforeEach(() => {
        cy.visit('http://localhost:8081/register')

        cy.intercept('POST', '**/users/signup', {
            statusCode: 201,
            body: {
                token: 'fakeToken'
            }
        })
    })

    it('should successfully register', () => {
        cy.get('[name=firstName]').type(testUser.firstName)
        cy.get('[name=lastName]').type(testUser.lastName)
        cy.get('[name=username]').type(testUser.username)
        cy.get('[name=password]').type(testUser.password)
        cy.get('[name=email]').type(testUser.email)
        cy.get('.btn-primary').click()

        cy.get('.alert-success').should('contain.text', 'Registration successful')
    })
})
