/// <reference types="cypress" />

import HomePage from "../pages/HomePage"

describe('Home page', () => {
  beforeEach(() => {
    cy.request({
      method: 'POST',
      url: 'http://localhost:4001/users/signin',
      body: {
        username: 'admin',
        password: 'admin',
      },
    }).then((req) => {
      localStorage.setItem('user', JSON.stringify(req.body))
      cy.setCookie('token', req.body.token)
    })
    cy.visit('http://localhost:8081')
  })

  it('should displays at least one user', () => {
    HomePage.getUserRow().should('have.length.at.least', 1)
  })

  it('should logout', () => {
    HomePage.getLogoutLink().click()
    cy.url().should('contain', '/login')
  })

  it('should open add user page', () => {
    HomePage.getAddMoreLink().click()
    cy.url().should('contain', '/add-user')
  })

})
