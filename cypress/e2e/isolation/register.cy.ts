/// <reference types="cypress" />


import { mockFailedRegister, mockRegister, registerRequestAlias } from "../../mocks/registerMocks"
import RegisterPage from "../../pages/RegisterPage"
import { getAliasedRequest } from "../../util/alias"
import { getRandomString, getRandomEmail } from "../../util/random"
import { Roles } from "../../util/roles"
import { getRandomUser } from "../../util/user"

const registerPage = new RegisterPage()

describe('register page', () => {
    beforeEach(() => {
      cy.visit('http://localhost:8081/register')
    })
  
    it('should successfully register', () => {
        //given
        const user = getRandomUser()
        mockRegister()

        //when
        registerPage.attemptRegister(user)

        //then
        cy.get('.alert').should('contain.text', 'Registration successful')
        cy.wait(getAliasedRequest(registerRequestAlias)).its('request.body').should('deep.equal', {
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            password: user.password,
            roles: [Roles.ROLE_CLIENT],
            username: user.username
        })
    })
 
    it('should not successfully register', () => {
        //given
        mockFailedRegister()        
        const user = getRandomUser()

        //when
        registerPage.attemptRegister(user)
        
        //then
        cy.get('.alert').should('contain.text', 'Username is already in use')
    })
 
})
  