/// <reference types="cypress" />

import { getRandomUser } from "../../domain/user"

// 1. Chcę ustawić odpowiedź w localStorage
// 2. Chcę ustawić token z odpowiedzi w ciastku o nazwie token

describe('Home page tests in isolation', () => {
    beforeEach(() => {
        const user = getRandomUser()
        const fakeToken = 'fakeToken'
        const fakeLocalStorageEntry = {
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            roles: user.roles,
            token: fakeToken
        }
        localStorage.setItem('user', JSON.stringify(fakeLocalStorageEntry))
        cy.setCookie('token', fakeToken)
        cy.intercept('GET', '**/users', { fixture: 'users.json' })
        cy.visit('')
    })

    it('should display all users', () => {
        cy.get('li').should('have.length', 2)
    })

})
