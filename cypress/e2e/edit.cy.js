/// <reference types="cypress" />
import { getRandomUser } from '../utils/user';

describe('check if data in form is correct', () => {
    let user;

    beforeEach(() => {
        user = getRandomUser();
        cy.register(user);
        cy.visit('http://localhost:8081');
        cy.get('[name=username]').type(user.username);
        cy.get('[name=password]').type(user.password);
        cy.get('.btn-primary').click();
    });


    it('should be able to edit user', () => {
        cy.get('li').contains(`${user.firstName}`).find('.edit').click();
        cy.get('[name=username]').should('have.value', user.username);
        cy.get('[name=firstName]').should('have.value', user.firstName);
        cy.get('[name=lastName]').should('have.value', user.lastName);
        cy.get('[name=email]').should('have.value', user.email);
        cy.get('[name=roles]').should('have.value', user.roles.join(','));
    });

    it('should succssfully edit user', () => {
        const newUser = getRandomUser()
        cy.get('li').contains(`${user.firstName}`).find('.edit').click()
        cy.get('[name=firstName]').clear().type(newUser.firstName)
        cy.get('[name=lastName]').clear().type(newUser.lastName)
        cy.get('[name=email]').clear().type(newUser.email)
        cy.get('.btn-primary').click()

        cy.get('.alert-success').should('have.text', 'Updating user successful')
    })
});
