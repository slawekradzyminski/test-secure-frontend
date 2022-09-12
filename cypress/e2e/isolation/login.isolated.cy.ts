/// <reference types="cypress" />

import { getRandomUser } from "../../util/userProvider"

describe('Login tests', () => {

    const testUser = getRandomUser()

    beforeEach(() => {
        cy.visit('http://localhost:8081')

        cy.intercept('POST', '**/users/signin', {
            statusCode: 200,
            body: {
                username: testUser.username,
                firstName: testUser.firstName,
                lastName: testUser.lastName,
                email: testUser.email,
                roles: testUser.roles,
                token: 'fakeToken'
            }
        }).as('loginRequest')

        cy.intercept('GET', '**/users', { fixture: 'users.json' })
    })

    it('should successfully login', () => {
        cy.get('[name=username]').type(testUser.username)
        cy.get('[name=password]').type(testUser.password)
        cy.get('.btn-primary').click()

        cy.get('h1').should('contain.text', testUser.firstName)
        cy.wait('@loginRequest').its('request.body').should('deep.equal', {
            password: testUser.password,
            username: testUser.username
        })
    })
})
