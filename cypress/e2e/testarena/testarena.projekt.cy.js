/// <reference types="cypress" />

import { getRandomProject } from "../../utils/project"

describe('Projekty', () => {
    beforeEach(() => {
        cy.loginToTestArena('administrator@testarena.pl', 'sumXQQ72$L')
        cy.visit('http://demo.testarena.pl/administration/projects')
    })

    it('Add new project', () => {
        const project = getRandomProject()
        cy.get('.button_link').contains('Dodaj projekt').click()

        cy.get('.content_title').should('have.text', 'Dodaj projekt')
        cy.get('#description').should('be.visible')
        cy.get('#name').type(`${project.name}`)
        cy.get('#prefix').type(`${project.prefix}`)
        cy.get('#description').type(`${project.message}`)

        cy.get('#save').click()
        cy.get('#text').should('have.text', `${project.name}`)
    })


})


