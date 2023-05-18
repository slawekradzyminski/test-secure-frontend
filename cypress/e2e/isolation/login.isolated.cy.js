/// <reference types="cypress" />

import { generateUser } from "../../utils/user"

describe('[ISOLATION] Login page', () => {
    beforeEach(() => {
        cy.visit('http://localhost:8081')
    })


    it('should successfully login', () => {
        // given
        const user = generateUser()
        cy.intercept('POST', '**/users/signin', {
            statusCode: 200,
            body: {
                username: user.username,
                roles: user.roles,
                firstName: user.firstName,
                lastName: user.lastName,
                token: "CypressTestToken",
                email: user.email
            }
        })
        cy.intercept('GET', '**/users', { fixture: 'users.json' })

        // when
        cy.login(user.username, user.password)

        // 
        cy.get('h1').should('contain.text', user.firstName)
    })

})
