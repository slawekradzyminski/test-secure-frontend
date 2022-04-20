/// <reference types="cypress" />
 
import {
    getRandomString,
    getRandomEmail
 } from "../util/random"
  
 describe('register page', () => {
    beforeEach(() => {
        cy.visit('/register')
    })
  
    it('C12 - should display register indicator', () => {
        // given

        cy.intercept('POST', '**/users/signup', {
            delay: 1000
        })
  
        cy.get('[name=firstName]').type(getRandomString())
        cy.get('[name=lastName]').type(getRandomString())
        cy.get('[name=username]').type(getRandomString())
        cy.get('[name=password]').type(getRandomString())
        cy.get('[name=email]').type(getRandomString())
  
        // when
        cy.get('.btn-primary').click()
  
        // then
        cy.get('.btn-primary .spinner-border').should('be.visible')
    })
  
    it('should fail to register', () => {
        // given

        const message = 'must be a well-formed email address'
  
        cy.intercept('POST', '**/users/signup', {
            statusCode: 400,
            body: {
                status: 400,
                message: message,
                path: '/users/signup'
            }
        })
        cy.get('[name=firstName]').type(getRandomString())
        cy.get('[name=lastName]').type(getRandomString())
        cy.get('[name=username]').type(getRandomString())
        cy.get('[name=password]').type(getRandomString())
        cy.get('[name=email]').type(getRandomString())

        // when
        cy.get('.btn-primary').click()
  
        // then
        cy.get('.alert').should('have.text', message)
    })
  
  
    it('should successfully register', () => {
        // given
        const firstName = getRandomString()
        const lastName = getRandomString()
        const username = getRandomString()
        const password = getRandomString()
        const email = getRandomEmail()
  
        cy.intercept('POST', '**/users/signup', {
            statusCode: 200,
            body: {
                email: email,
                firstName: firstName,
                lastName: lastName,
                password: password,
                roles: ['ROLE_CLIENT'],
                username: username
            }
        }).as('registerRequest')
  
        cy.get('[name=firstName]').type(firstName)
        cy.get('[name=lastName]').type(lastName)
        cy.get('[name=username]').type(username)
        cy.get('[name=password]').type(password)
        cy.get('[name=email]').type(email)

        // when
        cy.get('.btn-primary').click()
  
        // then
        cy.get('.alert').should('be.visible')
        cy.wait('@registerRequest').its('request.body').should('deep.equal', {
            email,
            firstName,
            lastName,
            password,
            roles: ['ROLE_CLIENT'],
            username,
        })
    })
 })
 