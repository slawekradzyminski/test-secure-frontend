/// <reference types="cypress" />

import { getRandomUser, User } from '../util/user';
import { faker } from '@faker-js/faker';

describe('home page', () => {
    let token: string
    let user: User

    beforeEach(() => {
        user = getRandomUser()
        cy.register(user)
        cy.login(user.username, user.password).then(jwtToken => token = jwtToken)
        cy.visit('http://localhost:8081')
    })

    afterEach(() => {
        cy.deleteUser(user.username, token)
    })

    it('should check data on profile', () => {
        cy.get('ul li').contains(`${user.firstName} ${user.lastName}`).find('.edit').click()
        cy.get('[name=firstName]').should('have.value', user.firstName)
        cy.get('[name=lastName]').should('have.value', user.lastName)
        cy.get('[name=email]').should('have.value', user.email)
        cy.get('[name=username]').should('have.value', user.username)
        cy.get('[name=roles]').should('have.value', user.roles.join(','))
    })

    it('should edit an user', () => {
        const newUser = getRandomUser()

        cy.get('ul li').contains(`${user.firstName} ${user.lastName}`).find('.edit').click()
        cy.get('[name=firstName]').clear().type(newUser.firstName)
        cy.get('[name=lastName]').clear().type(newUser.lastName)
        cy.get('[name=email]').clear().type(newUser.email)
        cy.get('.btn-primary').click()

        cy.get('ul li').contains(`${user.firstName} ${user.lastName}`).should('not.exist')
        cy.get('ul li').contains(`${newUser.firstName} ${newUser.lastName}`).should('be.visible')
        cy.get('h1').should('contain.text', newUser.firstName)
    })

})
