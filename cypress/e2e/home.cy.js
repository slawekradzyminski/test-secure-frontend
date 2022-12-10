/// <reference types="cypress" />

describe('Home page tests', () => {
    beforeEach(() => {
        // 1. Musimy wysłać request logowania do serwera
        // 2. Musimy ustawić odpowiedź w localStorage pod kluczem 'user'
        // 3. Musimy ustawić ciastko 'token' z wartością klucza JWT

        // 1
        cy.request({
            method: 'POST',
            url: 'http://localhost:4001/users/signin',
            body: {
              username: 'admin',
              password: 'admin',
            },
          }).then((resp) => {
            // 2
            localStorage.setItem('user', JSON.stringify(resp.body))
            // 3
            cy.setCookie('token', resp.body.token)
          })

          cy.visit('http://localhost:8081')
    })

    it('should display at least one user', () => {
        cy.get('ul li').should('exist')
    })

    it('should logout', () => {
        cy.get('#logout').click()

        cy.get('h2').should('contain.text', 'Login')
    })

    it('should add more users', () => {
        cy.get('#addmore').click()

        cy.url().should('contain', '/add-user')
    })


})
