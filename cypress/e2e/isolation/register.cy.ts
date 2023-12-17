/// <reference types="cypress" />

import Alert from "../../components/Alert"
import { Roles, User } from "../../domain/user"
import { getRandomUser } from "../../generator/userGenerator"
import { registerMocks } from "../../mocks/registerMocks"
import RegisterPage from "../../pages/RegisterPage"

describe('register page tests in isolation', () => {
    beforeEach(() => {
        cy.visit('/register')
    })

    it('should successfully register', () => {
        // given
        const user = getRandomUser()
        registerMocks.mockSuccessfulRegister()
        cy.percySnapshot()

        // when
        RegisterPage.attemptRegister(user)

        // then
        cy.url().should('contain', '/login')
        Alert.verifySuccess('Registration successful')
        verifyRegisterRequestWasCorrectlyBuild(user)
    })

    const verifyRegisterRequestWasCorrectlyBuild = (user: User) => {
        cy.get('@registerRequest').its('request.body').should('deep.equal', {
            ...user,
            roles: [Roles.ROLE_CLIENT]
        })
    }

})
