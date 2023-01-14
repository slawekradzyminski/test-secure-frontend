/// <reference types="cypress" />
 
import { getRandomEmail, getRandomString } from "../util/random";
import { getRandomUser } from "../util/user";
 
describe('Edit page', () => {
    let user;
    let token
 
    beforeEach(() => {
        user = getRandomUser();
        cy.register(user);
        cy.login(user.username, user.password);
        cy.visit('http://localhost:8081');
        cy.get('li')
            .contains(`${user.firstName} ${user.lastName}`)
            .find('.edit')
            .click();
        cy.url().should('contain', '/edit-user')
        cy.getCookie('token').then((cookie) => token = cookie.value)
    });
 
    it('should check autofill inputs', () => {
        cy.get('[name="firstName"]').should('have.value', user.firstName)
        cy.get('[name="lastName"]').should('have.value', user.lastName)
        cy.get('[name="email"]').should('have.value', user.email)
        cy.get('[name="username"]').should('have.value', user.username)
        cy.get('[name="roles"]').should('have.value', user.roles.join(','))
    });

    it.only('should successfully edit', () => {
        const newEmail = getRandomEmail()
        const newFirstName = getRandomString()

        cy.get('[name="firstName"]').clear().type(newFirstName)
        cy.get('[name="lastName"]').clear().type(getRandomString())
        cy.get('[name="email"]').clear().type(newEmail)
        cy.get('.btn-primary').click()

        // frontendowe sprawdzenia
        cy.get('.alert').should('have.text', 'Updating user successful')
        cy.get('li').contains(newFirstName).should('be.visible')
        cy.get('li').contains(user.firstName).should('not.exist')

        // backendowe sprawdzenie
        cy.request({
            url: `http://localhost:4001/users/${user.username}`,
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((resp) => {
            expect(resp.body.email).to.eq(newEmail)
        })

      })
    
    
});
