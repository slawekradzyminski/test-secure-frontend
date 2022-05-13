/// <reference types="cypress" />

import { getRandomUser } from '../../util/user';

describe('login page', () => {
    beforeEach(() => {
        cy.visit('http://localhost:8081')
        cy.viewport('iphone-xr')
    })

    it('should successfully login', () => {
        const user = getRandomUser()
        cy.mockSuccessfulLogin(user)
        cy.intercept('GET', '**/users', { fixture: 'users.json' })

        cy.get('[name=username]').type(user.username)
        cy.get('[name=password]').type(user.password)
        cy.get('.btn-primary').click()

        cy.get('h1').should('contain.text', user.firstName)
        cy.wait('@loginRequest').its('request.body').should('deep.equal', {
            username: user.username,
            password: user.password
        })
    })

    it('should fail to login', () => {
        const message = "Invalid username/password supplied"
        cy.mockFailedLogin(message)

        cy.get('[name=username]').type('wrong')
        cy.get('[name=password]').type('wrong')
        cy.get('.btn-primary').click()

        cy.get('.alert')
            .should('contain.text', message)
            .should('have.class', 'alert-danger')
    })

    it('should display loading indicator', () => {
        cy.mockLoginDelay()        

        cy.get('[name=username]').type('wrong')
        cy.get('[name=password]').type('wrong')
        cy.get('.btn-primary').click()

        cy.get('.btn-primary .spinner-border').should('be.visible')
    })


})
