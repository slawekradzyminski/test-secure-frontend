/// <reference types="cypress" />

import { editPage } from "../pages/editPage"
import { generateUser } from "../utils/user"

describe('Edit page', () => {

    let user

    beforeEach(() => {
        user = generateUser()
        cy.registerViaAPI(user)
        cy.loginViaAPI(user)  
        cy.visit('http://localhost:8081')
        cy.get('li').contains(`${user.firstName} ${user.lastName}`).find('.edit').click()
    })

    it('should autofill edit profile', () => {
        // then
        editPage.selectors.firstNameInput().should('have.value', user.firstName);
        editPage.selectors.lastNameInput().should('have.value', user.lastName);
        editPage.selectors.usernameField().should('have.value', user.username);
        editPage.selectors.emailInput().should('have.value', user.email);
        editPage.selectors.rolesField().should('have.value', user.roles.join())
    })

    it('should correctly edit an user', () => {
        // given
        const newUser = generateUser()

        // when
        editPage.editUser(newUser)

        // then
        cy.get('.alert').should('have.text', 'Updating user successful')
        cy.get('li').contains(`${newUser.firstName} ${newUser.lastName}`).should('be.visible')
        cy.get('li').contains(`${user.firstName} ${user.lastName}`).should('not.exist')
    })

    it('should click cancel', () => {
        // when
        editPage.clickCancel()

        // then
        cy.get('li').should('have.length.at.least', 1)
    })

})
