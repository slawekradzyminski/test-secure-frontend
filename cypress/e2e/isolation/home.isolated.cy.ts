/// <reference types="cypress" />
import users from '../../fixtures/users.json'

describe('Home page tests', () => {

    beforeEach(() => {
        cy.intercept('GET', '**/users', { fixture: 'users.json' })
        cy.visitHomePageAsLoggedInUser()
    })

    it('should display all users', () => {
        cy.get('ul li').should('have.length', users.length)

        cy.get('ul li').each((row, i) => {
            expect(row.text()).to.contain(`${users[i].firstName} ${users[i].lastName}`) // much faster
            // cy.wrap(row).should('contain.text', `${users[i].firstName} ${users[i].lastName}` ) // painfully slow
        })
    })
})
