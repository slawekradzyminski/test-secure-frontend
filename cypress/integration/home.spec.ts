/// <reference types="cypress" />

import { getRandomUser } from "../util/user"

describe('home page', () => {
    let token: string

    beforeEach(() => {
        const user = getRandomUser()
        cy.register(user)
        cy.login(user.username, user.password).then(jwtToken => token = jwtToken)
        cy.visit('')
    })

    it('should display at least one user', () => {
        cy.get('ul li').should('have.length.at.least', 1)
    })

})
