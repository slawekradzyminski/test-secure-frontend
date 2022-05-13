/// <reference types="cypress" />

import AlertValidator from '../../pages/AlertValidator';
import RegisterPage from '../../pages/RegisterPage';
import { Roles } from '../../util/roles';
import { getRandomUser, User } from '../../util/user';

const registerPage = new RegisterPage()
const alertValidator = new AlertValidator()

const verifyRegisterBody = (user: User) => {
    cy.wait('@registerRequest').its('request.body').should('deep.equal', {
        firstName: user.firstName,
        lastName: user.lastName,
        username: user.username,
        password: user.password,
        email: user.email,
        roles: [Roles.ROLE_CLIENT]
    })
}

describe('register page with mocks', () => {
    beforeEach(() => {
        cy.visit('http://localhost:8081/register')
    })

    it('should successfully register', () => {
        // given
        const user = getRandomUser()
        cy.mockSuccessfulRegister()

        // when
        registerPage.attemptRegister(user)

        // then
        alertValidator.verifySuccess('Registration successful')
        verifyRegisterBody(user)
    })

    it('should fail to register', () => {
        // given
        const message = "Username is already in use"
        const user = getRandomUser()
        cy.mockFailedRegister(message)

        // when
        registerPage.attemptRegister(user)

        // then
        alertValidator.verifyFailure(message)
    })

    it('should display loading indicator', () => {
        // given
        const user = getRandomUser()
        cy.loadingIndicatorRegister()

        // when
        registerPage.attemptRegister(user)

        // then
        cy.get('.btn-primary .spinner-border').should('be.visible')
    })

})
