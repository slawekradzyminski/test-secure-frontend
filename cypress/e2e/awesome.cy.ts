/// <reference types="cypress" />

describe('Awesome tests', () => {
    beforeEach(() => {
        cy.visit('https://www.awesome-testing.com/')
        cy.viewport(1920, 1080)
        console.log('This will be logged before cy.visit')
    })

    it('should find Cypress posts', () => {
        cy.get('.gsc-input input').type('Cypress')
        cy.get('.gsc-search-button input').then(($btn) => {
            console.log('This will be logged after typing Cypress')
        })
        cy.get('.post-title').should('have.length.above', 1)
        console.log('This will be logged after cy.visit')
    })

    afterEach(() => {
        cy.wait(2000)
        cy.log('This is Cypress logging hence it will log after waiting')
        console.log('This will log after test before waiting')
    })

})
