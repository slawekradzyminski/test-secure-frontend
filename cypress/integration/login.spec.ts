/// <reference types="cypress" />

import { getRandomUser } from "../util/user"

describe('example to-do app', () => {
    beforeEach(() => {
        cy.visit('http://localhost:8081')
    })

    it('should show loading indicator', () => {
        const user = getRandomUser()
        cy.intercept('POST', '**/users/signin', {
            delay: 2000
        })

        cy.login(user)

        cy.get('.btn-primary .spinner-border').should('be.visible')
    })

    it('should successfully login', () => {
        const user = getRandomUser()

        cy.intercept('POST', '**/users/signin', {
            statusCode: 200,
            body: {
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                roles: user.roles,
                token: "fakeToken",
                username: user.username
            }
        }).as('loginRequest')

        cy.intercept('GET', '**/users', { fixture: 'users.json' })

        cy.login(user)
        cy.wait('@loginRequest').its('request.body').should('deep.equal', {
            username: user.username,
            password: user.password,
        })
        cy.get('h1').should('contain.text', user.firstName)
    })

    it('should successfully login from mobile', () => {
        const user = getRandomUser()
        cy.viewport('iphone-8')

        cy.intercept('POST', '**/users/signin', {
            statusCode: 200,
            body: {
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                roles: user.roles,
                token: "fakeToken",
                username: user.username
            },
            throttleKbps: 1000
        })

        cy.intercept('GET', '**/users', { fixture: 'users.json' })
        cy.login(user)


        cy.get('h1').should('contain.text', user.firstName)
    })

    it('should fail to login', () => {
        const user = getRandomUser()
        cy.intercept('POST', '**/users/signin', {
            statusCode: 422,
            fixture: 'wrongLogin.json'
        })
        cy.login(user)

        cy.get('.alert').should('contain.text', 'Invalid username/password')
            .and('have.class', 'alert-danger')
    })



})
