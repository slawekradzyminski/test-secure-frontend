/// <reference types="cypress" />

import { getRandomUser } from "../../domain/user"
import { postUserSignup } from "../../mocks/postUserSignup"
import { registerPage } from "../../pages/registerPage"

describe('Register page tests', () => {
    beforeEach(() => {
        cy.visit('http://localhost:8081/register')
    })

    it('should register successfully', () => {
        // given
        const message = 'Registration successful'
        postUserSignup.mockSuccess(message)
        const user = getRandomUser()

        // when
        registerPage.attemptRegister(user)

        // then
        cy.get('.alert-success').should('have.text', message)
    })

})
