/// <reference types="cypress" />

import { getRandomUser } from "../domain/user";
import Alert from "../components/Alert";
import { registerPage } from "../pages/registerPage";

describe('Register page tests', () => {
    beforeEach(() => {
        cy.visit('/register')
    })

    it('should successfully register', () => {
        // given
        const user = getRandomUser()

        // when
        registerPage.attemptRegister(user)

        // then
        Alert.getAlertSuccess().should('contain.text', 'Registration successful')
        cy.url().should('contain', '/login')
    })

    it('should fail to register if username already exists', () => {
        const user = getRandomUser()
        cy.register(user)

        registerPage.attemptRegister(user)

        Alert.getAlertFailed().should('contain.text', 'Username is already in use')
        cy.url().should('contain', '/register')
    })

    it('should trigger frontend validation', () => {
        cy.get('.btn-primary').click()
        const numberOfRows = 5

        cy.get('.invalid-feedback').should('have.length', numberOfRows)
        cy.get('.invalid-feedback').each(($el) => {
            cy.wrap($el).should('have.text', 'Required field length is 4 or more')
        })

        cy.get('.is-invalid').should('have.length', numberOfRows)
        cy.get('input').each(($el) => {
            cy.wrap($el).should('have.class', 'is-invalid')
        })
    })

})
