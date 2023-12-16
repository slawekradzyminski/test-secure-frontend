/// <reference types="cypress" />

import { User } from "../domain/user"
import { getRandomUser } from "../generator/userGenerator"

let tokenInTest: string
let user: User

describe('example to-do app', () => {
    beforeEach(() => {
        user = getRandomUser()
        cy.register(user)
        cy.login(user.username, user.password).then(token => {
            tokenInTest = token
            cy.log(token)
            cy.setCookie('token', token)
        })
        cy.visit('')
        cy.get('li').contains(`${user.firstName} ${user.lastName}`).find('.edit').click()
    })

    it('should successfully edit user data', () => {
        // given
        const newUser = getRandomUser()
        
        // when
        cy.get('[name=firstName]').clear().type(newUser.firstName)
        cy.get('[name=lastName]').clear().type(newUser.lastName)
        cy.get('[name=email]').clear().type(newUser.email)
        cy.get('.btn-primary').click()

        // then
        cy.get('.alert-success').should('have.text', 'Updating user successful')
        cy.get('li').contains(`${user.firstName} ${user.lastName}`).should('not.exist')
        cy.get('li').contains(`${newUser.firstName} ${newUser.lastName}`).should('be.visible')
        cy.request({
            method: 'GET',
            url: `http://localhost:4001/users/${user.username}`,
            headers: {
                Authorization: `Bearer ${tokenInTest}`
            }
        }).then((resp): void => {
            expect(resp.body.username).to.eq(user.username)
            expect(resp.body.roles).to.have.same.members(user.roles)
            expect(resp.body.email).to.eq(newUser.email)
            expect(resp.body.firstName).to.eq(newUser.firstName)
            expect(resp.body.lastName).to.eq(newUser.lastName)
        })
    })

})
