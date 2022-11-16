/// <reference types="cypress" />

import { addUserPage } from "../pages/addUserPage"
import { email, password } from "../util/credentials"
import { getRandomStringWithLetters } from "../util/random"

describe('Users tests', () => {
  beforeEach(() => {
    cy.login(email, password)
    cy.visit('http://demo.testarena.pl/administration/users')
    cy.get('a.button_link[href="http://demo.testarena.pl/administration/add_user"]').click()
  })

  it('should create new user', () => {
    const text = getRandomStringWithLetters(6)
    addUserPage.addUser(text)
    cy.get('#j_info_box').should('contain.text','Użytkownik został dodany.')
    cy.get('#search').type(text + 'aa')
    cy.get('#j_searchButton').click()
    cy.get('tbody tr').first().should('contain.text', text + 'aa')
   
  })

  it.only('should cancel user creatio', () => {
    addUserPage.clickCancel()
  })
   
})
