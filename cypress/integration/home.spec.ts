/// <reference types="cypress" />

import { getUser } from "../util/user"

describe('Home page', () => {
    const user = getUser()
    let token: string

    before(() => {
        cy.register(user)
    })

    // after(() => {
    //     cy.deleteUser(user.username)
    // })

    beforeEach(() => {
        cy.login(user.username, user.password).then(returnedToken => token = returnedToken)
        cy.visit('http://localhost:8080')
    })

    it('should display at least one user', () => {
        cy.get('ul li').should('have.length.at.least', 1)
    })

    it('should logout', () => {
        cy.get('#logout').click()
        cy.url().should('contain', 'login')
    })

    it('should display at least one user', () => {
        cy.get('#addmore').click()
        cy.url().should('contain', 'add-user')
    })


})
