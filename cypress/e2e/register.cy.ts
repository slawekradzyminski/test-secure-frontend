/// <reference types="cypress" />

import { Roles } from "../util/roles"
import { getRandomUser } from "../util/userProvider"

describe('example to-do app', () => {
    beforeEach(() => {
        cy.visit('http://localhost:8081/register')
    })

    it('should successfully register', () => {
        // given
        const user = getRandomUser()
        cy.intercept('POST', '**/users/signup', {
            statusCode: 201,
            body: {
                "token": "fakeCypressJwtToken",
            }
        }).as('registerRequest')

        // when
        cy.get('[name=username]').type(user.username)
        cy.get('[name=firstName]').type(user.firstName)
        cy.get('[name=lastName]').type(user.lastName)
        cy.get('[name=password]').type(user.password)
        cy.get('[name=email]').type(user.email)
        cy.get('.btn-primary').click()

        // then
        cy.get('.alert-success').should('contain.text', 'success')
        cy.wait('@registerRequest').its('request.body').should('deep.equal', {
            "firstName": user.firstName,
            "lastName": user.lastName,
            "username": user.username,
            "password": user.password,
            "roles": [Roles.ROLE_CLIENT],
            "email": user.email
        })

    })

})
