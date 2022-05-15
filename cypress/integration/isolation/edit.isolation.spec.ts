/// <reference types="cypress" />

import { Method } from "../../util/httpMethods"
import { Roles } from "../../util/roles"
import users from "../../fixtures/users.json"
import HomePage from "../../pages/HomePage"
import EditPage from "../../pages/EditPage"
import { getRandomUser } from "../../util/user"
import { getAliasedRequest } from "../../util/alias"
import AlertsValidator from "../../components/AlertsValidator"
import { editRequest, mockEditUser } from "../../mocks/editUserMocks"

const homePage = new HomePage()
const editPage = new EditPage()
const alert = new AlertsValidator()

describe('home page', () => {

    const firstUser = users[0]

    beforeEach(() => {
        const user = { roles: [Roles.ROLE_ADMIN] }
        localStorage.setItem('user', JSON.stringify(user))
        cy.intercept(Method.GET, '**/users', { fixture: 'users.json' })
        cy.visit('')
        homePage.clickUserDetails(firstUser.firstName, firstUser.lastName)
    })

    it('should autofill user data', () => {
        // then
        cy.get('[name=username]').should('have.value' , firstUser.username)
        cy.get('[name=firstName]').should('have.value', firstUser.firstName)
        cy.get('[name=lastName]').should('have.value', firstUser.lastName)
        cy.get('[name=roles]').should('have.value', firstUser.roles.join(','))
        cy.get('[name=email]').should('have.value', firstUser.email)
    })
    it.only('should mock succsessfull edit', () => {
        //given
        const message = 'Updating user successful'
        mockEditUser(firstUser.username)
        // when
        const user = getRandomUser()
        editPage.editUser(user)
        //then
        cy.wait(getAliasedRequest(editRequest)).its('request.body').should('deep.equal', {
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            roles: firstUser.roles,
            username: firstUser.username
        })
        alert.verifySuccess(message)

    })
})
