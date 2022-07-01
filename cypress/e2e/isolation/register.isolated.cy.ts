/// <reference types="cypress" />

import { mockSuccesfulRegister, mockUserAlreadyExists } from '../../mocks/registerMocks'
import RegisterPage from '../../pages/RegisterPage'
import { getRandomEmail, getRandomString } from '../../util/random'

const registerPage = new RegisterPage()

describe('register page is isolation', () => {
    beforeEach(() => {
        cy.visit('http://localhost:8081/register')
    })

    it('should successfully register', () => {
        // given
        mockSuccesfulRegister()
  
        // when
        registerPage.attemptRegister(getRandomString())
  
        // then
        cy.get('.alert').should('contain.text', 'Registration successful')
        cy.url().should('contain', '/login')
 
    })

    it('should fail to register', () => {
        // given
        mockUserAlreadyExists()
        
        // when
        registerPage.attemptRegister('admin')
  
        // then
        cy.get('.alert').should('contain.text', 'Username is already in use')
        cy.url().should('contain', '/register')
    })
 
    it('should show loading indicator', () => {
        // given
        cy.intercept('POST', '**/users/signup', {
            delay: 2000
        })
        // when
        registerPage.attemptRegister(getRandomString())

        // then
        cy.get('.btn-primary .spinner-border').should('be.visible')
    })

})
