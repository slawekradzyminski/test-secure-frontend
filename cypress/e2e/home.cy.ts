/// <reference types="cypress" />

import { User } from "../domain/user"
import { getRandomUser } from "../generator/userGenerator"

let tokenInTest: string
let user: User

describe('example to-do app', () => {
    beforeEach(() => {
        user = getRandomUser()
        cy.register(user)
        cy.login(user.username, user.password).then(token => {
            tokenInTest = token
            cy.log(token)
            cy.setCookie('token', token)
        })
        cy.visit('')
    })

    afterEach('cleanup user', () => {
        cy.deleteUser(user.username, tokenInTest)
    })

    it('should display correct data', () => {
        cy.get('h1').should('contain.text', user.firstName)
        cy.get('li').should('have.length.at.least', 1)
        cy.log(tokenInTest)
    })

    it('should logout', () => {
        cy.get('#logout').click()
        cy.url().should('contain', 'login')
    })

    it('should add more user', () => {
        cy.get('#addmore').click()
        cy.url().should('contain', 'add-user')
    })

    it('should display edit, delete and email link for each user', () => {
        cy.get('li').each(($row) => {
            // The implementation above uses Cypress API but is slower
            // cy.wrap($row) is very slow even for dozens of elements
            // cy.wrap($row).find('.edit').should('be.visible')
            expect($row.find('.edit')).to.be.visible;
            expect($row.find('.delete')).to.be.visible;
            expect($row.find('.email')).to.be.visible;
        });
    });

})
