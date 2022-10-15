/// <reference types="cypress" />

import { getRandomUser } from "../domain/user"

describe('Home page tests', () => {
    beforeEach(() => {
        const user = getRandomUser()
        cy.request({
            method: 'POST',
            url: 'http://localhost:4001/users/signup',
            body: user
        }).then((resp) => {
            expect(resp.status).to.eq(201)
        })
        cy.login(user.username, user.password)

        // 4
        cy.visit('http://localhost:8081')
    })

    it('should display at least one user', () => {
        cy.get('li').should('have.length.at.least', 1)
    })

    it('should logout', () => {
        cy.get('#logout').click()

        cy.get('h2').should('have.text', 'Login')
        cy.url().should('contain', '/login')
    })

    it('should open add more page', () => {
        cy.get('#addmore').click()

        cy.get('h2').should('have.text', 'Register')
        cy.url().should('contain', '/add-user')
    })

})
