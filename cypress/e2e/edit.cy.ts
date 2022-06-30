/// <reference types="cypress" />

import { getRandomUser } from "../util/user"

describe('Email page', () => {

    let token: string
    const user = getRandomUser()

    before(() => {
        cy.register(user)
    })

    beforeEach(() => {
        cy.login(user.username, user.password).then(returnedToken => token = returnedToken)
        cy.visit('http://localhost:8081')
        cy.get('ul li').contains(user.firstName).find('.edit').click()
    })

    after(() => {
        cy.deleteUser(user, token)
    })

    it('should correctly fill data', () => {
        cy.get('[name=username]').should('have.value', user.username)
        cy.get('[name=firstName]').should('have.value', user.firstName)
        cy.get('[name=lastName]').should('have.value', user.lastName)
        cy.get('[name=email]').should('have.value', user.email)
        cy.get('[name=roles]').should('have.value', user.roles.join())
    })

    it('should successfully edit user', () => {
        const newUser = getRandomUser()
        cy.get('[name=firstName]').clear().type(newUser.firstName)
        cy.get('[name=lastName]').clear().type(newUser.lastName)
        cy.get('[name=email]').clear().type(newUser.email)
        cy.get('.btn-primary').click()

        cy.get('ul li').contains(newUser.firstName).should('be.visible')
        cy.get('ul li').contains(user.firstName).should('not.exist')
    })


})
