/// <reference types="cypress" />

import { getLoginResponseFor } from "../../domain/requests/loginTypes"
import { getRandomUser } from "../../generators/userGenerator"

describe('Login page tests in isolation', () => {
    beforeEach(() => {
        cy.visit('http://localhost:8081')
    })

    it('should successfully login', () => {
        // given
        const user = getRandomUser()
        cy.intercept('POST', '**/users/signin', {
            statusCode: 200,
            body: getLoginResponseFor(user)
        })
        cy.intercept('GET', '**/users', { fixture: 'users.json' })

        // when
        cy.get('[name=username]').type(user.username)
        cy.get('[name=password]').type(user.lastName)
        cy.get('.btn-primary').click()

        // then
        cy.get('h1').should('contain.text', user.firstName)
    })

})
