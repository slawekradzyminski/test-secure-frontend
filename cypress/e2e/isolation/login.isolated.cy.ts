/// <reference types="cypress" />

import { User, getUser } from "../../utils/user"

describe('[ISOLATION] Login page tests', () => {
    beforeEach(() => {
        cy.visit('http://localhost:8081')
    })

    it('should successfully login', () => {
        // given
        const user = getUser()
        cy.intercept('POST', '**/users/signin', {
            statusCode: 200,
            body: buildLoginResponse(user)
        })
        cy.intercept('GET', '**/users', { fixture: 'users.json' })

        // when
        cy.get('[name=username]').type(user.username)
        cy.get('[name=password]').type(user.password)
        cy.get('.btn-primary').click()

        // then
        cy.get('h1').should('contain.text', user.firstName)
    })

})

const buildLoginResponse = ({ password, ...userWithoutPassword }: User) => ({
    ...userWithoutPassword,
    token: 'fakeToken'
})