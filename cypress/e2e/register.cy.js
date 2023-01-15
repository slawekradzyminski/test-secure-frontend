/// <reference types="cypress" />

import RegisterScreen from "../pages/RegisterScreen";
import { getRandomUser } from "../util/user";

describe('Register page', () => {
    beforeEach(() => {
        cy.visit('http://localhost:8081/register')
    })

    it('should fail to register if user already exists', () => {
        // then
        const user = getRandomUser()
        cy.register(user)

        // when
        RegisterScreen.registerUser(user)
 
        cy.get('.alert-danger').should('contain.text', 'Username is already in use')
    });
 
    it('should successfully register', () => {
        // when
        RegisterScreen.registerUser(getRandomUser())
 
        // then
        cy.get('.alert-success').should('have.text', 'Registration successful')
    });

    it('should check FE validation', () => {
        // when
        RegisterScreen.getRegisterButton().click()

        // then
        cy.get('.invalid-feedback')
            .should('have.length', 5)
            .each(($errorMessage) => {
                cy.wrap($errorMessage).should('contain.text', 'Required field length')
            })
        cy.get('input.form-control').each(($input) => {
            cy.wrap($input).should('have.class', 'is-invalid')
        })
    });

})
