/// <reference types="cypress" />

import { editPage } from "../pages/editPage"
import { homePage } from "../pages/homePage"
import { getRandomUser } from "./domain/user"

describe('Edit page tests', () => {
    let user
    let token

    beforeEach(() => {
        user = getRandomUser()
        cy.register(user)
        cy.login(user.username, user.password)
        cy.visit('http://localhost:8081')
        homePage.clickEditUser(user)
        cy.getCookie('token').then((tokenCookie) => token = tokenCookie.value) 
    })

    afterEach(() => {
        cy.deleteUser(user.username, token)
    })

    it('should successfully autofill user data', () => {
        // then
        cy.get('[name=username]').should('have.value', user.username)
        cy.get('[name=firstName]').should('have.value', user.firstName)
        cy.get('[name=lastName]').should('have.value', user.lastName)
        cy.get('[name=email]').should('have.value', user.email)
        cy.get('[name=roles]').should('have.value', user.roles.join())
    })

    it('should successfully edit an user', () => {
        // given
        const newUser = getRandomUser()

        // when
        editPage.attemptEdit(newUser)

        // then
        cy.get('.alert-success').should('have.text', 'Updating user successful')
        cy.get('li').contains(`${user.firstName} ${user.lastName}`).should('not.exist')
        cy.get('li').contains(`${newUser.firstName} ${newUser.lastName}`).should('exist')
        cy.assertUserData(user.username, token, newUser)
    })

})
