/// <reference types="cypress" />

import RegisterPage from "../pages/RegisterPage"
import { getRandomUser } from "../utils/user"

describe('Register page tests', () => {
    beforeEach(() => {
        cy.visit('http://localhost:8081/register')
    })

    it('should click cancel and open login page', () => {
        // when
        RegisterPage.clickCancel()

        // then
        cy.get('h2').should('have.text', 'Login')
        cy.url().should('contain', '/login')
    })

    it('should successfully register', () => {
        // given
        const user = getRandomUser()

        // when
        RegisterPage.attemptRegister(user)

        // then
        cy.get('.alert').should('have.text', 'Registration successful')
        cy.url().should('contain', '/login')
    })

    it('should fail to register with username already in use message', () => {
        // given
        const user = getRandomUser()
        cy.register(user)

        // when
        RegisterPage.attemptRegister(user)

        // then
        cy.get('.alert').should('have.text', 'Username is already in use')
    })

})
