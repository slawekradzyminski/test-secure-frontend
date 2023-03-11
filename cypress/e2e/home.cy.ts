/// <reference types="cypress" />

describe('Home page tests', () => {
    beforeEach(() => {
        // 1. Wysyłamy request logowania na /users/signin
        cy.request({
            method: 'POST',
            url: 'http://localhost:4001/users/signin',
            body: {
                username: 'admin',
                password: 'admin'
            }
        }).then((resp) => {
            // 2. Odpowiedź ustawiamy w localStorage
            localStorage.setItem('user', JSON.stringify(resp.body))
            // 3. Token z odpowiedzi ustawiamy jako ciastko token
            cy.setCookie('token', resp.body.token)
        })
        cy.visit('http://localhost:8081')
    })

    it('should display at least one user', () => {
        cy.get('ul li').should('have.length.gt', 0)
    })

    it('should logout', () => {
        cy.get('#logout').click()
        cy.url().should('contain', '/login')
    })

    it('should open add more users page', () => {
        cy.get('#addmore').click()
        cy.url().should('contain', '/add-user')
    })

})
