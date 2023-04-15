/// <reference types="cypress" />

describe('Home page', () => {
    beforeEach(() => {
        cy.visit('http://localhost:8081')
        cy.intercept('POST', '**/signin', {
            statusCode: 200,
            body: {
                username: "admin",
                roles: [
                    "ROLE_ADMIN",
                    "ROLE_CLIENT"
                ],
                firstName: "Slawomir",
                lastName: "Radzyminski",
                token: "fakeToken",
                email: "admin@email.com"
            }
        })
        cy.intercept('GET', '**/users', { fixture: 'users.json' })
    })

    it('should successfully login', () => {
        cy.get('[name=username]').type('admin')
        cy.get('[name=password]').type('admin')
        cy.get('.btn-primary').click()
        cy.get('h2,h1').should('contain.text', 'Slawomir')
    })

})
