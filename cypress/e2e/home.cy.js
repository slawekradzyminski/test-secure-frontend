/// <reference types="cypress" />

describe('Home page tests', () => {
    beforeEach(() => {
        cy.request({
            method: 'POST',
            url: 'http://localhost:4001/users/signin',
            body: {
                username: 'admin',
                password: 'admin'
            }
        }).then((resp) => {
            localStorage.setItem('user', JSON.stringify(resp.body))
            cy.setCookie('token', resp.body.token)
        })
        cy.visit('http://localhost:8081')
    })

    it('should display at least one user', () => {
        cy.get('li').should('have.length.at.least', 1)
    })

    it('should logout', () => {
        cy.get('#logout').click()
        cy.url().should('contain', '/login')
    })

    it('should open add more users', () => {
        cy.get('#addmore').click()
        cy.url().should('contain', 'add-user')
    })


})
