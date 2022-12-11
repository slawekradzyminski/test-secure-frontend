/// <reference types="cypress" />

import { getRandomProject, Project } from "../../utils/project"


describe('Home page tests', () => {
  const project = getRandomProject()

  beforeEach(() => {
    cy.visit('http://demo.testarena.pl/zaloguj')
    cy.get("#email").type('administrator@testarena.pl')
    cy.get("#password").type('sumXQQ72$L')
    cy.get('#save').click()
    cy.visit('http://demo.testarena.pl/administration/add_project')
  })

  it('should add new project', () => {
    cy.get('#name').type(project.name)
    cy.get('#prefix').type(project.prefix)
    cy.get('#description').type(project.description)
    cy.get('#save').click()

    cy.get('#j_info_box').should('exist')
    
    // Tą asercję idealnie byłoby zastąpić zapytaniem API przez cy.request() czy faktycznie
    // ten projekt istnieje
    cy.visit('http://demo.testarena.pl/administration/projects')
    cy.get('#search').type(project.name)
    cy.get('#j_searchButton').click()
    cy.get('td').contains(project.name).should('exist')
  })

})
