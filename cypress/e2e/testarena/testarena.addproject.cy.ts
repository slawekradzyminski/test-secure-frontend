/// <reference types="cypress" />

import { getRandomProject } from "../../utils/project"

describe('Testarena add project test', () => {
    beforeEach(() => {
        cy.visit('http://demo.testarena.pl/zaloguj')
        cy.get('#email').type(Cypress.env('testarenalogin'))
        cy.get('#password').type(Cypress.env('testarenapassword'))
        cy.get('#login').click()
        cy.get('.icon_tools').click()
        cy.contains('a', 'Dodaj projekt').click()
    })

    it('should add new message', () => {
        // given
        const project = getRandomProject()

        // when
        cy.get('#name').type(project.name)
        cy.get('#prefix').type(project.prefix)
        cy.get('#description').type(project.description)
        cy.get('#save').click()

        // then
        cy.get('#j_info_box').should('contain.text', 'Projekt został dodany')
    })

})
