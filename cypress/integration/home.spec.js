/// <reference types="cypress" />

describe('home page', () => {
    beforeEach(() => {
        cy.request({
            method: 'POST',
            url: 'http://localhost:4001/users/signin',
            body: {
                username: 'admin',
                password: 'admin'
            }
        }).then(resp => {
            expect(resp.status).to.eq(200)
            localStorage.setItem('user', JSON.stringify(resp.body))
        })

        cy.visit('http://localhost:8081')
    })

    it('should display list of users', () => {
        cy.get('ul li').should('have.length.at.least', 1)
    })
})
