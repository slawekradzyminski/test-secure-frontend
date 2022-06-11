/// <reference types="cypress" />

import { getRandomEmail, getRandomString } from "../util/random"

describe('login page', () => {
    const username = getRandomString()
    const password = getRandomString()
    const firstName = getRandomString()
    const lastName = getRandomString()
    const email = getRandomEmail()

    before(() => {
        cy.register(username, password, firstName, lastName, email)
    })

    beforeEach(() => {
        cy.login(username, password)
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
        cy.get('ul li').contains(firstName).find('.edit').click()
        cy.get('h2').should('have.text', 'Edit user')
    })
})
