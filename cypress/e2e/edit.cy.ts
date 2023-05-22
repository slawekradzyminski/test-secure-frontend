/// <reference types="cypress" />

import { getEmail } from "../utils/email"
import { User, getUser } from "../utils/user"

describe('Email page tests', () => {
    let user: User
    let token: string | undefined

    beforeEach(() => {
        user = getUser()
        cy.register(user)
        cy.login(user.username, user.password)
        cy.visit('http://localhost:8081')
        cy.getCookie('token').then(cookie => {
            token = cookie?.value
        })
        cy.get('li').contains(`${user.firstName} ${user.lastName}`).find('.edit').click()
    })

    afterEach(() => {
        cy.deleteUser(user.username, token)
    })

    it('should successfully edit an user', () => {
        // given
        const newUser = getUser() 

        // when
        cy.get('[name=firstName]').clear().type(newUser.firstName)
        cy.get('[name=lastName]').clear().type(newUser.lastName)
        cy.get('[name=email]').clear().type(newUser.email)
        cy.get('.btn-primary').click()

        // then
        cy.get('.alert').should('contain.text', 'Updating user successful')
        cy.get('li').contains(`${newUser.firstName} ${newUser.lastName}`).should('be.visible')
        cy.get('li').contains(`${user.firstName} ${user.lastName}`).should('not.exist')
    })

})
