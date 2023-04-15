/// <reference types="cypress" />

describe('Home page', () => {
    beforeEach(() => {
        cy.visit('http://localhost:8081')
    })

    it('should successfully login', () => {
        // given
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

        // when
        cy.get('[name=username]').type('admin')
        cy.get('[name=password]').type('admin')
        cy.get('.btn-primary').click()

        // then
        cy.get('h2,h1').should('contain.text', 'Slawomir')
    })

    it('should fail to login', () => {
        // given
        const message = 'Invalid username/password supplied'
        cy.intercept('POST', '**/signin', {
            statusCode: 422,
            body: {
                error: 'Unprocessable Entity',
                message: message,
            }
        })

        // when
        cy.get('[name=username]').type('admin')
        cy.get('[name=password]').type('admin')
        cy.get('.btn-primary').click()

        // then
        cy.get('.alert').should('have.text', message)
    })

})
