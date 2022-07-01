/// <reference types="cypress" />

import { mockSuccesfulRegister, mockUserAlreadyExists } from '../../mocks/registerMocks'
import RegisterPage from '../../pages/RegisterPage'
import { getRandomEmail, getRandomString } from '../../util/random'
import { Roles } from '../../util/roles'
import { getRandomUser } from '../../util/user'

const registerPage = new RegisterPage()

describe('register page is isolation', () => {
    beforeEach(() => {
        cy.visit('http://localhost:8081/register')
    })

    it('should successfully register', () => {
        // given
        const user = getRandomUser()
        mockSuccesfulRegister()

        // when
        registerPage.attemptRegisterUser(user)
  
        // then
        cy.get('.alert').should('contain.text', 'Registration successful')
        cy.url().should('contain', '/login')
        cy.wait('@registerRequest').its('request.body').should('deep.equal', {
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            password: user.password,
            roles: [Roles.ROLE_CLIENT]
        })
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
