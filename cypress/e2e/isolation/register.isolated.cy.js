/// <reference types="cypress" />

import LoginScreen from "../../pages/LoginScreen"
import RegisterScreen from "../../pages/RegisterScreen"
import { getRandomUser } from "../../util/user"

describe('Register page tests', () => {
    beforeEach(() => {
        cy.visit('http://localhost:8081/register')
    })

    it('should successfully to register for random user', () => {
        //given
        const user = getRandomUser()
        cy.intercept('POST', '**/users/signup', {
            statusCode: 201,
            body: {
                token: 'fakeToken'
            }
        })

        //when
        RegisterScreen.registerUser(user)

        //then
        cy.get('.alert').should('have.text', 'Registration successful')
        cy.url().should('contain', '/login')
    })

})
