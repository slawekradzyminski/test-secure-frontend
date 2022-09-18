/// <reference types="cypress" />

import MockGetUsers from "../../stubs/MockGetUsers"

describe('Home page isolated tests', () => {
    beforeEach(() => {
        cy.setFakeLocalStorage()
        MockGetUsers.mockUsers()
        cy.visit('http://localhost:8081')
    })

    it('should display all users', () => {

    })
})
