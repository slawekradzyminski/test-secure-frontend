/// <reference types="cypress" />

import RegisterPage from "../../pages/RegisterPage"
import { getRandomUser } from "../../utils/user"

describe('Register page tests', () => {
    beforeEach(() => {
        cy.visit('http://localhost:8081/register')
    })

    it('should successfully register', () => {
        // given
        const user = getRandomUser()
        cy.intercept('POST', '**/users/signup', {
            statusCode: 201,
            body: { token: 'fakeToken' }
        })

        // when
        RegisterPage.attemptRegister(user)

        // then
        cy.get('.alert').should('have.text', 'Registration successful')
        cy.url().should('contain', '/login')
    })

})
