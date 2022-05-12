/// <reference types="cypress" />

import { getRandomUser } from '../../util/user';

describe('login page', () => {
    beforeEach(() => {
        cy.visit('http://localhost:8081')
    })

    it('should successfully login', () => {
        const user = getRandomUser()

        cy.intercept('POST', '**/users/signin', {
            statusCode: 200,
            body: {
                firstName: user.firstName,
                lastName: user.lastName,
                username: user.username,
                token: 'fakeJwtToken',
                email: user.email,
                roles: user.roles
            }
        })

        cy.get('[name=username]').type(user.username)
        cy.get('[name=password]').type(user.password)
        cy.get('.btn-primary').click()

        cy.get('h1').should('contain.text', user.firstName)
    })

    // it('should fail to login', () => {
    //     cy.get('[name=username]').type('wrong')
    //     cy.get('[name=password]').type('wrong')
    //     cy.get('.btn-primary').click()

    //     cy.get('.alert')
    //         .should('contain.text', 'Invalid username/password')
    //         .should('have.class', 'alert-danger')
    // })


})
