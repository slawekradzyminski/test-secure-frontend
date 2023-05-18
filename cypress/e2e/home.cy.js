/// <reference types="cypress" />

import { generateUser } from "../utils/user"

describe('Home page', () => {
    beforeEach(() => {
        const user = generateUser()
        cy.registerViaAPI(user)
        cy.loginViaAPI(user)
        cy.visit('http://localhost:8081')
    })

    it('should successfully logout', () => {
        cy.get('#logout').click()
        cy.url().should('contain', 'login')
    })

    it('should display at least one user', () => {
        cy.get('li').should('have.length.at.least', 1)
    })

    it('should open add more page', () => {
        cy.get('#addmore').click()

        cy.url().should('contain', 'add-user')
    })

})
