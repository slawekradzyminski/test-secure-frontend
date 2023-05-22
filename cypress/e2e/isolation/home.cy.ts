/// <reference types="cypress" />

import { buildLoginResponse } from "../../utils/login"
import { getUser } from "../../utils/user"

describe('Home page tests', () => {

    beforeEach(() => {
        const user = getUser()
        localStorage.setItem('user', JSON.stringify(buildLoginResponse(user)))
        cy.setCookie('token', 'fakeToken')
        cy.intercept('GET', '**/users', { fixture: 'users.json' })
        cy.visit('http://localhost:8081')
    })

    it('should display at least one user', () => {
        cy.get('li').should('have.length.at.least', 1)
    })

    it.skip('should successfully delete an user', () => {

    })
})
