/// <reference types="cypress" />
 
import { getRandomEmail, getRandomString } from "../util/random"
import { getRandomUser, User } from "../util/user"
 
describe('should assert edit uder', () => {
    let token: string
    let user: User
 
    let newFirstName = getRandomString()
    let newLastName = getRandomString()
    let newEmail = getRandomEmail()
 
    beforeEach(() => {
        user = getRandomUser()
        cy.register(user)
        cy.login(user.username, user.password).then(jwtToken => token = jwtToken)
        cy.visit('http://localhost:8081')
    })
 
     afterEach(() => {
         cy.delete(user.username, token)
     })
 
    it('should open edit user', () => {
        cy.get('ul li').contains(user.firstName).find('.edit').click()
 
        cy.get('h2').should('have.text', 'Edit user')
        cy.get('[name=firstName]').should('have.value', user.firstName)
        cy.get('[name=lastName]').should('have.value', user.lastName)
        cy.get('[name=email]').should('have.value', user.email)
        cy.get('[name=username]').should('have.value', user.username)
    })
 
    it('should edit user', () => {
        cy.get('ul li').contains(user.firstName).find('.edit').click()
 
        cy.get('h2').should('have.text', 'Edit user')
        cy.get('[name=firstName]').should('have.value', user.firstName)
        cy.get('[name=lastName]').should('have.value', user.lastName)
        cy.get('[name=email]').should('have.value', user.email)
        cy.get('[name=username]').should('have.value', user.username)
        cy.get('[name=firstName]').clear().type(newFirstName)
        cy.get('[name=lastName]').clear().type(newLastName)
        cy.get('[name=email]').clear().type(newEmail)
        cy.get('.btn-primary').click()
        cy.get('ul li').contains(`${newFirstName} ${newLastName}`).should('exist')
        cy.get('ul li').contains(`${user.firstName} ${user.lastName}`).should('not.exist')
    })
 
   
})
