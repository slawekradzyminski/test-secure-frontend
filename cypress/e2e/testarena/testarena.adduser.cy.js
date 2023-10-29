/// <reference types="cypress" />

import { getTestArenaUser } from "../../generator/testArenaUser"

describe('TestArena add user tests', () => {
    beforeEach(() => {
        cy.loginToTestArena(Cypress.env('testarena_email'), Cypress.env('testarena_password'))
        cy.visit('http://demo.testarena.pl/administration/add_user')
    })

    it('should find newly added user', () => {
        // given
        const user = getTestArenaUser()

        // when
        cy.get('#firstname').type(user.firstname)
        cy.get('#lastname').type(user.lastname)
        cy.get('#email').type(user.email)
        cy.get('#organization').type(user.organization)
        cy.get('#department').type(user.department)
        cy.get('#phoneNumber').type(user.phoneNumber)
        cy.get('#save').click()

        // then nieoczekiwany błąd
        cy.get('#j_info_box > p').should('not.contain.text', 'nieoczekiwany błąd')
    })

})
