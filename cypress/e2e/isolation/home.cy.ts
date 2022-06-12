/// <reference types="cypress" />

import { contains } from 'cypress/types/jquery'
import users from '../../fixtures/users.json'
import { mockSuccesfulDeleteUser, mockUnsuccesfulDeleteUser, succesfulDeleteUser } from '../../mocks/deleUserMocks'
import { mockUsers } from '../../mocks/getAllUsersMocks'
import { getAliasedRequest } from '../../util/alias'

describe('login page', () => {

    beforeEach(() => {
        cy.setUserInLocalStorage()
        mockUsers()
        cy.visit('')
    })

    it('should display all users', () => {
        // then
        cy.get('ul li').should('have.length', users.length)
        cy.get('ul li').each(($user, i) => {
            cy.wrap($user).contains(`${users[i].firstName} ${users[i].lastName}`).should('be.visible')
        })
    })

    it('should delete user', () => {
        //given
        const user = users[1]
        mockSuccesfulDeleteUser(user.username)

        //when
        cy.get('ul li').contains(`${user.firstName} ${user.lastName}`).find('.delete').click()

        //then
        cy.wait(getAliasedRequest(succesfulDeleteUser))
        cy.get('ul li').contains(`${user.firstName} ${user.lastName}`).should('not.exist')
    })

    it.only('should not delete user', () => {
        //given
        const user = users[1]
        mockUnsuccesfulDeleteUser(user.username)

        //when
        cy.get('ul li').contains(`${user.firstName} ${user.lastName}`).find('.delete').click()

        //then
        cy.get('ul li').contains(`${user.firstName} ${user.lastName}`).should('contain.text', 'ERROR: Internal Server Error')
        cy.get('ul li').contains(`${user.firstName} ${user.lastName}`).should('exist')
    })
})
