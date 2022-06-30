/// <reference types="cypress" />

import { getRandomUser } from "../util/user"

describe('login page', () => {

    let token: string
    const user = getRandomUser()

    before(() => {
        cy.register(user)
    })

    beforeEach(() => {
        cy.login(user.username, user.password).then(returnedToken => token = returnedToken)
        cy.visit('http://localhost:8081')
    })

    after(() => {
        cy.deleteUser(user, token)
    })

    it('should display at least one user', () => {
        cy.get('ul li').should('have.length.at.least', 1)
    })

    it('should logout', () => {
        cy.get('#logout').click()
        cy.url().should('contain', '/login')
    })

    it('should redirect to adduser page', () => {
        cy.get('#addmore').click()
        cy.url().should('contain', '/add-user')
    })

    it('should open edit page', () => {
        cy.get('ul li').contains(user.firstName).find('.edit').click()
        cy.get('h2').should('contain.text', 'Edit user')
        cy.url().should('contain', 'edit-user')
    })

    it('should open mail page', () => {
        cy.get('ul li').contains(user.firstName).find('.email').click()
        cy.get('h2').should('contain.text', 'Send email')
        cy.url().should('contain', 'email')
    })

})
