import { faker } from '@faker-js/faker';

/// <reference types="cypress" />

describe('Awesome tests', () => {

    it('should find Cypress posts', () => {
        cy.visit('https://awesome-testing.com/')
            .then(() => {
                cy.get('.gsc-input input')
            }).then(($input) => {
                cy.wrap($input).type('Cypress')
            }).then(() => {
                cy.get('.gsc-search-button input')
            }).then(($btn) => {
                cy.wrap($btn).click()
            }).then(() => {
                cy.get('.post-title').should('have.length.above', 1)
            })
    })

})
