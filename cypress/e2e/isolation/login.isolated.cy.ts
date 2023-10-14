/// <reference types="cypress" />

import { User } from "../../domain/User"
import { getLoginResponseFor } from "../../domain/requests/loginTypes"
import { getRandomUser } from "../../generators/userGenerator"
import { getAllUsersMocks } from "../../mocks/getAllUsersMocks"
import { loginMocks } from "../../mocks/loginMocks"

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
        cy.get('[name=username]').type(user.username)
        cy.get('[name=password]').type(user.password)
        cy.get('.btn-primary').click()

        // then
        cy.get('h1').should('contain.text', user.firstName)
        verifyCorrectRequestWasBuild(user)
    })

    it('should fail to login', () => {
        // given
        const errorMessage = 'Invalid username/password supplied'
        loginMocks.mockWrongCredentials(errorMessage)

        // when
        cy.get('[name=username]').type('wrong')
        cy.get('[name=password]').type('wrong')
        cy.get('.btn-primary').click()

        // then
        cy.get('.alert').should('contain.text', errorMessage)
        cy.url().should('contain', '/login')
    })

})

const verifyCorrectRequestWasBuild = (user: User) => {
    cy.get('@loginRequest').its('request.body').should('deep.equal', {
        username: user.username,
        password: user.password
    })
}
