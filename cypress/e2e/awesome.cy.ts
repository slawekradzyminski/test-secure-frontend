/// <reference types="cypress" />

describe('Awesome tests', () => {
    beforeEach(() => {
        cy.visit('https://www.awesome-testing.com/')
        cy.viewport(1920, 1080)
    })

    it('should find Cypress posts', () => {
        cy.get('.gsc-input input').type('Cypress')
        cy.get('.gsc-search-button input').then(($btn) => {
            console.log('Hello there')
        })
        cy.get('.post-title').should('have.length.above', 1)
    })

})
