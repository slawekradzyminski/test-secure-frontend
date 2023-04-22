/// <reference types="cypress" />
import { faker } from '@faker-js/faker';

describe('Test Arena add project tests', () => {
    beforeEach(() => {
        cy.visit('http://demo.testarena.pl/zaloguj')
        cy.get('#email').type('administrator@testarena.pl')
        cy.get('#password').type('sumXQQ72$L')
        cy.get('#login').click()
        cy.visit('http://demo.testarena.pl/administration/add_project')
    })

    it('should add new project', () => {
        const name = faker.random.word()
        cy.get('#name').type(name)
        cy.get('#prefix').type(faker.random.alpha(3))
        cy.get('#description').type(faker.lorem.sentence())
        cy.get('#save').click()
        cy.get('#j_info_box > p').should('have.text', 'Projekt został dodany.')

        cy.visit('http://demo.testarena.pl/administration/projects')
        cy.get('#search').type(name)
        cy.get('#j_searchButton').click()
        cy.get('tr td').first().should('have.text', name)
        // wyszukać projekt po nazwie
        // sprawdzić ze jest na liscie wynikow
    })

})
