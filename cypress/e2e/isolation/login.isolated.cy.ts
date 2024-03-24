/// <reference types="cypress" />

import { getRandomUser } from "../../generators/userGenerator"
import { getAllUsersMocks } from "../../mocks/getAllUsersMocks"
import { loginMocks } from "../../mocks/loginMocks"
import LoginPage from "../../pages/LoginPage"

describe('Login page tests', () => {
    beforeEach(() => {
        cy.visit('http://localhost:8081')
    })

    it('should successfully login', () => {
        // given - przygotowanie testu
        const user = getRandomUser()
        loginMocks.mockSuccessfulLogin(user)
        getAllUsersMocks.mockUsers()
        createPercySnapshot()

        // when - co testujemy
        LoginPage.attemptLogin(user.username, user.password)

        // then - asercje, sprawdzenia, weryfikacje
        cy.get('h1').should('contain.text', user.firstName)
    })

    it('should fail to login', () => {
        // given
        const message = "Invalid username/password supplied"
        loginMocks.mockFailedLogin(message)

        // when
        LoginPage.attemptLogin('wrong', 'wrong')

        // then
        cy.get('.alert-danger').should('have.text', message)
    })

    it('should open register page', () => {
        // when
        LoginPage.clickRegister()

        // then
        cy.url().should('contain', '/register')
    })

})

const createPercySnapshot = () => {
    // to increase visual regression stability
    cy.get('[name=password]').should('be.visible')
    cy.percySnapshot('Login page', { widths: [1280] })
}

