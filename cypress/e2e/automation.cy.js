/// <reference types="cypress" />

import { getRandomEmail, getRandomString } from "../util/random"

describe('Automation practice', () => {
    beforeEach(() => {
        cy.visit('http://automationpractice.com')
    })

    it('should successfully register', () => {
        cy.get('#search_query_top').type('dress')
        cy.get('.button-search').click()
        cy.get('.product_list > li').should('have.length.above', 5)
    })

    it.only('should display 3 subcategories', () => {
        cy.get('[title=Dresses]').eq(1).click()
        cy.get('#subcategories li').should('have.length', 3)
    })

})
