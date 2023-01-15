/// <reference types="cypress" />

import { getRandomUser } from "../../util/user"
import users from "../../fixtures/users.json"

describe('Home page', () => {
    beforeEach(() => {
        cy.setCookie('token', 'fakeToken')
        const { password, ...loginResponse } = { ...getRandomUser(), token: 'fakeToken' }
        localStorage.setItem('user', JSON.stringify(loginResponse))
        cy.intercept('GET', '**/users', { fixture: 'users.json' })
        cy.visit('http://localhost:8081')
    })

    it('should display all users', () => {
        cy.get('li').should('have.length', users.length)
        cy.get('li').each(($el, i) => {
            cy.wrap($el).should('contain.text', `${users[i].firstName} ${users[i].lastName}`)
        })
    })

})
