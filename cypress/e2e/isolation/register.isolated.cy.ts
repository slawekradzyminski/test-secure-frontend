/// <reference types="cypress" />

import RegisterPage from "../../pages/RegisterPage"
import MockRegister from "../../stubs/MockRegister"
import { Roles } from "../../util/roles"
import { getRandomUser, User } from "../../util/userProvider"

describe('Register page isolated tests', () => {
    const registerPage = new RegisterPage()

    beforeEach(() => {
        cy.visit('http://localhost:8081/register')
    })

    it('should successfully register', () => {
        // given
        const user = getRandomUser()
        MockRegister.mockSuccessfulRegister()

        // when
        registerPage.attemptRegister(user)

        // then
        cy.get('.alert-success').should('contain.text', 'Registration successful')
        verifyRegisterRequest(user)
    })

    it('should show user already in use error message', () => {
        // given
        const message = "Username is already in use"
        MockRegister.mockFailedRegister(message)

        // when
        registerPage.attemptRegister(getRandomUser())

        // then
        cy.get('.alert-danger').should('have.text', message)
    })

    it('should display loading indicator', () => {
        // given
        MockRegister.mockDelayedRegister()

        // when
        registerPage.attemptRegister(getRandomUser())

        // then
        cy.get('.btn-primary .spinner-border').should('be.visible')
    })

    it('should open login page after clicking cancel', () => {
        // when
        registerPage.clickCancel()

        // then
        cy.url().should('contain', '/login')
    })

})

const verifyRegisterRequest = (user: User) => {
    cy.wait('@registerRequest').its('request.body').should('deep.equal', {
        username: user.username,
        password: user.password,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        roles: [Roles.ROLE_CLIENT]
    })
}
