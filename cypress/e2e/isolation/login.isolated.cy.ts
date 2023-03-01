/// <reference types="cypress" />

import { getRandomUser } from "../../domain/user"
import { getUsersMocks } from "../../mocks/getUsersMocks"
import { postUserSignin } from "../../mocks/postUserSignin"
import LoginPage from "../../pages/LoginPage"

describe('Login page tests', () => {
    beforeEach(() => {
        cy.visit('http://localhost:8081')
    })

    it('should successfully login', () => {
        // given
        const user = getRandomUser()
        postUserSignin.mockSuccess(user)
        getUsersMocks.mockUsers()

        // when
        LoginPage.attemptLogin(user.username, user.password)

        // then
        cy.get('h1').should('contain.text', user.firstName)
    })

    it('should fail to login', () => {
        // given
        const errorMessage = 'Invalid username/password supplied'
        postUserSignin.mockFailure(errorMessage)

        // when
        LoginPage.attemptLogin('wrong', 'wrong')

        // then
        cy.get('.alert-danger').should('have.text', errorMessage)
    })

})

