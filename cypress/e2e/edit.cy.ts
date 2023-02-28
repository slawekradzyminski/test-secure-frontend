/// <reference types="cypress" />

import { getRandomUser, User } from "../domain/user"
import { editPage } from "../pages/editPage"
import { homePage } from "../pages/homePage"


describe('Edit page tests', () => {
    let user: User

    beforeEach(() => {
        user = getRandomUser()
        cy.register(user)
        cy.login(user.username, user.password)
        cy.visit('http://localhost:8081')
        cy.contains('li', `${user.firstName} ${user.lastName}`).find('.edit').click()
    })

    it('should correctly autofill data', () => {
        // then
        cy.get('[name=firstName]').should('have.value', user.firstName)
        cy.get('[name=lastName]').should('have.value', user.lastName)
        cy.get('[name=username]').should('have.value', user.username)
        cy.get('[name=email]').should('have.value', user.email)
        cy.get('[name=roles]').should('have.value', user.roles.join(','))

    })

    it('should successfully edit user', () => {
        const newUserData = getRandomUser()
        editPage.editUser(newUserData)
        homePage.verifyUserExists(newUserData)
        homePage.verifyUserNotExists(user)
    })


})
