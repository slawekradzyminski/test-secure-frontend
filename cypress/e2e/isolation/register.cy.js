/// <reference types="cypress" />

describe('Register page', () => {
    beforeEach(() => {
        cy.visit('http://localhost:8081/register')
    })

    it('should successfully register', () => {
        // given
        cy.intercept('POST', '**/signup', {
            statusCode: 201
        })

        // when
        cy.get('[name=username]').type('admin')
        cy.get('[name=password]').type('admin')
        cy.get('[name=firstName]').type('admin')
        cy.get('[name=lastName]').type('admin')
        cy.get('[name=email]').type('admin@cantest.it')
        cy.get('.btn-primary').click()

        // then
        cy.url().should('contain', '/login')
    })
})
