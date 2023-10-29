/// <reference types="cypress" />

import { getRandomEmail } from "../generator/user"
import { generateRandomString } from "../utils/random"

describe('Edit page tests', () => {
    beforeEach(() => {
        cy.login('admin', 'admin')
        cy.get('li').contains('Gosia Radzyminska').find('.edit').click()
    })

    it('should correctly autofill data', () => {
        cy.get("[name=firstName]").should('have.value', "Gosia")
        cy.get("[name=lastName]").should('have.value', "Radzyminska")
        cy.get("[name=email]").should('have.value', "client@email.com")
    })

    it('should successfully edit an user', () => {
        const newFirstName = generateRandomString(6)
        const newLastName = generateRandomString(6)
        cy.get("[name=firstName]").clear().type(newFirstName)
        cy.get("[name=lastName]").clear().type(newLastName)
        cy.get("[name=email]").clear().type(getRandomEmail())
        cy.get('.btn-primary').click()

        cy.get('li').contains('Gosia Radzyminska').should('not.exist')
        cy.get('li').contains(`${newFirstName} ${newLastName}`).should('exist')
    })

})
