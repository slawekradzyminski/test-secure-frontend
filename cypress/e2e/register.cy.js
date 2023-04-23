/// <reference types="cypress" />

import { getRandomUser } from "../utils/user"

describe('Register tests', () => {
    beforeEach(() => {
        cy.visit('http://localhost:8081/register')
    })

    it.only('should successfully register', () => {
        const user = getRandomUser()
        cy.get('[name=username]').type(user.username)
        cy.get('[name=password]').type(user.password)
        cy.get('[name=firstName]').type(user.firstName)
        cy.get('[name=lastName]').type(user.lastName)
        cy.get('[name=email]').type(user.email)
        cy.get('.btn-primary').click()

        cy.get('.alert').should('contain.text', 'Registration successful')

        cy.login(user.username, user.password)
    })

    it('should open login page', () => {
        cy.get('.btn-link').click()
        cy.get('h2').should('have.text', 'Login')
        cy.url().should('contain', '/login')
    })

    it('should trigger frontend validation', () => {
        cy.get('.btn-primary').click()
        //  albo 
        cy.get('.invalid-feedback').should('have.length', 5).each(($el) => {
            cy.wrap($el).should('have.text', 'Required field length is 4 or more')
        })
        cy.get('input.is-invalid').should('have.length', 5)
    })

})
