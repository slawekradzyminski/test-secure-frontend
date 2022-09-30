/// <reference types="cypress" />

import { getRandomUser, User } from "../../domain/user";

describe('Home page tests in integration', () => {
    let user: User;
    let token: string;

    beforeEach(() => {
        user = getRandomUser();
        cy.register(user);
        cy.login('admin', 'admin').then(returnedToken => {
            cy.setCookie('token', returnedToken)
            token = returnedToken
        });
        cy.visit('http://localhost:8081');
    });

    afterEach(() => {
        cy.deleteUser(user.username, token)
    })

    it('Should display at least one user', () => {
        cy.get('li').should('have.length.at.least', 1)
    });

})
