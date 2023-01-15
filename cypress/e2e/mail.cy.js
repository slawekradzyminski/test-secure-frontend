/// <reference types="cypress" />
 
import { getRandomString } from "../util/random"
import { getRandomUser } from "../util/user"
 
describe('Email page tests', () => {
   let user
   let token
 
   beforeEach(() => {
       user = getRandomUser()
       cy.register(user)
       cy.login(user.username, user.password)
       cy.visit('http://localhost:8081')
       cy.getCookie('token').then((cookie) => token = cookie.value)
       cy.get('li').contains(`${user.firstName} ${user.lastName}`).find('.email').click()
   })
 
   afterEach(() => {
       cy.deleteUser(user.username, token)
   })
 
   it('send email', () => {
       const subject = getRandomString()
       const message = getRandomString()
       cy.get('[name=subject]').type(subject)
       cy.get('[name=message]').type(message)
       cy.get('.btn-primary').click()
       cy.get('.alert').should('have.text', "Email was scheduled to be send")
   })
})
