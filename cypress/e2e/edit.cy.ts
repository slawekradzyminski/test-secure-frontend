/// <reference types="cypress" />

import { getRandomUser, User } from "../domain/user"

describe('Edit page tests', () => {
    let token: string
    let user: User

    beforeEach(() => {
        user = getRandomUser()
        cy.register(user)
        cy.login(user.username, user.password).then((returnedToken) => {
            cy.setCookie('token', returnedToken)
            token = returnedToken
        })
        cy.visit('')
        cy.get('li').contains(`${user.firstName} ${user.lastName}`).find('.edit').click()
    })

    afterEach(() => {
        cy.deleteUser(user.username, token)
    })

    it('should correctly autofill data', () => {
        cy.get('[name=firstName]').should('have.value', user.firstName)
        cy.get('[name=lastName]').should('have.value', user.lastName)
        cy.get('[name=username]').should('have.value', user.username)
        cy.get('[name=email]').should('have.value', user.email)
        cy.get('[name=roles]').should('have.value', user.roles.join(','))
    })

    it.only('should edit user', () => {
        const newUser = getRandomUser()
        cy.get('[name=firstName]').clear().type(newUser.firstName)
        cy.get('[name=lastName]').clear().type(newUser.lastName)
        cy.get('[name=email]').clear().type(newUser.email)
        cy.get('.btn-primary').click()

        cy.get('li').contains(`${newUser.firstName} ${newUser.lastName}`).should('exist')
        cy.get('li').contains(`${user.firstName} ${user.lastName}`).should('not.exist')
        cy.get('.alert-success').should('have.text', 'Updating user successful')

        cy.request({
            method: 'GET',
            url: `http://localhost:4001/users/${user.username}`,
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((resp) => {
            expect(resp.status).to.eq(200)
            expect(resp.body.firstName).to.eq(newUser.firstName)
            expect(resp.body.lastName).to.eq(newUser.lastName)
            expect(resp.body.email).to.eq(newUser.email)
        })
    })

})
