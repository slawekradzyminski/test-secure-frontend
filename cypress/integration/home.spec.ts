/// <reference types="cypress" />

import { getRandomUser } from '../util/user';

describe('home page', () => {
    beforeEach(() => {
        const user = getRandomUser()
        cy.register(user)
        cy.login(user.username, user.password)
        cy.visit('http://localhost:8081')
    })

    it('should display list of users', () => {
        cy.get('ul li').should('have.length.at.least', 1)
    })
})
