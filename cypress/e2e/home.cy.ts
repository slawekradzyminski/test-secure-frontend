/// <reference types="cypress" />

let tokenInTest: string

describe('example to-do app', () => {
    beforeEach(() => {
        // const user = getRandomUser()
        // cy.register(user)

        cy.login('admin', 'admin').then(token => {
            tokenInTest = token
            cy.log(token)
            cy.setCookie('token', token)
        })
        cy.visit('')
    })

    it('should display at least one user', () => {
        cy.get('li').should('have.length.at.least', 1)
        cy.log(tokenInTest)
    })

    it('should logout', () => {
        cy.get('#logout').click()
        cy.url().should('contain', 'login')
    })

    it('should add more user', () => {
        cy.get('#addmore').click()
        cy.url().should('contain', 'add-user')
    })

})
