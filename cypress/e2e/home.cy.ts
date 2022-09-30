/// <reference types="cypress" />

import { getRandomUser } from "../domain/user";
import users from "../fixtures/users.json"

describe('Home page tests in integration', () => {
    const user = getRandomUser();

    beforeEach(() => {
        cy.prepareLocalStorageAndSetCookie(user)
        cy.intercept('GET', '**/users', { fixture: 'users.json' })
        cy.visit('http://localhost:8081');
    });

    it('Should display at least one user', () => {
        cy.get('li').should('have.length', users.length)
        cy.get('li').each(($el, i) => {
            expect($el.text()).to.contain(`${users[i].firstName} ${users[i].lastName}`)
            // cy.wrap($el).contains(`${users[i].firstName} ${users[i].lastName}`).should('be.visible')
        })
    });

})
