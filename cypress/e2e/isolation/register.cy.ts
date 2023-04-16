/// <reference types="cypress" />

import { Roles } from "../../domain/roles"
import { UserRegister, getRandomUser } from "../../domain/user"
import { signupMocks } from "../../mocks/signupMocks"
import RegisterPage from "../../pages/RegisterPage"

describe('Register page', () => {
    beforeEach(() => {
        cy.visit('http://localhost:8081/register')
    })

    it('should successfully register', () => {
        // given
        cy.percySnapshot()
        signupMocks.successfulRegister()
        const user = getRandomUser()

        // when
        RegisterPage.attemptRegister(user)

        // then
        cy.url().should('contain', '/login')
        verifyLoginRequestWasCorrectlyBuild(user)
    })

    it('should fail to register if user already exists', () => {
        // given
        const user = getRandomUser()
        const message = 'Username is already in use'
        signupMocks.userAlreadyExists(message)

        // when
        RegisterPage.attemptRegister(user)

        // then
        cy.get('.alert').should('have.text', message)
    })

    const verifyLoginRequestWasCorrectlyBuild = (user: UserRegister) => {
        cy.get('@registerRequest').its('request.body').should('deep.equal', {
            ...user,
            roles: [Roles.ROLE_CLIENT]
        })
    }

})
