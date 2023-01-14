/// <reference types="cypress" />
 
import { getRandomUser } from "../util/user";
 
describe('Edit page', () => {
    let user;
 
    beforeEach(() => {
        user = getRandomUser();
        cy.register(user);
        cy.login(user.username, user.password);
        cy.visit('http://localhost:8081');
        cy.get('li')
            .contains(`${user.firstName} ${user.lastName}`)
            .find('.edit')
            .click();
        cy.url().should('contain', '/edit-user');
    });
 
    it('should check autofill inputs', () => {
        cy.get('[name="firstName"]').should('have.value', user.firstName);
        cy.get('[name="lastName"]').should('have.value', user.lastName);
        cy.get('[name="email"]').should('have.value', user.email);
        cy.get('[name="username"]').should('have.value', user.username);
        cy.get('[name="roles"]').should('have.value', user.roles.join(','));
    });
});
