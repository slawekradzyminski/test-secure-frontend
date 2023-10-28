/// <reference types="cypress" />

import { getRandomProject } from "../../generator/project"

describe('TestArena add project page tests', () => {
    beforeEach(() => {
        cy.visit('http://demo.testarena.pl/zaloguj')
        cy.get('#email').type(Cypress.env('testarena_email'))
        cy.get('#password').type(Cypress.env('testarena_password'))    
        cy.get('#login').click()
        cy.get('#header_logo').should('be.visible')
        cy.visit('http://demo.testarena.pl/administration/add_project')
    })

    it('should successfully add new project', () => {
        const project = getRandomProject()
        cy.get('#name').type(project.name)
        cy.get('#prefix').type(project.prefix)
        cy.get('#description').type(project.description)
        cy.get('#save').click()

        cy.get('#j_info_box > p').should('contain.text', 'Projekt został dodany')
    })

})
