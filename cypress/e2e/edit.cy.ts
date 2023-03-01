/// <reference types="cypress" />

import { getRandomUser, User } from "../domain/user"
import { editPage } from "../pages/editPage"
import { homePage } from "../pages/homePage"


describe('Edit page tests', () => {
    let user: User
    let token: string

    beforeEach(() => {
        user = getRandomUser()
        cy.register(user)
        cy.login(user.username, user.password)
            .then((tokenReturnedFromApi) => token = tokenReturnedFromApi)
            .then(() => cy.setCookie('token', token))
        cy.visit('http://localhost:8081')
        cy.contains('li', `${user.firstName} ${user.lastName}`).find('.edit').click()
    })

    afterEach(() => {
        // cy.deleteUser(user.username, token)
    })

    it('should correctly autofill data', () => {
        cy.log(token)
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
