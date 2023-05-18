/// <reference types="cypress" />

import TestArenaLoginPage from "../../pages/testarena/TestArenaLoginPage"

describe('Login page', () => {
    beforeEach(() => {
        cy.visit('http://demo.testarena.pl/zaloguj')
    })

    it('should successfully login', () => {
        // given
        const email = 'administrator@testarena.pl'

        // when
        TestArenaLoginPage.attemptLogin(email, 'sumXQQ72$L')

        // then
        cy.get('.user-info > small').should('have.text', email)
    })

})

