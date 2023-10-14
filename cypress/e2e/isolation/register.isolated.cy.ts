/// <reference types="cypress" />

import { buildRegisterRequestFrom } from "../../domain/requests/registerTypes"
import { getRandomUser } from "../../generators/userGenerator"
import { registerMocks } from "../../mocks/registerMocks"

describe('Register page tests in isolation', () => {
    beforeEach(() => {
        cy.visit('http://localhost:8081/register')
    })

    it('should successfully register', () => {
        // given
        const user = getRandomUser()
        registerMocks.mockSuccessfulRegister(user)

        // when
        cy.get('[name=username]').type(user.username)
        cy.get('[name=password]').type(user.password)
        cy.get('[name=firstName]').type(user.firstName)
        cy.get('[name=lastName]').type(user.lastName)
        cy.get('[name=email]').type(user.email)
        cy.get('.btn-primary').click()

        // then
        cy.get('.alert').should('contain.text', 'Registration successful')
        cy.url().should('contain', '/login')
        cy.get('@registerRequest').its('request.body').should('deep.equal', buildRegisterRequestFrom(user))
    })

})

