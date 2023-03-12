/// <reference types="cypress" />

import { editPage } from "../pages/editPage"
import { homePage } from "../pages/homePage"
import { getRandomUser, User } from "../utils/user"

describe('Edit page tests', () => {
    let user: User

    beforeEach(() => {
        user = getRandomUser()
        cy.register(user)
        cy.login(user.username, user.password)
        cy.visit('http://localhost:8081')
        homePage.clickEditFor(user)
    })

    it('should correctly autofill data', () => {
        // then
        editPage.verifyDataPresent(user)
    })

    it('should successfully edit user data', () => {
        // given
        const newUser = getRandomUser()

        // when
        editPage.editUserDetails(newUser)

        // then
        cy.get('.alert').should('have.text', 'Updating user successful')
        cy.get('li').contains(`${newUser.firstName} ${newUser.lastName}`).should('exist')
        cy.get('li').contains(`${user.firstName} ${user.lastName}`).should('not.exist')
    })

})
