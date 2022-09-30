/// <reference types="cypress" />

import { getRandomUser, User } from "../../domain/user";

describe('Home page tests in integration', () => {
    let user: User;

    beforeEach(() => {
        user = getRandomUser();
        cy.login('admin', 'admin')
        cy.visit('http://localhost:8081');
    });

    it('Should display at least one user', () => {
        cy.get('li').should('have.length.at.least', 1)
    });

})
