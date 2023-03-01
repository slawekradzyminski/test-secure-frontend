/// <reference types="cypress" />

import { LoginResponse } from "../../domain/login"
import { getRandomUser, User } from "../../domain/user"
import LoginPage from "../../pages/LoginPage"

describe('Login page tests', () => {
    beforeEach(() => {
        cy.visit('http://localhost:8081')
    })

    it('should successfully login', () => {
        // given
        const user = getRandomUser()
        cy.intercept('POST', '**/users/signin', {
            statusCode: 200,
            body: buildLoginResponse(user)
        })
        cy.intercept('GET', '**/users', {
            fixture: 'users.json',
            statusCode: 200
        })

        // when
        LoginPage.attemptLogin(user.username, user.password)

        // then
        cy.get('h1').should('contain.text', user.firstName)
    })

    // it('should fail to login', () => {
    //     // when
    //     LoginPage.attemptLogin('wrong', 'wrong')

    //     // then
    //     cy.get('.alert-danger').should('have.text', 'Invalid username/password supplied')
    // })

})

const buildLoginResponse = (user: User): LoginResponse => {
    const { password, ...objectWithoutPassword } = user
    return {
        ...objectWithoutPassword,
        token: 'fakeToken'
    }
}