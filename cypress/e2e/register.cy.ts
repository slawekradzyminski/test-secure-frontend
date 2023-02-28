/// <reference types="cypress" />

import { getRandomUser } from "../domain/user"
import { registerPage } from "../pages/registerPage"

describe('Register page tests', () => {
    beforeEach(() => {
        cy.visit('http://localhost:8081/register')
    })

    it('should register successfully', () => {
        // given
        const user = getRandomUser()

        // when
        registerPage.attemptRegister(user)

        // then
        cy.get('.alert-success').should('have.text', 'Registration successful')
    })

    it('should fail to register', () => {
        // given
        const user = getRandomUser()
        cy.register(user)

        // when
        registerPage.attemptRegister(user)

        // then
        cy.get('.alert-danger').should('have.text', 'Username is already in use')
    })

    it('should trigger frontend validation', () => {
        // when
        registerPage.selectors.registerButton().click()

        // then
        performFrontendValidation()
    })

})

const performFrontendValidation = () => {
    checkExclamationMark()
    checkErrorMessage()
}

const checkExclamationMark = () => {
    registerPage.selectors.formInputs()
        .should('have.length', 5)
        .each(($input) => {
            cy.wrap($input).should('have.class', 'is-invalid')
        })
}

const checkErrorMessage = () => {
    registerPage.selectors.formGroupDivs()
        .should('have.length', 5)
        .each(($error) => {
            cy.wrap($error).should('have.text', 'Required field length is 4 or more')
        })
}
