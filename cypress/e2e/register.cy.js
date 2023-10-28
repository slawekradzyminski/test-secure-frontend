/// <reference types="cypress" />

import { getRandomUser } from "../generator/user"

describe('Register page tests', () => {
    beforeEach(() => {
        cy.visit('http://localhost:8081/register')
    })

    it('should successfully register', () => {
        const user = getRandomUser()
        cy.get('[name=username]').type(user.username)
        cy.get('[name=password]').type(user.password)
        cy.get('[name=firstName]').type(user.firstName)
        cy.get('[name=lastName]').type(user.lastName)
        cy.get('[name=email]').type(getRandomUser().email)
        cy.get('.btn-primary').click()

        cy.get('.alert').should('have.text', 'Registration successful')
        cy.url().should('contain', '/login')
    })

})
