import { getRandomUser, User } from "../domain/user"
import { getRandomString } from "../util/random"
 
describe('Email tests', () => {
   let token: string
   let user: User
 
   beforeEach(() => {
       user = getRandomUser()
       cy.register(user)
       cy.login(user.username, user.password).then((returnedToken) => {
           cy.setCookie('token', returnedToken)
           token = returnedToken
       })
       cy.visit('')
       cy.get('li').contains(`${user.firstName} ${user.lastName}`).find('.email').click()
   })
 
   afterEach(() => {
       cy.deleteUser(user.username, token)
   })
   it('should successfully send mail', () => {
       cy.get('[name=subject]').type(getRandomString())
       cy.get('[name=message]').type(getRandomString())
       cy.get('.btn-primary').click()
 
       cy.get('.alert-success').should('have.text', 'Email was scheduled to be send')
       // Odpytanie serwera SMTP ze email dotarł i sprawdzenie ze ma poprawny temat/treść
   })
 
})
