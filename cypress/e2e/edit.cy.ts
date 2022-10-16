/// <reference types="cypress" />

import { getRandomUser, User } from "../domain/user"
import { editPage } from "../pages/editPage"

describe('Edit page tests', () => {
    let token: string
    let user: User

    beforeEach(() => {
        user = getRandomUser()
        cy.register(user)
        cy.login(user.username, user.password).then((jwtToken) => {
            cy.setCookie('token', jwtToken)
            token = jwtToken
        })
        cy.visit('')
        cy.get('li').contains(`${user.firstName} ${user.lastName}`).find('.edit').click()
    })

    afterEach(() => {
        cy.deleteUser(user.username, token)
    })

    it('should correctly autofill user data', () => {
      editPage.checkDataInEditFields(user)
    })

    it('should correctly edit an user', () => {
        const newUser = getRandomUser()
        editPage.fillAvailableInputs(newUser)
        
        cy.get('li').contains(`${user.firstName} ${user.lastName}`).should('not.exist')
        cy.get('li').contains(`${newUser.firstName} ${newUser.lastName}`).should('be.visible')

        cy.request({
            method: 'GET',
            url: `${Cypress.env('backendUrl')}/users/${user.username}`,
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((resp) => {
            expect(resp.status).to.eq(200)
            expect(resp.body.firstName).to.eq(newUser.firstName)
            expect(resp.body.lastName).to.eq(newUser.lastName)
            expect(resp.body.email).to.eq(newUser.email)
        })
    })

})
