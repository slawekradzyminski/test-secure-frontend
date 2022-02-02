/// <reference types="cypress" />

import HomePage from "../pages/HomePage";

const homePage = new HomePage()

describe('Home page', () => {

    let token;

    beforeEach(() => {
      cy.apiLogin('admin', 'admin').then(jwtToken => token = jwtToken)
      cy.visit('/')
    })
  
    it('should send correct request to backend', () => {
        cy.request({
            method: 'GET',
            url: 'http://localhost:4000/users',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then(resp => {
            expect(resp.status).to.eq(200)
        })
    })

    it('should logout', () => {
        homePage.clickLogout()
        cy.url().should('contain', '/login')
    })

    it('should open add more users page', () => {
        homePage.clickAddMore()
        cy.url().should('contain', '/add-user')
    })

    it('users should be displayed', () => {
        homePage.verifyNumberOfUsersDisplayedIsAtLeast(1)
    })

    it('should delete all users except Slawek', () => {
        cy.get('ul li').each($el => {
            if (!$el.text().includes('Radzyminski')) {
                cy.wrap($el).find('.delete').click()
            }
        })
    })

  })
  