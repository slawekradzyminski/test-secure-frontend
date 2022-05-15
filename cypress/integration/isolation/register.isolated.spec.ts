/// <reference types="cypress" />

import AlertsValidator from '../../components/AlertsValidator';
import { mockRegisterDelay, mockRegisterFailure, mockRegisterNetworkError, mockRegisterSuccess, registerRequest } from '../../mocks/registerMocks';
import RegisterPage from '../../pages/RegisterPage';
import { getAliasedRequest } from '../../util/alias';
import { Roles } from '../../util/roles';
import { getRandomUser } from '../../util/user';

const registerPage = new RegisterPage()
const alertsValidator = new AlertsValidator()

describe('register page with mocks', () => {
    beforeEach(() => {
        cy.visit('http://localhost:8081/register')
    })

    it('should successfully register', () => {
        //given
        const user = getRandomUser()
        mockRegisterSuccess()

        // when
        registerPage.attemptRegister(user)

        // then
        alertsValidator.verifySuccess('Registration successful')
        cy.wait(getAliasedRequest(registerRequest)).its('request.body').should('deep.equal', {
            firstName: user.firstName,
            lastName: user.lastName,
            username: user.username,
            password: user.password,
            email: user.email,
            roles: [Roles.ROLE_CLIENT]
        })
    })

    it('should fail to register', () => {
        // given
        const message = "Username is already in use"
        mockRegisterFailure(message)
        const user = getRandomUser()

        // when
        registerPage.attemptRegister(user)

        // then
        alertsValidator.verifyFailure(message)
    })

    it('should not crash when there is network error', () => {
        // given
        mockRegisterNetworkError()
        const user = getRandomUser()

        // when
        registerPage.attemptRegister(user)

        // then
        cy.get('h2').should('contain.text', 'Register')
    })

    it('should show loading indicater after clicking register', () => {
        // given
        mockRegisterDelay()
        const user = getRandomUser()

        // when
        registerPage.attemptRegister(user)

        // then
        cy.get('.btn-primary .spinner-border').should('be.visible')
    })

})
