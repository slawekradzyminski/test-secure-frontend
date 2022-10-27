/// <reference types="cypress" />

describe('login page tests', () => {
    beforeEach(() => {
        cy.visit('http://localhost:8081')
    })

    it('should successfully login', () => {
        // Wpisać admin w input z usernamem
        cy.get("[name='username']").type('admin')
        // Wpisać admin w input z hasłem
        cy.get("[name='password']").type('admin')
        // kliknąć login
        cy.get('button.btn-primary').click()

        cy.get('h1').should('contain.text', 'Slawomir')

    })

})
