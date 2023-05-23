/// <reference types="cypress" />

import { getUserApi } from "../api/getUser"
import { homePage } from "../pages/homePage"
import { User, getUser } from "../utils/user"

describe('Home page tests', () => {
    let user: User
    let token: string | undefined

    beforeEach(() => {
        user = getUser()
        cy.register(user)
        cy.login(user.username, user.password)
        cy.visit('http://localhost:8081')
        cy.getCookie('token').then(cookie => {
            token = cookie?.value
        })
    })

    afterEach(() => {
        cy.deleteUser(user.username, token)
    })

    it('should display at least one user', () => {
        // then
        homePage.selectors.userRow().should('have.length.at.least', 1)
    })

    it('should logout', () => {
        // when
        homePage.clickLogout()

        // then
        cy.url().should('contain', '/login')
    })

    it('should successfully delete an user', () => {
        // given
        const userToDelete = getUser()
        cy.register(userToDelete)
        cy.reload()

        // when
        homePage.selectors.userSpecificUserRow(userToDelete).find('.delete').click()

        // then
        homePage.selectors.userSpecificUserRow(userToDelete).should('not.exist')
        getUserApi.verifyUserNotFound(userToDelete.username, token)
    })

    it('should open add user page', () => {
        // when
        homePage.clickAddMore()
        
        // then
        cy.url().should('contain', '/add-user')
    })
})
