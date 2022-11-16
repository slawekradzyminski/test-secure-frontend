/// <reference types="cypress" />

import AddProjectPage from "../pages/AddProjectPage"
import ProjectPage from "../pages/ProjectPage"
import { email, password } from "../util/credentials"
import { getRandomString } from "../util/random"

describe('Project page tests', () => {
    beforeEach(() => {
        cy.login(email, password)
        cy.visit('http://demo.testarena.pl')
        cy.get('.header_admin').click()
    })

    it('should find Kopernik project', () => {
        ProjectPage.getSearchInput().type('Kopernik')
        ProjectPage.getSearchButton().click()
        ProjectPage.getFirstCell().should('have.text', 'KOPERNIK')
    })

    it('should open add project page', () => {
        ProjectPage.getButtonLinks().first().click()
        AddProjectPage.getTitle().should('have.text', 'Dodaj projekt')
    })

    it('should import project page', () => {
        cy.get('.button_link').last().click()
        cy.get('h1.content_title').should('have.text', 'Importuj projekt')
    })

    it.only('should add new project', () => {
        const text = getRandomString()
        ProjectPage.getButtonLinks().first().click()
        AddProjectPage.addNewProject(text)

        cy.get('#text').should('contain.text', text)
        cy.visit('http://demo.testarena.pl/administration/projects')
        cy.get('#search').type(text)
        cy.get('#j_searchButton').click()
        cy.get('table tbody tr td a').should('contain.text', text)
    })

})
