/// <reference types="cypress" />

import { getRandomUser } from "../../domain/user"

describe('Home page tests is isolation', () => {

    beforeEach(() => {
        const fakeToken = 'fakeToken';
        const user = getRandomUser()
        const fakeLoginResponse = {
            "username": user.username,
            "roles": user.roles,
            "firstName": user.firstName,
            "lastName": user.lastName,
            "token": fakeToken,
            "email": user.email
        }
        // 1
        localStorage.setItem('user', JSON.stringify(fakeLoginResponse))
        // 2
        cy.setCookie('token', fakeToken)
        cy.intercept('GET', '**/users', {
            statusCode: 200,
            fixture: 'users.json'
        })
        cy.visit('')
    })

    it('should display all users', () => {
        cy.get('li').should('have.length', 2)
    })

})
