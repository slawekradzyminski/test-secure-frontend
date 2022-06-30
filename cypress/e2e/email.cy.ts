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
        cy.get('ul li').contains(user.firstName).find('.email').click()
    })

    after(() => {
        cy.deleteUser(user, token)
    })

    it('should correctly fill email', () => {
        cy.get('[name=email]').should('have.value', user.email)
    })


})
