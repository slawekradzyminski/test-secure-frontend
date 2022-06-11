/// <reference types="cypress" />

import { getRandomUser } from "../util/user"

describe('login page', () => {
    const user = getRandomUser()

    before(() => {
        cy.register(user)
    })

    beforeEach(() => {
        cy.login(user.username, user.password)
        cy.visit('http://localhost:8081')
    })
 
    it('should display at least one user', () => {
        cy.get('ul li').should('have.length.at.least', 1)
    })
 
    it('should logout', () => {
        cy.get('#logout').click()
        cy.url().should('contain', '/login')
        cy.get('h2').should('contain.text', 'Login')
    })
 
    it('should add more users', () => {
        cy.get('#addmore').click()
        cy.url().should('contain', '/add-user')
        cy.get('h2').should('contain.text', 'Register')
    })

    it('should open edit user', () => {
        cy.get('ul li').contains(user.firstName).find('.edit').click()
        cy.get('h2').should('have.text', 'Edit user')
    })
})
