 
/// <reference types="cypress" />

import { Roles } from "../util/roles"
import users from "../fixtures/users.json"
 
describe('hompe page', () => {
    beforeEach(() => {
        const userLocalStorage = {
           roles: [Roles.ROLE_ADMIN]
        }
        localStorage.setItem('user', JSON.stringify(userLocalStorage))
        cy.intercept('GET', '**/users', { fixture: 'users.json' })
        cy.visit('http://localhost:8081')
    })
  
    it('should display all users', () => {
        cy.get('ul li').should('have.length', users.length)
        cy.get('ul li').each(($el, index) => {
            cy.wrap($el).should('contain.text', `${users[index].firstName} ${users[index].lastName}`)
        })
    })
  
 })
 