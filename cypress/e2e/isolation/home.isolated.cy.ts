/// <reference types="cypress" />

import { getRandomUser } from "../../domain/user"
import { getUsersMocks } from "../../mocks/getUsersMocks"
import { buildLoginResponse } from "../../mocks/postUserSignin"
import users from "../../fixtures/users.json"

describe('Home page tests', () => {
    beforeEach(() => {
        const user = getRandomUser()
        cy.setCookie('token', 'fakeToken')
        localStorage.setItem('user', JSON.stringify(buildLoginResponse(user)))
        getUsersMocks.mockUsers()
        cy.visit('http://localhost:8081')
    })

    it('should display all users', () => {
        cy.get('li')
            .should('have.length', users.length)
            .each(($el, i) => {
                expect($el.text()).to.contain(`${users[i].firstName} ${users[i].lastName}`)
            })
    })


})
