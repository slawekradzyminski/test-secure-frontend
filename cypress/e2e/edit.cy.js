/// <reference types="cypress" />

import { getRandomEmail, getRandomUser } from "../generator/user"
import { generateRandomString } from "../utils/random"

describe('Edit page tests', () => {
    let user

    beforeEach(() => {
        user = getRandomUser()
        cy.register(user)
        cy.login(user.username, user.password)
        cy.get('li').contains(`${user.firstName} ${user.lastName}`).find('.edit').click()
    })

    it('should correctly autofill data', () => {
        // then
        cy.get("[name=firstName]").should('have.value', user.firstName)
        cy.get("[name=lastName]").should('have.value', user.lastName)
        cy.get("[name=email]").should('have.value', user.email)
    })

    it('should successfully edit an user', () => {
        // given
        const newFirstName = generateRandomString(6)
        const newLastName = generateRandomString(6)

        // when
        cy.get("[name=firstName]").clear().type(newFirstName)
        cy.get("[name=lastName]").clear().type(newLastName)
        cy.get("[name=email]").clear().type(getRandomEmail())
        cy.get('.btn-primary').click()

        // then
        cy.get('li').contains(`${user.firstName} ${user.lastName}`).should('not.exist')
        cy.get('li').contains(`${newFirstName} ${newLastName}`).should('exist')
    })

})
