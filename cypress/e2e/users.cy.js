/// <reference types="cypress" />

import { email, password } from "../util/credentials"
import { getRandomStringWithLetters } from "../util/random"

describe('Users tests', () => {
  beforeEach(() => {
    cy.login(email, password)
    cy.visit('http://demo.testarena.pl/administration/users')
  })

  it('should create new user', () => {
    const text = getRandomStringWithLetters(6)
    cy.get('a.button_link[href="http://demo.testarena.pl/administration/add_user"]').click()
    cy.get('#firstname').type(text + 'aa')
    cy.get('#lastname').type(text + 'bb')
    cy.get('#email').type(text + '@test.pl')
    cy.get('#save').click()
    cy.get('#j_info_box').should('contain.text','Użytkownik został dodany.')
    cy.get('#search').type(text + 'aa')
    cy.get('#j_searchButton').click()
    cy.get('tbody tr').first().should('contain.text', text + 'aa')
   
  })
   
})
