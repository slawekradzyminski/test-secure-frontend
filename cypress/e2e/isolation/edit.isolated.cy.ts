/// <reference types="cypress" />

import { getRandomUser } from "../../generators/userGenerator"
import users from "../../fixtures/users.json"
import { editMocks } from "../../mocks/editUserMocks"
import Alert from "../../components/Alert"
import { GetUserResponse } from "../../domain/requests/getUserTypes"

describe('Home page tests in isolation', () => {
    let editedUser: GetUserResponse

    beforeEach(() => {
        cy.isolatedLogin()
        cy.visit('http://localhost:8081')
        editedUser = users[0] as GetUserResponse
        cy.get('li').contains(`${editedUser.firstName} ${editedUser.lastName}`).find('.edit').click()
    })

    it('should successfully edit an user', () => {
        // given
        const newUser = getRandomUser()
        editMocks.mockSuccessfulEdit(editedUser.username)

        // when
        cy.get('[name=firstName]').clear().type(newUser.firstName)
        cy.get('[name=lastName]').clear().type(newUser.lastName)
        cy.get('[name=email]').clear().type(newUser.email)
        cy.get('.btn-primary').click()

        // then
        Alert.getAlertSuccess().should('have.text', 'Updating user successful')
        cy.get('@editRequest').its('request.body').should('deep.equal', {
            firstName: newUser.firstName,
            lastName: newUser.lastName,
            email: newUser.email,
            username: editedUser.username,
            roles: editedUser.roles
        })
    })

})
