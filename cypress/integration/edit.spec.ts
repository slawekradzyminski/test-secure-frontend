/// <reference types="cypress" />

import { getRandomEmail, getRandomString } from "../util/random"
import { getUser } from "../util/userProvider"

describe('Home page', () => {
    let jwtToken: string
    const user = getUser()

    before(() => {
        cy.register(user)
    })

    beforeEach(() => {
        cy.login(user.username, user.password).then(returnedToken => jwtToken = returnedToken)
        cy.visit('')
    })

    after(() => {
        cy.deleteUser(user.username, jwtToken)
    })

    it('should edit an user', () => {
        const newFirstName = getRandomString()
        const newLastName = getRandomString()

        cy.get('ul li').contains(`${user.firstName} ${user.lastName}`).find('.edit').click()
        cy.get('[name=firstName]').clear().type(newFirstName)
        cy.get('[name=lastName]').clear().type(newLastName)
        cy.get('[name=email]').clear().type(getRandomEmail())
        cy.get('.btn-primary').click()

        cy.get('ul li').contains(`${user.firstName} ${user.lastName}`).should('not.exist')
        cy.get('ul li').contains(`${newFirstName} ${newLastName}`).should('be.visible')
    })

})
