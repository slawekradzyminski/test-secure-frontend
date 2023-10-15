/// <reference types="cypress" />

import Alert from "../../components/Alert"
import { buildRegisterRequestFrom } from "../../domain/requests/registerTypes"
import { getRandomUser } from "../../generators/userGenerator"
import { registerMocks } from "../../mocks/registerMocks"
import { registerPage } from "../../pages/registerPage"

describe('Register page tests in isolation', () => {
    beforeEach(() => {
        cy.visit('http://localhost:8081/register')
    })

    it('should successfully register', () => {
        // given
        const user = getRandomUser()
        registerMocks.mockSuccessfulRegister(user)

        // when
        registerPage.attemptRegister(user)

        // then
        Alert.getAlertSuccess().should('contain.text', 'Registration successful')
        cy.url().should('contain', '/login')
        cy.get('@registerRequest').its('request.body').should('deep.equal', buildRegisterRequestFrom(user))
    })

})

