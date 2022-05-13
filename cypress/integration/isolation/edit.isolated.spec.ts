/// <reference types="cypress" />

import { Roles } from "../../util/roles"
import users from "../../fixtures/users.json"

const getRandomUser = () => {
    let rand = Math.random() * users.length;
    if (rand === users.length) {
        rand = users.length - 1
    }
    rand = Math.floor(rand)
    return rand
}

describe('home page with mocks', () => {
    const editedUser = users[getRandomUser()]

    beforeEach(() => {
        const user = {
            roles: [Roles.ROLE_ADMIN]
        }
        localStorage.setItem('user', JSON.stringify(user))
        cy.intercept('GET', '**/users', { body: users })
        cy.visit('http://localhost:8081')
        cy.viewport('macbook-16')
        cy.get('ul li').contains(`${editedUser.firstName}`).find('.edit').click()
    })

    it('should autofill all date', () => {
        cy.get('[name=firstName]').should('have.value', editedUser.firstName)
        cy.get('[name=lastName]').should('have.value', editedUser.lastName)
        cy.get('[name=email]').should('have.value', editedUser.email)
        cy.get('[name=username]').should('have.value', editedUser.username)
        cy.get('[name=roles]').should('have.value', editedUser.roles.join(','))
    })

})


