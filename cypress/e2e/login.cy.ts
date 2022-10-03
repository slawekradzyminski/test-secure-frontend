/// <reference types="cypress" />

import { getRandomUser } from "../domain/user"
import GetAllUsersMocks from "../mocks/GetAllUsersMocks"
import LoginMocks from "../mocks/LoginMocks"
import LoginPage from "../pages/LoginPage"

const loginPage = new LoginPage()

describe('Login page tests', () => {
    beforeEach(() => {
        cy.visit('http://localhost:8081')
    })

    it('Should successfully login', () => {
        // given
        const user = getRandomUser()
        LoginMocks.mockSuccessfulLogin(user)
        GetAllUsersMocks.mockUsers()

        // when
        loginPage.attemptLogin(user.username, user.password)

        // then
        cy.get('h1').should('contain.text', user.firstName)
        cy.wait('@loginRequest').its('request.body').should('deep.equal', {
            username: user.username,
            password: user.password
        })
    })

    it('Should fail to login', () => {
        // given
        const user = getRandomUser()
        const message = "Invalid username/password supplied"
        LoginMocks.mockFailedLogin(message)

        // when
        loginPage.attemptLogin(user.username, user.password)

        // then
        cy.get('.alert-danger').should('have.text', message)
    })

    it('Should trigger frontend validation', () => {
        // when
        loginPage.clickLogin()

        // then
        cy.get('.invalid-feedback').should('have.length', 2)
    })


})
