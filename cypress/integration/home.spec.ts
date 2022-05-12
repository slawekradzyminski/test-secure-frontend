/// <reference types="cypress" />

import { getRandomUser, User } from '../util/user';

describe('home page', () => {
    let token: string
    let user: User

    beforeEach(() => {
        user = getRandomUser()
        cy.register(user)
        cy.login(user.username, user.password).then(jwtToken => token = jwtToken)
        cy.visit('http://localhost:8081')
    })

    afterEach(() => {
        cy.deleteUser(user.username, token)
    })

    it('should display list of users', () => {
        cy.get('ul li').should('have.length.at.least', 1)
    })

    it('should succesfully logout', () => {
        cy.get('#logout').click();
        cy.get('h2').should('have.text', 'Login').then(() => {
            expect(localStorage.getItem('user')).to.be.null
        })
    })

    it('should succesfully click add more user and check page after it', () => {
        cy.get('#addmore').click();
        cy.url().should('eq', 'http://localhost:8081/add-user')
    })

    it('should delete all users except myself', () => {
        cy.get('ul li').each($row => {
            if (!$row.text().includes(`${user.firstName} ${user.lastName}`)) {
                cy.wrap($row).find('.delete').click()
            }
        })
    })

    it('should not delete user if confirmation cancelled', () => {
        Cypress.on('window:confirm', confirmationText => {
            expect(confirmationText).to.eq('Are you sure you wish to delete this item?')
            return false
        })

        cy.get('ul li').contains(`${user.firstName} ${user.lastName}`).find('.delete').click()
        cy.get('ul li').contains(`${user.firstName} ${user.lastName}`).should('be.visible')
    })
})
