/// <reference types="cypress" />

import { signinMocks } from "../../mocks/signinMocks"
import { usersMocks } from "../../mocks/usersMocks"

describe('Login page', () => {
    beforeEach(() => {
        cy.visit('http://localhost:8081')
    })

    it('should successfully login', () => {
        // given
        signinMocks.successfulLogin()
        usersMocks.testUsers()

        // when
        cy.get('[name=username]').type('admin')
        cy.get('[name=password]').type('admin')
        cy.get('.btn-primary').click()

        // then
        cy.get('h2,h1').should('contain.text', 'Slawomir')
        cy.wait('@loginRequest').its('request.body').should('deep.equal', {
            username: 'admin',
            password: 'admin'
        })
    })

    it('should fail to login', () => {
        // given
        const message = 'Invalid username/password supplied'
        signinMocks.failedLogin(message)

        // when
        cy.get('[name=username]').type('admin')
        cy.get('[name=password]').type('admin')
        cy.get('.btn-primary').click()

        // then
        cy.get('.alert').should('have.text', message)
    })

})
