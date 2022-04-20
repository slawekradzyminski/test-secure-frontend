/// <reference types="cypress" />

import users from '../fixtures/users.json'
import { getRandomEmail, getRandomString } from '../util/random'

describe('edit page', () => {
    const firstUser = users[0]

    beforeEach(() => {
        const user = {
            roles: ['ROLE_ADMIN'],
            token: 'fakeToken',
        }
        window.localStorage.setItem('user', JSON.stringify(user))
        cy.intercept('GET', '**/users', { fixture: 'users.json' })
        cy.intercept('GET', `**/users/${firstUser.username}`, { body: firstUser })
        cy.visit('')
    })

    it('should correctly fill data', () => {
        // when
        cy.get('ul li').contains(`${firstUser.firstName}`).find('.edit').click()

        // then
        cy.get('[name=username]').should('have.value', firstUser.username)
        cy.get('[name=firstName]').should('have.value', firstUser.firstName)
        cy.get('[name=lastName]').should('have.value', firstUser.lastName)
        cy.get('[name=email]').should('have.value', firstUser.email)
        cy.get('[name=roles]').should('have.value', firstUser.roles.join(','))
    })

    it('should update user', () => {
        // given
        cy.get('ul li').contains(`${firstUser.firstName}`).find('.edit').click()

        const newFirstName = getRandomString()
        const newLastName = getRandomString()
        const newEmail = getRandomEmail()
        cy.get('[name=email]').clear().type(newEmail)
        cy.get('[name=firstName]').clear().type(newFirstName)
        cy.get('[name=lastName]').clear().type(newLastName)

        cy.intercept('PUT', `**/users/${firstUser.username}`, { statusCode: 200 }).as('putRequest')

        // when
        cy.get('.btn-primary').click()

        // then
        cy.wait('@putRequest').its('request.body').should('deep.equal', {
            username: firstUser.username,
            firstName: newFirstName,
            lastName: newLastName,
            roles: firstUser.roles,
            email: newEmail
        })

    })


})
