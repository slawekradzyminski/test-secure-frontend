/// <reference types="cypress" />

import { getUser } from "../util/userProvider"

describe('Home page', () => {
    let jwtToken: string
    const user = getUser()

    before(() => {
        cy.register(user)
    })

    beforeEach(() => {
        cy.login(user.username, user.password).then(returnedToken => jwtToken = returnedToken)
        cy.visit('')
    })

    after(() => {
        cy.deleteUser(user.username, jwtToken)
    })

    it('should display at least one user', () => {
        cy.get('ul li').should('have.length.at.least', 1)
    })

    it('should logout', () => {
        cy.get('#logout').click()
        cy.url().should('contain', '/login')
    })

    it('should redirect to add-user page', () => {
        cy.get('#addmore').click()
        cy.url().should('contain', '/add-user')
    })

    it('should edit an user', () => {
        cy.get('ul li').contains(`${user.firstName} ${user.lastName}`).find('.edit').click()
        cy.get('[name=firstName]').should('have.value', user.firstName)
        cy.get('[name=lastName]').should('have.value', user.lastName)
        cy.get('[name=username]').should('be.disabled')
        cy.get('[name=roles]').should('be.disabled')
    })

    it('should be able to make backend call', () => {
        cy.request({
            method: 'GET',
            url: 'http://localhost:4000/users',
            headers: {
                'Authorization': `Bearer ${jwtToken}`
            }
        }).then(resp => {
            expect(resp.status).to.eq(200)
        })
    })

    it(`should delete all users except ${user.firstName} ${user.lastName}`, () => {
        cy.get('ul li').each($row => {
            if (!$row.text().includes(`${user.firstName} ${user.lastName}`)) {
                cy.wrap($row).find('.delete').click()
            }
        })
    })

    it.only('should not delete an user if delete cancel', () => {
        cy.on('window:confirm', (confirmationText) => {
            expect(confirmationText).to.eq('Are you sure you wish to delete this item?')
            return false
        })
        cy.get('ul li').contains(`${user.firstName} ${user.lastName}`).find('.delete').click()
        cy.get('ul li').contains(`${user.firstName} ${user.lastName}`).should('be.visible')
    })

})
