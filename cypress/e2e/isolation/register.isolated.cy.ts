/// <reference types="cypress" />

import { getRandomEmail, getRandomString } from '../../util/random'

describe('register page is isolation', () => {
    beforeEach(() => {
        cy.visit('http://localhost:8081/register')
    })

    it('should successfully register', () => {
        cy.intercept('POST', '**/users/signup', {
            statusCode: 201,
            body: {
                token: "fakeToken"
            }
        })
  
        cy.getById('firstName').type(getRandomString())
        cy.getById('lastName').type(getRandomString())
        cy.getById('username').type(getRandomString())
        cy.getById('password').type(getRandomString())
        cy.getById('email').type(getRandomEmail())
        cy.get('.btn-primary').click()
  
        cy.get('.alert').should('contain.text', 'Registration successful')
        cy.url().should('contain', '/login')
 
    })

    it('should fail to register', () => {
 
        cy.intercept('POST', '**/users/signup', {
            statusCode: 422,
            body: {
                timestamp: "2022-07-01T06:41:10.395+00:00",
                status: 422,
                error: "Unprocessable Entity",
                message: "Username is already in use",
                path: "/users/signup"
            }
        })
  
        cy.getById('firstName').type(getRandomString())
        cy.getById('lastName').type(getRandomString())
        cy.getById('username').type('admin')
        cy.getById('password').type(getRandomString())
        cy.getById('email').type(getRandomEmail())
        cy.get('.btn-primary').click()
  
        cy.get('.alert').should('contain.text', 'Username is already in use')
        cy.url().should('contain', '/register')
    })
 
    it('should show loading indicator', () => {
        // given
        cy.intercept('POST', '**/users/signup', {
            delay: 2000
        })
        // when
        cy.getById('username').type('wrong')
        cy.getById('password').type('wrong')
        cy.getById('email').type('wrong')
        cy.getById('firstName').type('wrong')
        cy.getById('lastName').type('wrong')
        cy.get('.btn-primary').click()
  
        // then
        cy.get('.btn-primary .spinner-border').should('be.visible')
    })

})
