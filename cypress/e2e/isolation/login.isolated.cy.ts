/// <reference types="cypress" />

import { getUsersMocks } from "../../mocks/getUsers"
import { postUserSignInMocks } from "../../mocks/postUsersSignIn"
import LoginPage from "../../pages/LoginPage"
import { getUser } from "../../utils/user"

describe('[ISOLATION] Login page tests', () => {
    beforeEach(() => {
        cy.visit('http://localhost:8081')
    })

    it('should successfully login', () => {
        // given
        const user = getUser()
        postUserSignInMocks.mockSuccess(user)
        getUsersMocks.mockSuccess()

        // when
        LoginPage.attemptLogin(user.username, user.password)

        // then
        cy.get('h1').should('contain.text', user.firstName)
    })


    it('should fail to login if wrong username and password provided', () => {
        // given
        const errorMessage = "Invalid username/password supplied"
        postUserSignInMocks.mockFailure(errorMessage)
        
        // when
        LoginPage.attemptLogin('wrong', 'wrong')

        // then
        cy.get('.alert').should('have.text', errorMessage)
    })

    it('should open register page', () => {
        // when
        LoginPage.registerButton().click()

        // then
        cy.url().should('contain', '/register')
    })

})
