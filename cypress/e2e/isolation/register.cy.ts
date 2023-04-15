/// <reference types="cypress" />

import { Roles } from "../../domain/roles"
import { getRandomUser } from "../../domain/user"
import { signupMocks } from "../../mocks/signupMocks"

describe('Register page', () => {
    beforeEach(() => {
        cy.visit('http://localhost:8081/register')
    })

    it('should successfully register', () => {
        // given
        signupMocks.successfulRegister()
        const user = getRandomUser()

        // when
        cy.get('[name=username]').type(user.username)
        cy.get('[name=password]').type(user.password)
        cy.get('[name=firstName]').type(user.firstName)
        cy.get('[name=lastName]').type(user.lastName)
        cy.get('[name=email]').type(user.email)
        cy.get('.btn-primary').click()

        // then
        cy.url().should('contain', '/login')
        cy.get('@registerRequest').its('request.body').should('deep.equal', {
            ...user,
            roles: [Roles.ROLE_CLIENT]
        })
    })

    it('should fail to register if user already exists', () => {
        // given
        const user = getRandomUser()
        const message = 'Username is already in use'
        signupMocks.userAlreadyExists(message)

        // when
        cy.get('[name=username]').type(user.username)
        cy.get('[name=password]').type(user.password)
        cy.get('[name=firstName]').type(user.firstName)
        cy.get('[name=lastName]').type(user.lastName)
        cy.get('[name=email]').type(user.email)
        cy.get('.btn-primary').click()

        // then
        cy.get('.alert').should('have.text', message)
    })

})
