/// <reference types="cypress" />

describe('Edit page tests', () => {
    beforeEach(() => {
        cy.login('admin', 'admin')
        cy.get('li').contains('Gosia Radzyminska').find('.edit').click()
    })

    it('should correctly autofill data', () => {
        cy.get("[name=firstName]").should('have.value', "Gosia")
        cy.get("[name=lastName]").should('have.value', "Radzyminska")
        cy.get("[name=email]").should('have.value', "client@email.com")
    })

})
