/// <reference types="cypress" />

import { User } from "../domain/user";
import { getRandomUser } from "../generators/userGenerator"

let user: User;
let token: string | undefined

describe('Home page tests', () => {
    beforeEach(() => {
        user = getRandomUser()
        cy.register(user)
        cy.login(user.username, user.password)
        cy.getCookie('token').then(cookie => token = cookie?.value)
    })

    afterEach(() => {
        cy.deleteUser(user.username, token as string)
    })

    it('should display at least one user', () => {
        cy.get('li').should('have.length.at.least', 1)
    })

    it('should logout', () => {
        cy.get('#logout').click()
        cy.url().should('contain', '/login')
    })

    it('should add more users', () => {
        cy.get('#addmore').click()
        cy.url().should('contain', '/add-user')
    })

})
