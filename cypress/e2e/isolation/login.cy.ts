/// <reference types="cypress" />

import { User } from "../../domain/user"
import { getRandomUser } from "../../generator/userGenerator"
import { getUserMocks } from "../../mocks/getUserMocks"
import { loginMocks } from "../../mocks/loginMocks"
import { loginPage } from "../../pages/loginPage"

describe('Login page tests in isolation', () => {
    beforeEach(() => {
        cy.visit('')
    })

    it('clicking on Register button should correctly redirect', () => {
        // when
        loginPage.clickRegister()

        // then
        cy.url().should('contain', 'register')
    })

    it('should successfully login', () => {
        // given
        const user = getRandomUser()
        loginMocks.mockSuccessfulLogin(user)
        getUserMocks.mockUsers()

        // when
        loginPage.attemptLogin(user)

        // then
        cy.get('h1').contains(user.firstName)
        verifyLoginRequestWasCorrectlyBuild(user)
    })

    it('should fail to login if credentials are wrong', () => {
        // given
        const errorMessage = "Invalid username/password supplied"
        const user = getRandomUser()
        loginMocks.mockInvalidCredentials(errorMessage)

        // when
        loginPage.attemptLogin(user)

        // then
        cy.get('.alert-danger').should('have.text', errorMessage)
        cy.url().should('contain', '/login')
    })

    it('should trigger frontend validation', () => {
        // when
        loginPage.clickLogin()

        // then
        cy.get('.invalid-feedback').should('have.length', 2)
        cy.get('.invalid-feedback').each(($validationErrorMessage): void => {
            cy.wrap($validationErrorMessage).should('have.text', 'Required field length is 4 or more')
        })
        cy.get('input').each(($input): void => {
            cy.wrap($input).should('have.class', 'is-invalid')
        })
    })

})

const verifyLoginRequestWasCorrectlyBuild = (user: User) => {
    cy.get('@loginRequest').its('request.body').should('deep.equal', {
        username: user.username,
        password: user.password
    })
}
