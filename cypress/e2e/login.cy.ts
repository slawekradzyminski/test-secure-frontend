/// <reference types="cypress" />

import { getRandomUser } from "../util/userProvider"
import users from "../fixtures/users.json"

describe('example to-do app', () => {
    beforeEach(() => {
        cy.visit('http://localhost:8081')
    })

    it('should successfully login', () => {
        // given
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
        }).as('loginRequest')
        cy.intercept('GET', '**/users', { fixture: 'users.json' })

        // when
        cy.get('[name=username]').type(user.username)
        cy.get('[name=password]').type(user.password)
        cy.get('.btn-primary').click()

        // then
        cy.get('h1').should('contain.text', user.firstName)
        cy.get('ul li').should('have.length', users.length)
        cy.get('ul li').each(($el, i) => {
            cy.wrap($el).should('contain.text', `${users[i].firstName} ${users[i].lastName}`)
        })

        cy.wait('@loginRequest').its('request.body').should('deep.equal', {
            username: user.username,
            password: user.password
        })
    })

    it('should unsuccessfully login', () => {
        // given
        const message = 'Invalid username/password supplied'
        const user = getRandomUser()
        cy.intercept('POST', '**/users/signin', {
            statusCode: 422,
            body: {
                "timestamp": "2022-08-20T10:12:33.425+00:00",
                "status": 422,
                "error": "Unprocessable Entity",
                "message": message,
                "path": "/users/signin"
            }
        })

        // when
        cy.get('[name=username]').type(user.username)
        cy.get('[name=password]').type(user.password)
        cy.get('.btn-primary').click()

        // then
        cy.get('.alert-danger').should('be.visible').and('have.text', message)
    })

    it('should show loading indicator', () => {
        // given
        const user = getRandomUser()
        cy.intercept('POST', '**/users/signin', {
            delay: 2000,
        })

        // when
        cy.get('[name=username]').type(user.username)
        cy.get('[name=password]').type(user.password)
        cy.get('.btn-primary').click()

        // then
        cy.get('.spinner-border').should('be.visible')
    })


})
