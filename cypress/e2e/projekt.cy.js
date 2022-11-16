/// <reference types="cypress" />

import { email, password } from "../util/credentials"
import { getRandomString } from "../util/random"

describe('Project page tests', () => {
    beforeEach(() => {
        cy.visit('http://demo.testarena.pl/zaloguj')
        cy.get('#email').type(email)
        cy.get('#password').type(password)
        cy.get('#login').click()
        cy.get('.header_admin').click()
    })

    it('should find Kopernik project', () => {
        cy.get('#search').type('Kopernik')
        cy.get('#j_searchButton').click()
        cy.get('tbody tr td:nth-of-type(1)').should('have.text', 'KOPERNIK')
    })

    it('should open project page', () => {
        cy.get('.button_link').first().click()
        cy.get('h1.content_title').should('have.text', 'Dodaj projekt')
    })

    it('should import project page', () => {
        cy.get('.button_link').last().click()
        cy.get('h1.content_title').should('have.text', 'Importuj projekt')
    })

    it('should add new project', () => {
        const text = getRandomString()
        cy.get('[href="http://demo.testarena.pl/administration/add_project"]').click()
        cy.get('#name').type(text)
        cy.get('#prefix').type(text)
        cy.get('#save').click()
        cy.get('#text').should('contain.text', text)
        cy.visit('http://demo.testarena.pl/administration/projects')
        cy.get('#search').type(text)
        cy.get('#j_searchButton').click()
        cy.get('table tbody tr td a').should('contain.text', text)
    })

})
