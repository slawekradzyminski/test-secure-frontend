/// <reference types="cypress" />

import { getRandomString } from "../util/random"

describe('login page tests', () => {
    
    it('should successfully login', () => {
        const username = getRandomString()
        const password = getRandomString()
        const firstName = getRandomString()
        const lastName = getRandomString()

        cy.request({
            method: 'POST',
            url: 'http://localhost:4001/users/signup',
            body: {
                username: username,
                password: password,
                firstName: firstName,
                roles: ["ROLE_CLIENT", "ROLE_ADMIN"],
                lastName: lastName,
                email: `${username}@cantest.it`
            }
        })

        cy.visit('http://localhost:8081')

        cy.get("[name='username']").type(username)
        cy.get("[name='password']").type(password)
        cy.get('button.btn-primary').click()

        cy.get('h1').should('contain.text', firstName)
    })

    it('should fail to login', () => {
        cy.visit('http://localhost:8081')
        cy.get("[name='username']").type('wrong')
        cy.get("[name='password']").type('password')
        cy.get('button.btn-primary').click()

        cy.get('.alert-danger').should('have.text', 'Invalid username/password supplied')
    })

    it('should open register page', () => {
        cy.visit('http://localhost:8081')
        cy.get(".btn-link").click()

        cy.get('h2').should('contain.text', 'Register')
        cy.url().should('contain', '/register')
    })

})
