/// <reference types="cypress" />

describe('Home page', () => {
    let jwtToken: string

    beforeEach(() => {
        cy.login('admin', 'admin').then(returnedToken => jwtToken = returnedToken)
        cy.visit('')
    })

    it('should display at least one user', () => {
        cy.get('ul li').should('have.length.at.least', 1)
    })

    it('should logout', () => {
        cy.get('#logout').click()
        cy.url().should('contain', '/login')
    })

    it('should redirect to add-user page', () => {
        cy.get('#addmore').click()
        cy.url().should('contain', '/add-user')
    })

    it('should edit an user', () => {
        cy.get('ul li').contains('Gosia Radzyminska').find('.edit').click()
        cy.get('[name=firstName]').should('have.value', 'Gosia')
        cy.get('[name=lastName]').should('have.value', 'Radzyminska')
        cy.get('[name=username]').should('be.disabled')
        cy.get('[name=roles]').should('be.disabled')
    })

    it('should be able to make backend call', () => {
        cy.request({
            method: 'GET',
            url: 'http://localhost:4000/users',
            headers: {
                'Authorization': `Bearer ${jwtToken}`
            }
        }).then(resp => {
            expect(resp.status).to.eq(200)
        })
    })

})
