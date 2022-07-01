/// <reference types="cypress" />

import { mockFailedLogin, mockSuccessfulLogin } from "../../mocks/loginMocks"
import LoginPage from "../../pages/LoginPage"
import { getRandomUser } from "../../util/user"

const loginPage = new LoginPage()

describe('login page is isolation', () => {
    beforeEach(() => {
        cy.visit('http://localhost:8081')
    })

    it('should successfully login', () => {
        // given
        const user = getRandomUser()
        mockSuccessfulLogin(user)
        cy.intercept('GET', '**/users', { fixture: 'users.json' })

        // when
        loginPage.attemptLogin(user.username, user.password)

        // then
        cy.get('h1').should('contain.text', user.firstName)
    })

    it('should fail to login', () => {
        // given
        mockFailedLogin()
 
        // when
        loginPage.attemptLogin('wrong', 'wrong')

        // then
        cy.get('.alert').should('contain.text', 'Invalid username/password')
            .and('have.class', 'alert-danger')
    })

    it('should show loading indicator', () => {
        // given
        cy.intercept('POST', '**/users/signin', { delay: 2000 })
 
        // when
        loginPage.attemptLogin('wrong', 'wrong')

        // then
        cy.get('.btn-primary .spinner-border').should('be.visible')
    })

})
