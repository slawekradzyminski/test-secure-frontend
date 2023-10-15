/// <reference types="cypress" />

import { User } from "../../domain/User"
import { getLoginResponseFor, getLoginResponseForWithFirstName } from "../../domain/requests/loginTypes"
import { getRandomUser } from "../../generators/userGenerator"
import { getAllUsersMocks } from "../../mocks/getAllUsersMocks"
import users from "../../fixtures/users.json"

describe('Home page tests in isolation', () => {
    let user: User

    beforeEach(() => {
        user = getRandomUser()
        localStorage.setItem('user', JSON.stringify(getLoginResponseForWithFirstName(user, 'Josianne')))
        cy.setCookie('token', 'fakeToken')
        getAllUsersMocks.mockUsers()
        cy.visit('http://localhost:8081')
    })

    it('should display at least one user', () => {
        // then
        cy.get('li').should('have.length', users.length)
        cy.get('li').each(($el, i) => {
            expect($el.text()).to.contain(`${users[i].firstName} ${users[i].lastName}`)
        })
        cy.percySnapshot('logged in home page')
    })

})
