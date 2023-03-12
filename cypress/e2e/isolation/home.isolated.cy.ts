/// <reference types="cypress" />

import { buildLoginResponseBody } from "../../helpers/loginResponse"
import { getRandomUser, User } from "../../utils/user"
import users from "../../fixtures/users.json"

describe('Home page tests', () => {
    let user: User

    beforeEach(() => {
        user = getRandomUser()
        localStorage.setItem('user', JSON.stringify(buildLoginResponseBody(user)))
        cy.setCookie('token', 'fakeToken')
        cy.intercept('GET', '**/users', { fixture: 'users.json' })
        cy.visit('http://localhost:8081')
    })

    it('should display at least one user', () => {
        // then
        cy.get('ul li').should('have.length', users.length)
            .each(($el, i) => {
                expect($el.text()).to.contain(`${users[i].firstName} ${users[i].lastName}`)
            })
    })

})
