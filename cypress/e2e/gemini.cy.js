/// <reference types="cypress" />

describe('Gemini', () => {
    beforeEach(() => {
        cy.setCookie('BASE_POLICY', '1666967850870')
        cy.visit('https://www.gemini.pl')
    })

    it('add to busket', () => {
        cy.get('[data-url="/koszyk/dodaj/9066981"]').click()
        cy.get('.cart-link__quantity').should('have.text','1')
    })


})
