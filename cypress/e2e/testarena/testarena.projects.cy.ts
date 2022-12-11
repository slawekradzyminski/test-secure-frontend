/// <reference types="cypress" />

import { testArenaLoginPage } from "../../pages/testarena/testArenaLoginPage"
import { testArenaProjectPage } from "../../pages/testarena/testArenaProjectPage"

const testArenaUrl = 'http://demo.testarena.pl'

describe('Home page tests', () => {
  beforeEach(() => {
    cy.visit(`${testArenaUrl}/zaloguj`)
    testArenaLoginPage.attemptLogin('administrator@testarena.pl', 'sumXQQ72$L')
    cy.visit(`${testArenaUrl}/administration/projects`)
  })

  it('should find crucial project', () => {
    // when
    testArenaProjectPage.searchProject('Kopernik')

    // then
    cy.get(testArenaProjectPage.selectors.cell).contains('KOPERNIK').should('exist')
  })

  it('should open add new project page', () => {
    // when
    testArenaProjectPage.clickAddNewProject()

    // then
    cy.url().should('contain', 'add_project')
  })

})
