/// <reference types="cypress" />

import { faker } from "@faker-js/faker"

describe('Testarena login tests', () => {
    beforeEach(() => {
        cy.visit('http://demo.testarena.pl/zaloguj')
        cy.get('#email').type(Cypress.env('testarenalogin'))
        cy.get('#password').type(Cypress.env('testarenapassword'))
        cy.get('#login').click()
        cy.get('.icon_mail').click()
    })

    it('should add new message', () => {
        // given
        const message = faker.lorem.text()

        // when
        cy.get('#j_msgContent').type(message)
        cy.get('#j_msgResponse-193').click()

        // then
        cy.get('.message_content_text').last().should('contain.text', message)
    })

})
