/// <reference types="cypress" />

import { mockUsers } from "../../mocks/getAllUsersMocks"
import { getRandomEmail, getRandomString } from "../../util/random"
import users from '../../fixtures/users.json'
import { Roles } from "../../util/roles"
import EditPage from "../../pages/EditPage"
import { mockSuccesfulEditUser, succesfulEditUser } from "../../mocks/editMocks"
import { getAliasedRequest } from "../../util/alias"

const editPage = new EditPage()

describe('should assert edit uder', () => {
    let newFirstName = getRandomString()
    let newLastName = getRandomString()
    let newEmail = getRandomEmail()

    beforeEach(() => {
        cy.setUserInLocalStorage()
        mockUsers()
        cy.visit('')
    })

    it('should edit user', () => {
        //given
        const user = users[1]
        cy.get('ul li').contains(user.firstName).find('.edit').click()
        mockSuccesfulEditUser(user.username)

        //when 
        editPage.attemptEdit(newFirstName, newLastName, newEmail)

        //then
        cy.wait(getAliasedRequest(succesfulEditUser)).its('request.body').should('deep.equal', {
            firstName: newFirstName,
            lastName: newLastName,
            email: newEmail,
            username: user.username,
            roles: [Roles.ROLE_CLIENT]
        })
    })
})
