/// <reference types="cypress" />

import { editScreen } from "../pages/editScreen";
import { getRandomUser } from "../util/user";

describe('Edit page', () => {
    let initialUser
    let token

    beforeEach(() => {
        initialUser = getRandomUser()
        cy.register(initialUser)
        cy.login(initialUser.username, initialUser.password)
        cy.visit('http://localhost:8081')
        cy.get('li')
            .contains(`${initialUser.firstName} ${initialUser.lastName}`)
            .find('.edit')
            .click()
        cy.getCookie('token').then((cookie) => token = cookie.value)
    });

    afterEach(() => {
        cy.deleteUser(initialUser.username, token)
    })

    it('should check autofill inputs', () => {
        // then
        editScreen.verifyInputAreFilledWithData(initialUser)
    });

    it('should successfully edit', () => {
        // given
        const newUser = getRandomUser()

        // when
        editScreen.editAvailableFieldsAndSubmit(newUser)

        // then
        cy.get('.alert').should('have.text', 'Updating user successful')
        cy.get('li').contains(newUser.firstName).should('be.visible')
        cy.get('li').contains(initialUser.firstName).should('not.exist')

        cy.request({
            url: `http://localhost:4001/users/${initialUser.username}`,
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((resp) => {
            expect(resp.body.email).to.eq(newUser.email)
        })

    })

});
