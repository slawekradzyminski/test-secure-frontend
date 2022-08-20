/// <reference types="cypress" />

import { getRandomUser } from "../util/userProvider"

describe('example to-do app', () => {
    beforeEach(() => {
        cy.visit('http://localhost:8081')
    })

    it('should successfully login', () => {
        const user = getRandomUser()

        cy.intercept('POST', '**/users/signin', {
            statusCode: 200,
            body: {
                "username": user.username,
                "roles": user.roles,
                "firstName": user.firstName,
                "lastName": user.password,
                "token": "fakeCypressJwtToken",
                "email": user.email
            }
        })
        cy.intercept('GET', '**/users', { fixture: 'users.json' })

        cy.get('[name=username]').type('admin')
        cy.get('[name=password]').type('admin')
        cy.get('.btn-primary').click()
        cy.get('h1').should('contain.text', user.firstName)
    })

})
