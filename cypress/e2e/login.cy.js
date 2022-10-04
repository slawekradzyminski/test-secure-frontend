/// <reference types="cypress" />

describe('Login page tests', () => {
    beforeEach(() => {
        cy.visit('http://localhost:8081')
    })

    it('should successfully login', () => {
        cy.get('form input[name="username"]').type('admin');
        cy.get('form input[name="password"]').type('admin');
        cy.get('.btn-primary').click();

        cy.get('h1').should('contain.text', 'Slawomir')
    })

})
