/// <reference types="cypress" />

import { generateUser } from "../utils/user"

describe('Edit page', () => {

    let user

    beforeEach(() => {
        user = generateUser()
        cy.registerViaAPI(user)
        cy.loginViaAPI(user)  
        cy.visit('http://localhost:8081')
        cy.get('li').contains(`${user.firstName} ${user.lastName}`).find('.edit').click()
    })

    it('should autofill edit profile', () => {
        cy.get("[name='firstName']").should('have.value', user.firstName);
        cy.get("[name='lastName']").should('have.value', user.lastName);
        cy.get("[name='username']").should('have.value', user.username);
        cy.get("[name='email']").should('have.value', user.email);
        cy.get("[name='roles']").should('have.value', user.roles.join())
    })

    it('should correctly edit an user', () => {
        
    })

})
