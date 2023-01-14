/// <reference types="cypress" />

import { getRandomUser } from "../util/user"

describe('Home page', () => {
    let user

    beforeEach(() => {
        user = getRandomUser()
        cy.register(user)
        cy.login(user.username, user.password)
        cy.visit('http://localhost:8081')
    })

    it('should display at least one user', () => {
        cy.get('li').should('have.length.gte', 1)
    })

    it.only('should display at least one user', () => {
        cy.get('li').contains('Slawomir').find('.delete')
    })

    it('should log out', () => {
        cy.get('#logout').click();
        cy.url().should('contain', '/login');
    });

    it('should open add more users page', () => {
        cy.get('#addmore').click();
        cy.url().should('contain', '/add-user');
    });

})
