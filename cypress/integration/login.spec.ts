/// <reference types="cypress" />

import { getRandomEmail, getRandomString } from "../util/random"

describe('Login page', () => {
    beforeEach(() => {
        cy.visit('')
    })

    it('should successfully login', () => {
        const username = getRandomString()
        const password = getRandomString()
        const firstName = getRandomString()

        cy.request({
            method: 'POST',
            url: 'http://localhost:4000/users/signup',
            body: {
                email: getRandomEmail(),
                firstName: firstName,
                lastName: getRandomString(),
                password: password,
                roles: ["ROLE_CLIENT"],
                username: username
            }
        }).then(resp => {
            expect(resp.status).to.eq(201)
        })

        cy.get('[name=username]').type(username)
        cy.get('[name=password]').type(password)
        cy.get('.btn-primary').click()
        cy.get('h1').should('contain.text', `Hi ${firstName}`)
    })

    it('should fail to login', () => {
        cy.get('[name=username]').type('wrong')
        cy.get('[name=password]').type('wrong')
        cy.get('.btn-primary').click()
        cy.get('.alert').should('have.text', 'Invalid username/password supplied')
            .should('have.class', 'alert-danger')
    })

    it('should validate empty fields', () => {
        cy.get('.btn-primary').click()
        cy.get('.invalid-feedback').eq(0).should('have.text', 'Required field length is 4 or more')
        cy.get('.invalid-feedback').eq(1).should('have.text', 'Required field length is 4 or more')
        cy.get('[name=username]').should('have.class', 'is-invalid')
        cy.get('[name=password]').should('have.class', 'is-invalid')
    })

    it('should redirect to register', () => {
        cy.get('.btn-link').click()
        cy.url().should('contain', '/register')
    })

})
