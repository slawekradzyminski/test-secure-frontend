/// <reference types="cypress" />
 
import { mailScreen } from '../pages/mailScreen';
import { getRandomString } from '../util/random';
import { getRandomUser } from '../util/user';
 
describe('Email page', () => {
    let user;
    let token;
 
    beforeEach(() => {
        user = getRandomUser();
        cy.register(user);
        cy.login(user.username, user.password);
        cy.visit('http://localhost:8081');
        cy.getCookie('token').then((cookie) => (token = cookie.value));
        cy.get('li')
            .contains(`${user.firstName} ${user.lastName}`)
            .find('.email')
            .click()
    });
 
    afterEach(() => {
        cy.deleteUser(user.username, token)
    });
 
    it('should autofill and email', () => {
        // then
        mailScreen.selectors.emailInput().should('have.value', user.email)
    })

    it('should send an email', () => {
        // given
        const subject = getRandomString()
        const message = getRandomString()
 
        // when
        mailScreen.sendEmail(user.email, subject, message)
 
        // then
        cy.get('.alert').should('have.text', 'Email was scheduled to be send')
    })
})
