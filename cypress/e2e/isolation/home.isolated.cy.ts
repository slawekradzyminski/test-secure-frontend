/// <reference types="cypress" />

import MockGetUsers from "../../stubs/MockGetUsers"
import users from "../../fixtures/users.json"

describe('Home page isolated tests', () => {
    beforeEach(() => {
        cy.setFakeLocalStorage()
        MockGetUsers.mockUsers()
        cy.visit('http://localhost:8081')
    })

    it('should display all users', () => {
        // then
        cy.get('li').should('have.length', users.length)
        cy.get('li').each(($el, i) => {
            expect($el.text()).to.contain(`${users[i].firstName} ${users[i].lastName}`)
        })
    })
})
