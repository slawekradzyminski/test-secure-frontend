/// <reference types="cypress" />

import Alert from "../../components/Alert"
import { User } from "../../domain/User"
import { getLoginResponseFor } from "../../domain/requests/loginTypes"
import { getRandomUser } from "../../generators/userGenerator"
import { getAllUsersMocks } from "../../mocks/getAllUsersMocks"
import { loginMocks } from "../../mocks/loginMocks"
import LoginPage from "../../pages/LoginPage"

describe('Login page tests in isolation', () => {
    beforeEach(() => {
        cy.visit('http://localhost:8081')
    })

    it('should successfully login', () => {
        // given
        const user = getRandomUser()
        loginMocks.mockSuccessfulLogin(user)
        getAllUsersMocks.mockUsers()

        // when
        LoginPage.attemptLogin(user.username, user.password)

        // then
        cy.get('h1').should('contain.text', user.firstName)
        verifyCorrectRequestWasBuild(user)
    })

    it('should fail to login', () => {
        // given
        const errorMessage = 'Invalid username/password supplied'
        loginMocks.mockWrongCredentials(errorMessage)

        // when
        LoginPage.attemptLogin('wrong', 'wrong')

        // then
        Alert.getAlertError().should('contain.text', errorMessage)
        cy.url().should('contain', '/login')
    })

    it('should trigger frontend validation', () => {
        // when
        LoginPage.clickLogin()

        // then
        cy.get('.invalid-feedback').should('have.length', 2)
    })

})

const verifyCorrectRequestWasBuild = (user: User) => {
    cy.get('@loginRequest').its('request.body').should('deep.equal', {
        username: user.username,
        password: user.password
    })
}
